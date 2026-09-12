"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  CaretLeft,
  CaretRight,
  Plus,
  Minus,
  ArrowsIn,
} from "@phosphor-icons/react";

export type MediaItem = {
  url: string;
  fileId: string;
  type: "image" | "video";
};

interface ProjectMediaViewerProps {
  media: MediaItem[];
  currentIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  projectTitle: string;
  projectLabel: string;
}

export default function ProjectMediaViewer({
  media,
  currentIndex,
  onClose,
  onIndexChange,
  projectTitle,
  projectLabel,
}: ProjectMediaViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activeMedia = currentIndex !== null ? media[currentIndex] : null;

  const nextImage = useCallback(() => {
    if (currentIndex === null || media.length <= 1) return;
    onIndexChange((currentIndex + 1) % media.length);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex, media.length, onIndexChange]);

  const prevImage = useCallback(() => {
    if (currentIndex === null || media.length <= 1) return;
    onIndexChange((currentIndex - 1 + media.length) % media.length);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex, media.length, onIndexChange]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.3, 3.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.3, 0.6);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleResetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, onClose, nextImage, prevImage]);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.15, 3.5));
    } else {
      setZoom((prev) => {
        const next = Math.max(prev - 0.15, 0.6);
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Drag to pan when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || zoom > 1) return;
    const touchEnd = e.changedTouches[0];
    const diffX = touchStartRef.current.x - touchEnd.clientX;
    const diffY = touchStartRef.current.y - touchEnd.clientY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartRef.current = null;
  };

  if (currentIndex === null || !activeMedia) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 backdrop-blur-xl text-white select-none animate-in fade-in duration-200"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar: Counter, Title & Close */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight">
            {String(currentIndex + 1).padStart(2, "0")}{" "}
            <span className="text-white/40 font-normal">
              / {String(media.length).padStart(2, "0")}
            </span>
          </span>
          <span className="hidden sm:inline-block text-white/20">|</span>
          <span className="hidden sm:inline-block font-sans text-xs uppercase tracking-widest text-white/70">
            {projectTitle} · {projectLabel}
          </span>
        </div>

        <button
          onClick={onClose}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:bg-white hover:text-black focus:outline-none"
          title="Close (Esc)"
          aria-label="Close viewer"
        >
          <X
            weight="bold"
            className="h-5 w-5 transition-transform group-hover:rotate-90"
          />
        </button>
      </div>

      {/* Central Inspection Workspace */}
      <div
        className={`relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden ${
          zoom > 1
            ? isDragging
              ? "cursor-grabbing"
              : "cursor-grab"
            : "cursor-default"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Previous Button */}
        {media.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black focus:outline-none"
            title="Previous (Left Arrow)"
            aria-label="Previous image"
          >
            <CaretLeft weight="bold" className="h-6 w-6" />
          </button>
        )}

        {/* Media Container */}
        <div
          className="relative max-h-[82vh] max-w-[90vw] flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
          onDoubleClick={() => {
            if (zoom > 1) {
              handleResetZoom();
            } else {
              setZoom(2);
            }
          }}
        >
          {activeMedia.type === "video" ? (
            <video
              src={activeMedia.url}
              autoPlay
              controls
              loop
              playsInline
              className="max-h-[80vh] max-w-[85vw] w-auto h-auto rounded-xl shadow-2xl object-contain ring-1 ring-white/10"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={activeMedia.url}
              alt={`${projectTitle} full inspect view`}
              className="max-h-[80vh] max-w-[85vw] w-auto h-auto rounded-xl shadow-2xl object-contain ring-1 ring-white/10 pointer-events-none"
              draggable={false}
            />
          )}
        </div>

        {/* Next Button */}
        {media.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black focus:outline-none"
            title="Next (Right Arrow)"
            aria-label="Next image"
          >
            <CaretRight weight="bold" className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Bottom Zoom Dock */}
      <div className="relative z-10 flex items-center justify-center pb-6 sm:pb-8 pt-2">
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-neutral-900/90 px-4 py-2 text-white shadow-2xl backdrop-blur-lg">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 0.6}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Zoom Out (-)"
            aria-label="Zoom out"
          >
            <Minus weight="bold" className="h-4 w-4" />
          </button>

          <span className="min-w-[54px] text-center font-mono text-xs font-semibold text-white/90">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3.5}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom in"
          >
            <Plus weight="bold" className="h-4 w-4" />
          </button>

          <span className="mx-1 h-4 w-[1px] bg-white/20" />

          <button
            onClick={handleResetZoom}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/15 hover:text-white transition-colors"
            title="Reset Zoom / Fit Screen (0)"
            aria-label="Reset zoom"
          >
            <ArrowsIn weight="bold" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Fit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

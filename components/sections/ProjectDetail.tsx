"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  MagnifyingGlassPlus,
  Play,
} from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaButton } from "@/components/ui/CtaButton";
import ProjectMediaViewer, {
  MediaItem,
} from "@/components/sections/project/ProjectMediaViewer";
import type { IProject } from "@/database";

gsap.registerPlugin(ScrollTrigger);

type AdjacentProject = {
  title: string;
  slug: string;
  label: string;
} | null;

interface ProjectDetailProps {
  project: IProject;
  prevProject?: AdjacentProject;
  nextProject?: AdjacentProject;
}

export default function ProjectDetail({
  project,
  prevProject,
  nextProject,
}: ProjectDetailProps) {
  const containerRef = useRef<HTMLElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const media = (project.media ?? []) as MediaItem[];

  // Hero media logic: First video if available, otherwise first image
  const videos = media.filter((m) => m.type === "video");
  const images = media.filter((m) => m.type === "image");
  const heroMedia =
    videos.length > 0 ? videos[0] : images.length > 0 ? images[0] : null;

  // Remaining media for the curated 2-column showcase
  const remainingMedia = media.filter((m) => m !== heroMedia);

  // Find index in master media array for viewer synchronization
  const getMasterIndex = (item: MediaItem) => {
    return media.findIndex(
      (m) => m.fileId === item.fileId || m.url === item.url
    );
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero Image subtle scrub parallax (reveals more of the vertical screenshot without pinning)
      const heroTrack = document.querySelector(".hero-parallax-track");
      if (heroTrack && heroContainerRef.current) {
        gsap.fromTo(
          heroTrack,
          { yPercent: 0 },
          {
            yPercent: -22,
            ease: "none",
            scrollTrigger: {
              trigger: heroContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={containerRef} className="relative w-full bg-background">
      {/* ========================================================================= */}
      {/* 1. PROJECT INTRO / HEADER                                                 */}
      {/* ========================================================================= */}
      <header className="pt-24 pb-14 sm:pt-32 sm:pb-18 lg:pt-36 lg:pb-20 border-b border-foreground/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft
                weight="bold"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              />
              <span>All Projects</span>
            </Link>
          </div>

          {/* Eyebrow / Classification */}
          <div className="mb-6">
            <Eyebrow tone="light">{project.label}</Eyebrow>
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-foreground leading-[0.92] max-w-6xl">
            {project.title}
          </h1>

          {/* Editorial Metadata Bar */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-foreground/[0.08] flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-8 sm:gap-14">
              <div>
                <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-muted">
                  Classification
                </p>
                <p className="mt-1 font-sans text-sm font-semibold text-foreground">
                  {project.label}
                </p>
              </div>

              <div>
                <p className="font-sans text-[11px] font-bold uppercase tracking-widest text-muted">
                  Delivery
                </p>
                <p className="mt-1 font-sans text-sm font-semibold text-foreground">
                  Custom Architecture & Engineering
                </p>
              </div>
            </div>

            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 py-2.5 font-sans text-xs sm:text-sm font-semibold text-foreground shadow-xs transition-all hover:border-accent hover:text-accent"
              >
                <span>See it live</span>
                <ArrowUpRight
                  weight="bold"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO MEDIA (CONTROLLED VIEWPORT + TOP ALIGNMENT + CONTAINED VIDEO)     */}
      {/* ========================================================================= */}
      {heroMedia && (
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div
              ref={heroContainerRef}
              onClick={() => setViewerIndex(getMasterIndex(heroMedia))}
              className="group relative mx-auto max-w-6xl cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 shadow-xl ring-1 ring-black/5"
            >
              {heroMedia.type === "video" ? (
                /* Video Hero: object-contain with preserved natural aspect ratio */
                <div className="relative flex items-center justify-center p-3 sm:p-6 bg-neutral-950 min-h-[360px] sm:min-h-[480px] lg:min-h-[580px] max-h-[720px]">
                  <video
                    src={heroMedia.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="max-h-[680px] w-auto h-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                    <Play weight="fill" className="h-3 w-3 text-accent" />
                    <span>Video Demonstration</span>
                  </div>
                </div>
              ) : (
                /* Long Screenshot Hero: Controlled height + object-top + scrub parallax track */
                <div className="relative h-[400px] sm:h-[520px] lg:h-[640px] w-full overflow-hidden bg-neutral-950">
                  <div className="hero-parallax-track relative h-[135%] w-full will-change-transform">
                    <Image
                      src={heroMedia.url}
                      alt={`${project.title} featured view`}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 85vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                  </div>
                </div>
              )}

              {/* Subtle hover affordance */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15 flex items-center justify-center pointer-events-none">
                <div className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <MagnifyingGlassPlus
                    weight="bold"
                    className="h-5 w-5 text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. THE PROBLEM & WHAT WE BUILT (ASYMMETRIC EDITORIAL LAYOUT)              */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24 sm:space-y-32">
          {/* 01 · THE PROBLEM */}
          {project.challenge && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  <span>01</span>
                  <span>·</span>
                  <span>The Problem</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  Where the workflow broke down.
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="font-sans text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-foreground/90">
                  {project.challenge.split("\n").map((paragraph, idx) =>
                    paragraph.trim() ? (
                      <p key={idx} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 02 · WHAT WE BUILT */}
          {project.whatWeBuilt && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-12 border-t border-foreground/[0.08]">
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  <span>02</span>
                  <span>·</span>
                  <span>What We Built</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  The engineered system.
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed text-muted space-y-4">
                  {project.whatWeBuilt.split("\n").map((paragraph, idx) =>
                    paragraph.trim() ? (
                      <p key={idx} className="text-foreground/90">
                        {paragraph}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 03 · HOW IT WORKS */}
          {project.howItWorks && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-12 border-t border-foreground/[0.08]">
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  <span>03</span>
                  <span>·</span>
                  <span>System Workflow</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  How the system works in production.
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed text-foreground/85 space-y-4">
                  {project.howItWorks.split("\n").map((paragraph, idx) =>
                    paragraph.trim() ? (
                      <p key={idx}>{paragraph}</p>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CURATED 2-COLUMN PROJECT SHOWCASE / MEDIA GALLERY                      */}
      {/* ========================================================================= */}
      {remainingMedia.length > 0 && (
        <section className="py-16 sm:py-24 lg:py-32 bg-[#faf9f6] border-y border-foreground/[0.06]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 sm:mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">
                  <span>Artifacts</span>
                  <span>·</span>
                  <span>Product Suite</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                  Visual system walkthrough.
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-muted">
                Click any screenshot to inspect at full size
              </p>
            </div>

            {/* 2-Column Responsive Visual Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {remainingMedia.map((item, index) => {
                const masterIdx = getMasterIndex(item);
                const isWide =
                  remainingMedia.length % 2 !== 0 && index === 0;

                return (
                  <div
                    key={item.fileId || item.url || index}
                    onClick={() => setViewerIndex(masterIdx)}
                    className={`group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-950 shadow-md ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl ${
                      isWide ? "md:col-span-2" : "col-span-1"
                    }`}
                  >
                    {item.type === "video" ? (
                      <div
                        className={`relative w-full flex items-center justify-center p-3 sm:p-6 bg-neutral-950 ${
                          isWide
                            ? "h-[340px] sm:h-[480px] lg:h-[560px]"
                            : "h-[300px] sm:h-[380px] lg:h-[440px]"
                        }`}
                      >
                        <video
                          src={item.url}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
                        />
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                          <Play weight="fill" className="h-3 w-3 text-accent" />
                          <span>Video</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`relative w-full overflow-hidden bg-neutral-950 ${
                          isWide
                            ? "h-[340px] sm:h-[480px] lg:h-[560px]"
                            : "h-[300px] sm:h-[380px] lg:h-[440px]"
                        }`}
                      >
                        <Image
                          src={item.url}
                          alt={`${project.title} artifact ${index + 1}`}
                          fill
                          unoptimized
                          sizes={
                            isWide
                              ? "(max-width: 768px) 100vw, 90vw"
                              : "(max-width: 768px) 100vw, 45vw"
                          }
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}

                    {/* Subtle Hover Inspection Affordance */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 flex items-center justify-center pointer-events-none">
                      <div className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <MagnifyingGlassPlus
                          weight="bold"
                          className="h-5 w-5 text-foreground"
                        />
                      </div>
                    </div>

                    {/* Artifact Number Badge */}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/90">
                      {String(index + 2).padStart(2, "0")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. THE OUTCOME / RESULTS                                                  */}
      {/* ========================================================================= */}
      {project.outcome && (
        <section className="py-20 sm:py-28 lg:py-36 bg-background">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
                <span>04</span>
                <span>·</span>
                <span>The Outcome</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Measurable business transformation.
              </h2>

              <div className="mt-8 sm:mt-10 font-sans text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed text-foreground/90 space-y-6">
                {project.outcome.split("\n").map((paragraph, idx) =>
                  paragraph.trim() ? (
                    <p key={idx} className="border-l-2 border-accent pl-6 py-2">
                      {paragraph}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. PROJECT PAGINATION NAVIGATION                                          */}
      {/* ========================================================================= */}
      {(prevProject || nextProject) && (
        <nav
          aria-label="Project Navigation"
          className="border-t border-foreground/[0.08] bg-[#fbfaf8] py-14 sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {/* Previous Project */}
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group flex flex-col items-start p-6 sm:p-8 rounded-xl border border-foreground/[0.06] bg-white transition-all duration-300 hover:border-foreground/20 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-muted group-hover:text-accent transition-colors">
                    <ArrowLeft
                      weight="bold"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                    />
                    <span>Previous Project</span>
                  </div>
                  <h3 className="mt-3 font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {prevProject.title}
                  </h3>
                  <span className="mt-1 font-sans text-xs uppercase tracking-wider text-muted">
                    {prevProject.label}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {/* Next Project */}
              {nextProject && (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group flex flex-col items-end text-right p-6 sm:p-8 rounded-xl border border-foreground/[0.06] bg-white transition-all duration-300 hover:border-foreground/20 hover:shadow-md"
                >
                  <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-muted group-hover:text-accent transition-colors">
                    <span>Next Project</span>
                    <ArrowRight
                      weight="bold"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                  <h3 className="mt-3 font-heading text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {nextProject.title}
                  </h3>
                  <span className="mt-1 font-sans text-xs uppercase tracking-wider text-muted">
                    {nextProject.label}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* ========================================================================= */}
      {/* 7. STUDIO CALL TO ACTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32 border-t border-foreground/[0.08]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <Eyebrow tone="light">Start A Project</Eyebrow>

            <h2 className="mt-6 font-heading text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-foreground">
              Have a business problem worth solving?
            </h2>

            <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg lg:text-xl leading-relaxed text-muted">
              Tell us what is taking too much time, creating friction, or holding
              your operations back. We design and engineer custom software
              systems built around your workflow.
            </p>

            <div className="mt-10">
              <CtaButton href="/contact" variant="primary">
                Discuss Your System Needs
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULL-SCREEN IMAGE & VIDEO INSPECTION VIEWER                               */}
      {/* ========================================================================= */}
      <ProjectMediaViewer
        media={media}
        currentIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
        onIndexChange={(idx) => setViewerIndex(idx)}
        projectTitle={project.title}
        projectLabel={project.label}
      />
    </article>
  );
}

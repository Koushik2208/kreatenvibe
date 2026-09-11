"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Stack, CheckCircle } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export function FragmentedBusinessSection() {
  const stageContainerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const docsRef = useRef<HTMLDivElement>(null);
  const tangleRef = useRef<HTMLDivElement>(null);
  const excelRef = useRef<HTMLDivElement>(null);
  const driveRef = useRef<HTMLDivElement>(null);
  const gmailRef = useRef<HTMLDivElement>(null);
  const slackRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const resolvedCardRef = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !stageContainerRef.current || !pinWrapRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageContainerRef.current,
          start: "top top",
          end: "+=100%",
          pin: pinWrapRef.current,
          scrub: 0.8,
        },
      });

      // 1. Initial drift: scattered elements and logos move inward toward center
      tl.to(
        docsRef.current,
        {
          x: 40,
          y: -15,
          rotation: -1,
          scale: 0.88,
          opacity: 0.35,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        tangleRef.current,
        {
          x: -40,
          y: 15,
          rotation: -6,
          scale: 0.85,
          opacity: 0.3,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        excelRef.current,
        {
          x: 45,
          y: 30,
          scale: 0.85,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        driveRef.current,
        {
          x: -35,
          y: 25,
          scale: 0.85,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        gmailRef.current,
        {
          x: 35,
          y: -25,
          scale: 0.85,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        slackRef.current,
        {
          x: -40,
          y: -25,
          scale: 0.85,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        whatsappRef.current,
        {
          x: -20,
          y: 35,
          scale: 0.85,
          ease: "power1.inOut",
        },
        0
      );

      // 2. Convergence resolution
      tl.to(
        [docsRef.current, tangleRef.current],
        {
          opacity: 0.08,
          scale: 0.72,
          ease: "power2.inOut",
        },
        0.45
      )
      .to(
        [excelRef.current, driveRef.current, gmailRef.current, slackRef.current, whatsappRef.current],
        {
          opacity: 0.18,
          scale: 0.7,
          ease: "power2.inOut",
        },
        0.45
      )
      .fromTo(
        resolvedCardRef.current,
        {
          opacity: 0,
          scale: 0.88,
          y: 35,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: "back.out(1.4)",
        },
        0.4
      )
      .fromTo(
        statusBadgeRef.current,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        0.65
      );
    }, stageContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative w-full max-w-full overflow-hidden bg-[#f9f8f6] scroll-mt-20 border-b border-foreground/5">
      {/* 1. Header Section */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:px-8 lg:pt-24 lg:pb-16">
        <div className="max-w-3xl">
          <Eyebrow>Fragmented Business vs. Connected System</Eyebrow>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your business is unique.
            <br />
            <span className="text-foreground/45">
              Your software should be too.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
            As you grow, scattered tools get in the way—customer info in spreadsheets,
            enquiries in WhatsApp, invoices done by hand. Scroll to see how KreatenVibe brings
            it together into one connected system.
          </p>
        </div>
      </div>

      {/* 2. Animatable Tall Stage with Physical Real Assets */}
      <div
        ref={stageContainerRef}
        className="relative w-full max-w-full"
        style={{ height: "180vh" }}
      >
        <div
          ref={pinWrapRef}
          className="flex h-screen w-full max-w-full flex-col justify-center overflow-hidden px-6 py-8 lg:px-8"
        >
          {/* Spatial Stage Arena */}
          <div className="relative mx-auto flex h-[580px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl bg-white/40 border border-foreground/5 shadow-xs p-6">
            
            {/* Transparent Business Documents Asset */}
            <div
              ref={docsRef}
              className="absolute left-2 top-4 h-[240px] w-[260px] pointer-events-none select-none sm:left-8 sm:top-6 sm:h-[300px] sm:w-[320px] lg:left-12 lg:h-[360px] lg:w-[380px]"
              style={{ transform: "rotate(-6deg)" }}
            >
              <Image
                src="/images/home/business-documents.png"
                alt="Fragmented spreadsheets and invoices"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* Transparent Workflow Tangle Asset */}
            <div
              ref={tangleRef}
              className="absolute right-2 top-6 h-[220px] w-[240px] pointer-events-none select-none sm:right-8 sm:top-8 sm:h-[280px] sm:w-[300px] lg:right-12 lg:h-[340px] lg:w-[360px]"
              style={{ transform: "rotate(10deg)" }}
            >
              <Image
                src="/images/home/workflow-tangle.png"
                alt="Tangled disconnected workflow"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* Floating Logo: Excel */}
            <div
              ref={excelRef}
              className="absolute left-[20%] top-[8%] flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:left-[24%] sm:top-[6%] sm:h-17 sm:w-17"
              style={{ transform: "rotate(-8deg)" }}
            >
              <Image
                src="/images/home/excel.svg"
                alt="Excel Spreadsheets"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>

            {/* Floating Logo: Google Drive */}
            <div
              ref={driveRef}
              className="absolute right-[16%] top-[12%] flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:right-[20%] sm:top-[10%] sm:h-17 sm:w-17"
              style={{ transform: "rotate(10deg)" }}
            >
              <Image
                src="/images/home/drive.svg"
                alt="Google Drive"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>

            {/* Floating Logo: Gmail */}
            <div
              ref={gmailRef}
              className="absolute left-[8%] bottom-[12%] flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:left-[12%] sm:bottom-[15%] sm:h-17 sm:w-17"
              style={{ transform: "rotate(-10deg)" }}
            >
              <Image
                src="/images/home/gmail.svg"
                alt="Gmail"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>

            {/* Floating Logo: Slack */}
            <div
              ref={slackRef}
              className="absolute right-[8%] bottom-[14%] flex h-15 w-15 items-center justify-center rounded-2xl bg-white p-3.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:right-[12%] sm:bottom-[16%] sm:h-18 sm:w-18"
              style={{ transform: "rotate(12deg)" }}
            >
              <Image
                src="/images/home/slack.svg"
                alt="Slack"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>

            {/* Floating Logo: WhatsApp */}
            <div
              ref={whatsappRef}
              className="absolute right-[34%] top-[4%] flex h-13 w-13 items-center justify-center rounded-2xl bg-white p-2.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.15)] ring-1 ring-black/5 sm:right-[38%] sm:h-16 sm:w-16"
              style={{ transform: "rotate(-6deg)" }}
            >
              <Image
                src="/images/home/whatsapp.svg"
                alt="WhatsApp"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>

            {/* Central Resolved Component ("ONE SYSTEM") */}
            <div
              ref={resolvedCardRef}
              className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-10 rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_30px_70px_-20px_rgba(0,0,0,0.18)] ring-1 ring-foreground/10 max-w-md w-full my-auto"
              style={{ opacity: 0 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-white shadow-lg">
                <Stack weight="bold" className="h-7 w-7 text-accent" />
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent font-sans">
                <CheckCircle weight="fill" className="h-4 w-4 text-emerald-500" />
                <span>Unified Architecture</span>
              </div>

              <h3 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                One Connected System
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-muted font-sans">
                Your inquiries, workflows, customer records, and operations synchronized in a single tailored environment.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-[#f4f4f2] px-3.5 py-1 text-xs font-semibold text-foreground/80 font-sans">
                  Automated Sync
                </span>
                <span className="rounded-full bg-[#f4f4f2] px-3.5 py-1 text-xs font-semibold text-foreground/80 font-sans">
                  Single Source of Truth
                </span>
                <span className="rounded-full bg-[#f4f4f2] px-3.5 py-1 text-xs font-semibold text-foreground/80 font-sans">
                  Zero Disconnect
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Strip */}
          <div
            ref={statusBadgeRef}
            className="mx-auto mt-4 flex w-full max-w-5xl items-center justify-between border-t border-foreground/10 pt-3 text-xs font-medium text-muted font-sans"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>SCROLL TRANSFORMATION: FRAGMENTATION → HARMONY</span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-foreground/70">
              <span>Excel</span>
              <span>·</span>
              <span>Drive</span>
              <span>·</span>
              <span>Gmail</span>
              <span>·</span>
              <span>Slack</span>
              <span>·</span>
              <span>WhatsApp</span>
              <span>→</span>
              <span className="font-bold text-accent">KreatenVibe Core</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

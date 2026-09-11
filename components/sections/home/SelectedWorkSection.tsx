"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { IProject } from "@/database";

gsap.registerPlugin(ScrollTrigger);

const fallbackProjects = [
  {
    _id: "fb-1",
    title: "Custom CRM & Lead Intelligence Engine",
    label: "CRM & Pipelines",
    slug: "custom-crm-lead-intelligence",
    challenge: "Scattered WhatsApp leads and Excel tracking causing lost sales.",
    image: "/hero/crm-card.png",
  },
  {
    _id: "fb-2",
    title: "Automated Billing & Invoice Dispatcher",
    label: "Finance & Billing",
    slug: "automated-billing-invoice-dispatcher",
    challenge: "Manual invoicing taking 15 hours every week with frequent errors.",
    image: "/hero/billing-card.png",
  },
  {
    _id: "fb-3",
    title: "Operations & Workflow Automation System",
    label: "Operations & Automation",
    slug: "operations-workflow-automation",
    challenge: "Disconnected departments struggling with handoffs and status visibility.",
    image: "/hero/automation-card.png",
  },
];

export function SelectedWorkSection({
  projects = [],
}: {
  projects?: IProject[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const displayList =
    projects.length > 0
      ? projects.slice(0, 3).map((p, i) => ({
          _id: String(p._id),
          title: p.title,
          label: p.label,
          slug: p.slug,
          challenge: p.challenge,
          image: p.media?.[0]?.url || fallbackProjects[i % fallbackProjects.length].image,
        }))
      : fallbackProjects;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const projectItems = gsap.utils.toArray<HTMLElement>(".work-gallery-item");

      projectItems.forEach((item) => {
        const track = item.querySelector(".work-image-track");
        if (track) {
          // Starts from top (y: 0) and smoothly scrolls screenshot downwards on scroll
          gsap.fromTo(
            track,
            { yPercent: 0 },
            {
              yPercent: -28,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative max-w-full overflow-hidden bg-[#fbfaf8] px-6 py-24 lg:px-8 lg:py-32 border-b border-foreground/5"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Built for real business workflows.
            </h2>
            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-muted sm:text-lg">
              Real systems solving real operational friction—built to scale with the companies running on them.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-6 py-3 font-sans text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-accent hover:text-accent self-start md:self-auto"
          >
            <span>View All Projects</span>
            <ArrowUpRight weight="bold" className="h-4 w-4" />
          </Link>
        </div>

        {/* Editorial Asymmetric Work Gallery */}
        <div className="mt-16 space-y-20 lg:space-y-28">
          {displayList.map((item, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={item._id}
                className={`work-gallery-item grid gap-10 items-center lg:grid-cols-12 ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Fixed-Height Image Container with Top-Aligned Parallax Scroll */}
                <div
                  className={`overflow-hidden rounded-3xl border border-foreground/10 bg-neutral-900 shadow-xl ${
                    idx === 0
                      ? "lg:col-span-8"
                      : isReversed
                      ? "lg:col-span-7 lg:col-start-6"
                      : "lg:col-span-7"
                  }`}
                >
                  <Link href={`/work/${item.slug}`} className="group block overflow-hidden">
                    <div className="relative h-[380px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden bg-neutral-950">
                      {/* Inner taller track for smooth vertical scroll parallax starting at top */}
                      <div className="work-image-track relative h-[140%] w-full will-change-transform">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 65vw"
                          unoptimized
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Text Metadata */}
                <div
                  className={`space-y-4 ${
                    idx === 0
                      ? "lg:col-span-4"
                      : isReversed
                      ? "lg:col-span-5 lg:col-start-1"
                      : "lg:col-span-5"
                  }`}
                >
                  <div className="flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest text-accent">
                    <span>0{idx + 1}</span>
                    <span>·</span>
                    <span>{item.label}</span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    <Link
                      href={`/work/${item.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="font-sans text-base leading-relaxed text-muted">
                    {item.challenge}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/work/${item.slug}`}
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-foreground hover:text-accent transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight weight="bold" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

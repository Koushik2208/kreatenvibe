"use client";

import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";

const services = [
  {
    num: "01",
    title: "CRM & Customer Portals",
    desc: "Keep enquiries, client interactions, follow-ups, and records organized in one centralized hub.",
    href: "/services",
  },
  {
    num: "02",
    title: "Internal Tools & Dashboards",
    desc: "Give your team clear visibility over daily operations, inventory, pipeline, and reporting.",
    href: "/services",
  },
  {
    num: "03",
    title: "Web Applications",
    desc: "Fast, scalable, and secure browser-based platforms built for continuous business use.",
    href: "/services",
  },
  {
    num: "04",
    title: "AI & Workflow Automation",
    desc: "Eliminate repetitive manual data entry by bridging disconnected tools automatically.",
    href: "/services",
  },
  {
    num: "05",
    title: "Business Websites",
    desc: "High-performance marketing platforms engineered to communicate value and convert visitors.",
    href: "/services",
  },
  {
    num: "06",
    title: "Mobile Apps & MVPs",
    desc: "Practical mobile applications and rapid MVPs designed to validate ideas and scale.",
    href: "/services",
  },
];

export function WhatWeBuildSection() {
  return (
    <section
      id="services"
      className="relative max-w-full overflow-hidden scroll-mt-24 bg-background px-6 py-20 lg:px-8 lg:py-32 border-b border-foreground/5"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Eyebrow>What We Build</Eyebrow>
          <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Custom systems,
            <br />
            <span className="text-foreground/45">
              engineered around your workflow.
            </span>
          </h2>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted sm:text-lg">
            No cookie-cutter templates. Every system is conceived from your operational reality and delivered with surgical precision.
          </p>
        </div>

        {/* Central Organizing Concept + Editorial Typographic Grid */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column Services */}
          <div className="space-y-12 lg:col-span-4">
            {services.slice(0, 3).map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="group block border-t border-foreground/10 pt-6 transition-all hover:border-accent"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-xs font-bold text-accent">
                    {s.num}
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    className="h-4 w-4 text-foreground/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Center Column: Conceptual Anchor (YOUR BUSINESS -> CUSTOM SYSTEM) */}
          <div className="flex flex-col items-center justify-center rounded-3xl bg-[#f8f7f5] p-8 text-center ring-1 ring-foreground/5 lg:col-span-4 lg:py-16">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-muted">
              Origin
            </span>
            <div className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              YOUR BUSINESS
            </div>
            <p className="mt-1 font-sans text-xs text-muted">
              Unique processes & workflows
            </p>

            {/* Downward connecting vector */}
            <div className="my-8 flex flex-col items-center gap-2">
              <div className="h-10 w-px bg-foreground/20" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-white shadow-md">
                <ArrowDown weight="bold" className="h-4 w-4 text-accent" />
              </div>
              <div className="h-10 w-px bg-foreground/20" />
            </div>

            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Outcome
            </span>
            <div className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              CUSTOM SYSTEM
            </div>
            <p className="mt-1 font-sans text-xs text-muted">
              100% purpose-built software
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white px-5 py-2.5 font-sans text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-accent hover:text-accent"
            >
              <span>Explore All Capabilities</span>
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Right Column Services */}
          <div className="space-y-12 lg:col-span-4">
            {services.slice(3, 6).map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="group block border-t border-foreground/10 pt-6 transition-all hover:border-accent"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-xs font-bold text-accent">
                    {s.num}
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    className="h-4 w-4 text-foreground/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>
                <h3 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

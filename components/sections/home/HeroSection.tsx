"use client";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaButton } from "@/components/ui/CtaButton";
import { ShowcaseStack } from "@/components/sections/ShowcaseStack";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <Eyebrow>Custom Business Software</Eyebrow>

            <h1 className="mt-7 max-w-3xl font-heading text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              Software that fits your business.
            </h1>

            <p className="mt-7 max-w-lg font-sans text-lg leading-8 text-muted">
              Stop piecing your business together with spreadsheets,
              WhatsApp, and manual work. We build the system that fits how
              you actually operate.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <CtaButton href="/contact" variant="primary">
                Start Your Project
              </CtaButton>
              <CtaButton href="/contact" variant="ghost">
                Discuss Your Business Needs
              </CtaButton>
            </div>
          </div>

          <div className="mx-auto shrink-0 lg:mx-0">
            <ShowcaseStack />
          </div>
        </div>
      </div>
    </section>
  );
}

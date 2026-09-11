import Link from "next/link";
import { ArrowUpRight, Stack } from "@phosphor-icons/react/dist/ssr";

export function HomeCtaSection() {
  return (
    <section id="contact" className="relative max-w-full overflow-hidden bg-accent text-white px-6 py-24 lg:px-8 lg:py-32">
      {/* Subtle background physical graphic motif */}
      <div className="pointer-events-none absolute -right-20 -top-20 opacity-10">
        <Stack weight="thin" className="h-[480px] w-[480px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
            Start a Conversation
          </span>

          <h2 className="mt-6 font-heading text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Ready to build a system
            <br />
            <span className="text-white/75">
              that works the way your business does?
            </span>
          </h2>

          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-white/80 sm:text-xl">
            Tell us how your business works today and what is causing friction.
            We will architect the right solution and roadmap.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-base font-bold text-accent shadow-xl transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Your Project</span>
              <ArrowUpRight weight="bold" className="h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 font-sans text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <span>Discuss Your Business Needs</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

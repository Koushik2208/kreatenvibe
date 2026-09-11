import {
  Stack,
  ArrowsClockwise,
  FolderSimple,
  BellRinging,
  Eye,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";

const benefits = [
  {
    text: "Replace scattered tools with one connected system.",
    Icon: Stack,
  },
  {
    text: "Reduce repetitive manual work and unnecessary data entry.",
    Icon: ArrowsClockwise,
  },
  {
    text: "Keep customer and business information organized in one place.",
    Icon: FolderSimple,
  },
  {
    text: "Automate follow-ups, notifications, and routine workflows.",
    Icon: BellRinging,
  },
  {
    text: "Give your team clearer processes and better operational visibility.",
    Icon: Eye,
  },
  {
    text: "Build scalable software that evolves as your business grows.",
    Icon: TrendUp,
  },
];

export function DifferenceSection() {
  return (
    <section className="bg-[#f7f6f3] border-b border-foreground/5">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Heading */}
          <div>
            <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/50">
              <span>01</span>
              <span className="h-px w-8 bg-foreground/20" />
              <span>The Difference</span>
            </div>

            <h2 className="mt-7 max-w-xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Less manual work.
              <br />
              <span className="text-foreground/45">
                More control over your business.
              </span>
            </h2>

            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted sm:text-lg">
              Stop losing hours to disconnected tools, manual copy-pasting, and messy tracking. We build purposeful software that gives you clarity and control.
            </p>
          </div>

          {/* Benefits Grid */}
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 self-center">
            {benefits.map(({ text, Icon }) => (
              <li key={text} className="group flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-white text-foreground/60 shadow-xs transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon weight="bold" className="h-5 w-5" />
                </span>

                <p className="text-[1.05rem] leading-snug font-medium text-foreground/85 pt-1">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

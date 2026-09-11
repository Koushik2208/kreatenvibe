import { Eyebrow } from "@/components/ui/Eyebrow";

const supportingPoints = [
  {
    title: "Business-First Thinking",
    desc: "We prioritize your operational ROI and workflows over arbitrary tech hype.",
  },
  {
    title: "Direct Engineering Communication",
    desc: "Speak directly with builders who understand systems architecture and delivery.",
  },
  {
    title: "Transparent Bi-Weekly Milestones",
    desc: "Interactive staging demos at every phase—no black-box surprises.",
  },
  {
    title: "Software Tailored To Your Workflow",
    desc: "Zero generic templates. Systems built for your exact business nuances.",
  },
  {
    title: "Enterprise-Grade Deployment",
    desc: "Secure, scalable cloud infrastructure with automated backups and monitoring.",
  },
  {
    title: "Long-Term SLA & Support",
    desc: "Continuous refinement and feature expansion as your company grows.",
  },
];

export function WhyKreatenVibeSection() {
  return (
    <section className="bg-background px-6 py-20 lg:px-8 lg:py-28 border-b border-foreground/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Why KreatenVibe</Eyebrow>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              Built around your business.
              <br />
              <span className="text-foreground/45">
                Delivered with clarity.
              </span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              We do not sell one-size-fits-all software. We work closely with you
              to understand your actual processes and support you from initial
              architecture to post-launch scaling.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              {supportingPoints.map((point) => (
                <div
                  key={point.title}
                  className="border-t border-foreground/10 pt-5 space-y-2"
                >
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

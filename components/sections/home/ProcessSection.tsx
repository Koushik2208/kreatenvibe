const steps = [
  {
    number: "01",
    title: "Understand",
    description: "Learn how your business works and define clear requirements.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Turn the requirements into a practical roadmap with clear priorities and milestones.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Develop the solution in milestones, with regular demos so you always know where the project stands.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Gather your feedback throughout development and improve the system based on what you need.",
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "Deploy the solution securely and continue supporting it as your business evolves.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-background border-b border-foreground/5">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/50">
            <span>02</span>
            <span className="h-px w-8 bg-foreground/20" />
            <span>How It Works</span>
          </div>

          <h2 className="mt-7 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            A clear process from idea
            <br />
            <span className="text-foreground/45">
              to working system.
            </span>
          </h2>
        </div>

        {/* Steps */}
        <ol className="mt-16 grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="relative border-t border-foreground/10 py-6 lg:border-t-0 lg:py-0 lg:pr-8"
            >
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <span className="absolute left-0 right-8 top-4.25 hidden h-px bg-foreground/10 lg:block" />
              )}

              {/* Step number */}
              <div className="relative flex items-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background text-xs font-semibold text-foreground">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

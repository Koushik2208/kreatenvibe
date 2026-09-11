import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getProjects } from "@/lib/actions/project.action";

// High-End Visual Homepage Sections
import { HeroSection } from "@/components/sections/home/HeroSection";
import { FragmentedBusinessSection } from "@/components/sections/home/FragmentedBusinessSection";
import { WhatWeBuildSection } from "@/components/sections/home/WhatWeBuildSection";
import { DifferenceSection } from "@/components/sections/home/DifferenceSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { SelectedWorkSection } from "@/components/sections/home/SelectedWorkSection";
import { WhyKreatenVibeSection } from "@/components/sections/home/WhyKreatenVibeSection";
import { HomeCtaSection } from "@/components/sections/home/HomeCtaSection";

export const dynamic = "force-dynamic";

const faqs = [
  {
    question: "What kind of software can KreatenVibe build?",
    answer:
      "We build custom business software around the way your company works. This can include CRM systems, customer portals, billing systems, internal dashboards, web applications, business management platforms, workflow automation, and mobile applications.",
  },
  {
    question: "Why not use an off-the-shelf tool?",
    answer:
      "Generic software can be a great starting point, but growing businesses sometimes reach a point where the software no longer matches their workflow. If your team is constantly working around limitations, moving data between tools, or maintaining manual processes, a custom system may be a better fit.",
  },
  {
    question: "Do you only build software from scratch?",
    answer:
      "Not necessarily. We look at the business problem first. Depending on the requirements, the right solution may involve custom software, integrations, automation, existing services, or a combination of these.",
  },
  {
    question: "Can you automate our existing business processes?",
    answer:
      "Yes. We can identify repetitive or disconnected workflows and use integrations, workflow automation, and AI-powered automation where they provide a practical benefit.",
  },
  {
    question: "Can you build a CRM specifically for our business?",
    answer:
      "Yes. A custom CRM can be designed around your actual customer journey, sales process, follow-ups, appointments, communication, and reporting instead of forcing your team into a generic workflow.",
  },
  {
    question: "Will you support the system after launch?",
    answer:
      "Yes. Ongoing support is part of the way we approach client relationships. After deployment, we can continue helping you maintain, improve, and extend the system as your business grows.",
  },
  {
    question: "How does a project start?",
    answer:
      "Every project starts with a conversation about your business, your current processes, and what you want to improve. From there, we define the requirements and determine the right solution and roadmap.",
  },
  {
    question:
      "Do I need to know exactly what software I want before contacting you?",
    answer:
      "No. You can start with the business problem. If you know that your team is spending too much time on manual work, using too many disconnected tools, or struggling with an existing process, we can help define what the right digital solution should look like.",
  },
];

export default async function Home() {
  const result = await getProjects({ pageSize: 6 });
  const projects = result.data?.projects ?? [];

  return (
    <>
      {/* 01. Hero — Layered Depth & Physical Cards */}
      <HeroSection />

      {/* 02. Problem — Fragmented Business Scroll Convergence (Real Assets: Documents, Tangle, Gmail, Slack, WhatsApp) */}
      <FragmentedBusinessSection />

      {/* 03. What We Build — Spacious Editorial Typography Around Central Axis */}
      <WhatWeBuildSection />

      {/* 04. Less Manual Work — Chaos to Order Pinned Transition */}
      <DifferenceSection />

      {/* 05. Process — 5-Stage Sequential Progression */}
      <ProcessSection />

      {/* 06. Selected Work — Real Project Imagery & Asymmetric Editorial Gallery */}
      <SelectedWorkSection projects={projects} />

      {/* 07. Quiet Section: Why KreatenVibe */}
      <WhyKreatenVibeSection />

      {/* 08. Quiet Section: FAQ */}
      <section id="faq" className="scroll-mt-28 bg-[#fbfaf8] py-20 lg:py-28 border-b border-foreground/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Common questions,
              <br />
              <span className="text-foreground/45">answered with clarity.</span>
            </h2>
          </div>

          <div className="mt-12">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* 09. Final CTA — Confident Editorial Red & White Identity */}
      <HomeCtaSection />
    </>
  );
}

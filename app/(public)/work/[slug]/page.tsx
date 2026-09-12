import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/actions/project.action";
import ProjectDetail from "@/components/sections/ProjectDetail";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const result = await getProjectBySlug(resolvedParams.slug);
  const project = result.data;

  if (!result.success || !project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const images =
    project.media
      ?.filter((m) => m.type === "image")
      .map((m) => m.url) || [];

  return {
    title: project.title,
    description: project.challenge?.substring(0, 160) || `Read about our work on ${project.title}`,
    openGraph: {
      title: project.title,
      description: project.challenge?.substring(0, 160) || `Read about our work on ${project.title}`,
      images: images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.challenge?.substring(0, 160) || `Read about our work on ${project.title}`,
      images: images,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const result = await getProjectBySlug(resolvedParams.slug);
  const project = result.data;

  if (!result.success || !project) {
    notFound();
  }

  // Fetch adjacent projects for Prev / Next navigation
  let prevProject: { title: string; slug: string; label: string } | null = null;
  let nextProject: { title: string; slug: string; label: string } | null = null;

  try {
    const allProjectsRes = await getProjects({ pageSize: 100 });
    const allProjects = allProjectsRes.data?.projects ?? [];

    if (allProjects.length > 1) {
      const currentIndex = allProjects.findIndex(
        (p) => p.slug === resolvedParams.slug
      );

      if (currentIndex !== -1) {
        const prevIdx =
          (currentIndex - 1 + allProjects.length) % allProjects.length;
        const nextIdx = (currentIndex + 1) % allProjects.length;

        if (prevIdx !== currentIndex) {
          prevProject = {
            title: allProjects[prevIdx].title,
            slug: allProjects[prevIdx].slug,
            label: allProjects[prevIdx].label,
          };
        }

        if (nextIdx !== currentIndex && nextIdx !== prevIdx) {
          nextProject = {
            title: allProjects[nextIdx].title,
            slug: allProjects[nextIdx].slug,
            label: allProjects[nextIdx].label,
          };
        } else if (nextIdx !== currentIndex) {
          nextProject = {
            title: allProjects[nextIdx].title,
            slug: allProjects[nextIdx].slug,
            label: allProjects[nextIdx].label,
          };
        }
      }
    }
  } catch {
    // Graceful fallback
  }

  return (
    <main className="bg-background text-foreground">
      <ProjectDetail
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}


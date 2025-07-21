import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectById } from "@/services/projectService";
import ProjectDetail from "@/components/project-detail";
import { Spinner } from "@/components/ui/spinner";

// This function generates the static paths at build time
export async function generateStaticParams() {
  const projects = await getAllProjects();
  
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = params.id;
  const project = await getProjectById(projectId);
  
  if (!project) {
    notFound();
  }
  
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Spinner /></div>}>
      <ProjectDetail project={project} />
    </Suspense>
  );
}
import projectsData from "@/data/projects.json";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  coverImages: {
    dark: string;
    light: string;
  };
  gallery: string[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  problem: string;
  solution: string;
  duration: string;
  techStack: string[];
  features: string[];
}

export async function getAllProjects(): Promise<Project[]> {
  // Simulate async behavior to maintain compatibility with existing code
  return Promise.resolve(projectsData as Project[]);
}

export async function getProjectById(id: string): Promise<Project | null> {
  // Simulate async behavior to maintain compatibility with existing code
  const project = projectsData.find((p) => p.id === id);
  return Promise.resolve(project || null);
}

// Helper function to get the appropriate cover image based on theme
export function getCoverImage(
  project: Project,
  theme: "light" | "dark"
): string {
  return project.coverImages[theme] || project.image;
}

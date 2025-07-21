"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects, Project } from "@/services/projectService";

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const fetchedProjects = await getAllProjects();
      setProjects(fetchedProjects);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-8 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-6xl font-bold font-montserrat mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating my expertise in web
            development, UI/UX design, and problem-solving.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            style={{ y }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                coverImages={project.coverImages}
                tags={project.tags}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

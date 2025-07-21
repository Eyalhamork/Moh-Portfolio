"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ExternalLink, Github, Figma } from "lucide-react";

// Case study data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Redesign",
    description:
      "A complete overhaul of an e-commerce platform focusing on user experience and conversion optimization.",
    image: "/images/sass.jpeg", // Add your actual image paths
    designTool: "figma",
    caseStudyLink: "/case-studies/ecommerce",
    demoLink: "https://ecommerce-demo.com",
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description:
      "Financial dashboard with real-time analytics and intuitive user interface.",
    image: "/images/dashboard.jpeg",
    designTool: "xd",
    caseStudyLink: "/case-studies/banking",
    demoLink: "https://banking-demo.com",
  },
  {
    id: 3,
    title: "Escort Services",
    description:
      "Escort services for tracking workouts and nutrition with personalized recommendations.",
    image: "/images/escort.jpeg",
    designTool: "figma",
    caseStudyLink: "/case-studies/fitness",
    demoLink: "https://fitness-demo.com",
  },
  {
    id: 4,
    title: "Real Estate",
    description:
      "A comprehensive travel booking platform with immersive destination showcases.",
    image: "/images/sass.jpeg",
    designTool: "xd",
    caseStudyLink: "/case-studies/travel",
    demoLink: "https://travel-demo.com",
    span: "md:col-span-2",
  },
  {
    id: 5,
    title: "Multi Service Platform",
    description:
      "Interactive learning platform with coursework, assessments, and progress tracking .",
    image: "/images/multiservice.jpeg",
    designTool: "figma",
    caseStudyLink: "/case-studies/education",
    demoLink: "https://education-demo.com",
  },
];

// Helper function for placeholder images - remove in production
const getPlaceholderSrc = (width, height) =>
  `/api/placeholder/${width}/${height}`;

// Project Card Component
function ProjectCard({ project }) {
  return (
    <BentoGridItem
      className="group overflow-hidden relative h-full border-border/80 hover:border-purple-300/60 transition-all duration-300"
      header={
        <div className="w-full h-64 relative overflow-hidden rounded-t-lg">
          <div className="bg-card">
            <Image
              src={project.image || getPlaceholderSrc(800, 600)}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-50" />
          </div>
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-4">
              <Link
                href={project.caseStudyLink}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors duration-200 interactive"
              >
                <span>Case Study</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background text-foreground px-4 py-2 rounded-md flex items-center gap-2 hover:bg-background/90 transition-colors duration-200 interactive"
              >
                <span>Live Demo</span>
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      }
      icon={
        <div className="flex items-center space-x-2">
          {project.designTool === "figma" ? (
            <Figma className="h-5 w-5 text-primary" />
          ) : (
            <div className="flex items-center justify-center h-5 w-5 text-primary">
              <span className="font-bold">Xd</span>
            </div>
          )}
          <span className="text-xs text-muted-foreground">
            {project.designTool === "figma" ? "Figma" : "Adobe XD"}
          </span>
        </div>
      }
      title={project.title}
      description={project.description}
    />
  );
}

// Main Case Study Section Component
export function CaseStudySection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section
      id="case-studies"
      ref={containerRef}
      className="py-16 lg:py-20 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat tracking-tight mb-4">
            <span className="text-primary">Case</span> Studies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my featured projects showcasing problem-solving approach,
            design thinking and technical implementation.
          </p>
        </motion.div>

        <BentoGrid className="w-full">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={index === 3 || index === 6 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

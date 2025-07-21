// app/case-studies/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import projectsData from "@/data/projects.json";

export default function CaseStudyPage() {
  const params = useParams();
  const projectId = params.id;

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link
            href="/case-studies"
            className="text-primary hover:underline flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              {project.fullDescription || project.description}
            </p>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Duration: {project.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-sm">{project.tags?.join(", ")}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  <span>View Live Site</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-muted text-foreground px-6 py-3 rounded-md flex items-center gap-2 hover:bg-muted/90 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>Source Code</span>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src={project.coverImages?.dark || project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-12"
              >
                {/* Problem Statement */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* UI Prototypes Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">UI Prototypes</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.gallery.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 * index }}
                          className="relative h-64 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        >
                          <Image
                            src={`/images/projects/${image}`}
                            alt={`${project.title} screenshot ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                    <div className="grid gap-4">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-8 space-y-8"
              >
                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="p-6 rounded-lg bg-muted/30">
                    <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Info */}
                <div className="p-6 rounded-lg bg-muted/30">
                  <h3 className="text-lg font-semibold mb-4">Project Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{project.tags?.[0]}</span>
                    </div>
                    {project.liveUrl && (
                      <div className="pt-4 border-t border-border">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Live Project
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

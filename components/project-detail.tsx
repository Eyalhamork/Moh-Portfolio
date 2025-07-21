"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
  Code,
  Target,
  Lightbulb,
  Star,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Project } from "@/services/projectService";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the appropriate cover image based on theme
  const getCoverImage = () => {
    if (theme === "light" && project.coverImages.light) {
      return project.coverImages.light;
    } else if (theme === "dark" && project.coverImages.dark) {
      return project.coverImages.dark;
    }
    return project.image;
  };

  // Create complete image array with cover image first, then gallery
  const allImages = [getCoverImage(), ...(project.gallery || [])];
  const [activeImage, setActiveImage] = useState(allImages[0]);

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setActiveImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setActiveImage(allImages[prevIndex]);
  };

  const selectImage = (img: string, index: number) => {
    setActiveImage(img);
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowLeft") {
          prevImage();
        } else if (e.key === "ArrowRight") {
          nextImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen, currentIndex]);

  // Update active image when theme changes
  useEffect(() => {
    if (currentIndex === 0) {
      const newCoverImage = getCoverImage();
      setActiveImage(newCoverImage);
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 ">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.back()}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />
            Back to projects
          </motion.button>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-sm px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary font-medium hover:scale-105 transition-transform"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </Button>
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-6 py-3 rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github size={16} />
                    View Source
                  </Button>
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 mb-16">
            {/* Images Section */}
            <div className="xl:col-span-2">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative aspect-video rounded-2xl overflow-hidden mb-8 group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 shadow-2xl border border-border/50"
              >
                <Image
                  src={activeImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                />

                {/* Expand Button */}
                <button
                  onClick={openModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Expand image"
                >
                  <Maximize2 size={18} />
                </button>

                {/* Navigation arrows */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {allImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentIndex + 1} / {allImages.length}
                  </div>
                )}
              </motion.div>

              {/* Gallery thumbnails */}
              {allImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold font-montserrat flex items-center gap-2">
                    <Star size={18} className="text-primary" />
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {allImages.map((img, index) => (
                      <motion.div
                        key={`${img}-${index}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl ${
                          activeImage === img
                            ? "ring-4 ring-primary scale-105 shadow-2xl"
                            : "hover:scale-105"
                        }`}
                        onClick={() => selectImage(img, index)}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Project Details Sidebar */}
            <div className="xl:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-8 sticky top-24"
              >
                {/* Overview Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Lightbulb size={20} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat">
                      Overview
                    </h3>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                {/* Problem Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <Target size={20} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat">
                      Problem
                    </h3>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Solution Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Lightbulb size={20} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat">
                      Solution
                    </h3>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Tech Stack Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Code size={20} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat">
                      Tech Stack
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary font-medium hover:scale-105 transition-transform"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Key Features Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Star size={20} className="text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat">
                      Key Features
                    </h3>
                  </div>
                  <ul className="text-muted-foreground space-y-3 pl-0">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="inline-block w-2 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Duration Card */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Calendar size={20} className="text-orange-500" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat">
                      Duration
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {project.duration}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={project.title}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              {/* Navigation in Modal */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image counter in modal */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm">
                  {currentIndex + 1} / {allImages.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  coverImages: {
    dark: string;
    light: string;
  };
  tags: string[];
  index: number;
}

export function ProjectCard({
  id,
  title,
  description,
  image,
  coverImages,
  tags,
  index,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // Get the appropriate cover image based on theme
  const getCoverImage = () => {
    // Use resolvedTheme for more reliable theme detection
    const currentTheme = resolvedTheme || theme;

    if (currentTheme === "light" && coverImages.light) {
      return `/projects/${coverImages.light}`;
    } else if (currentTheme === "dark" && coverImages.dark) {
      return `/projects/${coverImages.dark}`;
    }

    // Fallback to dark theme cover image or original image
    return `/projects/${coverImages.dark || image}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group"
    >
      <Link href={`/projects/${id}`}>
        <div
          className="relative overflow-hidden rounded-xl bg-gray-50 dark:bg-[#0D0E13]/40 border dark:border-[#1b182d] border-gray-200 h-full transition-all duration-300 interactive hover:shadow-lg hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={getCoverImage()}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3} // Add priority for first 3 images
              onError={(e) => {
                // Fallback to a placeholder or default image on error
                console.error(`Failed to load image: ${getCoverImage()}`);
                e.currentTarget.src = "/images/placeholder-project.jpg"; // Make sure this exists
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-30" />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold font-montserrat mb-2 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <motion.div
                animate={{
                  x: isHovered ? 0 : -5,
                  y: isHovered ? 0 : 5,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="text-primary" />
              </motion.div>
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-[#171625] text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-[#171625] text-secondary-foreground">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

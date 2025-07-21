"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Sparkles } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Simple animated background with CSS
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />

      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/60 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

// Interactive text animation
function InteractiveText({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  const letters = children.split("");

  return (
    <>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.03,
            ease: "easeOut",
          }}
          whileHover={{
            y: -3,
            color: "#4f46e5",
            transition: { duration: 0.2 },
          }}
          className={`inline-block cursor-pointer ${className}`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </>
  );
}

// Enhanced Skills ticker with seamless loop
function SkillsTicker() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "Supabase",
    "Vercel",
    "Framer Motion",
  ];

  // Create multiple copies for seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full py-3 mt-8 border border-white/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -33.33 * duplicatedSkills.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
        style={{ width: "max-content" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <span
            key={index}
            className="mx-6 text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center flex-shrink-0"
          >
            <Code className="w-3 h-3 mr-2 text-blue-500" />
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Enhanced button component
function EnhancedButton({
  onClick,
  children,
  variant = "primary",
}: {
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        px-8 py-4 rounded-lg font-medium min-w-[160px] relative overflow-hidden group transition-all duration-300
        ${
          isPrimary
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
            : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
        }
      `}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        <Sparkles className="w-4 h-4 ml-2" />
      </span>
    </motion.button>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();

    if (isHomePage) {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${targetId}`);
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20"
    >
      <AnimatedBackground />

      {/* Floating elements */}
      {[
        { size: "w-64 h-64", x: "10%", y: "20%" },
        { size: "w-96 h-96", x: "70%", y: "15%" },
        { size: "w-48 h-48", x: "80%", y: "70%" },
      ].map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl ${circle.size}`}
          style={{ left: circle.x, top: circle.y }}
          animate={{
            y: ["0%", "20%", "0%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 text-center z-10 relative max-w-6xl flex-1 flex flex-col justify-center"
      >
        {/* Badge */}
        <motion.div
          className="inline-block px-6 py-2 mb-8 text-sm font-medium bg-white/10 dark:bg-[#100E16] backdrop-blur-sm rounded-full shadow-lg  mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="inline-block mr-2"
          >
            <Code className="w-4 h-4 text-blue-500" />
          </motion.div>
          <span className="text-gray-800 dark:text-gray-200">
            Frontend Developer & UI Designer
          </span>
        </motion.div>

        {/* Main heading with proper theme colors */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          <div className="mb-2 text-gray-900 dark:text-white">
            <InteractiveText delay={0}>Crafting Sleek &</InteractiveText>
          </div>
          <div className="text-gray-900 dark:text-white">
            <InteractiveText delay={0.5}>Practical</InteractiveText>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            <InteractiveText delay={1}>Web Experiences</InteractiveText>
          </div>
        </h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Hi! I'm{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Mohammed Kromah
          </span>
          , I create stunning, high-performance digital experiences that blend
          creativity with functionality.
        </motion.p>

        {/* Skills ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <SkillsTicker />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <EnhancedButton
            onClick={(e) => handleNavigation(e, "#projects")}
            variant="primary"
          >
            View My Work
          </EnhancedButton>

          <EnhancedButton
            onClick={(e) => handleNavigation(e, "#contact")}
            variant="secondary"
          >
            Get in Touch
          </EnhancedButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - positioned at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center cursor-pointer group"
          onClick={(e) => handleNavigation(e, "#about")}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-gray-400/50 dark:border-gray-500/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

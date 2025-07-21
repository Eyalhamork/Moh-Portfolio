"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [lenis, setLenis] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (isHomePage) {
      const lenisInstance = new Lenis({ smooth: true });
      setLenis(lenisInstance);

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenisInstance.destroy();
    }
  }, [isHomePage]);

  const handleNavigation = (e, targetId) => {
    e.preventDefault();

    if (isHomePage) {
      // If we're on homepage, use smooth scroll
      if (lenis) {
        lenis.scrollTo(targetId, { duration: 1.5 });
      } else {
        // Fallback if Lenis isn't available
        const element = document.querySelector(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push(`/${targetId}`);
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const scrollDownVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingCircles = [
    { size: "w-64 h-64", x: "-5%", y: "15%", delay: 0, duration: 8 },
    { size: "w-96 h-96", x: "60%", y: "10%", delay: 1, duration: 10 },
    { size: "w-48 h-48", x: "80%", y: "60%", delay: 2, duration: 12 },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      {/* Floating background elements */}
      {floatingCircles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/10  blur-3xl ${circle.size}`}
          style={{ left: circle.x, top: circle.y }}
          animate={{
            y: ["0%", "25%", "0%"],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            delay: circle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 text-center z-10"
      >
        <motion.div
          className="inline-block px-4 py-2 mb-4 text-sm font-medium dark:text-white text-gray-800  dark:bg-[#11101C] bg-[#dde4f0] rounded-full shadow dark:shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Frontend Developer & UI Designer
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold font-montserrat mb-6 bg-clip-text text-transparent bg-gradient-to-r dark:from-white dark:to-gray-400 from-gray-800 to-gray-500"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          Crafting Sleek & Practical
          <br />
          Web Experiences
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          Hi! I'm Mohammed Kromah, I create stunning, high-performance digital
          experiences that blend creativity with functionality.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
        >
          <Button
            variant="gradient"
            size="lg"
            className="min-w-[160px]"
            onClick={(e) => handleNavigation(e, "#projects")}
          >
            View Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[160px]"
            onClick={(e) => handleNavigation(e, "#contact")}
          >
            Get in Touch
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial="hidden"
          animate="visible"
          variants={scrollDownVariants}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <ArrowDown className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold font-montserrat tracking-tight mb-4 block"
            >
              <span className="text-primary">MOH.</span>
              <span className="text-primary/60">.</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Creating beautiful, functional web experiences that blend
              creativity with technical excellence.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/Eyalhamork"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 interactive"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/layee-kromah/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 interactive"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Shortcuts</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 interactive"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 interactive"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 interactive"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 interactive"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">lhkromah@gmail.com</li>
              <li className="text-muted-foreground">
                Barnesville Monrovia, Liberia
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-border/30 mt-12 pt-6 text-center text-sm text-muted-foreground"
        >
          <p>
            © {new Date().getFullYear()} Mohammed Kromah Portfolio. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

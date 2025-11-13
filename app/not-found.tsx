"use client";

import { motion } from "framer-motion";
import { Home, SearchX, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />

        {Array.from({ length: 20 }).map((_, i) => (
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

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <SearchX className="w-10 h-10 text-blue-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
        >
          Oops! The page you&apos;re looking for seems to have wandered off into
          the digital void. Let&apos;s get you back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center gap-2 px-6 py-3 border border-blue-500/50 text-foreground rounded-lg font-medium transition-all duration-300 hover:bg-blue-500/10 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          Error Code: 404 | Page does not exist
        </motion.p>
      </div>
    </div>
  );
}

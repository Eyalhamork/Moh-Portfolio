"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Coffee,
  Zap,
  Github,
  LucideIcon,
} from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { useTheme } from "next-themes";

// Type definitions
interface NavItem {
  name: string;
  href: string;
  route: string;
  icon: LucideIcon;
  color: string;
}

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isHomePage: boolean;
}

interface MobileNavItemProps {
  item: NavItem;
  index: number;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isHomePage: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "#hero",
    route: "/",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "About",
    href: "#about",
    route: "/",
    icon: Coffee,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Projects",
    href: "#projects",
    route: "/",
    icon: Code2,
    color: "from-green-500 to-emerald-500",
  },
];

// Scroll progress component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 origin-left z-50"
      style={{
        width: `${scrollProgress}%`,
        background: "linear-gradient(90deg, #3b82f6, #06b6d4, #10b981)",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
};

// Activity indicator component
const ActivityIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", checkOnlineStatus);
    window.addEventListener("offline", checkOnlineStatus);

    return () => {
      window.removeEventListener("online", checkOnlineStatus);
      window.removeEventListener("offline", checkOnlineStatus);
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={cn(
          "w-2 h-2 rounded-full",
          isOnline ? "bg-green-500" : "bg-red-500"
        )}
        animate={{
          scale: isOnline ? [1, 1.2, 1] : 1,
          opacity: isOnline ? [1, 0.7, 1] : 0.5,
        }}
        transition={{
          duration: 2,
          repeat: isOnline ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {isOnline ? "Available" : "Offline"}
      </span>
    </div>
  );
};

// Version indicator
const VersionIndicator = () => {
  const version = "v2.4.1";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-xs text-primary font-mono"
    >
      <Github size={12} />
      {version}
    </motion.div>
  );
};

// Navigation item component for better icon rendering
const NavItem = ({ item, isActive, onClick, isHomePage }: NavItemProps) => {
  const IconComponent = item.icon;

  return (
    <motion.div className="relative">
      <Link
        href={isHomePage ? item.href : `${item.route}${item.href}`}
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-all duration-300 px-3 py-2 rounded-full relative group",
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-primary"
        )}
        onClick={onClick}
      >
        <motion.div
          className="relative flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div
            className={`bg-gradient-to-r ${item.color} p-1 rounded-md shadow-sm`}
          >
            <IconComponent size={14} className="text-white" />
          </div>
        </motion.div>
        {item.name}

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary/5 rounded-full border border-primary/20"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.6,
            }}
          />
        )}

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      </Link>
    </motion.div>
  );
};

// Mobile navigation item component
const MobileNavItem = ({
  item,
  index,
  isActive,
  onClick,
  isHomePage,
}: MobileNavItemProps) => {
  const IconComponent = item.icon;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={isHomePage ? item.href : `${item.route}${item.href}`}
        className={cn(
          "flex items-center gap-3 text-base font-medium py-3 px-4 rounded-xl transition-all duration-300 group relative",
          isActive
            ? "text-primary bg-primary/10 border border-primary/20"
            : "text-foreground hover:text-primary hover:bg-primary/5"
        )}
        onClick={onClick}
      >
        <motion.div
          className="relative flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <div
            className={`bg-gradient-to-r ${item.color} p-1 rounded-md shadow-sm`}
          >
            <IconComponent size={16} className="text-white" />
          </div>
        </motion.div>
        {item.name}

        {isActive && (
          <motion.div
            className="ml-auto w-2 h-2 rounded-full bg-primary"
            layoutId="mobileActiveIndicator"
            transition={{ type: "spring", bounce: 0.3 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on homepage
  const isHomePage = pathname === "/";

  // This effect runs once after component mounts to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only initialize Lenis on homepage
    if (isHomePage) {
      const lenisInstance = new Lenis({});
      setLenis(lenisInstance);

      const raf = (time: number) => {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      return () => lenisInstance.destroy();
    }
  }, [isHomePage]);

  // Enhanced scroll handler with section detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      if (isHomePage) {
        const sections = ["hero", "about", "projects"];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu

    if (isHomePage) {
      // If we're on homepage, use smooth scroll
      if (lenis) {
        lenis.scrollTo(item.href, { duration: 1.5 });
      } else {
        // Fallback if Lenis isn't available
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push(`${item.route}${item.href}`);
    }
  };

  const handleContactNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isHomePage) {
      // If we're on homepage, use smooth scroll
      if (lenis) {
        lenis.scrollTo("#contact", { duration: 1.5 });
      } else {
        const element = document.querySelector("#contact");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // If we're on another page, navigate to homepage with contact hash
      router.push("/#contact");
    }
  };

  // Enhanced theme toggle with custom animation
  const themeIcon = mounted ? (
    <motion.div
      key={theme}
      initial={{ rotate: -180, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      exit={{ rotate: 180, scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
    >
      {theme === "dark" ? (
        <Sun size={18} className="text-yellow-500" />
      ) : (
        <Moon size={18} className="text-slate-700" />
      )}
    </motion.div>
  ) : null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-background/70 backdrop-blur-xl py-2 shadow-lg border-b border-border/50"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Enhanced Logo with gradient and animation */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-2xl font-bold font-montserrat tracking-tight group"
            >
              <motion.span
                className="bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent"
                whileHover={{ backgroundPosition: "200% center" }}
                transition={{ duration: 0.5 }}
              >
                MOH
              </motion.span>
              <motion.span
                className="text-primary/60 group-hover:text-primary transition-colors"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              >
                .
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation with enhanced indicators */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  isHomePage={isHomePage}
                  onClick={(e) => handleNavigation(e, item)}
                />
              );
            })}

            <div className="flex items-center gap-4 ml-4">
              {/* Activity Indicator */}
              <ActivityIndicator />

              {/* Version Indicator */}
              <VersionIndicator />

              {/* Enhanced Theme Toggle */}
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(251, 191, 36, 0.1)"
                      : "rgba(71, 85, 105, 0.1)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-primary/5 border border-primary/10 transition-all duration-300 relative overflow-hidden group"
                aria-label="Toggle theme"
              >
                <div className="relative z-10">
                  <AnimatePresence mode="wait" initial={false}>
                    {themeIcon}
                  </AnimatePresence>
                </div>

                {/* Background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Enhanced CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="gradient"
                  size="sm"
                  className="ml-2 relative overflow-hidden group shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  onClick={handleContactNavigation}
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ x: 2 }}
                  >
                    Get in Touch
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </motion.span>

                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "linear",
                    }}
                  />
                </Button>
              </motion.div>
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Activity Indicator */}
            <ActivityIndicator />

            {/* Mobile Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {themeIcon}
              </AnimatePresence>
            </motion.button>

            {/* Enhanced Menu Toggle */}
            <motion.button
              className="p-2 rounded-full hover:bg-primary/10 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <ScrollProgress />
      </motion.header>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="md:hidden fixed top-[72px] left-4 right-4 z-40 bg-background/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-border/50 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, index) => {
                    const isActive =
                      activeSection === item.href.replace("#", "");
                    return (
                      <MobileNavItem
                        key={item.name}
                        item={item}
                        index={index}
                        isActive={isActive}
                        isHomePage={isHomePage}
                        onClick={(e) => handleNavigation(e, item)}
                      />
                    );
                  })}

                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-4 border-t border-border/50"
                  >
                    <Button
                      variant="gradient"
                      size="sm"
                      className="w-full relative overflow-hidden group"
                      onClick={handleContactNavigation}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Get in Touch
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          →
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, Code, Server, Palette, Terminal } from "lucide-react";

// Custom SVG components for tech logos with official colors
const TechIcon = ({ type, size = 20 }: { type: string; size?: number }) => {
  const iconStyle = { width: size, height: size };

  switch (type) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.5"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.5"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.5"
            fill="none"
            stroke="#61DAFB"
            strokeWidth="1"
            transform="rotate(120 12 12)"
          />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <circle cx="12" cy="12" r="10" fill="#000000" />
          <path
            d="M18.665 5.521A9.45 9.45 0 0 0 12 2.25c-2.54 0-4.863 1-6.563 2.625L15.75 18.188a9.45 9.45 0 0 0 2.915-12.667Z"
            fill="#ffffff"
          />
          <path d="M9.75 17.25 15 9.75H13.5L9 16.5v.75Z" fill="#000000" />
          <path d="M16.5 6.75v10.5L15 15.75V8.25h1.5Z" fill="#000000" />
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#FFCA28"
            d="M5.803 16.945L7.336 7.709a.382.382 0 0 1 .71-.154L12 14.544l-6.197 2.401z"
          />
          <path
            fill="#FFA000"
            d="M16.197 16.945L14.664 3.291a.382.382 0 0 0-.71-.154L12 14.544l4.197 2.401z"
          />
          <path
            fill="#FF6F00"
            d="M12 14.544L7.336 7.709 5.803 16.945 12 20 18.197 16.945 16.664 7.709 12 14.544z"
          />
          <path
            fill="#FF8F00"
            d="M12 14.544l4.197 2.401 1.533-9.236L12 14.544z"
          />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <g fill="#000000">
            <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412z" />
            <path d="M.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c-.085-.66-.139-1.333-.139-2.826zm1.134-.858h9.672c-.04-3.077-1.947-5.2-4.58-5.118-2.639-.081-4.67 2.041-5.092 5.118z" />
          </g>
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#06B6D4"
            d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z"
          />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#339933"
            d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z"
          />
          <path
            fill="#339933"
            d="M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187 c0-0.528,0.235-1.233,2.258-1.233c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141 c0.071,0,0.138-0.031,0.186-0.081c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076 c-2.508,0-4.004,1.058-4.004,2.833c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269 c0,0.983-0.789,1.402-2.642,1.402c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137 c-0.141,0-0.254,0.112-0.254,0.253c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"
          />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#4DB33D"
            d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z"
          />
          <path
            fill="#599636"
            d="M13.478 20.738c.042-.6.146-1.192.31-1.764.085-.297.154-.978.154-1.079l-.006-.004-.024-.008c-.01.004-.020.007-.03.012-.01.004-.019.01-.029.015l-.006.004c-.011.007-.021.014-.031.022-.01.007-.02.015-.029.023l-.006.005c-.01.008-.019.017-.028.026-.009.009-.018.018-.027.027l-.005.005c-.009.009-.017.019-.025.029-.008.01-.016.02-.024.031l-.004.005c-.008.01-.015.021-.022.032-.007.011-.014.022-.02.033l-.004.005c-.007.012-.013.024-.019.036-.006.012-.011.024-.016.037l-.003.005c-.005.013-.01.026-.014.04-.004.013-.008.026-.011.039l-.002.006c-.003.014-.006.028-.008.042-.002.014-.003.028-.004.042v.007c-.001.015-.001.03-.001.045 0 .015.001.03.002.045v.007c.001.015.003.029.005.043.002.014.005.028.008.042l.002.006c.004.014.008.027.013.04.005.014.01.027.016.04l.003.005c.006.013.012.025.019.037.007.012.014.023.021.034l.004.005c.007.011.015.022.023.032.008.01.016.021.025.031l.004.005c.009.01.018.019.027.028.009.009.019.018.029.026l.005.005c.01.008.021.016.032.023.01.007.021.014.032.021l.006.004c.011.007.022.013.033.019.011.006.023.011.034.016l.006.004c.012.005.024.009.036.013.012.004.024.008.037.011l.006.002c.013.003.026.006.04.008.014.002.028.003.042.004h.007c.015.001.03.001.045.001s.03 0 .045-.001h.007c.014-.001.028-.002.042-.004.014-.002.027-.005.04-.008l.006-.002c.013-.003.025-.007.037-.011.012-.004.024-.008.036-.013l.006-.004c.011-.005.023-.01.034-.016.011-.006.022-.012.033-.019l.006-.004c.011-.007.021-.014.032-.021.01-.007.021-.015.032-.023l.005-.005c.01-.008.02-.017.029-.026.009-.009.018-.018.027-.028l.004-.005c.009-.01.017-.02.025-.031.008-.01.016-.021.023-.032l.004-.005c.007-.011.014-.022.021-.034.007-.012.013-.024.019-.037l.003-.005c.006-.013.011-.026.016-.04.005-.013.009-.026.013-.04l.002-.006c.003-.014.006-.028.008-.042.002-.014.004-.028.005-.043v-.007c.001-.015.002-.03.002-.045 0-.015 0-.03-.001-.045v-.007c-.001-.014-.002-.028-.004-.042-.002-.014-.005-.028-.008-.042l-.002-.006c-.003-.013-.007-.026-.011-.039-.004-.014-.009-.027-.014-.04l-.003-.005c-.005-.013-.01-.025-.016-.037-.006-.012-.012-.024-.019-.036l-.004-.005c-.006-.011-.013-.022-.02-.033-.007-.011-.014-.022-.022-.032l-.004-.005c-.008-.01-.016-.021-.024-.031-.008-.01-.016-.02-.025-.029l-.005-.005c-.009-.009-.018-.018-.027-.027-.009-.009-.019-.017-.028-.026l-.006-.005c-.009-.008-.019-.016-.029-.023-.01-.008-.02-.015-.031-.022l-.006-.004c-.01-.005-.019-.011-.029-.015-.01-.005-.02-.008-.03-.012l-.024.008-.006.004s.069.782.154 1.079c.164.572.268 1.164.31 1.764z"
          />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <rect width="24" height="24" rx="2" fill="#3178C6" />
          <path
            fill="#ffffff"
            d="M12.773 18.368c.086 0 .161-.004.226-.014a1.47 1.47 0 00.174-.03c.051-.014.096-.027.135-.041.04-.014.071-.027.095-.04l.068-.04c.022-.014.04-.027.054-.04.014-.014.024-.025.03-.034.006-.008.01-.014.01-.019 0-.008-.004-.015-.013-.022a.15.15 0 00-.033-.018.169.169 0 00-.045-.01.24.24 0 00-.049-.003c-.022 0-.044.003-.067.01a.34.34 0 00-.067.021l-.061.03c-.02.011-.04.021-.062.03a.484.484 0 01-.065.022c-.023.005-.047.008-.073.008-.036 0-.07-.005-.1-.016a.251.251 0 01-.08-.045.215.215 0 01-.053-.071.217.217 0 01-.02-.096c0-.026.005-.05.014-.071.01-.022.024-.042.042-.061.019-.018.042-.035.069-.049.027-.014.058-.026.093-.037l.126-.038c.047-.014.093-.03.137-.049a.68.68 0 00.119-.063.335.335 0 00.087-.082.209.209 0 00.032-.104c0-.047-.01-.089-.032-.125a.29.29 0 00-.086-.094.409.409 0 00-.13-.058.56.56 0 00-.161-.02.775.775 0 00-.186.023.61.61 0 00-.164.067c-.047.029-.088.065-.122.109-.034.044-.057.095-.068.154h.159c.008-.033.02-.062.037-.088.017-.025.037-.047.062-.065.024-.018.053-.032.086-.041.033-.01.069-.014.109-.014.032 0 .06.004.086.013.025.008.047.02.065.035.018.015.032.033.042.054.01.021.015.044.015.069 0 .021-.004.04-.011.057-.008.018-.019.034-.034.048-.015.014-.034.027-.057.039-.023.012-.051.023-.083.033l-.11.034c-.04.012-.078.026-.114.041a.41.41 0 00-.096.055.244.244 0 00-.066.074.2.2 0 00-.024.098c0 .043.009.081.026.115.017.033.04.062.069.085.029.024.064.042.104.054.041.013.086.019.135.019zm-5.773-4.368v6h1.5v-4.5h2.5V10h-6.5v1.5h2.5z"
          />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#F05032"
            d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
          />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#F24E1E"
            d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"
          />
          <path
            fill="#A259FF"
            d="M8 16h4V8H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"
          />
          <path
            fill="#1ABCFE"
            d="M8 8h4V0H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z"
          />
          <path
            fill="#0ACF83"
            d="M12 8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4h-4v8z"
          />
          <path
            fill="#FF7262"
            d="M16 12c0 2.208 1.792 4 4 4s4-1.792 4-4-1.792-4-4-4-4 1.792-4 4z"
          />
        </svg>
      );
    case "adobexd":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <rect width="24" height="24" rx="4" fill="#FF61F6" />
          <g fill="white">
            <path d="M8.5 6L6 15h1.8l.5-1.5h2.4l.5 1.5H13L10.5 6h-2zm-.2 6l.7-2.1.7 2.1H8.3z" />
            <path d="M16 8.5l-2 3 2 3.5h-1.8l-1.2-2-1.2 2H10l2-3.5-2-3h1.8l1.2 2 1.2-2H16z" />
          </g>
        </svg>
      );
    case "photoshop":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <rect width="24" height="24" rx="4" fill="#001E36" />
          <g fill="#31C5F0">
            <path d="M7 7h2.5c1.38 0 2.5 1.12 2.5 2.5S10.88 12 9.5 12H7v3H5.5V7H7zm0 1.5v2h2.5c.55 0 1-.45 1-1s-.45-1-1-1H7z" />
            <path d="M14.5 10c1.38 0 2.5.67 2.5 1.5 0 .83-.67 1.5-1.5 1.75L17 16h-1.8l-1-1.5h-1V16H12v-6h2.5zm0 1.5h-1v1h1c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z" />
          </g>
        </svg>
      );
    case "illustrator":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <rect width="24" height="24" rx="4" fill="#FF9A00" />
          <g fill="white">
            <path d="M8.5 7L6 15h1.8l.5-1.5h2.4l.5 1.5H13L10.5 7h-2zm-.2 5l.7-2.1.7 2.1H8.3z" />
            <path d="M16 9v6h-1.5V9H16zm0-2v1.5h-1.5V7H16z" />
          </g>
        </svg>
      );
    case "framer":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#0055FF"
            d="M4 1h16v7.33H12L4 1zm0 7.33h8L20 16H4V8.33zm0 7.67h8v7L4 16z"
          />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <path
            fill="#3ECF8E"
            d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12V23.64a.396.396 0 0 0 .716.233L21.797 11.612l.401-.562a1.04 1.04 0 0 0-.836-1.659z"
          />
        </svg>
      );
    case "cicd":
      return (
        <svg viewBox="0 0 24 24" style={iconStyle}>
          <g fill="#4CAF50">
            <circle cx="6" cy="12" r="2" />
            <circle cx="12" cy="6" r="2" />
            <circle cx="12" cy="18" r="2" />
            <circle cx="18" cy="12" r="2" />
            <path d="M8 12h2m2-4v2m0 4v2m2-6h2" />
            <path
              strokeWidth="2"
              stroke="#4CAF50"
              fill="none"
              d="M8 12l2-4m2 10l2-4"
            />
          </g>
        </svg>
      );
    default:
      return (
        <div
          style={iconStyle}
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold"
        >
          {type.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
    ],
    icon: Code,
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "Supabase", icon: "supabase" },
      { name: "Firebase", icon: "firebase" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    icon: Server,
  },
  {
    category: "Design",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Adobe XD", icon: "adobexd" },
      { name: "Photoshop", icon: "photoshop" },
      { name: "Illustrator", icon: "illustrator" },
      { name: "UI/UX", icon: "default" },
    ],
    icon: Palette,
  },
  {
    category: "Other",
    items: [
      { name: "TypeScript", icon: "typescript" },
      { name: "Git", icon: "git" },
      { name: "CI/CD", icon: "cicd" },
    ],
    icon: Terminal,
  },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 1]);

  // Card hover animation variants
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.7)",
      transition: {
        y: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
  };

  // Skill item hover animations
  const skillItemVariants = {
    initial: { x: 0 },
    hover: { x: 5, transition: { duration: 0.2 } },
  };

  return (
    <section id="about" ref={ref} className="py-4 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-32 items-center"
        >
          <div className="order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl font-bold font-montserrat mb-6 text-foreground"
            >
              About Me & My Expertise
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground mb-6"
            >
              I'm a passionate Web Developer and UI/UX Designer with a strong
              focus on creating beautiful, functional, and user-centered digital
              experiences. With expertise in modern web technologies and design
              principles, I bridge the gap between aesthetics and functionality.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground mb-8"
            >
              My approach combines technical excellence with creative
              problem-solving, resulting in digital products that not only look
              stunning but also deliver exceptional user experiences and
              business value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                variant="gradient"
                size="lg"
                className="interactive"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border dark:border-[#151323] border-gray-200 shadow-xl dark:shadow-black/30 shadow-gray-200/60"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/web2.png"
                  alt="Developer workspace"
                  fill
                  className="object-cover filter dark:filter-none grayscale dark:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-30 dark:opacity-10" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 lg:mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * groupIndex }}
                viewport={{ once: true }}
                whileHover="hover"
                variants={cardVariants}
                className="dark:bg-[#0D0E13]/40 bg-gray-50/90 backdrop-blur-sm border dark:border-[#1b182d] border-gray-200 rounded-xl p-6 relative overflow-hidden group"
              >
                {/* Glow effect on hover */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-primary/10 opacity-40 group-hover:animate-shine" />

                {/* Card header with larger icon */}
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-bold bg-clip-text dark:text-slate-50 text-gray-800">
                    {skillGroup.category}
                  </h4>
                  <div className="text-primary/80 group-hover:text-primary transition-colors duration-300">
                    {skillGroup.icon && <skillGroup.icon size={32} />}
                  </div>
                </div>

                <ul className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <motion.li
                      key={skill.name}
                      className="flex items-center group/item"
                      variants={skillItemVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {/* Tech stack icon with official brand colors */}
                      <div className="mr-3 text-lg flex items-center justify-center w-6">
                        <TechIcon type={skill.icon} size={20} />
                      </div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

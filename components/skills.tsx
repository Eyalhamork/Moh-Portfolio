import { HoverEffect } from "@/components/ui/card-hover-effect";

export const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "Vue.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Supabase", "Firebase", "MongoDB"] },
  { category: "Design", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "UI/UX"] },
  { category: "Other", items: ["TypeScript", "Git", "CI/CD", "Jest", "Cypress"] },
];

export default function Skills() {
  const formattedTechStack = techStack.flatMap(({ category, items }) =>
    items.map((item) => ({
      title: item,
      description: `A technology in the ${category} category.`,
      link: "#", // You can replace this with actual links if needed
    }))
  );

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={formattedTechStack} />
    </div>
  );
}

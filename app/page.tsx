import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
// Remove this line: import { CaseStudySection as CaseStudy } from "@/components/case-study";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Kromah",
  alternateName: "Moh Kromah",
  jobTitle: "Frontend Developer",
  description:
    "Experienced frontend and fullstack developer from West Africa specializing in Next.js, React, TypeScript, and modern web technologies.",
  url: "https://mohkromah.com",
  image: "https://mohkromah.com/images/web2.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monrovia",
    addressRegion: "Montserrado",
    addressCountry: "LR",
  },
  nationality: {
    "@type": "Country",
    name: "Liberia",
  },
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Full Stack Development",
    "UI/UX Design",
    "Web Development",
    "Mobile Money Integration",
    "Progressive Web Apps",
    "Supabase",
    "Firebase",
  ],
  knowsLanguage: ["English"],
  sameAs: [
    "https://github.com/Eyalhamork",
    "https://www.linkedin.com/in/layee-kromah",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Frontend Developer",
    occupationLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: "West Africa",
        addressCountry: ["LR", "GH"],
      },
    },
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "Available for remote work worldwide",
    },
  },
  offers: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Web Development Services",
      description:
        "Frontend and fullstack development services including React, Next.js, TypeScript, UI/UX design, and full-stack web applications.",
    },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        {/* <CaseStudy /> */}
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}

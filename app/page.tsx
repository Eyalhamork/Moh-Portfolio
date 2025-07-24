import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
// Remove this line: import { CaseStudySection as CaseStudy } from "@/components/case-study";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      {/* <CaseStudy /> */}
      <ContactSection />
      <Footer />
    </main>
  );
}

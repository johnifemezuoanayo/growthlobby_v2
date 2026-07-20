import ContactMeSection from "@/components/pages/ContactMeSection/ContactMeSection";
import AllDevProjects from "@/components/pages/ServicesPage/Development/AllDevProjects";
import AllProjectsHero from "@/components/pages/ServicesPage/Development/AllProjectsHero";


export default function DevelopmentProjects() {
  return (
    <>
      <AllProjectsHero />
      <AllDevProjects />
      <ContactMeSection />
    </>
  );
}

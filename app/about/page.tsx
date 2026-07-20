import AboutHero from "@/components/pages/AboutSections/AboutHero";
import CoreValues from "@/components/pages/AboutSections/CoreValueSection";
import LocationSection from "@/components/pages/AboutSections/LocationSection";
import RecordSection from "@/components/pages/AboutSections/RecordSection";
import ContactMeSection from "@/components/pages/ContactMeSection/ContactMeSection";
import ProjectSection from "@/components/pages/HomeProjectSection/HomeProjectSection";
import ProcessSection from "@/components/pages/ProcessSection/ProcessSection";
import ServiceSection from "@/components/pages/ServiceSection/ServiceSection";
import HomeTestimonialSection from "@/components/pages/TestimonialSection/HomeTestimonialSection";

export default function Home() {
  return (
    <>
      <AboutHero />
      <CoreValues />
      <RecordSection />
      <ProcessSection />
      <ServiceSection />
      <ProjectSection />
      <HomeTestimonialSection />
      <LocationSection /> 
      <ContactMeSection />
    </>
  );
}

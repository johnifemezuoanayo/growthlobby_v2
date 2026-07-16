import ContactMeSection from "./components/pages/ContactMeSection/ContactMeSection";
import HomeAboutSection from "./components/pages/HomeAboutSection/HomeAboutSection";
import HomeHeroSection from "./components/pages/HomeHeroSection/HomeHeroSection";
import HomePortfolioSection from "./components/pages/HomePortfolioSection/HomePortfolioSection";
import ProjectSection from "./components/pages/HomeProjectSection/HomeProjectSection";
import IntegrationSection from "./components/pages/IntegrationSection/IntegrationSection";
import ProcessSection from "./components/pages/ProcessSection/ProcessSection";
import ServiceSection from "./components/pages/ServiceSection/ServiceSection";
import TestimonialSection from "./components/pages/TestimonialSection/TestimonialSection";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomePortfolioSection />
      <HomeAboutSection />
      <ServiceSection />
      <ProjectSection />
      <ProcessSection />
      <TestimonialSection />
      <ContactMeSection />
      <IntegrationSection />
    </>
  );
}

import ContactMeSection from "@/components/pages/ContactMeSection/ContactMeSection";
import ProjectSection from "@/components/pages/HomeProjectSection/HomeProjectSection";
import DevFAQSection from "@/components/pages/ServicesPage/Development/DevFAQSection";
import DevHero from "@/components/pages/ServicesPage/Development/DevHero";
import DevPricingSection from "@/components/pages/ServicesPage/Development/DevPricingSection";
import WhatWeOfferSection from "@/components/pages/ServicesPage/Development/WhatWeOffer";
import WhoAmISection from "@/components/pages/ServicesPage/Development/WhoAmISection";
import WhyChooseUsSection from "@/components/pages/ServicesPage/Development/WhyChooseUs";
import ContactForm from "@/components/ui/ContactForm/ContactForm";

export default function DevelopmentServicePage() {
  return (
    <>
      <DevHero />
      <WhatWeOfferSection />
      <WhyChooseUsSection />
      <ProjectSection />
      <DevPricingSection />
      <WhoAmISection />
      <DevFAQSection />
      <ContactMeSection />
    </>
  );
}

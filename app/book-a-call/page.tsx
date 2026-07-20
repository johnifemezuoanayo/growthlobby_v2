import FAQSection from "@/components/pages/BookaCallFAQ.tsx/BookaCallFAQ";
import BookACallSection from "@/components/pages/BookACallSection/BookACallSection";
import ExpertSection from "@/components/pages/BookACallSection/ExpertSection";
import WhatToExpectSection from "@/components/pages/BookACallSection/WhyBookACall";
import DevFAQSection from "@/components/pages/ServicesPage/Development/DevFAQSection";
import TestimonialSection from "@/components/pages/TestimonialSection/TestimonialSection";


export default function BookACall() {
  return (
    <>
      <BookACallSection />
      <WhatToExpectSection />
      <ExpertSection />
      <TestimonialSection />
      <FAQSection />
    </>
  );
}

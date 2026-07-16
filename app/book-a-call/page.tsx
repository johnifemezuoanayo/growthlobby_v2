import BookACallSection from "../components/pages/BookACallSection/BookACallSection";
import WhatToExpectSection from "../components/pages/BookACallSection/WhyBookACall";
import ExpertSection from "../components/pages/BookACallSection/ExpertSection";
import TestimonialSection from "../components/pages/TestimonialSection/TestimonialSection";
import FAQSection from "../components/pages/BookaCallFAQ.tsx/BookaCallFAQ";

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

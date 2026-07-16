"use client";

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import ContactForm from "../../ui/ContactForm/ContactForm";
import { FloatingCallButton } from "./FloatingCallButton";
import { HeroBackground } from "./HeroBackground";
import { HeroCopy } from "./HeroCopy";
import { ScheduleModal } from "./ScheduleModal";
import type { FormData, FormErrors } from "./types";

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function HomeHeroSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const daysAhead = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index + 1);
        return date;
      }),
    [],
  );

  const handleGetInTouchClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => nameInputRef.current?.focus(), 800);
  };

  const handleFormChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (formErrors[name as keyof FormData]) {
      setFormErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject) errors.subject = "Please select a service subject";
    if (!formData.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setIsSubmitted(false);
  };

  const handleScheduleClose = () => {
    setIsScheduleModalOpen(false);
    setIsScheduled(false);
  };

  const handleScheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;

    setIsScheduled(true);
    window.setTimeout(() => {
      setIsScheduleModalOpen(false);
      setIsScheduled(false);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 1800);
  };

  return (
    <section className="relative isolate min-h-[120vh] overflow-x-hidden bg-[#060606] font-sans text-white selection:bg-brand-primary selection:text-black">
      <HeroBackground />

      <div className="relative z-20 flex min-h-screen flex-col">
        <main className="relative flex flex-grow items-center justify-center px-4 py-12 sm:px-8 md:py-20 lg:px-16">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <HeroCopy
              onGetInTouch={handleGetInTouchClick}
              onScheduleCall={() => setIsScheduleModalOpen(true)}
            />
            <ContactForm
              formRef={formRef}
              nameInputRef={nameInputRef}
              formData={formData}
              formErrors={formErrors}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              onChange={handleFormChange}
              onSubmit={handleFormSubmit}
              onReset={handleResetForm}
            />
          </div>
        </main>

        <ScheduleModal
          isOpen={isScheduleModalOpen}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          isScheduled={isScheduled}
          daysAhead={daysAhead}
          onClose={handleScheduleClose}
          onSelectDate={setSelectedDate}
          onSelectTime={setSelectedTime}
          onSubmit={handleScheduleSubmit}
        />
      </div>
    </section>
  );
}

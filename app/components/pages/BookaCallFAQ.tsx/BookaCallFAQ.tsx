"use client"

/* eslint-disable react-hooks/set-state-in-effect */
import React, { useRef, useState, useEffect, ReactNode } from "react";
import { Plus, Minus } from "lucide-react";
import FAQSvg from "../../Icons/FAQSvg";

/* ---------------------------------------------------------------------- */
/*  Scroll-reveal primitive                                               */
/* ---------------------------------------------------------------------- */

function useInView(
  threshold: number = 0.15,
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

function Reveal({ children, delay = 0, y = 24, className = "" }: RevealProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Tokens                                                                */
/* ---------------------------------------------------------------------- */

interface ColorTokens {
  bg: string;
  heading: string;
  body: string;
  badgeBg: string;
  badgeText: string;
  badgeDot: string;
  divider: string;
  toggleBg: string;
  toggleIcon: string;
}

const COLORS: ColorTokens = {
  bg: "#FFFFFF",
  heading: "#1E2733",
  body: "#7A8593",
  badgeBg: "#DDE5EC",
  badgeText: "#4B5768",
  badgeDot: "#4B7BAA",
  divider: "#E7EAEE",
  toggleBg: "#C0ED0B",
  toggleIcon: "#0e0d0d",
};

const FONT: string =
  "'Plus Jakarta Sans', 'DM Sans', ui-sans-serif, system-ui, sans-serif";

/* ---------------------------------------------------------------------- */
/*  Data                                                                  */
/* ---------------------------------------------------------------------- */

interface FAQItemData {
  question: string;
  answer: string;
}

const FAQS: FAQItemData[] = [
  {
    question: "How do I book a call?",
    answer:
      "Booking a call is simple—just choose a time that works for you on the calendar, fill in your name, email, and a few details about your needs, then hit submit. You'll receive a confirmation email with the call details.",
  },
  {
    question: "What can I expect from the call?",
    answer:
      "We'll walk through your goals, current site (if you have one), and give you a clear picture of how we can help—no pressure, just a straightforward conversation.",
  },
  {
    question: "How long is the call?",
    answer:
      "Calls typically run 20–30 minutes, enough time to cover your project without eating up your whole day.",
  },
  {
    question: "Is the call free?",
    answer:
      "Yes, the initial call is completely free with no obligation to move forward afterward.",
  },
  {
    question: "What happens after the call?",
    answer:
      "If it's a good fit, we'll send over a proposal and timeline. If not, you'll still walk away with a few useful pointers for your site.",
  },
  {
    question: "Do I need to prepare anything?",
    answer:
      "Not really—just come with your goals in mind. If you have examples of sites you like or existing brand assets, feel free to share them beforehand.",
  },
];

/* ---------------------------------------------------------------------- */
/*  Accordion item                                                        */
/* ---------------------------------------------------------------------- */

interface FAQItemProps {
  item: FAQItemData;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  delay: number;
}

function FAQItem({
  item,
  isOpen,
  onToggle,
  isLast,
  delay,
}: FAQItemProps) {
  return (
    <Reveal delay={delay} y={16}>
      <div
        style={{
          borderBottom: isLast ? "none" : `1px solid ${COLORS.divider}`,
        }}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left"
          aria-expanded={isOpen}
        >
          <span
            className="text-lg font-medium sm:text-xl"
            style={{ color: COLORS.heading }}
          >
            {item.question}
          </span>
          <span
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300"
            style={{ backgroundColor: COLORS.toggleBg }}
          >
            {isOpen ? (
              <Minus size={16} color={COLORS.toggleIcon} />
            ) : (
              <Plus size={16} color={COLORS.toggleIcon} />
            )}
          </span>
        </button>

        <div
          className="grid transition-all duration-300 ease-out"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="overflow-hidden">
            <p
              className="max-w-xl pb-6 text-sm leading-relaxed sm:text-base"
              style={{ color: COLORS.body }}
            >
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className="w-full px-6 py-20 sm:py-28"
      style={{ backgroundColor: COLORS.bg, fontFamily: FONT }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-20">
        {/* left column */}
        <div>
          <FAQSvg />

          <Reveal delay={0.1}>
            <h2
              className="mt-6 text-4xl font-medium leading-tight sm:text-5xl"
              style={{ color: COLORS.heading }}
            >
              Ask Us Anything
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="mt-4 max-w-xs text-sm leading-relaxed sm:text-base"
              style={{ color: COLORS.body }}
            >
              Have a question? Find quick answers below or contact us for more
              details.
            </p>
          </Reveal>
        </div>

        {/* right column — accordion */}
        <div>
          {FAQS.map((item: FAQItemData, i: number) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              isLast={i === FAQS.length - 1}
              delay={0.1 + i * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

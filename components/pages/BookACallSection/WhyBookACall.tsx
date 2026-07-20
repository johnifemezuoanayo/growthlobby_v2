/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { Target, Lightbulb, Share2, LucideIcon } from "lucide-react";
import WhatWeOfferSvg from "../../Icons/WhatWeOfferSvg";

/* ---------------------------------------------------------------------- */
/*  Scroll-reveal primitive                                               */
/* ---------------------------------------------------------------------- */

function useInView(
  threshold: number = 0.15,
): [React.RefObject<HTMLDivElement | null>, boolean] {
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
  iconBoxBg: string;
  iconBoxBorder: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  badgeDot: string;
}

const COLORS: ColorTokens = {
  bg: "#FFFFFF",
  heading: "#1E2733",
  body: "#7A8593",
  iconBoxBg: "#f6f7f3",
  iconBoxBorder: "#e7eaee00",
  icon: "#9aa848",
  badgeBg: "#DDE5EC",
  badgeText: "#4B5768",
  badgeDot: "#4B7BAA",
};

const FONT: string =
  "'Plus Jakarta Sans', 'DM Sans', ui-sans-serif, system-ui, sans-serif";

/* ---------------------------------------------------------------------- */
/*  Data                                                                  */
/* ---------------------------------------------------------------------- */

interface Feature {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    Icon: Target,
    title: "Personalized Strategy",
    body: "We'll discuss your business goals, target audience, and how a custom Squarespace website can elevate your brand.",
  },
  {
    Icon: Lightbulb,
    title: "Expert Insights",
    body: "Get actionable advice on design, functionality, & conversions to maximize your website's performance.",
  },
  {
    Icon: Share2,
    title: "Clear Next Steps",
    body: "No fluff—just a roadmap tailored to your needs, so you know exactly how we'll bring your vision to life.",
  },
];

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

export default function WhatToExpectSection() {
  return (
    <section
      className="w-full lg:px-0 px-6  w-full py-20 sm:py-28"
      style={{ backgroundColor: COLORS.bg, fontFamily: FONT }}
    >
      <div className="mx-auto max-w-7xl">
        <WhatWeOfferSvg />

        <Reveal delay={0.1}>
          <h2
            className="mt-6 text-4xl font-medium leading-tight sm:text-5xl"
            style={{ color: COLORS.heading }}
          >
            What To Expect
            <br />
            On The Call
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {FEATURES.map(({ Icon, title, body }: Feature, i: number) => (
            <Reveal key={title} delay={0.15 + i * 0.1} y={30}>
              <div
                className="flex h-16 w-16 items-center justify-center rounded-sm border"
                style={{
                  backgroundColor: COLORS.iconBoxBg,
                  borderColor: COLORS.iconBoxBorder,
                }}
              >
                <Icon size={24} color={COLORS.icon} strokeWidth={1.75} />
              </div>

              <h3
                className="mt-6 text-2xl font-medium"
                style={{ color: COLORS.heading }}
              >
                {title}
              </h3>
              <p
                className="mt-3 max-w-xs text-sm leading-relaxed"
                style={{ color: COLORS.body }}
              >
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

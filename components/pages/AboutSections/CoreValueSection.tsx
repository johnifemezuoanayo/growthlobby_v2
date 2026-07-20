"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Trophy, Heart, Plus, Minus } from "lucide-react";
import CoreValueSVG from "../../Icons/CoreValueSVG";

export default function CoreValues() {
  const [activeId, setActiveId] = useState<string | null>("val-1");

  const items= [
    {
      id: "val-1",
      category: "Innovation and Adaptability",
      title: "Innovation and Adaptability",
      description:
        "We embrace change and continuously evolve, ensuring our solutions stay ahead in a dynamic world. Every digital landscape presents unique obstacles, and our commitment to forward-thinking methodologies ensures your platform scales gracefully as you grow.",
    },
    {
      id: "val-2",
      category: "Quality and Consistency",
      title: "Quality and Consistency",
      description:
        "We hold ourselves to the highest standards, delivering meticulous, pixel-perfect results that stand the test of time. Quality is not a final milestone; it is a fundamental approach applied to every line of styling, content outline, and visual asset.",
    },
    {
      id: "val-3",
      category: "Authentic Connections",
      title: "Authentic Connections",
      description:
        "We build open, honest partnerships grounded in clear communication, shared goals, and mutual trust. We treat your digital challenges as our own, establishing a foundation that makes collaborating a productive and enjoyable journey.",
    },
  ];

  const handleToggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "val-1":
        return <Sparkles className="h-5 w-5 text-zinc-700" />;
      case "val-2":
        return <Trophy className="h-5 w-5 text-zinc-700" />;
      case "val-3":
        return <Heart className="h-5 w-5 text-zinc-700" />;
      default:
        return <Sparkles className="h-5 w-5 text-zinc-700" />;
    }
  };

  return (
    <section
      id="core-values-section"
      className="relative bg-white text-zinc-950 py-20 sm:py-28 px-4 sm:px-0  overflow-hidden border-b border-zinc-100"
    >
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and Tag */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-5 lg:sticky lg:top-12">
          {/* Green Tag */}
          <CoreValueSVG />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.15] font-sans">
            Core Values That Shape Every Project and Partnership
          </h2>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7 w-full divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {items.map((item) => {
            const isOpen = activeId === item.id;
            return (
              <div
                key={item.id}
                id={`accordion-item-${item.id}`}
                className="py-6 sm:py-8 transition-colors duration-200"
              >
                {/* Accordion Header */}
                <button
                  id={`accordion-trigger-${item.id}`}
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-5 pr-4">
                    {/* Icon container */}
                    <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-50 border border-zinc-200/60 group-hover:bg-zinc-100 transition-colors">
                      {getIcon(item.id)}
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight group-hover:text-zinc-700 transition-colors">
                      {item.title}
                    </span>
                  </div>

                  {/* Plus / Minus Circular Indicator */}
                  <div
                    className={`flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full border ${
                      isOpen
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-300 text-zinc-500 group-hover:border-zinc-800"
                    } transition-all duration-300`}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Content with Height/Opacity Animation */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`accordion-panel-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 sm:pt-5 pl-14 sm:pl-17 pr-4">
                        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

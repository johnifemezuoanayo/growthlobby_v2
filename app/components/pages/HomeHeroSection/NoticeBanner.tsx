"use client";

import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type NoticeBannerProps = {
  isOpen: boolean;
  onClose: () => void;
  onGetInTouch: () => void;
};

export function NoticeBanner({
  isOpen,
  onClose,
  onGetInTouch,
}: NoticeBannerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-between border-b border-neutral-800/40 bg-[#0b0c0b] px-4 py-2 text-xs sm:text-sm"
        >
          <div className="mx-auto flex flex-wrap items-center justify-center gap-2 pr-8">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-primary" />
            </span>
            <span className="font-light text-neutral-400">
              Looking for a new look for your website?
            </span>
            <button
              onClick={onGetInTouch}
              className="flex cursor-pointer items-center gap-0.5 font-medium bg-brand-primary text-xs text-black px-2 py-1 rounded-full hover:underline"
            >
              Get In Touch Now <ArrowRight className="size-3.5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="absolute right-3 cursor-pointer p-1 text-neutral-500 transition-colors hover:text-white"
            aria-label="Close notification"
          >
            <X className="size-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

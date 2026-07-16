"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export function FloatingCallButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/book-a-call"
        className="flex cursor-pointer items-center gap-3 rounded-full border border-neutral-100 bg-white py-2.5 pl-2.5 pr-6 text-black shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-[1.04]"
      >
        <span className="relative flex size-10 rounded-full overflow-hidden items-center justify-center rounded-full border-2 border-brand-primary bg-neutral-950 text-xs font-bold text-white shadow-sm">
          <Image src="/images/me.png" width={200} height={200} alt="John Ifemezuo" className="" />
        </span>
        <span className="text-left">
          <span className="flex items-center gap-1 text-xs font-extrabold tracking-tight text-neutral-900">
            Book A Call
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
          </span>
          <span className="block text-[10px] font-medium text-neutral-500">
            Get Started today
          </span>
        </span>
        <ArrowRight className="ml-1 size-4 text-neutral-400" />
      </Link>
    </motion.div>
  );
}

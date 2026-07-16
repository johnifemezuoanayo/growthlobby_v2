"use client"

/* eslint-disable react-hooks/set-state-in-effect */
import React, { useRef, useState, useEffect, ReactNode } from "react";
import {
  Triangle,
  Zap,
  ShoppingBag,
  NotebookText,
  X as XIcon,
  Package,
  Asterisk,
  Share2,
  Diamond,
  BarChart3,
  Timer,
  Flame,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";

/* ---------------------------------------------------------------------- */
/*  Scroll-reveal primitives                                              */
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
  frameMark: string;
  dot: string;
  line: string;
  nodeBg: string;
  nodeBorder: string;
  hubBorder: string;
  hubIcon: string;
}

const COLORS: ColorTokens = {
  bg: "#FFFFFF",
  heading: "#181C10",
  body: "#5B5F53",
  badgeBg: "#DAD9CB",
  badgeText: "#2B2E20",
  frameMark: "#8C9080",
  dot: "#E6E6DD",
  line: "#D9DACE",
  nodeBg: "#FFFFFF",
  nodeBorder: "#E9E9E1",
  hubBorder: "#A9AEA0",
  hubIcon: "#33372A",
};

const FONT: string =
  "'Plus Jakarta Sans', 'DM Sans', ui-sans-serif, system-ui, sans-serif";

/* ---------------------------------------------------------------------- */
/*  Node data — percentage positions within the diagram box               */
/*  bendX: horizontal elbow stop before diagonalling into the hub         */
/* ---------------------------------------------------------------------- */

interface Node {
  Icon?: LucideIcon;
  label?: string;
  color: string;
  x: number;
  y: number;
  bendX?: number;
}

const HUB = { x: 50, y: 54 };

const NODES: Node[] = [
  // left outer
  { Icon: Triangle, color: "#2E6BE5", x: 22.5, y: 16, bendX: 34 },
  { Icon: ShoppingBag, color: "#3FA847", x: 25, y: 42, bendX: 39 },
  { Icon: XIcon, color: "#2E7DE0", x: 28, y: 66, bendX: 38 },
  { Icon: Asterisk, color: "#E0574B", x: 22.5, y: 91, bendX: 38 },
  // left inner
  { Icon: Zap, color: "#39B24A", x: 34, y: 16 },
  { Icon: NotebookText, color: "#2B2B2B", x: 39, y: 45 },
  { Icon: Package, color: "#D97757", x: 38, y: 83 },
  // right outer
  { Icon: Share2, color: "#E0632E", x: 77.5, y: 16, bendX: 66 },
  { Icon: Diamond, color: "#4C7BF0", x: 77, y: 42, bendX: 61 },
  { Icon: BarChart3, color: "#E08A2E", x: 72, y: 66, bendX: 62 },
  { Icon: Flame, color: "#E0A82E", x: 77, y: 91, bendX: 62 },
  // right inner
  { label: "[w", color: "#2B2B2B", x: 61.5, y: 45 },
  { label: "S", color: "#5B4FD6", x: 75, y: 42 },
  { Icon: Timer, color: "#4C6BF0", x: 67.5, y: 91 },
];

/* ---------------------------------------------------------------------- */
/*  Corner marks (reused badge decoration)                                */
/* ---------------------------------------------------------------------- */

function CornerMarks() {
  const markStyle: React.CSSProperties = {
    position: "absolute",
    fontSize: 12,
    lineHeight: "10px",
    color: COLORS.frameMark,
  };
  return (
    <>
      <span style={{ ...markStyle, top: -6, left: -6 }}>+</span>
      <span style={{ ...markStyle, top: -6, right: -6 }}>+</span>
      <span style={{ ...markStyle, bottom: -6, left: -6 }}>+</span>
      <span style={{ ...markStyle, bottom: -6, right: -6 }}>+</span>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/*  Connector line — draws itself in once the diagram is in view          */
/* ---------------------------------------------------------------------- */

function ConnectorPath({
  node,
  inView,
  delay,
}: {
  node: Node;
  inView: boolean;
  delay: number;
}) {
  const d = node.bendX
    ? `M ${node.x} ${node.y} L ${node.bendX} ${node.y} L ${HUB.x} ${HUB.y}`
    : `M ${node.x} ${node.y} L ${HUB.x} ${HUB.y}`;

  return (
    <path
      d={d}
      fill="none"
      stroke={COLORS.line}
      strokeWidth={0.25}
      pathLength={1}
      style={{
        strokeDasharray: 1,
        strokeDashoffset: inView ? 0 : 1,
        transition: `stroke-dashoffset 1s ease ${delay}s`,
      }}
    />
  );
}

/* ---------------------------------------------------------------------- */
/*  Icon node                                                             */
/* ---------------------------------------------------------------------- */

function IconNode({ node, delay }: { node: Node; delay: number }) {
  const [ref, inView] = useInView(0.1);
  const { Icon, label, color, x, y } = node;

  return (
    <div
      ref={ref}
      className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-sm sm:h-12 sm:w-12"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: COLORS.nodeBg,
        borderColor: COLORS.nodeBorder,
        opacity: inView ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${inView ? 1 : 0.6})`,
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s cubic-bezier(.34,1.56,.64,1) ${delay}s`,
      }}
    >
      {Icon ? (
        <Icon size={16} color={color} strokeWidth={2} />
      ) : (
        <span className="text-sm font-bold" style={{ color }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

export default function IntegrationSection() {
  const [diagramRef, diagramInView] = useInView(0.1);

  return (
    <section
      className="w-full px-6 py-20 sm:py-28"
      style={{ backgroundColor: COLORS.bg, fontFamily: FONT }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal className="flex justify-center">
          <span className="relative inline-block">
            <CornerMarks />
            <span
              className="inline-block px-5 py-2 text-sm font-medium"
              style={{
                backgroundColor: COLORS.badgeBg,
                color: COLORS.badgeText,
              }}
            >
              Integrations
            </span>
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="mt-6 text-4xl font-medium sm:text-6xl"
            style={{ color: COLORS.heading }}
          >
            We handle all integrations
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base"
            style={{ color: COLORS.body }}
          >
            From intricate challenges to seamless execution, we&lsquo;ll integrate all
            your marketing tools and automations with your website.
          </p>
        </Reveal>
        <div>
        </div>
      <Image src="/images/integration.png" alt="john ifemezuo integration justify-center" width={1200} height={700} />
      </div>

      {/* diagram — horizontally scrollable on narrow screens */}
    </section>
  );
}

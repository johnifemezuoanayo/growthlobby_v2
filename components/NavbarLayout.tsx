"use client";

import React, { useRef, useState } from "react";
import { NoticeBanner } from "./pages/HomeHeroSection/NoticeBanner";
import { SiteHeader } from "./pages/HomeHeroSection/SiteHeader";

function NavbarLayout({ children }: { children: React.ReactNode }) {
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleGetInTouchClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => nameInputRef.current?.focus(), 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NoticeBanner
        isOpen={isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
        onGetInTouch={handleGetInTouchClick}
      />

      <SiteHeader
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1" ref={formRef}>
        {children}
      </main>
    </div>
  );
}

export default NavbarLayout;

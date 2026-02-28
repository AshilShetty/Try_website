"use client";

import { useRef } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { TeamSection } from "./components/TeamSection";
import { ResearchSection } from "./components/ResearchSection";
import { ContactSection } from "./components/ContactSection";
import {
  NAV_ITEMS,
  HERO_CONTENT,
  ABOUT_CONTENT,
  SOLUTIONS_CONTENT,
  TEAM_CONTENT,
  RESEARCH_CONTENT,
  CONTACT_CONTENT,
} from "./data/siteContent";
import { useGsapSections } from "./hooks/useGsapSections";

export default function HomePage() {
  const rootRef = useRef(null);
  useGsapSections(rootRef);

  return (
    <main ref={rootRef}>
      <CustomCursor />
      <NavBar items={NAV_ITEMS} />
      <HeroSection content={HERO_CONTENT} />
      <AboutSection content={ABOUT_CONTENT} />
      <SolutionsSection content={SOLUTIONS_CONTENT} />
      <TeamSection content={TEAM_CONTENT} />
      <ResearchSection content={RESEARCH_CONTENT} />
      <ContactSection content={CONTACT_CONTENT} />
    </main>
  );
}

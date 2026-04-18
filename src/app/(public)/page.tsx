"use client";

import { HomeHero } from "@/src/components/blocks/HomeHero";
import { ServicesSection } from "@/src/components/blocks/ServicesSection";
// import { WhyChooseUs } from "@/src/components/blocks/WhyChooseUs";
import { AboutIntro } from "@/src/components/blocks/AboutIntro";

import { WorkProcess } from "@/src/components/blocks/WorkProcess";
import { ProjectSnippet } from "@/src/components/blocks/ProjectSnippet";
import { Testimonials } from "@/src/components/blocks/Testimonials";
import { QuickRequestSection } from "@/src/components/blocks/QuickRequestSection";
import { ContactSnippet } from "@/src/components/blocks/ContactSnippet";
import WhyChooseUs from "@/src/components/blocks/WhyChooseUs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* 1. High-Impact Hero Section */}
      <HomeHero />

      {/* 2. About Company Intro */}
      <AboutIntro />

      {/* 3. Services Overview */}
      <ServicesSection />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Industries We Serve */}
      {/* <IndustriesSection /> */}

      {/* 6. Work Process Section */}
      <WorkProcess />

      {/* 7. Featured Projects Snippet */}
      <ProjectSnippet />

      {/* 8. Client Testimonials */}
      <Testimonials />

      {/* 9. Quick Service Request Form */}
      <QuickRequestSection />

      {/* 10. Contact & Location Section */}
      <ContactSnippet />
    </div>
  );
}


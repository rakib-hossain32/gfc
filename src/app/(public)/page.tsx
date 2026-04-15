"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Award, Globe, Clock } from "lucide-react";
import { ServicesSection } from "@/src/components/blocks/ServicesSection";
import { WhyChooseUs } from "@/src/components/blocks/WhyChooseUs";
import { AboutIntro } from "@/src/components/blocks/AboutIntro";
import { IndustriesSection } from "@/src/components/blocks/IndustriesSection";
import { WorkProcess } from "@/src/components/blocks/WorkProcess";
import { ProjectSnippet } from "@/src/components/blocks/ProjectSnippet";
import { Testimonials } from "@/src/components/blocks/Testimonials";
import { QuickRequestSection } from "@/src/components/blocks/QuickRequestSection";
import { ContactSnippet } from "@/src/components/blocks/ContactSnippet";
import Link from "next/link";
import Image from "next/image";


interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  center?: boolean;
}

const StatItem = ({ icon: Icon, value, label, center }: StatItemProps) => (
  <div className={`flex flex-col gap-2 ${center ? 'items-center text-center' : ''}`}>
    <div className="flex items-center gap-2 mb-1 justify-center">
      <Icon className="size-5 text-primary" />
      <span className="text-3xl font-black text-accent tracking-tighter">{value}</span>
    </div>
    <p className="text-[10px] font-bold text-muted uppercase tracking-widest">{label}</p>
  </div>
);

export default function Home() {

  // Animation Variants for staggered entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    },
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* 1. High-Impact Hero Section */}
      <section className="relative w-full  flex items-center justify-center overflow-hidden bg-secondary">

        {/* --- LAYER 1: Background Image & Overlay --- */}
        <div className="absolute inset-0 z-0">
          {/* Placeholder for Next.js Image component */}
          <Image
            priority
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Premium Architecture"
            className="object-cover w-full h-full"
            width={2070}
            height={1080}
          />

          {/* Updated linear: Heavy fade from bottom to top so text is readable in center */}
          <div className="absolute inset-0 bg-secondary/80 mix-blend-hard-light" />
          <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/50 to-transparent" />
        </div>

        {/* --- LAYER 2: Decorative Elements --- */}
        {/* Centered Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-highlight/15 rounded-full blur-[120px] pointer-events-none" />

        {/* --- LAYER 3: Main Content (Centered) --- */}
        <div className="container px-4 md:px-6 mx-auto relative z-10 md:py-35 py-30">
          <motion.div
            className="max-w-5xl mx-auto text-center flex flex-col items-center" // Centering classes added here
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white/90 backdrop-blur-md border border-primary/10 shadow-sm ring-1 ring-primary/5">
                <Star className="size-2.5 md:size-3 fill-highlight text-highlight" />
                <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.3em]">
                  Established Excellence since 2014
                </span>
              </span>
            </motion.div>

            {/* Headline - Centered */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-accent leading-[1.1] mb-8">
              Golden First Contracting <br />
              <span className="relative inline-block px-4">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/80">
                  Integrated Excellence
                </span>
                {/* Decorative underline centered */}
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-highlight/20 -skew-x-12 z-0"></div>
              </span>
            </motion.h1>

            {/* Subtext - Centered */}
            <motion.p
              variants={itemVariants}
              className="text-muted text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Redefining Facility Management for the <span className="text-accent font-bold">Golden First Contracting Network</span>.
              Uncompromising infrastructure quality meeting ISO global standards.
            </motion.p>

            {/* CTA Buttons - Centered */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center w-full mb-16">
              <Link href="#contact">
                <Button className="h-[64px] w-full sm:w-auto px-12 rounded-full bg-primary text-white text-sm font-bold uppercase tracking-widest hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-xl shadow-primary/20">
                  Get Started <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>

              <Link href="#portfolio">
                <Button variant="outline" className="h-[64px] w-full sm:w-auto px-12 rounded-full text-accent bg-white/50 text-sm font-bold uppercase tracking-widest border-accent/10 hover:bg-white hover:text-primary transition-all backdrop-blur-sm">
                  Our Portfolio
                </Button>
              </Link>
            </motion.div>

            {/* --- LAYER 4: Stats Bar (Centered & Horizontal) --- */}
            <motion.div
              variants={itemVariants}
              className="w-full max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 ">

                <div className="flex items-center justify-center gap-2"><StatItem icon={ShieldCheck} value="ISO" label="Certified Systems" center />
                  {/* Dividers only show on desktop */}
                  <div className="hidden md:block w-px h-12 bg-accent/10 self-center mx-auto" /></div>

                <div className="flex items-center justify-center gap-2"><StatItem icon={Award} value="A+" label="Corporate Rating" center />
                  <div className="hidden md:block w-px h-12 bg-accent/10 self-center mx-auto" /></div>

                <div className="flex items-center justify-center gap-2"><StatItem icon={Globe} value="100%" label="Saudi Integrated" center />
                  <div className="hidden md:block w-px h-12 bg-accent/10 self-center mx-auto" /></div>

                <div className="flex items-center justify-center gap-2"><StatItem icon={Clock} value="24/7" label="Response Time" center />
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. About Company Intro */}
      <AboutIntro />

      {/* 3. Services Overview */}
      <ServicesSection />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Industries We Serve */}
      <IndustriesSection />

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


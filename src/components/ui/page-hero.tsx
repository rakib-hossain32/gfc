"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/src/lib/utils";
import { ChevronRight, ShieldCheck, Globe, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface TrustBadge {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight: string;
  description: string;
  watermark?: string;
  breadcrumb?: { label: string; href: string }[];
  trustBadges?: TrustBadge[];
  centered?: boolean;
  showTrustBadges?: boolean;
  showBackButton?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function PageHero({
  badge,
  title,
  highlight,
  description,
  watermark,
  breadcrumb,
  trustBadges = [
    { icon: ShieldCheck, label: "ISO 9001:2015" },
    { icon: Globe, label: "GCC STANDARDS" },
    { icon: Clock, label: "24/7 OPERATIONS" },
  ],
  centered = false,
  showTrustBadges = false,
  showBackButton = false,
}: PageHeroProps) {
  const router = useRouter();

  return (
    <section className="relative pt-28 pb-8 md:pt-30 md:pb-10 lg:pt-35 lg:pb-16 bg-white overflow-hidden flex items-center border-b border-slate-50">
      {/* 
          --- PREMIUM MINIMALIST BACKGROUND ---
          Focus on whitespace and subtle geometric balance.
      */}
      
      {/* Subtle Grid - Even lighter for minimum distraction */}
      <div className="absolute inset-0 bg-size-[60px_60px] bg-[linear-gradient(to_right,#f1f5f9_0.5px,transparent_0.5px),linear-gradient(to_bottom,#f1f5f9_0.5px,transparent_0.5px)] z-0 opacity-40" />
      
      {/* Watermark - Scaled for better optical integration */}
      {watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-[10rem] md:text-[15rem] lg:text-[20rem] font-black text-slate-100/40 select-none pointer-events-none uppercase leading-none tracking-tighter whitespace-nowrap z-0">
          {watermark}
        </div>
      )}

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "max-w-4xl space-y-8 md:space-y-10",
            centered ? "text-center mx-auto" : "text-left"
          )}
        >
          {/* Top Tier: System Info */}
          <motion.div variants={itemVariants} className={cn("flex flex-col gap-5", centered ? "items-center" : "items-start")}>
            <div className="flex items-center gap-4">
              {showBackButton && (
                <button 
                  onClick={() => router.back()}
                  className="size-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-accent hover:text-primary hover:border-primary/20 transition-all cursor-pointer group"
                >
                  <ArrowLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

              {breadcrumb && (
                <nav className="flex items-center gap-2 p-1 bg-slate-50 border border-slate-100 rounded-full">
                  <div className="px-3 py-1 bg-white rounded-full border border-slate-200 shadow-xs">
                     <span className="text-[9px] font-black text-primary uppercase tracking-widest">GFC</span>
                  </div>
                  <div className="flex items-center gap-3 pr-4">
                    {breadcrumb.map((item, i) => (
                      <React.Fragment key={i}>
                        <ChevronRight className="size-3 text-slate-300" />
                        <Link href={item.href} className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 last:text-accent hover:text-primary transition-all">
                          {item.label}
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                </nav>
              )}
            </div>
            
            {badge && (
              <div className="flex items-center gap-3">
                 <div className="h-px w-6 bg-primary/40" />
                 <span className="text-[9px] font-black text-primary uppercase tracking-[0.4em] leading-none">{badge}</span>
                 <div className="h-px w-6 bg-primary/40 md:hidden" />
              </div>
            )}
          </motion.div>

          {/* Middle Tier: Professional Typography */}
          <div className="space-y-6">
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent leading-[1.15] tracking-tight"
            >
              {title} {" "}
              <span className="text-primary italic font-serif leading-none inline-block">
                 {highlight}
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className={cn(
                "text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium tracking-tight max-w-2xl",
                centered ? "mx-auto" : ""
              )}
            >
              {description}
            </motion.p>
          </div>

          {/* Bottom Tier: Institutional Trust (Only shown if requested) */}
          {showTrustBadges && (
            <motion.div 
              variants={itemVariants}
              className={cn(
                "flex flex-wrap gap-x-10 gap-y-4 pt-10 border-t border-slate-100",
                centered ? "justify-center" : "justify-start"
              )}
            >
              {trustBadges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                  <badge.icon className="size-3.5 text-primary" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-accent">
                    {badge.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}

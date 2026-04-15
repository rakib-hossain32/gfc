"use client";

import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16 space-y-4",
        align === "center" ? "text-center mx-auto" : "text-left",
        align === "center" ? "max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] border",
            light 
              ? "bg-white/10 text-white border-white/20" 
              : "bg-primary/5 text-primary border-primary/10"
          )}
        >
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]",
          light ? "text-white" : "text-accent"
        )}
      >
        {title}{" "}
        {highlight && (
          <span className="text-primary italic relative inline-block">
            {highlight}
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 text-highlight/30 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 25 0, 50 5 T 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
              />
            </svg>
          </span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "text-lg font-medium leading-relaxed",
            light ? "text-white/60" : "text-muted"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

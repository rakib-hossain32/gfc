"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  index: number;
}

export function StatsCard({ label, value, icon: Icon, color, bg, index }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
    >
      <div className={`size-14 rounded-2xl ${bg} ${color} flex items-center justify-center shrink-0`}>
        <Icon className="size-7" />
      </div>
      <div className="flex flex-col truncate">
         <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest truncate">{label}</span>
         <span className="text-2xl font-black text-accent">{value}</span>
      </div>
    </motion.div>
  );
}

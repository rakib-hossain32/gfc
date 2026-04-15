"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, CheckCircle2, Layers, TrendingUp, Users, Zap, Calendar } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface DashboardOverviewProps {
  projects: any[];
}

export function DashboardOverview({ projects }: DashboardOverviewProps) {
  const stats = [
    { label: "Total Asset Count", value: projects.length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Operational", value: projects.filter(p => p.status === "Ongoing").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Archived", value: projects.filter(p => p.status === "Completed").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Security Level", value: "Tier 1", icon: Layers, color: "text-primary", bg: "bg-red-50" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <StatsCard key={i} index={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Trajectory - Full width on mobile/tablet */}
        <div className="xl:col-span-2 bg-white rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-base sm:text-lg font-black text-accent uppercase tracking-tighter italic">Operational Trajectory</h3>
            <div className="px-3 py-1.5 bg-slate-50 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 w-fit">Last 12 Periods</div>
          </div>
          
          <div className="h-48 sm:h-64 w-full flex items-end justify-between gap-1 sm:gap-2 pt-4">
            {[40, 70, 45, 90, 65, 80, 50, 95, 100, 85, 75, 90].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 1 }}
                className="flex-1 bg-slate-100 rounded-t-lg sm:rounded-t-xl relative group transition-colors hover:bg-primary/20"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-white text-[8px] font-black px-2 py-1 rounded hidden sm:block">
                  {h}%
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-300 overflow-hidden whitespace-nowrap pt-2">
            <span>Jan.24</span><span>Apr.24</span><span>Jul.24</span><span>Oct.24</span><span>Dec.24</span>
          </div>
        </div>

        {/* Insights Tier - Dynamic Stack */}
        <div className="bg-accent rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-8 text-white space-y-6 sm:space-y-8">
           <h3 className="text-base sm:text-lg font-black uppercase tracking-tighter italic">Fleet Insights</h3>
           <div className="space-y-5 sm:space-y-6">
              {[
                { label: "Personnel Efficiency", value: "98.2%", icon: Users, color: "text-primary" },
                { label: "Network Uptime", value: "99.9h", icon: Zap, color: "text-yellow-400" },
                { label: "Operational Health", value: "Excel", icon: TrendingUp, color: "text-emerald-400" }
              ].map((insight, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-10 sm:size-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <insight.icon className={`size-5 sm:size-6 ${insight.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 truncate">{insight.label}</p>
                    <p className="text-sm sm:text-base font-bold truncate">{insight.value}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="pt-6 border-t border-white/10">
              <button className="w-full h-12 sm:h-14 bg-primary rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-all">
                Audit Insight Report <Calendar className="size-4" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

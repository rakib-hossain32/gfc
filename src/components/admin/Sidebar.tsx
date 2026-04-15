"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut, 
  X,
  MessageSquareQuote,
  Inbox
} from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

interface SidebarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, isMobile, activeTab, setActiveTab, setSidebarOpen }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "services", icon: Settings, label: "Services" },
    { id: "reviews", icon: MessageSquareQuote, label: "Reviews" },
    { id: "users", icon: Users, label: "Team" },
    { id: "careers", icon: Briefcase, label: "Careers" },
    { id: "inquiries", icon: Inbox, label: "Inquiries" },
    { id: "settings", icon: Settings, label: "Settings" }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-150"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: -320 } : { width: 0 }}
            animate={isMobile ? { x: 0 } : { width: 280 }}
            exit={isMobile ? { x: -320 } : { width: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 left-0 lg:relative z-200 bg-accent text-white flex flex-col w-[280px] h-screen p-6 shadow-2xl overflow-hidden shrink-0`}
          >
            {/* Logo area */}
            <div className="flex items-center gap-4 mb-10">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center p-2 shrink-0">
                <div className="size-full border-2 border-white/50 rounded-sm" />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xl font-black tracking-tighter leading-none uppercase">Golden First Contracting</span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-black">Management</span>
              </div>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="size-5" />
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto scrollbar-hide">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
                    activeTab === item.id 
                      ? "bg-primary text-white shadow-xl shadow-primary/30" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className={`size-5 transition-transform ${activeTab === item.id ? "scale-110" : "group-hover:scale-110"}`} />
                  <span className="text-sm font-bold uppercase tracking-widest leading-none truncate">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div layoutId="nav-dot" className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              ))}
            </nav>

            {/* User Footnote */}
            <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
               <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 overflow-hidden">
                  <div className="size-9 rounded-full bg-slate-500 overflow-hidden relative shrink-0">
                    <Image src="https://ui-avatars.com/api/?name=Admin&background=006C35&color=fff" alt="Avatar" fill />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">Systems Administrator</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest font-black">Control Logic</span>
                  </div>
               </div>
                <button 
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-4 px-4 py-3 text-white/30 hover:text-primary transition-colors mb-2"
                >
                   <LogOut className="size-4" />
                   <span className="text-xs font-bold uppercase tracking-widest leading-none">Terminate</span>
                </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

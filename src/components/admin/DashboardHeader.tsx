"use client";

import { Menu, Search, Eye } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  isMobile: boolean;
  sidebarOpen: boolean;
  activeTab: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSidebarOpen: (open: boolean) => void;
}

export function DashboardHeader({ isMobile, sidebarOpen, activeTab, searchQuery, setSearchQuery, setSidebarOpen }: HeaderProps) {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-50">
      <div className="flex items-center gap-4">
        {isMobile && !sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <Menu className="size-6 text-accent" />
          </button>
        )}
        <h1 className="text-xl font-black text-accent uppercase tracking-tighter">
          {activeTab === "projects" ? "Portfolio Management" : "Admin Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
         <div className="hidden md:flex relative">
           <input 
             type="text" 
             placeholder="Search records..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="h-11 w-64 bg-slate-100 border-none rounded-xl pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all font-sans"
           />
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 font-bold" />
         </div>
         <Button asChild variant="outline" className="rounded-xl border-slate-200 flex items-center gap-2 font-black uppercase tracking-widest text-[10px] h-10 px-3 sm:h-11 sm:px-4">
           <Link href="/">
              <Eye className="size-4" /> 
              <span className="hidden xs:inline">Live Site</span>
           </Link>
         </Button>
      </div>
    </header>
  );
}

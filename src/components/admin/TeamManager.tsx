"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, UserPlus, Linkedin, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { TeamFormModal } from "./TeamFormModal";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function TeamManager() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeam(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this specialist from the active roster?")) return;
    try {
      await fetch(`/api/team/${id}`, { method: "DELETE" });
      fetchTeam();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Management Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-accent uppercase tracking-tighter italic">Personnel <span className="text-primary italic">Roster.</span></h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management of Golden First Contracting specialized workforce</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Inspect Roster..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white border border-slate-100 rounded-xl pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button 
            onClick={() => { setEditingMember(null); setShowModal(true); }}
            className="w-full sm:w-auto h-12 px-8 rounded-xl bg-accent hover:bg-primary shadow-lg shadow-accent/10 transition-all font-black uppercase tracking-widest text-[9px]"
          >
            <UserPlus className="size-4 mr-2" /> Recruit Specialist
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 animate-pulse">Syncing Personnel Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTeam.map((member, i) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {/* Profile Header */}
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={member.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-accent to-transparent opacity-60" />
                  
                  {/* Action Bar */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={() => { setEditingMember(member); setShowModal(true); }}
                      className="size-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all shadow-lg"
                    >
                      <Edit2 className="size-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(member._id)}
                      className="size-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-accent truncate">{member.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mt-1">
                      <ShieldCheck className="size-3" /> {member.designation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2 italic">
                    "{member.bio}"
                  </p>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    {member.linkedin ? (
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="size-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all">
                        <Linkedin className="size-4" />
                      </a>
                    ) : <div className="size-10" />}
                    
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                       <span className="text-[8px] font-black uppercase tracking-[0.2em] italic">Active Roster</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Rarity state: Empty */}
      {!loading && filteredTeam.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="size-20 bg-slate-200 rounded-full flex items-center justify-center mb-6">
               <UserPlus className="size-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-accent uppercase tracking-tighter">No Specialists Found</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">{searchQuery ? "Try refining your search parameters" : "Begin personnel onboarding"}</p>
         </div>
      )}

      <TeamFormModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        member={editingMember}
        onSuccess={() => { fetchTeam(); setShowModal(false); }}
      />
    </div>
  );
}

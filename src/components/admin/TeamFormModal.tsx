"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Edit2, Plus, Image as ImageIcon, Loader2, ShieldCheck, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
  onSuccess: () => void;
}

export function TeamFormModal({ isOpen, onClose, member, onSuccess }: TeamFormModalProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
    designation: "",
    image: "",
    bio: "",
    linkedin: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (member) setFormData(member);
    else setFormData({
      name: "",
      designation: "",
      image: "",
      bio: "",
      linkedin: ""
    });
  }, [member, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = member ? `/api/team/${member._id}` : "/api/team";
      const method = member ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-accent/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-50"
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
           <div className="flex items-center gap-4 text-accent">
              <div className="p-3 bg-slate-100 rounded-xl">
                 {member ? <Edit2 className="size-6" /> : <Plus className="size-6" />}
              </div>
              <div className="flex flex-col">
                 <h2 className="text-xl font-black uppercase tracking-tighter leading-none">{member ? "Update Officer" : "Recruit Member"}</h2>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{member ? "Modify personnel data" : "Onboard new specialist"}</p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 hover:text-accent rounded-xl">
              <X className="size-6" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 rounded-full bg-primary" />
                 <span className="text-xs font-black uppercase tracking-widest text-accent">Personnel Details</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Legal Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
                      <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl pl-12 pr-6 font-bold tracking-tight transition-all font-sans"
                        placeholder="e.g. Abdullah Ahmed"
                      />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Corporate Designation</label>
                    <input 
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                      placeholder="e.g. Lead MEP Engineer"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2 italic"><ImageIcon className="size-3" /> Profile Asset URL</label>
                <input 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">LinkedIn Identifier</label>
                 <input 
                   value={formData.linkedin}
                   onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                   className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                   placeholder="LinkedIn Profile URL"
                 />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Professional Brief</label>
                 <textarea 
                   required
                   value={formData.bio}
                   onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                   rows={3}
                   className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-3xl p-6 font-bold tracking-tight transition-all resize-none font-sans"
                   placeholder="Summary of professional expertise..."
                 />
              </div>
            </div>
        </form>

        <div className="p-8 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0 bg-slate-50/50 z-10">
           <button 
             onClick={onClose}
             className="px-8 h-12 font-black uppercase tracking-widest text-xs text-slate-400 hover:text-accent"
           >
             Cancel
           </button>
           <Button 
             disabled={saving}
             onClick={handleSubmit} 
             className="px-10 h-14 rounded-2xl bg-primary hover:bg-accent text-white shadow-xl shadow-primary/20 font-black uppercase tracking-[0.2em] text-[10px]"
           >
             {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <ShieldCheck className="size-4 mr-2" />}
             {member ? "Sync Records" : "Authorize Onboarding"}
           </Button>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Edit2, Plus, Image as ImageIcon, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onSuccess: () => void;
}

export function ProjectFormModal({ isOpen, onClose, project, onSuccess }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    category: "",
    stats: "",
    image: "",
    gallery: [""],
    status: "Active Portfolio",
    location: "",
    desc: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) setFormData(project);
    else setFormData({
      title: "",
      slug: "",
      category: "",
      stats: "",
      image: "",
      gallery: [""],
      status: "Active Portfolio",
      location: "",
      desc: ""
    });
  }, [project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = project ? `/api/projects/${project._id}` : "/api/projects";
      const method = project ? "PUT" : "POST";
      
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

  const handleGalleryChange = (val: string, index: number) => {
    const newGallery = [...formData.gallery];
    newGallery[index] = val;
    setFormData({ ...formData, gallery: newGallery });
  };

  const addGalleryItem = () => {
    setFormData({ ...formData, gallery: [...formData.gallery, ""] });
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
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-50"
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
           <div className="flex items-center gap-4 text-accent">
              <div className="p-3 bg-slate-100 rounded-xl">
                 {project ? <Edit2 className="size-6" /> : <Plus className="size-6" />}
              </div>
              <div className="flex flex-col">
                 <h2 className="text-xl font-black uppercase tracking-tighter leading-none">{project ? "Update Project" : "Initiate Project"}</h2>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{project ? "Modify existing data" : "Enter project parameters"}</p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 hover:text-accent rounded-xl">
              <X className="size-6" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
           {/* Section 1: Identity */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 rounded-full bg-primary" />
                 <span className="text-xs font-black uppercase tracking-widest text-accent">Primary Identity</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Display Title</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                      className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                      placeholder="e.g. KAFD Financial Tower"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Permalink (Slug)</label>
                    <input 
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full h-14 bg-slate-100/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all text-slate-400 font-sans"
                      placeholder="automatically-generated-slug"
                    />
                 </div>
              </div>
           </div>

           {/* Section 2: Logistics */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 rounded-full bg-primary" />
                 <span className="text-xs font-black uppercase tracking-widest text-accent">Operational Parameters</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Category</label>
                     <select 
                       required
                       value={formData.category}
                       onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                       className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans appearance-none pointer-events-auto cursor-pointer"
                     >
                       <option value="" disabled>Select Category</option>
                       <option value="Full Facility Management">Full Facility Management</option>
                       <option value="Industrial Cleaning">Industrial Cleaning</option>
                       <option value="Supply Chain Support">Supply Chain Support</option>
                       <option value="Specialized Manpower">Specialized Manpower</option>
                       <option value="Industrial Maintenance">Industrial Maintenance</option>
                       <option value="Hospitality Support">Hospitality Support</option>
                     </select>
                  </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Metrics/Scale</label>
                    <input 
                      required
                      value={formData.stats}
                      onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                      className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                      placeholder="e.g. 50-Story Complex"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Location</label>
                    <input 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                      placeholder="e.g. KAFD, Riyadh"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Current Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans appearance-none pointer-events-auto cursor-pointer"
                    >
                      <option value="Active Portfolio">Active Portfolio</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Portfolio Description</label>
                <textarea 
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-4xl p-6 font-bold tracking-tight transition-all resize-none font-sans"
                  placeholder="Enter detailed project description..."
                />
              </div>
           </div>

           {/* Section 3: Visual Assets */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 rounded-full bg-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-accent">Visual Portfolio Assets</span>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2 italic"><ImageIcon className="size-3" /> Main Cover URL</label>
                <input 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full h-14 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2 underline">Supporting Gallery Asset URLs</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.gallery.map((img: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <input 
                        value={img}
                        onChange={(e) => handleGalleryChange(e.target.value, i)}
                        className="flex-1 h-12 bg-slate-50 border-none rounded-xl px-4 text-xs font-bold font-sans"
                        placeholder={`Asset URL #${i+1}`}
                      />
                      {i === formData.gallery.length - 1 && (
                        <button type="button" onClick={addGalleryItem} className="size-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all">
                          <Plus className="size-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
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
             {project ? "Sync Repository" : "Commit Changes"}
           </Button>
        </div>
      </motion.div>
    </div>
  );
}

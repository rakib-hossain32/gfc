"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Edit2, 
  Plus, 
  Loader2, 
  ShieldCheck, 
  Type, 
  FileText, 
  Bookmark,
  Zap,
  Trash2,
  Settings2
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface ServiceItem {
  name: string;
  icon: string;
  desc: string;
  tag: string;
}

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: any;
  onSuccess: () => void;
}

export function ServiceFormModal({ isOpen, onClose, service, onSuccess }: ServiceFormModalProps) {
  const [formData, setFormData] = useState({
    category: "",
    badge: "",
    description: "",
    items: [{ name: "", icon: "Zap", desc: "", tag: "" }]
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        category: service.category || "",
        badge: service.badge || "",
        description: service.description || "",
        items: service.items && service.items.length > 0 ? service.items : [{ name: "", icon: "Zap", desc: "", tag: "" }]
      });
    } else {
      setFormData({
        category: "",
        badge: "",
        description: "",
        items: [{ name: "", icon: "Zap", desc: "", tag: "" }]
      });
    }
  }, [service, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = service ? `/api/services/${service._id}` : "/api/services";
      const method = service ? "PUT" : "POST";
      
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

  const handleItemChange = (index: number, field: keyof ServiceItem, value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({ 
      ...formData, 
      items: [...formData.items, { name: "", icon: "Zap", desc: "", tag: "" }] 
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length <= 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
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
        className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-50"
      >
        <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
           <div className="flex items-center gap-4 text-accent">
              <div className="p-3 bg-slate-100 rounded-xl text-primary">
                 {service ? <Edit2 className="size-6" /> : <Plus className="size-6" />}
              </div>
              <div className="flex flex-col">
                 <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
                   {service ? "Refine Category" : "Establish Category"}
                 </h2>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                   {service ? "Calibrating service parameters" : "Defining new industrial protocol"}
                 </p>
              </div>
           </div>
           <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 hover:text-accent rounded-xl transition-colors">
              <X className="size-6" />
           </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-12 scrollbar-hide">
           {/* Section 1: Strategic Identity */}
           <div className="space-y-8">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 rounded-full bg-primary" />
                 <span className="text-xs font-black uppercase tracking-widest text-accent">Strategic Identity</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                      <Type className="size-3" /> Category Name
                    </label>
                    <input 
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                      placeholder="e.g. Strategic Maintenance"
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                       <Bookmark className="size-3" /> Capability Badge
                    </label>
                    <input 
                      required
                      value={formData.badge}
                      onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                      className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 font-bold tracking-tight transition-all font-sans"
                      placeholder="e.g. Operational Precision"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
                  <FileText className="size-3" /> Strategic Description
                </label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-3xl p-6 font-bold tracking-tight transition-all resize-none font-sans"
                  placeholder="Describe the overall scope of this service category..."
                />
              </div>
           </div>

           {/* Section 2: Operational Nodes */}
           <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-6 rounded-full bg-primary" />
                   <span className="text-xs font-black uppercase tracking-widest text-accent">Operational Nodes (Service Items)</span>
                </div>
                <button 
                  type="button"
                  onClick={addItem}
                  className="h-10 px-6 rounded-xl bg-accent text-white text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2"
                >
                   <Plus className="size-3" /> Add Node
                </button>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {formData.items.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 space-y-6 relative group"
                    >
                      <button 
                        type="button"
                        onClick={() => removeItem(index)}
                        className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                         <Trash2 className="size-5" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Node Name</label>
                          <input 
                            required
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            className="w-full h-12 bg-white rounded-xl px-4 text-xs font-bold font-sans border border-slate-100 focus:border-primary/20 transition-all"
                            placeholder="e.g. HVAC Management"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Lucide Icon Name</label>
                          <input 
                            required
                            value={item.icon}
                            onChange={(e) => handleItemChange(index, 'icon', e.target.value)}
                            className="w-full h-12 bg-white rounded-xl px-4 text-xs font-bold font-sans border border-slate-100 focus:border-primary/20 transition-all font-mono"
                            placeholder="e.g. Zap, Wrench, Droplets"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Operational Tag</label>
                          <input 
                            required
                            value={item.tag}
                            onChange={(e) => handleItemChange(index, 'tag', e.target.value)}
                            className="w-full h-12 bg-white rounded-xl px-4 text-xs font-bold font-sans border border-slate-100 focus:border-primary/20 transition-all"
                            placeholder="e.g. Premium Quality"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Node Specification</label>
                        <textarea 
                          required
                          value={item.desc}
                          onChange={(e) => handleItemChange(index, 'desc', e.target.value)}
                          rows={2}
                          className="w-full bg-white rounded-xl p-4 text-xs font-bold font-sans border border-slate-100 focus:border-primary/20 transition-all resize-none"
                          placeholder="Technical specification for this service node..."
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
           </div>
        </form>

        <div className="p-8 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0 bg-slate-50/50 z-10">
           <button 
             onClick={onClose}
             className="px-8 h-12 font-black uppercase tracking-widest text-xs text-slate-400 hover:text-accent transition-colors"
           >
             Cancel Action
           </button>
           <Button 
             disabled={saving}
             onClick={handleSubmit} 
             className="px-10 h-16 rounded-2xl bg-primary hover:bg-accent text-white shadow-xl shadow-primary/20 font-black uppercase tracking-[0.2em] text-[10px]"
           >
             {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <ShieldCheck className="size-4 mr-2" />}
             {service ? "Apply Updates" : "Commit Protocol"}
           </Button>
        </div>
      </motion.div>
    </div>
  );
}

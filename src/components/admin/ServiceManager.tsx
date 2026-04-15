"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Search, 
  Loader2, 
  LayoutGrid,
  Zap,
  ChevronRight,
  ShieldCheck,
  Boxes
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { ServiceFormModal } from "./ServiceFormModal";

interface ServiceItem {
  name: string;
  icon: string;
  desc: string;
  tag: string;
}

interface ServiceCategory {
  _id: string;
  category: string;
  badge: string;
  description: string;
  items: ServiceItem[];
  createdAt: string;
}

export function ServiceManager() {
  const [services, setServices] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceCategory | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently remove this service category? All nested items will be deleted.")) return;
    try {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredServices = services.filter(s =>
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-4xl border border-slate-100 shadow-sm gap-6">
        <div className="flex items-center gap-4">
          <div className="h-8 w-1.5 rounded-full bg-primary" />
          <div>
            <h2 className="text-sm font-black text-accent uppercase tracking-widest leading-none">Service Catalog</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Manage institutional capabilities</p>
          </div>
        </div>
        <div className="flex-1 max-w-md w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 bg-slate-50 border-none rounded-2xl pl-12 pr-6 text-xs font-bold font-sans focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all"
            placeholder="Filter by category or description..."
          />
        </div>
        <Button onClick={() => { setEditingService(null); setShowModal(true); }} className="h-14 px-10 rounded-2xl bg-accent hover:bg-primary shadow-xl shadow-accent/10 w-full sm:w-auto font-black uppercase tracking-widest text-[10px]">
          <Plus className="size-5 mr-2" /> Define New Category
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
            <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
               <LayoutGrid className="size-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Categories</p>
            <p className="text-2xl font-black text-accent">{services.length}</p>
         </div>
         <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
            <div className="size-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
               <Boxes className="size-6" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Service Items</p>
            <p className="text-2xl font-black text-accent">{services.reduce((acc, curr) => acc + (curr.items?.length || 0), 0)}</p>
         </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="bg-white rounded-4xl p-20 border border-dashed border-slate-200 text-center">
            <Loader2 className="size-10 animate-spin mx-auto text-primary mb-4" />
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Querying database...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-4xl p-20 border border-dashed border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No service protocols mapped.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredServices.map((service, i) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden group"
              >
                <div className="p-8 sm:p-10 flex flex-col lg:flex-row gap-10">
                  {/* Category Info */}
                  <div className="lg:w-1/3 space-y-6">
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                        {service.badge}
                      </span>
                      <h3 className="text-3xl font-black text-accent italic group-hover:text-primary transition-colors">
                        {service.category}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 leading-relaxed capitalize">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => { setEditingService(service); setShowModal(true); }}
                        className="h-12 px-6 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2"
                      >
                        <Edit2 className="size-3" /> Edit Profile
                      </button>
                      <button 
                        onClick={() => handleDelete(service._id)}
                        className="h-12 px-6 rounded-xl border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2"
                      >
                        <Trash2 className="size-3" /> Purge
                      </button>
                    </div>
                  </div>

                  {/* Items Preview */}
                  <div className="lg:w-2/3">
                    <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100">
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <ShieldCheck className="size-4 text-primary" /> Active Service Nodes ({service.items?.length || 0})
                        </h4>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.items?.map((item, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-start gap-4">
                            <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                               <Zap className="size-5" />
                            </div>
                            <div className="flex flex-col min-w-0">
                               <span className="text-[9px] font-black text-primary uppercase tracking-tighter">{item.tag}</span>
                               <span className="text-sm font-black text-accent truncate">{item.name}</span>
                               <p className="text-[10px] text-slate-400 font-medium line-clamp-1 mt-1">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ServiceFormModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        service={editingService}
        onSuccess={() => { fetchServices(); setShowModal(false); }}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Layers, Edit2, Trash2, Search, Loader2 } from "lucide-react";
import Image from "next/image";

interface Project {
  _id: string;
  slug: string;
  title: string;
  category: string;
  stats: string;
  image: string;
  gallery: string[];
  status: string;
  location: string;
  desc: string;
}

interface ProjectTableProps {
  projects: Project[];
  loading: boolean;
  onEdit: (project: Project) => void;
  onUpdateStatus: (id: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectTable({ projects, loading, onEdit, onUpdateStatus, onDelete }: ProjectTableProps) {
  return (
    <div className="bg-white rounded-4xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-4 sm:px-6 py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Profile</th>
                <th className="hidden md:table-cell px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
                <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Metric</th>
                <th className="px-4 sm:px-6 py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status Control</th>
                <th className="px-4 sm:px-6 py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-20 text-center"><Loader2 className="size-8 animate-spin mx-auto text-primary" /></td></tr>
              ) : projects.map((p, i) => (
                <motion.tr 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={p._id} 
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-4">
                     <div className="flex items-center gap-3 sm:gap-4">
                        <div className="size-12 sm:size-16 rounded-xl bg-slate-100 relative overflow-hidden shrink-0 border border-slate-100">
                           <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0 max-w-[120px] sm:max-w-[200px]">
                           <span className="font-black text-accent text-xs sm:text-base tracking-tighter truncate leading-none">{p.title}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{p.category}</span>
                        </div>
                     </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4">
                     <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                        <MapPin className="size-3 text-primary shrink-0" /> <span className="truncate max-w-[120px]">{p.location}</span>
                      </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4">
                     <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                        <Layers className="size-3 shrink-0" /> <span className="truncate max-w-[100px]">{p.stats}</span>
                     </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-center">
                     <div className="relative inline-block">
                        <select 
                          value={p.status}
                          onChange={(e) => onUpdateStatus(p._id, e.target.value)}
                          className={`appearance-none px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-transparent cursor-pointer transition-all outline-hidden text-center hover:scale-105 active:scale-95 shadow-sm ${
                             p.status === 'Ongoing' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 
                             p.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' :
                             'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          <option value="Active Portfolio">Active Portfolio</option>
                          <option value="Ongoing">Ongoing</option>
                          <option value="Completed">Completed</option>
                        </select>
                     </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <button onClick={() => onEdit(p)} className="p-2 sm:p-3 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                           <Edit2 className="size-3.5 sm:size-4" />
                        </button>
                        <button onClick={() => onDelete(p._id)} className="p-2 sm:p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                           <Trash2 className="size-3.5 sm:size-4" />
                        </button>
                     </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {!loading && projects.length === 0 && (
         <div className="p-16 sm:p-20 text-center flex flex-col items-center gap-4">
            <Search className="size-10 sm:size-12 text-slate-200" />
            <p className="text-slate-400 font-bold text-sm">No records found matching query.</p>
         </div>
      )}
    </div>
  );
}

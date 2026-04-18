"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Admin Components
import { Sidebar } from "@/src/components/admin/Sidebar";
import { DashboardHeader } from "@/src/components/admin/DashboardHeader";
import { DashboardOverview } from "@/src/components/admin/DashboardOverview";
import { ProjectTable } from "@/src/components/admin/ProjectTable";
import { ProjectFormModal } from "@/src/components/admin/ProjectFormModal";
import { TestimonialManager } from "@/src/components/admin/TestimonialManager";
import { TeamManager } from "@/src/components/admin/TeamManager";
import { SettingsManager } from "@/src/components/admin/SettingsManager";
import { CareerManager } from "@/src/components/admin/CareerManager";
import { ContactManager } from "@/src/components/admin/ContactManager";
import { ServiceManager } from "@/src/components/admin/ServiceManager";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

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

function AdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize from URL or default to dashboard
  const [activeTab, setActiveTabState] = useState(searchParams.get("tab") || "dashboard");

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Delete confirmation modal state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  // Sync tab state with URL
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/admin?${params.toString()}`);
  };

  // Handle Initial Load and External URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTabState(tab);
    }
  }, [searchParams]);

  // Handle Responsive Layout Stability
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await fetch(`/api/projects/${projectToDelete}`, { method: "DELETE" });
      fetchProjects();
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
      {/* 1. Sidebar Section */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
      />

      {/* 2. Main Container Section */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <DashboardHeader
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto space-y-10 pb-10">
            {activeTab === "dashboard" && <DashboardOverview projects={projects} />}

            {activeTab === "reviews" && <TestimonialManager />}

            {activeTab === "users" && <TeamManager />}

            {activeTab === "settings" && <SettingsManager />}

            {activeTab === "careers" && <CareerManager />}

            {activeTab === "inquiries" && <ContactManager />}

            {activeTab === "services" && <ServiceManager />}

            {activeTab === "projects" && (
              <div className="space-y-8">
                {/* Management Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-4xl border border-slate-100 shadow-sm gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-1.5 rounded-full bg-primary" />
                    <div>
                      <h2 className="text-sm font-black text-accent uppercase tracking-widest leading-none">Record Repository</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Manage institutional assets</p>
                    </div>
                  </div>
                  <Button onClick={() => { setEditingProject(null); setShowProjectModal(true); }} className="h-14 px-10 rounded-2xl bg-accent hover:bg-primary shadow-xl shadow-accent/10 w-full sm:w-auto font-black uppercase tracking-widest text-[10px]">
                    <Plus className="size-5 mr-2" /> Add New Project
                  </Button>
                </div>

                {/* Data Table Layer */}
                <ProjectTable
                  projects={filteredProjects}
                  loading={loading}
                  onEdit={(p) => { setEditingProject(p); setShowProjectModal(true); }}
                  onUpdateStatus={handleStatusUpdate}
                  onDelete={handleDeleteClick}
                />
              </div>
            )}

            {/* Default Page Placeholder for other tabs */}
            {!["dashboard", "projects", "services", "reviews", "users", "settings", "careers", "inquiries"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6">
                <div className="size-24 rounded-full bg-slate-100 flex items-center justify-center">
                  <div className="size-16 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
                </div>
                <h3 className="text-2xl font-black text-accent uppercase tracking-tighter italic">Optimizing Module</h3>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. Global Modal Layer */}
      <ProjectFormModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        project={editingProject}
        onSuccess={() => { fetchProjects(); setShowProjectModal(false); }}
      />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={cancelDelete}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
            >
              <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 size-40 bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 size-32 bg-accent/5 rounded-full blur-2xl" />

                <div className="relative z-10 space-y-8">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="size-20 rounded-3xl bg-red-50 flex items-center justify-center">
                      <Trash2 className="size-10 text-red-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-black text-accent uppercase tracking-tighter italic">
                      Confirm <span className="text-red-500">Deletion</span>
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Are you sure you want to permanently remove this project record? This action cannot be undone.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={cancelDelete}
                      className="flex-1 h-14 rounded-2xl bg-slate-100 text-accent font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 h-14 rounded-2xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm font-bold text-accent uppercase tracking-widest animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    }>
      <AdminContent />
    </Suspense>
  );
}


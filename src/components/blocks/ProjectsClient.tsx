"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Loader2
} from "lucide-react";
import { PageHero } from "@/src/components/ui/page-hero";
import { ProjectModal } from "./ProjectModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function ProjectsClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setDbProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);



  return (
    <main className="min-h-screen bg-white">
      <PageHero
        badge="Institutional Portfolio"
        title="Built for the"
        highlight="Golden First Contracting."
        description="Showcasing a decade of precision in Saudi Arabia's most iconic landscapes. From KAFD towers to national infrastructure, we define excellence."
        watermark="Portfolio"
        centered
        breadcrumb={[{ label: "Projects", href: "/projects" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="size-10 text-primary animate-spin" />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10"
            >
              {dbProjects.map((project, index) => (
                <motion.div
                  key={index}
                  onClick={() => {
                    setIsModalLoading(true);
                    setSelectedProject(project);
                    setTimeout(() => setIsModalLoading(false), 600);
                  }}
                  variants={cardVariants}
                  className="group relative cursor-pointer"
                >
                  <div className="relative aspect-16/11 rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-lg md:shadow-2xl shadow-slate-200 group-hover:shadow-primary/20 transition-all duration-700">
                    <div className="absolute inset-0 size-full">
                      <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-accent via-accent/20 to-transparent group-hover:via-accent/40 transition-all duration-700" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700" />

                    {/* Main Content Area */}
                    <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end">
                      <div className="space-y-1 md:space-y-4 relative z-10">
                        <div className="flex items-center gap-1 md:gap-2">
                          <div className="w-4 md:w-8 h-0.5 bg-primary" />
                          <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest">{project.category}</span>
                        </div>
                        <h3 className="text-xs md:text-3xl font-black text-white leading-tight group-hover:text-primary transition-colors duration-500">
                          {project.title}
                        </h3>
                        {/* Hover details — hidden on mobile */}
                        <div className="overflow-hidden hidden md:block">
                          <div className="space-y-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                            <div className="h-px w-full bg-white/10" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6">
                                <div className="flex flex-col gap-1">
                                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40">Metrics</p>
                                  <p className="text-xs font-bold text-white flex items-center gap-1.5 italic">
                                    <Layers className="size-3 text-primary" /> {project.stats}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-white/40">Location</p>
                                  <p className="text-xs font-bold text-white flex items-center gap-1.5 italic">
                                    <MapPin className="size-3 text-primary" /> {project.location}
                                  </p>
                                </div>
                              </div>
                              <div className="size-12 rounded-full bg-white text-accent flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-xl">
                                <ArrowUpRight className="size-6" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator Below Card */}
                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] ${project.status === 'Ongoing' ? 'text-amber-500' :
                      project.status === 'Completed' ? 'text-emerald-500' : 'text-primary'
                      }`}>
                      • {project.status}
                    </span>
                    <ChevronRight className="size-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        isLoading={isModalLoading}
      />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Plus,
  Building2,
  MapPin,
  Layers,
} from "lucide-react";
import { SectionHeader } from "@/src/components/ui/section-header";
import { ProjectModal } from "./ProjectModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function ProjectSnippet() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProject, setSelectedProject] = useState<any | null>(null)
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setDbProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const featuredProjects = dbProjects.slice(0, 3);

  // Lock body scroll when modal is open
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
    <section id="portfolio" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <SectionHeader
            badge="Portfolio of Excellence"
            title="Iconic"
            highlight="Success Stories."
            align="center"
            className="md:items-start md:text-left text-center lg:max-w-none md:max-w-none ml-0 mb-0 max-md:mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex pb-2"
          >
            <Button asChild className="rounded-full h-16 px-10 bg-accent text-white hover:bg-primary transition-all duration-300 shadow-xl shadow-accent/10 group">
              <Link href="/projects" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                Explore All Projects <Plus className="size-5 group-hover:rotate-90 transition-transform duration-500" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                layoutId={`home-card-${project.slug}`}
                onClick={() => {
                  setIsModalLoading(true);
                  setSelectedProject(project);
                 
                  setTimeout(() => setIsModalLoading(false), 600);
                }}
                variants={cardVariants}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-16/11 rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-lg md:shadow-2xl shadow-slate-200 group-hover:shadow-primary/20 transition-all duration-700">
                  {/* Background Image */}
                  <motion.div layoutId={`home-image-${project.slug}`} className="absolute inset-0 size-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </motion.div>

                  {/* Dynamic Overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-accent via-accent/20 to-transparent group-hover:via-accent/40 transition-all duration-700" />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-700" />

                  {/* Floating Tags - Hidden on smaller screens to prevent overlap */}
                  <div className="absolute top-6 left-6 flex-col gap-2 hidden lg:flex">
                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{project.category}</span>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end">
                    <div className="space-y-1 md:space-y-4 relative z-10">
                      {/* Always Visible Category */}
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-4 md:w-8 h-0.5 bg-primary" />
                        <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest md:tracking-[0.2em]">{project.category}</span>
                      </div>

                      <div className="space-y-1 md:space-y-2">
                        <motion.h3
                          layoutId={`home-title-${project.slug}`}
                          className="text-sm md:text-3xl font-black text-white leading-tight group-hover:text-primary transition-colors duration-500"
                        >
                          {project.title}
                        </motion.h3>

                        {/* Revealable Content on Hover — hidden on mobile */}
                        <div className="overflow-hidden hidden md:block">
                          <div className="space-y-4 md:space-y-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                            <div className="h-px w-full bg-white/10" />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 md:gap-6">
                                <div className="flex flex-col gap-1">
                                  <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.15em] md:tracking-[0.2em] text-white/40">Metrics</p>
                                  <p className="text-[10px] md:text-xs font-bold text-white flex items-center gap-1.5 italic">
                                    <Layers className="size-2.5 md:size-3 text-primary" /> {project.stats}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.15em] md:tracking-[0.2em] text-white/40">Location</p>
                                  <p className="text-[10px] md:text-xs font-bold text-white flex items-center gap-1.5 italic">
                                    <MapPin className="size-2.5 md:size-3 text-primary" /> {project.location}
                                  </p>
                                </div>
                              </div>

                              <div className="size-10 md:size-12 rounded-full bg-white text-accent flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-xl">
                                <ArrowUpRight className="size-5 md:size-6" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* --- MOBILE CTA BUTTON --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex md:hidden justify-center mt-10"
        >
          <Button asChild className="h-11 px-8 rounded-full bg-accent text-white hover:bg-primary transition-all duration-300 shadow-lg shadow-accent/10 group text-xs font-bold uppercase tracking-widest">
            <Link href="/projects" className="flex items-center gap-2">
              Explore All Projects <Plus className="size-4" />
            </Link>
          </Button>
        </motion.div>

        {/* --- BOTTOM DECORATION --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center gap-3 opacity-20"
        >
          <Building2 className="size-6 text-accent" />
          <Building2 className="size-6 text-primary" />
          <Building2 className="size-6 text-accent" />
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        isLoading={isModalLoading}
      />
    </section>
  );
}

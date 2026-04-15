"use client";

import { motion, Variants } from "framer-motion";
import { PageHero } from "@/src/components/ui/page-hero";
import { 
  ShieldCheck, 
  Scale, 
  Handshake, 
  Lock, 
  Gavel, 
  AlertCircle 
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function TermsPage() {
  const sections = [
    {
      icon: Handshake,
      title: "Agreement to Terms",
      content: "By accessing or using Golden First Contracting Management services, you agree to be bound by these Terms of Service and all applicable laws and regulations in the Kingdom of Saudi Arabia. If you do not agree with any of these terms, you are prohibited from using or accessing our institutional portal."
    },
    {
      icon: ShieldCheck,
      title: "Service Excellence",
      content: "We provide tier-one facility management, industrial maintenance, and specialized manpower services. While we strive for 100% operational uptime, services are provided 'as is' and 'as available' for our corporate and institutional clients."
    },
    {
      icon: Scale,
      title: "Intellectual Property",
      content: "All content, including architectural photography, technical briefs, and proprietary methodology displayed on this site, is the exclusive property of Golden First Contracting Management. Unauthorized reproduction or commercial use is strictly prohibited."
    },
    {
      icon: Lock,
      title: "Client Confidentiality",
      content: "Engagement with our portfolio assets often involves sensitive infrastructure data. We maintain strict non-disclosure protocols. Users are responsible for maintaining the confidentiality of any assigned administrative credentials."
    },
    {
      icon: Gavel,
      title: "Governing Law",
      content: "Any claim relating to Golden First Contracting Management's services shall be governed by the laws of Saudi Arabia without regard to its conflict of law provisions. Disputes shall be resolved exclusively within the jurisdiction of Saudi courts."
    },
    {
      icon: AlertCircle,
      title: "Modifications",
      content: "Golden First Contracting Management reserves the right to revise these terms at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHero 
        badge="Governance & Legal"
        title="Terms of"
        highlight="Service."
        description="Our operational framework and legal boundaries for delivering premium facility management across Saudi Arabia's iconic landscape."
        watermark="Legal"
        centered
        breadcrumb={[{ label: "Terms", href: "/terms" }]}
      />

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute -left-20 top-40 size-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-40 size-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8"
          >
            {sections.map((section, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="size-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <section.icon className="size-8" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-accent uppercase tracking-tighter italic">
                      {section.title}
                    </h3>
                    <div className="h-0.5 w-12 bg-primary/30 group-hover:w-24 transition-all duration-500" />
                    <p className="text-slate-500 font-medium leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div 
              variants={itemVariants}
              className="mt-12 p-8 bg-accent rounded-3xl text-center space-y-4"
            >
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Last Updated</p>
              <p className="text-white text-xl font-black italic uppercase">February 05, 2026</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

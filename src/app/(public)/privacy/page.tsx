"use client";

import { motion, Variants } from "framer-motion";
import { PageHero } from "@/src/components/ui/page-hero";
import { 
  Eye, 
  Database, 
  UserCheck, 
  Globe, 
  Cookie, 
  Mail 
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function PrivacyPage() {
  const policies = [
    {
      icon: Eye,
      title: "Data Observation",
      description: "Golden First Contracting collects minimal information required to provide premium services. This includes contact details for briefing requests and technical telemetry during portal interaction to optimize your experience."
    },
    {
      icon: Database,
      title: "Secure Architecture",
      description: "All sensitive client data is stored on encrypted, sovereign cloud infrastructure by Golden First Contracting. We employ military-grade security protocols to ensure your institutional information remains a closed-circuit asset."
    },
    {
      icon: UserCheck,
      title: "User Rights",
      description: "You retain full control over your digital footprint. Under Saudi Data Privacy protection laws, you may at any time request access to, correction of, or deletion of your personal records."
    },
    {
      icon: Globe,
      title: "Third-Party Sharing",
      description: "Golden First Contracting Management never commoditizes your data. We share information only with authorized government entities or strategic partners strictly as required for operational mission success."
    },
    {
      icon: Cookie,
      title: "Cookie Intelligence",
      description: "Our portal uses advanced cookies to recognize returning personnel and remember preferences. These are managed through our secure session headers and do not track external browsing history."
    },
    {
      icon: Mail,
      title: "Contact Protocols",
      description: "For any privacy-related inquiries or technical data audits, please contact our Legal Data Officer directly at privacy@goldenfirstcontracting.com. We respond to all formal requests within 48 operational hours."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <PageHero 
        badge="Asset Protection"
        title="Privacy"
        highlight="Protocol."
        description="Defining how we safeguard institutional data and client intelligence in the digital infrastructure sphere."
        watermark="Security"
        centered
        breadcrumb={[{ label: "Privacy", href: "/privacy" }]}
      />

      <section className="py-24 relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {policies.map((policy, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700"
              >
                <div className="space-y-6">
                  <div className="size-14 rounded-2xl bg-white text-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <policy.icon className="size-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-accent uppercase tracking-tighter italic group-hover:text-primary transition-colors">
                      {policy.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                      {policy.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Institutional Stamp */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-12 rounded-[4rem] bg-linear-to-br from-accent to-slate-900 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 space-y-6">
               <div className="size-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto border border-white/20">
                  <ShieldCheck className="size-10 text-primary" />
               </div>
               <div className="space-y-2">
                  <h4 className="text-white text-3xl font-black uppercase tracking-tighter italic">Operational Integrity Verified</h4>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-xs">Certified for State-Level Enterprise Protection</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

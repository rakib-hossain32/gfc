import { ServiceDetailsClient } from "@/src/components/blocks/ServiceDetailsClient";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Wrench, Droplets, HardHat, Briefcase, ArrowRight } from "lucide-react";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, " ");

  return (
    <>
      <ServiceDetailsClient slug={slug} formattedTitle={formattedTitle} />
      
      {/* --- BOTTOM CTA STRIP --- */}
      <section className="py-20 border-t border-slate-100 bg-slate-50">
         <div className="container px-4 md:px-6 mx-auto text-center">
            <h2 className="text-3xl font-black text-accent mb-10">Explore Our Other Capabilites.</h2>
            <div className="flex flex-wrap justify-center gap-4">
               {[
                 { name: "Maintenance", icon: Wrench, link: "/services/maintenance" },
                 { name: "Cleaning", icon: Droplets, link: "/services/cleaning" },
                 { name: "Manpower", icon: HardHat, link: "/services/manpower" },
                 { name: "Logistics", icon: Briefcase, link: "/services/logistics" }
               ].map((nav, i) => (
                  <Button key={i} variant="outline" asChild className="rounded-full h-12 bg-white border-slate-200 hover:border-primary transition-all">
                     <Link href={nav.link} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <nav.icon className="size-4 text-primary" /> {nav.name}
                     </Link>
                  </Button>
               ))}
            </div>
         </div>
      </section>
    </>
  );
}

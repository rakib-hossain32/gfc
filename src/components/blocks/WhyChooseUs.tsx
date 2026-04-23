import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#f8f9fa] overflow-hidden min-h-85 flex items-center">
      {/* Left text content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="flex items-center">
          <div className="w-full lg:w-1/2 py-10 md:py-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Why Choose GFC?
              </h2>

              <div className="space-y-3 text-gray-500 text-sm leading-relaxed max-w-md mb-6">
                <p>
                  We deliver end-to-end facility management and corporate services across Saudi Arabia —
                  from maintenance and cleaning to manpower supply and construction. Our teams are
                  trained, vetted, and deployed with precision to meet the demands of commercial,
                  residential, and industrial clients.
                </p>
                <p>
                  Every project we take on is backed by a commitment to quality, speed, and
                  accountability. Property owners, businesses, and government entities trust Golden First
                  because we show up, we deliver, and we stand behind our work.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-black">
                  Download Our Profile
                </h3>
                <Button
                  asChild
                  className="bg-[#0a1128] hover:bg-[#15234d] text-white px-7 h-10 rounded-full text-sm font-medium transition-all shadow-md"
                >
                  <Link href="/Profile of Golden First.pdf">
                    Download Arabic/English
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right image — absolutely positioned, right side, circular clip */}
      <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:flex items-center justify-end">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
        >
         

          {/* Building image clipped to circle/ellipse */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: 'ellipse(72% 85% at 90% 50%)',
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
              alt="Modern Architecture"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

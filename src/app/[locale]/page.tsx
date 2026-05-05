"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import DAppInterface from "@/components/DAppInterface";
import { Scan, Shield, Droplets } from "lucide-react";

export default function Home() {
  const t = useTranslations('home');
  const tl = useTranslations('lore');

  const loreSteps = [
    {
      title: tl('step1Title'),
      desc: tl('step1Desc'),
      icon: <Scan className="w-8 h-8 text-primary" />
    },
    {
      title: tl('step2Title'),
      desc: tl('step2Desc'),
      icon: <Shield className="w-8 h-8 text-primary" />
    },
    {
      title: tl('step3Title'),
      desc: tl('step3Desc'),
      icon: <Droplets className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <main className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <Hero />

      {/* dApp Section */}
      <DAppInterface />

      {/* Lore / How It Works */}
      <section id="manifesto" className="w-full max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 uppercase tracking-tighter">The Path of Restoration</h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {loreSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group p-10 bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500 text-center"
            >
              <div className="mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">{step.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="w-full py-32 bg-primary/5 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-3xl md:text-5xl font-bold text-white leading-tight italic tracking-tighter">
                "We don't discard code because it is flawed—we restore it."
            </p>
        </div>
      </section>
    </main>
  );
}


"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ManifestoNavbar, ManifestoFooter } from "@/components/ManifestoLayout";
import { ShieldCheck, Cpu, Droplets, Users, ArrowRight } from "lucide-react";

export default function ManifestoPage() {
    const t = useTranslations("manifesto");

    const pillars = [
        { title: t("pillar1Title"), desc: t("pillar1Desc"), icon: <Droplets className="w-6 h-6 text-primary" /> },
        { title: t("pillar2Title"), desc: t("pillar2Desc"), icon: <Cpu className="w-6 h-6 text-primary" /> },
        { title: t("pillar3Title"), desc: t("pillar3Desc"), icon: <ShieldCheck className="w-6 h-6 text-primary" /> },
        { title: t("pillar4Title"), desc: t("pillar4Desc"), icon: <Users className="w-6 h-6 text-primary" /> },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
            <ManifestoNavbar />

            <main className="pt-40 pb-32">
                {/* Hero Section */}
                <section className="max-w-5xl mx-auto px-6 text-center mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-8xl font-bold mb-8 uppercase tracking-tighter">
                            {t('title')}
                        </h1>
                        <p className="text-primary font-bold uppercase tracking-[0.3em] mb-16 text-xs md:text-sm">
                            {t('subtitle')}
                        </p>
                        
                        <div className="w-24 h-[1px] bg-white/20 mx-auto mb-16" />

                        <blockquote className="text-2xl md:text-4xl font-medium italic leading-tight text-white/80 max-w-4xl mx-auto">
                            "{t('quote')}"
                        </blockquote>
                    </motion.div>
                </section>

                {/* The Four Pillars */}
                <section className="max-w-6xl mx-auto px-6 mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                        {pillars.map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="bg-black p-12 md:p-20 hover:bg-white/[0.02] transition-colors group"
                            >
                                <div className="mb-8">{pillar.icon}</div>
                                <h3 className="text-primary text-xl font-bold mb-6 uppercase tracking-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-white/40 leading-relaxed text-lg font-medium">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Detailed Sections: Lineage & Vision */}
                <section className="max-w-5xl mx-auto px-6 mb-40 space-y-40">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-primary">
                                {t('lineageTitle')}
                            </h2>
                            <p className="text-white/60 text-xl leading-relaxed font-medium italic">
                                {t('lineageText')}
                            </p>
                        </div>
                        <div className="aspect-square bg-gradient-to-br from-primary/10 to-transparent border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                            <div className="absolute inset-0 flex items-center justify-center text-primary/20 text-9xl font-black opacity-10 select-none">金</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
                    >
                        <div className="order-2 md:order-1 aspect-video bg-gradient-to-bl from-primary/5 to-transparent border border-white/5 relative overflow-hidden group">
                             <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-1/2 h-[1px] bg-primary/20 animate-pulse" />
                             </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter text-primary">
                                {t('visionTitle')}
                            </h2>
                            <p className="text-white/60 text-xl leading-relaxed font-medium italic">
                                {t('visionText')}
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* CTA Section */}
                <section className="max-w-5xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="py-32 border-y border-white/5"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold mb-16 uppercase tracking-tighter">
                            {t('ctaText')}
                        </h2>
                        
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors flex items-center justify-center gap-2 group">
                                {t('ctaDocs')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-12 py-5 border border-primary text-primary font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-black transition-all">
                                {t('ctaRestore')}
                            </button>
                        </div>
                    </motion.div>
                </section>
            </main>

            <ManifestoFooter />
        </div>
    );
}

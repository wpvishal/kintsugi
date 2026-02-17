"use client";

import { motion } from "framer-motion";
import { Shield, Users, Coins, Activity, Search } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function BentoGrid() {
    const t = useTranslations("bento");

    const recentRepairs = [
        // Placeholder for Phase 1 - No live data yet
    ];

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-32">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-serif font-bold text-center mb-16 text-foreground"
            >
                {t("ecosystemTitle")}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Pillar 1: The Sensei */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative group overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-8 flex flex-col hover:border-primary/50 transition-colors min-h-[300px]"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                        <Search className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-foreground mb-3">{t("senseiTitle")}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{t("senseiDesc")}</p>

                    {/* Decorative Code Snippet */}
                    <div className="mt-6 border-t border-primary/10 pt-4 font-mono text-xs text-primary/60">
                        {t("scanInit")}
                    </div>

                    <Link href="/scanner" className="absolute inset-0 z-20" />
                </motion.div>

                {/* Pillar 2: The Assembly */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative group overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-8 flex flex-col hover:border-primary/50 transition-colors min-h-[300px]"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/washi.png')] opacity-5" />
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-foreground mb-3">{t("assemblyTitle")}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{t("assemblyDesc")}</p>

                    <div className="mt-6 border-t border-primary/10 pt-4 font-serif text-xs text-primary/60 italic">
                        VOX POPULI, VOX DEI
                    </div>

                    <Link href="/vote" className="absolute inset-0 z-20" />
                </motion.div>

                {/* Pillar 3: The Treasury */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative group overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-8 flex flex-col hover:border-primary/50 transition-colors min-h-[300px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                        <Coins className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-foreground mb-3">{t("treasuryTitle")}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{t("treasuryDesc")}</p>

                    <div className="mt-6 border-t border-primary/10 pt-4 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest text-primary/60">{t("treasuryTVR")}</span>
                        <span className="font-mono text-primary font-bold">$100,000+</span>
                    </div>

                    <Link href="/vault" className="absolute inset-0 z-20" />
                </motion.div>

            </div>
        </section>
    );
}

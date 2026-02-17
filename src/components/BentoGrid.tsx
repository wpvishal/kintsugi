"use client";

import { motion } from "framer-motion";
import { Shield, Users, Coins, Activity, Search } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function BentoGrid() {
    const t = useTranslations("bento");

    const recentRepairs = [
        { name: "$BONK", status: t("statusRestored") },
        { name: "$WIF", status: t("statusPolished") },
        { name: "$SAMO", status: t("statusFused") },
        { name: "$POPCAT", status: t("statusGoldLeafed") },
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

                {/* Card 1: The Sensei (Tall) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:row-span-2 relative group overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-between hover:border-primary/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                            <Search className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-serif text-foreground mb-2">{t("senseiTitle")}</h3>
                        <p className="text-sm text-muted-foreground">{t("senseiDesc")}</p>
                    </div>

                    {/* Mock Scanner Preview */}
                    <div className="mt-6 w-full h-40 bg-black/40 rounded border border-primary/10 p-3 font-mono text-[10px] text-muted-foreground overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                        <p className="text-primary/70">{t("scanInit")}</p>
                        <p>{t("scanAddress")}</p>
                        <p className="text-red-400">{t("scanAlert")}</p>
                        <p>{t("scanLiquidity")}</p>
                        <p className="text-green-400">{t("scanLocked")}</p>
                        <p>{t("scanCalc")}</p>
                        <div className="mt-2 text-2xl font-bold text-primary animate-pulse">88/100</div>
                    </div>

                    <Link href="/scanner" className="absolute inset-0 z-20" />
                </motion.div>

                {/* Card 2: Live Feed (Small) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col hover:border-primary/50 transition-colors"
                >
                    <div className="flex items-center gap-3 mb-4 text-primary">
                        <Activity className="w-5 h-5" />
                        <h3 className="text-sm font-serif uppercase tracking-widest text-muted-foreground">{t("recentRepairs")}</h3>
                    </div>
                    <div className="space-y-3 overflow-hidden mask-gradient-b">
                        {recentRepairs.map((token, i) => (
                            <div key={i} className="flex justify-between items-center text-xs font-mono">
                                <span className="text-foreground/80 text-nowrap">{token.name}</span>
                                <div className="h-[1px] flex-1 mx-2 bg-primary/10" />
                                <span className="text-primary">{token.status}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Card 3: The Treasury (Wide) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 relative group overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-500">
                        <Coins className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif text-foreground mb-1">{t("treasuryTitle")}</h3>
                    <div className="text-4xl md:text-5xl font-mono text-primary font-bold tracking-tighter my-2">
                        $4,821,902
                    </div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">{t("treasuryTVR")}</p>

                    <Link href="/vault" className="absolute inset-0 z-20" />
                </motion.div>

                {/* Card 4: Community (Square) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="relative group overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/washi.png')] opacity-10" />
                    <Users className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-lg font-serif text-foreground mb-4">{t("communityTitle")}</h3>
                    <a
                        href="https://discord.gg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border border-primary text-primary text-xs uppercase tracking-widest hover:bg-primary hover:text-black transition-colors z-10"
                    >
                        {t("communityBtn")}
                    </a>
                </motion.div>

                {/* Card 5: Security (Small) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="relative overflow-hidden rounded-sm border border-primary/20 bg-card/50 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors"
                >
                    <Shield className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-sm font-serif text-foreground">{t("securityTitle")}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{t("securityDesc")}</p>
                </motion.div>

            </div>
        </section>
    );
}

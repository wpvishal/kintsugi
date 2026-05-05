"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function DAppInterface() {
    const t = useTranslations("home");

    const stats = [
        { label: t("statsScans"), value: "1,284", icon: <BarChart3 className="w-5 h-5 text-primary" /> },
        { label: t("statsRestored"), value: "12.5M TON", icon: <Zap className="w-5 h-5 text-primary" /> },
        { label: t("statsGovernance"), value: "840K $GOLD", icon: <ShieldCheck className="w-5 h-5 text-primary" /> },
    ];

    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-1 md:p-2 overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-primary/40" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-primary/40" />
                
                <div className="bg-black/40 p-8 md:p-12 border border-white/5 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 text-left">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-2">
                                <Cpu className="w-6 h-6 animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-[0.3em]">AI-Powered Restoration</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('dappTitle')}</h2>
                            <p className="text-white/40 font-medium max-w-md">{t('dappSubtitle')}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col items-center md:items-start">
                                    <div className="mb-2 opacity-50">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* The Scan Terminal Visualization */}
                    <div className="w-full h-48 bg-black/60 border border-white/5 mb-12 relative overflow-hidden font-mono text-[10px] p-4 text-primary/40">
                        <div className="space-y-1">
                            <p>{">"} INITIALIZING SENSEI ENGINE...</p>
                            <p>{">"} SCANNING TON BLOCKCHAIN... [OK]</p>
                            <p>{">"} DETECTING FRACTURED CONTRACTS... [12 FOUND]</p>
                            <p>{">"} ANALYZING BYTECODE VULNERABILITIES...</p>
                            <p className="text-primary">{">"} TARGET ACQUIRED: 0xEQB...4f2</p>
                            <p>{">"} CALCULATING RESTORATION POTENTIAL: 94.2%</p>
                        </div>
                        <div className="absolute bottom-0 right-0 w-full h-1 bg-white/5">
                            <motion.div 
                                className="h-full bg-primary" 
                                animate={{ width: ["0%", "100%"] }} 
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>

                    <button className="w-full py-8 bg-primary hover:bg-[#FFC033] text-black font-black text-2xl uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_50px_rgba(255,176,0,0.2)] hover:shadow-[0_0_80px_rgba(255,176,0,0.4)]">
                        {t('ctaRestore')}
                    </button>
                </div>
            </motion.div>
        </section>
    );
}

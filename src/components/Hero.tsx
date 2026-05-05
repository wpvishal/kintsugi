"use client";

import { ArrowRight, BookOpen, Lock as LockIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    const t = useTranslations("home");

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden w-full">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        <span className="block text-white">{t('heroTitle')}</span>
                        <span className="block text-primary italic drop-shadow-[0_0_30px_rgba(255,176,0,0.5)]">
                            {t('heroTitleAccent')}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                        {t('heroSubtitle')}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        {/* Locked Connect Button */}
                        <button
                            disabled
                            className="group relative px-10 py-5 border border-white/10 text-white/20 font-bold uppercase tracking-widest cursor-not-allowed flex items-center gap-3 overflow-hidden"
                        >
                            <LockIcon className="w-5 h-5 opacity-40" />
                            <span className="relative z-10">{t('ctaConnect')}</span>
                            <div className="absolute inset-0 bg-white/[0.02]" />
                        </button>

                        {/* Linked Manifesto Button */}
                        <Link
                            href="/manifesto"
                            className="px-10 py-5 bg-white/5 border border-white/10 text-white/80 hover:text-primary hover:border-primary/50 transition-all duration-300 uppercase tracking-widest font-bold flex items-center gap-3 group"
                        >
                            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {t('ctaManifesto')}
                        </Link>
                    </div>

                    <div className="mt-16 flex flex-col items-center gap-4">
                        <Link 
                            href="/manifesto" 
                            className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-primary transition-all duration-500"
                        >
                            <span className="w-12 h-[1px] bg-white/5 group-hover:bg-primary/40 group-hover:w-16 transition-all" />
                            The Manifesto
                            <span className="w-12 h-[1px] bg-white/5 group-hover:bg-primary/40 group-hover:w-16 transition-all" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-primary to-transparent" />
            </div>
        </section>
    );
}


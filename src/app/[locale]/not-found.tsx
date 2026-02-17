"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-foreground relative overflow-hidden p-6 text-center">

            {/* Kiln Atmosphere - Warm inner glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 space-y-8 max-w-lg"
            >
                {/* 404 Kanji/Text */}
                <div className="font-serif text-primary/20 text-9xl font-bold select-none blur-[1px]">
                    無
                </div>

                <h2 className="text-3xl font-serif text-primary">
                    404 - Vessel Shattered
                </h2>

                <div className="w-16 h-[1px] bg-primary/30 mx-auto" />

                <p className="text-muted-foreground font-light text-lg leading-relaxed">
                    This vessel has returned to the earth. <br />
                    The path you seek is no longer here.
                </p>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium text-lg rounded-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Return to the Source</span>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

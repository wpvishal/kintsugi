"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Trash2, Flame, Droplets, ChevronDown, MoveDown, Twitter, ExternalLink, Box, Activity, Zap } from "lucide-react";
import CrucibleNavbar from "@/components/CrucibleNavbar";
import { Geist } from "next/font/google";

const geist = Geist({
    subsets: ["latin"],
});

export default function CruciblePage() {
    const t = useTranslations("crucible");
    const [isBurning, setIsBurning] = useState(false);
    const [selectedToken, setSelectedToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const furnaceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scrollToFurnace = () => {
        furnaceRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleBurn = () => {
        if (!selectedToken) return;
        setIsBurning(true);
        setTimeout(() => setIsBurning(false), 3000);
    };

    if (!mounted) return null;

    return (
        <main className={`bg-black text-white min-h-screen overflow-x-hidden ${geist.className} selection:bg-[#FFB000]/30 selection:text-[#FFB000]`}>
            <CrucibleNavbar />

            {/* Anti-Gravity Vortex Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111111_0%,_#000000_70%)] opacity-60" />
                <div className="absolute inset-0 bg-black" />

                {/* Subtle Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-px h-px bg-white/20"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0
                        }}
                        animate={{
                            y: [0, -100, -200],
                            opacity: [0, 0.4, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* The Central Void Gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFB000]/5 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10">

                {/* Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 leading-tight">
                            {t("heroTitle")}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                            {t("heroSubtitle")}
                        </p>

                        <motion.button
                            onClick={scrollToFurnace}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-5 bg-transparent border border-white/20 rounded-sm overflow-hidden transition-all duration-500 hover:border-[#FFB000]"
                        >
                            <div className="absolute inset-0 bg-[#FFB000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10 text-lg uppercase tracking-[0.2em] font-medium group-hover:text-black transition-colors duration-500">
                                {t("ctaHero")}
                            </span>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-10"
                    >
                        <MoveDown className="w-6 h-6 text-white/20" />
                    </motion.div>
                </section>

                {/* The dApp Interface (Furnace) */}
                <section ref={furnaceRef} className="min-h-screen py-32 px-6 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full max-w-2xl relative"
                    >
                        {/* Decorative Gradient Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-[#FFB000]/10 to-transparent blur-3xl -z-10" />

                        <div className="bg-black border border-white/10 rounded-sm p-10 md:p-16 backdrop-blur-xl group">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-2xl font-serif uppercase tracking-widest text-white/80">
                                    {t("furnaceTitle")}
                                </h2>
                                <Flame className={`w-6 h-6 ${isBurning ? "text-[#FFB000] animate-pulse" : "text-white/20"}`} />
                            </div>

                            {/* Select Token Area */}
                            <div className="space-y-8 mb-16">
                                <div className="space-y-3">
                                    <label className="text-xs uppercase tracking-widest text-white/40 block ml-1">
                                        {t("selectToken")}
                                    </label>
                                    <div className="relative group">
                                        <select
                                            onChange={(e) => setSelectedToken(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 appearance-none focus:outline-none focus:border-[#FFB000]/50 transition-colors cursor-pointer text-white/80"
                                        >
                                            <option value="" disabled selected className="bg-black">-- Select Dead Asset --</option>
                                            <option value="rug1" className="bg-black">DeadPuppy (DPY) - Rugged</option>
                                            <option value="rug2" className="bg-black">MoonSafe (MS) - Scam</option>
                                            <option value="rug3" className="bg-black">NullToken (NULL) - Dead</option>
                                        </select>
                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none group-hover:text-[#FFB000] transition-colors" />
                                    </div>
                                </div>

                                {/* Dynamic Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-6 rounded-sm border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{t("tokensReady")}</p>
                                        <p className="text-2xl font-mono text-white/80">{selectedToken ? "1" : "0"}</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-sm border border-white/5 group-hover:border-[#FFB000]/20 transition-colors">
                                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{t("estimatedAsh")}</p>
                                        <p className="text-2xl font-mono text-[#FFB000]">
                                            {selectedToken ? "420.69 ASH" : "0.00 ASH"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Initiate Burn Button */}
                            <motion.button
                                onClick={handleBurn}
                                disabled={!selectedToken || isBurning}
                                whileHover={selectedToken && !isBurning ? { scale: 1.02 } : {}}
                                whileTap={selectedToken && !isBurning ? { scale: 0.98 } : {}}
                                className={`w-full py-6 rounded-sm font-bold tracking-[0.3em] uppercase transition-all duration-700 relative overflow-hidden
                                    ${selectedToken && !isBurning
                                        ? "bg-[#FFB000] text-black shadow-[0_0_40px_-10px_#FFB000]"
                                        : "bg-white/5 text-white/20 cursor-not-allowed border border-white/10"}
                                `}
                            >
                                <AnimatePresence mode="wait">
                                    {isBurning ? (
                                        <motion.div
                                            key="burning"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center justify-center gap-3"
                                        >
                                            <Flame className="w-5 h-5 animate-bounce" />
                                            <span>DESTABILIZING ASSET...</span>
                                        </motion.div>
                                    ) : (
                                        <motion.span
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {t("initiateBurn")}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {isBurning && (
                                    <motion.div
                                        className="absolute inset-0 bg-red-600/20"
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.2, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>
                        </div>

                        {/* Token Destruction Animation Overlay */}
                        <AnimatePresence>
                            {isBurning && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 pointer-events-none"
                                >
                                    {[...Array(30)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-red-500 rounded-full"
                                            initial={{ x: "50%", y: "50%", scale: 0 }}
                                            animate={{
                                                x: `${Math.random() * 100}%`,
                                                y: `${Math.random() * 100}%`,
                                                scale: [0, 2, 0],
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </section>

                {/* Lore / How It Works */}
                <section className="py-32 px-10 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-16 md:gap-8">
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mb-10 group-hover:border-[#FFB000]/50 transition-colors">
                                <Box className="w-5 h-5 text-white/40 group-hover:text-[#FFB000] transition-colors" />
                            </div>
                            <h3 className="text-xl font-serif font-bold uppercase tracking-widest mb-6">
                                {t("step1Title")}
                            </h3>
                            <p className="text-white/50 leading-relaxed font-light">
                                {t("step1Desc")}
                            </p>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mb-10 group-hover:border-red-500/50 transition-colors">
                                <Flame className="w-5 h-5 text-white/40 group-hover:text-red-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-serif font-bold uppercase tracking-widest mb-6">
                                {t("step2Title")}
                            </h3>
                            <p className="text-white/50 leading-relaxed font-light">
                                {t("step2Desc")}
                            </p>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center mb-10 group-hover:border-[#FFB000]/50 transition-colors">
                                <Droplets className="w-5 h-5 text-white/40 group-hover:text-[#FFB000] transition-colors" />
                            </div>
                            <h3 className="text-xl font-serif font-bold uppercase tracking-widest mb-6">
                                {t("step3Title")}
                            </h3>
                            <p className="text-white/50 leading-relaxed font-light">
                                {t("step3Desc")}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="py-20 px-10 border-t border-white/5">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left Side: Counter & Return */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="text-center md:text-left">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                                    {t("footerCounter")}
                                </p>
                                <p className="text-3xl font-mono text-white/80">
                                    00,000,000
                                </p>
                            </div>
                            <Link href="/" className="text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2">
                                {t("footerReturn")}
                            </Link>
                        </div>

                        {/* Mid Side: Links */}
                        <div className="flex items-center gap-10">
                            {[
                                { text: t("footerDocs"), icon: ExternalLink, href: "/scroll" },
                                { text: t("footerX"), icon: Twitter, href: "https://x.com/Kintsugionsol" }
                            ].map((item) => (
                                <a
                                    key={item.text}
                                    href={item.href}
                                    className="text-xs uppercase tracking-[0.2em] text-white/30 hover:text-[#FFB000] transition-colors flex items-center gap-2"
                                >
                                    <item.icon className="w-3 h-3" />
                                    {item.text}
                                </a>
                            ))}
                        </div>

                        {/* Right Side: Logo */}
                        <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/20 font-serif text-xl">
                            金
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-white/10">
                            © 2026 THE CRUCIBLE / KINTSUGI PROTOCOL
                        </p>
                    </div>
                </footer>
            </div>
        </main>
    );
}

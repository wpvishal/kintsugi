"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ScrollText, Cpu, Coins, Sparkles, Anchor, ArrowRight, ShieldCheck } from "lucide-react";
import SupplyDial from "@/components/SupplyDial";
import { useTranslations } from "next-intl";

export default function WhitepaperPage() {
    const t = useTranslations("scroll");
    const [activeSection, setActiveSection] = useState("philosophy");
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const sections = [
        { id: "philosophy", title: t("navPhilosophy"), icon: ScrollText },
        { id: "technology", title: t("navTechnology"), icon: Cpu },
        { id: "tokenomics", title: t("navTokenomics"), icon: Coins },
        { id: "roadmap", title: t("navRoadmap"), icon: Anchor },
    ];

    // Detect active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const positions = sections.map(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return { id: section.id, top: rect.top };
                }
                return { id: section.id, top: 0 };
            });

            const current = positions.find(p => p.top >= 0 && p.top < window.innerHeight / 2) || positions[0];
            if (current) setActiveSection(current.id);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1814] font-sans overflow-x-hidden selection:bg-primary/20">
            {/* Global Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
                style={{ scaleX }}
            />

            {/* Parchment Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0 mix-blend-multiply" />

            <div className="flex relative z-10">

                {/* Mini-Map Sidebar */}
                <aside className="hidden lg:block w-24 h-screen sticky top-0 border-r border-primary/10 bg-[#FDFBF7]/80 backdrop-blur-sm flex flex-col items-center py-24 z-40">
                    <nav className="flex flex-col gap-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-primary/10" />

                        {sections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="relative group z-10"
                                    title={section.title}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border",
                                        isActive
                                            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-110"
                                            : "bg-[#FDFBF7] text-muted-foreground border-primary/20 hover:border-primary/50"
                                    )}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* Tooltip Label */}
                                    <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#1a1814] text-[#FDFBF7] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {section.title}
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 max-w-4xl mx-auto px-6 py-24 space-y-32">

                    {/* Philosophy Section */}
                    <section id="philosophy" className="scroll-mt-32 space-y-8">
                        <MendingContainer>
                            <span className="text-xs font-mono text-primary uppercase tracking-widest">{t("s1Label")}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1814] mt-4 mb-8 leading-tight">
                                {t("s1Title1")} <br />
                                <span className="text-primary italic">{t("s1Title2")}</span>
                            </h2>
                            <div className="prose prose-lg text-muted-foreground leading-relaxed">
                                <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-primary first-letter:float-left first-letter:mr-3 text-justify">
                                    {t("s1P1")}
                                </p>
                                <p className="text-justify">{t.rich("s1P2", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
                                <p className="text-justify">{t.rich("s1P3", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
                                <p className="text-justify">
                                    {t("s1P4")}
                                </p>
                            </div>
                        </MendingContainer>
                    </section>

                    {/* Technology Section */}
                    <section id="technology" className="scroll-mt-32 space-y-12">
                        <MendingContainer>
                            <span className="text-xs font-mono text-primary uppercase tracking-widest">{t("s2Label")}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1814] mt-4 mb-8 leading-tight">
                                {t("s2Title1")} <br />
                                <span className="text-primary italic">{t("s2Title2")}</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="p-8 border border-primary/10 rounded-sm bg-white/50 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <BrainCircuitIcon className="w-24 h-24" />
                                    </div>
                                    <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        {t("s2Card1Title")}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{t.rich("s2Card1Desc", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
                                    <ul className="list-disc pl-5 mt-4 text-sm text-muted-foreground space-y-1">
                                        <li>{t("s2Card1Li1")}</li>
                                        <li>{t("s2Card1Li2")}</li>
                                        <li>{t("s2Card1Li3")}</li>
                                    </ul>
                                </div>

                                <div className="p-8 border border-primary/10 rounded-sm bg-white/50 backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <ShieldCheckIcon className="w-24 h-24" />
                                    </div>
                                    <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        {t("s2Card2Title")}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{t.rich("s2Card2Desc", { strong: (chunks) => <strong>{chunks}</strong> })}</p>
                                    <ul className="list-disc pl-5 mt-4 text-sm text-muted-foreground space-y-1">
                                        <li>{t.rich("s2Card2Li1", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                                        <li>{t.rich("s2Card2Li2", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                                        <li>{t.rich("s2Card2Li3", { strong: (chunks) => <strong>{chunks}</strong> })}</li>
                                    </ul>
                                </div>
                            </div>
                        </MendingContainer>
                    </section>

                    {/* Tokenomics Section */}
                    <section id="tokenomics" className="scroll-mt-32 space-y-12">
                        <MendingContainer>
                            <span className="text-xs font-mono text-primary uppercase tracking-widest">{t("s3Label")}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1814] mt-4 mb-4 leading-tight">
                                {t("s3Title1")} <br />
                                <span className="text-primary italic">{t("s3Title2")}</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">{t.rich("s3Intro", { strong: (chunks) => <strong>{chunks}</strong> })}</p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                                <div className="space-y-8">

                                    {/* Supply & Tax */}
                                    <div className="p-6 bg-white/50 border border-primary/10 rounded-sm space-y-4">
                                        <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                                            <span className="font-serif font-bold text-[#1a1814]">{t("s3TotalSupply")}</span>
                                            <span className="font-mono text-primary">100,000,000 $GOLD</span>
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-[#1a1814] mb-2">{t("s3TaxTitle")}</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li className="flex justify-between"><span>{t("s3TaxBurn")}</span> <span className="text-[#1a1814]">2%</span></li>
                                                <li className="flex justify-between"><span>{t("s3TaxTreasury")}</span> <span className="text-[#1a1814]">2%</span></li>
                                                <li className="flex justify-between"><span>{t("s3TaxOps")}</span> <span className="text-[#1a1814]">1%</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Allocation */}
                                    <div className="space-y-4">
                                        <h4 className="font-serif font-bold text-[#1a1814] px-1">{t("s3AllocTitle")}</h4>
                                        <div className="space-y-3">
                                            <AllocationBar label={t("s3Alloc1")} percent={50} color="bg-primary" />
                                            <AllocationBar label={t("s3Alloc2")} percent={20} color="bg-primary/70" />
                                            <AllocationBar label={t("s3Alloc3")} percent={15} color="bg-primary/40" />
                                            <AllocationBar label={t("s3Alloc4")} percent={15} color="bg-primary/20" />
                                        </div>
                                    </div>

                                    {/* Utility List */}
                                    <div className="pt-4 border-t border-primary/10">
                                        <h4 className="font-serif font-bold text-[#1a1814] mb-2">{t("s3UtilTitle")}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[t("s3Util1"), t("s3Util2"), t("s3Util3")].map((u, i) => (
                                                <span key={i} className="text-xs border border-primary/20 px-2 py-1 rounded text-muted-foreground">{u}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Supply Dial */}
                                <div className="relative pt-8 lg:pt-0">
                                    <SupplyDial />
                                    <p className="text-center text-xs text-muted-foreground mt-4 italic max-w-xs mx-auto">
                                        {t("s3DialNote")}
                                    </p>
                                </div>
                            </div>
                        </MendingContainer>
                    </section>

                    {/* Roadmap Section */}
                    <section id="roadmap" className="scroll-mt-32 pb-32">
                        <MendingContainer>
                            <span className="text-xs font-mono text-primary uppercase tracking-widest">{t("s4Label")}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1814] mt-4 mb-8 leading-tight">
                                {t("s4Title1")} <br />
                                <span className="text-primary italic">{t("s4Title2")}</span>
                            </h2>

                            <RoadmapTimeline t={t} />

                        </MendingContainer>
                    </section>
                </main>
            </div>
        </div>
    );
}

// Separate component for the Roadmap to handle its own scroll logic cleaner
function RoadmapTimeline({ t }: { t: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const pathHeight = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30
    });

    const phases = [
        { phase: t("s4Phase1"), quarter: t("s4Phase1Q"), desc: t("s4Phase1Desc"), status: "completed" },
        { phase: t("s4Phase2"), quarter: t("s4Phase2Q"), desc: t("s4Phase2Desc"), status: "active" },
        { phase: t("s4Phase3"), quarter: t("s4Phase3Q"), desc: t("s4Phase3Desc"), status: "future" },
    ];

    return (
        <div ref={ref} className="relative pl-8 space-y-24">
            {/* Base Line */}
            <div className="absolute left-[3px] top-0 bottom-0 w-[2px] bg-primary/10" />

            {/* Glowing Active Line */}
            <motion.div
                style={{ scaleY: pathHeight }}
                className="absolute left-[3px] top-0 w-[2px] bg-primary origin-top shadow-[0_0_10px_#D4AF37]"
            />

            {phases.map((item, i) => (
                <div key={i} className="relative">
                    <span className={cn(
                        "absolute -left-[37px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center bg-[#FDFBF7] z-10",
                        item.status === "completed" ? "border-primary" : "border-primary/30"
                    )}>
                        <div className={cn("w-2 h-2 rounded-full", item.status === "completed" || item.status === "active" ? "bg-primary" : "bg-transparent")} />
                    </span>

                    <h4 className="font-serif text-2xl mb-1">{item.phase}</h4>
                    <span className="text-xs text-primary uppercase tracking-widest mb-3 block">{item.quarter}</span>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{item.desc}</p>
                </div>
            ))}
        </div>
    );
}

// "Mending Container" - Animates golden cracks/lines on scroll
function MendingContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative p-1"
        >
            {/* Golden Lines Animation */}

            {/* Top Border */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
            />

            {/* Bottom Border */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent origin-right"
            />

            {/* Left Border (Partial) */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-primary/50 to-transparent origin-top"
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Gold Fill Effect (Background) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute inset-0 bg-primary -z-0 blur-xl"
            />
        </motion.div>
    );
}

function ShieldCheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function AllocationBar({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-mono text-[#1a1814]">{percent}%</span>
            </div>
            <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    );
}

function BrainCircuitIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0 .54 3.09 2.5 2.5 0 0 0-.66 3.1 2.5 2.5 0 0 0 2.57 1.34 2.5 2.5 0 0 0 2.57 3.32 2.5 2.5 0 0 0 4.14 0 2.5 2.5 0 0 0 2.57-3.32 2.5 2.5 0 0 0 2.57-1.34 2.5 2.5 0 0 0-.66-3.1 2.5 2.5 0 0 0 .54-3.09 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.96.46Z" />
            <path d="M12 12V6" />
            <path d="m15 15-2-1" />
            <path d="m9 15 2-1" />
        </svg>
    );
}

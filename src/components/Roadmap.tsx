"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Check, Circle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Roadmap() {
    const ref = useRef<HTMLDivElement>(null);
    const t = useTranslations("roadmap");
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const milestones = [
        { quarter: "Q1", title: t("q1Title"), desc: t("q1Desc"), status: t("q1Status") },
        { quarter: "Q2", title: t("q2Title"), desc: t("q2Desc"), status: t("q2Status") },
        { quarter: "Q3", title: t("q3Title"), desc: t("q3Desc"), status: t("q3Status") },
        { quarter: "Q4", title: t("q4Title"), desc: t("q4Desc"), status: t("q4Status") },
    ];

    return (
        <section ref={ref} className="w-full max-w-4xl mx-auto px-6 py-32 relative">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-serif font-bold text-center mb-24 text-foreground"
            >
                {t("title")}
            </motion.h2>

            <div className="relative">
                {/* Central Line Base */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 md:-translate-x-1/2" />

                {/* Filling Golden Line */}
                <motion.div
                    className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-primary md:-translate-x-1/2 origin-top shadow-[0_0_10px_var(--primary)]"
                    style={{ height: "100%", scaleY }}
                />

                <div className="space-y-12">
                    {milestones.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <Milestone
                                key={index}
                                item={item}
                                index={index}
                                isEven={isEven}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function Milestone({ item, index, isEven }: { item: any, index: number, isEven: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex items-start md:items-center gap-8 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            {/* Timeline Node */}
            <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_var(--primary)] relative">
                    {index === 0 && (
                        <div className="absolute inset-0 bg-primary rounded-full animate-pulse" />
                    )}
                </div>
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <span>{item.quarter}</span>
                        <span className="w-4 h-[1px] bg-primary/50" />
                        <span>{item.status}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            </div>

            {/* Empty Side for Desktop alignment */}
            <div className="hidden md:block w-1/2" />
        </motion.div>
    );
}

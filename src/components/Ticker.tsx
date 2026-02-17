"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Ticker() {
    const t = useTranslations("ticker");

    const tickerItems = [
        { name: "SOL-PEPE", score: 84, status: t("worthy") },
        { name: "SCAM-COIN", score: 12, status: t("poisoned") },
        { name: "KINT-SUGI", score: 99, status: t("pristine") },
        { name: "DOGE-GOLD", score: 72, status: t("worthy") },
        { name: "RUG-PULL", score: 5, status: t("terminal") },
        { name: "SAFE-MOON", score: 45, status: t("fractured") },
        { name: "BONK-DAO", score: 88, status: t("pristine") },
        { name: "MEME-KING", score: 23, status: t("poisoned") },
    ];

    return (
        <section className="w-full bg-[#050505] border-y border-primary/20 relative overflow-hidden h-12 flex items-center z-40">
            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

            {/* Marquee Container */}
            <div className="flex whitespace-nowrap overflow-hidden">
                <MarqueeContent items={tickerItems} />
                <MarqueeContent items={tickerItems} />
                <MarqueeContent items={tickerItems} />
                <MarqueeContent items={tickerItems} />
            </div>
        </section>
    );
}

function MarqueeContent({ items }: { items: { name: string, score: number, status: string }[] }) {
    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 px-6"
        >
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-xs sm:text-sm text-primary/80">
                    <span className="font-bold tracking-wider text-primary">{item.name}</span>
                    <span className="text-muted-foreground">:</span>
                    <span className={`${item.score > 70 ? "text-green-400" :
                        item.score < 30 ? "text-red-400" : "text-yellow-400"
                        }`}>{item.score}%</span>
                    <span className="text-muted-foreground">-</span>
                    <span className="uppercase tracking-widest text-[10px] opacity-70">{item.status}</span>
                </div>
            ))}
        </motion.div>
    );
}

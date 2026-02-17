"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SupplyDial() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We want the dial to animate as the user scrolls through its section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smooth physics-based spring for the dial rotation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Rotation from -90deg (start) to 90deg (end)
    const rotate = useTransform(smoothProgress, [0, 1], [-90, 90]);

    // Mock value for "Total Burned" increasing as we scroll
    const burnedValue = useTransform(smoothProgress, [0, 1], [0, 2500000]);

    return (
        <div ref={containerRef} className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center py-12">

            {/* Dial Background Container */}
            <div className="relative w-64 h-64 rounded-full border-4 border-primary/10 bg-[#FDFBF7] shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] flex items-center justify-center overflow-visible">

                {/* Ticks */}
                {Array.from({ length: 13 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-3 bg-primary/30 top-2 left-1/2 -translate-x-1/2 transition-opacity"
                        style={{
                            transformOrigin: "50% 120px",
                            transform: `rotate(${(i * 15) - 90}deg)`
                        }}
                    />
                ))}

                {/* Needle */}
                <motion.div
                    style={{ rotate }}
                    className="absolute w-1 h-28 bg-primary origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 z-10 shadow-lg"
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />
                </motion.div>

                {/* Center Cap */}
                <div className="absolute w-6 h-6 bg-[#1a1814] rounded-full z-20 border-2 border-primary" />

                {/* Labels */}
                <div className="absolute top-1/2 left-4 text-xs font-mono text-muted-foreground -translate-y-1/2 -translate-x-6">START</div>
                <div className="absolute top-1/2 right-4 text-xs font-mono text-muted-foreground -translate-y-1/2 translate-x-6">MAX</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground -translate-y-8">50%</div>

            </div>

            {/* Dynamic Value Display */}
            <div className="absolute bottom-0 left-0 right-0 text-center">
                <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">Est. Supply Burned</span>
                <span className="text-3xl font-serif text-primary font-bold tabular-nums">
                    <NumberDisplay value={burnedValue} />
                </span>
                <span className="text-sm font-serif text-primary/50 ml-1">$GOLD</span>
            </div>

        </div>
    );
}

function NumberDisplay({ value }: { value: any }) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const unsubscribe = value.on("change", (latest: number) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString();
            }
        });
        return () => unsubscribe();
    }, [value]);

    return <span ref={ref}>0</span>;
}

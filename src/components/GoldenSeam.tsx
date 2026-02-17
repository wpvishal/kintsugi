"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function GoldenSeam() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <svg
                className="absolute top-0 left-0 w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
            >
                <motion.path
                    d="M50,0 Q55,10 50,20 T50,40 Q45,50 55,60 T50,80 Q52,90 48,100"
                    fill="none"
                    stroke="url(#gold-gradient)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    style={{ pathLength: scaleX }}
                />
                <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Glow effect following the seam */}
            <motion.div
                className="absolute top-0 left-1/2 w-1 h-full bg-primary/20 blur-xl"
                style={{ scaleY: scaleX, transformOrigin: "top" }}
            />
        </div>
    );
}

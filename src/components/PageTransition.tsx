"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function PageTransition({ children }: PropsWithChildren) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="w-full min-h-screen"
            >
                {/* Fuse Effect Overlay (Gold Scan) */}
                <motion.div
                    initial={{ scaleY: 1, opacity: 1 }}
                    animate={{ scaleY: 0, opacity: 0 }}
                    exit={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "circIn" }}
                    className="fixed inset-0 bg-primary/20 z-[60] pointer-events-none origin-top"
                    style={{ backdropFilter: "blur(2px)" }}
                />

                {/* Golden Line Scanner */}
                <motion.div
                    initial={{ top: 0, opacity: 1 }}
                    animate={{ top: "100%", opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed left-0 right-0 h-[2px] bg-primary z-[61] shadow-[0_0_20px_var(--primary)] pointer-events-none px-12"
                />

                {children}
            </motion.div>
        </AnimatePresence>
    );
}

const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.98,
        filter: "blur(4px)",
    },
    in: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
    },
    out: {
        opacity: 0,
        scale: 1.02,
        filter: "blur(8px) grayscale(100%)", // "Crack" / Pixelate feel via blur + grayscale
    },
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
} satisfies import("framer-motion").Transition;

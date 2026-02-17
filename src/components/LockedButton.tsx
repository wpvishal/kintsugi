"use client";

import { IS_LIVE } from "@/config/launch";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { useState, useCallback } from "react";

interface LockedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

/**
 * A wrapper around action buttons that enforces the launch lock.
 * When IS_LIVE is false, the button text becomes "Locked until Launch",
 * and clicking it triggers a shake animation with a tooltip.
 * When IS_LIVE is true, it renders a normal button with full functionality.
 */
export default function LockedButton({ children, onClick, disabled, className }: LockedButtonProps) {
    const [isShaking, setIsShaking] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleLockedClick = useCallback(() => {
        setIsShaking(true);
        setShowTooltip(true);
        setTimeout(() => setIsShaking(false), 600);
        setTimeout(() => setShowTooltip(false), 3500);
    }, []);

    if (IS_LIVE) {
        return (
            <button onClick={onClick} disabled={disabled} className={className}>
                {children}
            </button>
        );
    }

    return (
        <div className="relative inline-flex w-full">
            <motion.button
                onClick={handleLockedClick}
                animate={isShaking ? {
                    x: [0, -6, 6, -4, 4, -2, 2, 0],
                } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`${className} !opacity-60 !cursor-not-allowed relative`}
            >
                <Lock className="w-3.5 h-3.5 mr-2 inline-block animate-pulse" />
                <span>Locked until Launch</span>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50 w-72 bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37]/80 text-xs text-center px-4 py-2.5 rounded shadow-[0_0_15px_rgba(212,175,55,0.15)] pointer-events-none"
                    >
                        This power is currently being restored. Join the waitlist to gain access.
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#121212] border-l border-t border-[#D4AF37]/30 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

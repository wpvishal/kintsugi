"use client";

import { IS_LIVE, PUBLIC_ROUTES } from "@/config/launch";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import SignupModal from "@/components/SignupModal";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

/**
 * Strips the locale prefix (/ja or /en) from a pathname.
 * e.g. "/ja/scroll" → "/scroll", "/en" → "/", "/ja" → "/"
 */
function stripLocale(pathname: string): string {
    const stripped = pathname.replace(/^\/(ja|en)/, "") || "/";
    return stripped;
}

export default function LaunchLock({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const t = useTranslations("lock");
    const [isLive, setIsLive] = useState(true); // Default to true to prevent flash
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLive(IS_LIVE);
    }, []);

    // Check if the current route (without locale prefix) is in the allowlist
    const routeWithoutLocale = stripLocale(pathname);
    const isPublicRoute = PUBLIC_ROUTES.includes(routeWithoutLocale);

    // If IS_LIVE or this route is on the allowlist, render normally
    if (isLive || isPublicRoute) {
        return <>{children}</>;
    }

    return (
        <div className="relative w-full h-full min-h-screen">
            {/* Blurred Content (Non-interactive) */}
            <div className="absolute inset-0 filter blur-2xl grayscale opacity-20 pointer-events-none select-none overflow-hidden bg-[#121212]">
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 bg-background/40 backdrop-blur-xl">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-lg w-full text-center space-y-8 relative overflow-visible"
                >
                    {/* Zen Circle */}
                    <div className="w-32 h-32 mx-auto rounded-full border-2 border-[#D4AF37]/20 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border border-[#D4AF37]/10 animate-spin-slow" />
                        <div className="w-24 h-24 rounded-full border border-[#D4AF37]/5 bg-[#D4AF37]/5 flex items-center justify-center">
                            <span className="font-serif text-4xl text-[#D4AF37]/80">禅</span>
                        </div>

                        {/* Pulsing Padlock */}
                        <div className="absolute -top-2 -right-2 bg-[#121212] p-1.5 rounded-full border border-[#D4AF37]/30 shadow-[0_0_10px_rgba(212,175,55,0.3)] animate-pulse-slow">
                            <Lock className="w-4 h-4 text-[#D4AF37]" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif text-[#D4AF37] italic">{t("title")}</h2>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest font-mono max-w-sm mx-auto leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </div>

                    <div className="pt-2 flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 bg-[#D4AF37] text-[#121212] font-medium rounded-sm hover:bg-[#D4AF37]/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-2"
                        >
                            {t("cta")}
                        </button>
                    </div>
                </motion.div>
            </div>

            <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

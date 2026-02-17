"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WalletConnectBtn from "@/components/WalletConnectBtn";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { IS_LIVE, PUBLIC_ROUTES } from "@/config/launch";
import { useTranslations } from "next-intl";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("nav");

    const navLinks = [
        { name: t("whitepaper"), href: "/scroll" },
        { name: t("scanner"), href: "/scanner" },
        { name: t("hall"), href: "/hall" },
        { name: t("vote"), href: "/vote" },
        { name: t("vault"), href: "/vault" },
    ];

    const isLinkActive = (href: string) => {
        if (href.startsWith("/#")) return false;
        const pathWithoutLocale = pathname.replace(/^\/(ja|en)/, '') || '/';
        return pathWithoutLocale === href;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Glassmorphic Bar */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md border-b border-primary/10 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif text-2xl font-bold shadow-[0_0_15px_-5px_var(--primary)] group-hover:scale-105 transition-transform">
                        金
                    </div>
                    <span className="font-serif text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        Kintsugi
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isLinkActive(link.href);
                        const restricted = !IS_LIVE && !PUBLIC_ROUTES.includes(link.href);
                        return (
                            <div key={link.href} className="relative group">
                                <Link
                                    href={link.href}
                                    className={`font-serif text-sm tracking-wide transition-all duration-300 relative py-2 flex items-center gap-1.5 ${active
                                        ? "text-primary font-medium drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                                        : restricted
                                            ? "text-muted-foreground/50 cursor-not-allowed"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    <motion.span
                                        whileHover={restricted ? { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.4 } } : {}}
                                        className="flex items-center gap-1.5"
                                    >
                                        {link.name}
                                        {restricted && (
                                            <Lock className="w-3 h-3 text-primary/50" />
                                        )}
                                    </motion.span>
                                    {/* Active State: Golden Underline */}
                                    <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left ${active ? "scale-x-100" : ""}`} />
                                </Link>

                                {/* Tooltip for Restricted Links */}
                                {restricted && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[200px] bg-[#121212]/90 backdrop-blur-md border border-[#D4AF37]/20 text-xs text-[#D4AF37] p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] text-center">
                                        {t("lockedTooltip")}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Right Area (Language, Wallet & Mobile Toggle) */}
                <div className="flex items-center gap-6 z-50">
                    <LanguageSwitcher />
                    <div className="hidden md:block scale-90">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg animate-pulse" />
                            <WalletConnectBtn />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-primary hover:text-primary/80 transition-colors p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu - Shoji Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0A0A0A] z-[60] flex flex-col justify-center items-center"
                    >
                        {/* Shoji Paper Texture & Golden Line */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/washi.png')]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[200px] bg-primary/20" />

                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-primary hover:text-primary/80 transition-colors z-50"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <nav className="flex flex-col space-y-8 text-center relative z-10">
                            {navLinks.map((link, i) => {
                                const active = isLinkActive(link.href);
                                const restricted = !IS_LIVE && !PUBLIC_ROUTES.includes(link.href);
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`font-serif text-3xl tracking-widest uppercase transition-all duration-300 hover:text-primary relative inline-flex items-center gap-3 ${active
                                                ? "text-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                                                : restricted
                                                    ? "text-muted-foreground/40"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            {link.name}
                                            {restricted && (
                                                <Lock className="w-4 h-4 text-primary/40" />
                                            )}
                                            {/* Mobile Active State Line */}
                                            {active && (
                                                <motion.div
                                                    layoutId="mobile-underline"
                                                    className="absolute -bottom-2 left-0 w-full h-[1px] bg-primary"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55 }}
                                className="pt-4"
                            >
                                <LanguageSwitcher />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="pt-4"
                            >
                                <WalletConnectBtn />
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

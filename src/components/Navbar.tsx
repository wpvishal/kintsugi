"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WalletConnectBtn from "@/components/WalletConnectBtn";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("nav");

    // Hide on special pages
    const routeWithoutLocale = pathname.replace(/^\/(ja|en)/, "") || "/";
    if (routeWithoutLocale === "/crucible" || routeWithoutLocale === "/manifesto") return null;

    const navLinks = [
        { name: t("home"), href: "/" },
        { name: t("manifesto"), href: "#manifesto" },
    ];

    const isLinkActive = (href: string) => {
        if (href.startsWith("#")) return false;
        const pathWithoutLocale = pathname.replace(/^\/(ja|en)/, '') || '/';
        return pathWithoutLocale === href;
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Minimalist Glassmorphic Bar */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/5 pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3 group z-50">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center text-black font-bold text-xl shadow-[0_0_20px_rgba(255,176,0,0.3)]">
                        金
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                            KINTSUGI
                        </span>
                        <span className="text-[10px] tracking-[0.2em] text-primary font-bold">
                            TON PROTOCOL
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium tracking-widest uppercase text-white/60 hover:text-primary transition-colors duration-300"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Area */}
                <div className="flex items-center gap-6 z-50">
                    <LanguageSwitcher />
                    <div className="hidden md:block">
                        <WalletConnectBtn />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white hover:text-primary transition-colors p-2"
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
                                                : "text-muted-foreground"
                                                }`}
                                        >
                                            {link.name}
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

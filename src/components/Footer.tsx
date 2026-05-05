"use client";

import React from "react";
import Link from "next/link";
import { Twitter, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export default function Footer() {
    const t = useTranslations("footer");
    const pathname = usePathname();

    const routeWithoutLocale = pathname.replace(/^\/(ja|en)/, "") || "/";
    if (routeWithoutLocale === "/manifesto") return null;

    return (
        <footer className="w-full bg-black border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-primary flex items-center justify-center text-black font-bold text-2xl">
                            金
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white uppercase">Kintsugi</span>
                    </Link>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-10">
                        <a href="https://x.com/Kintsugionton" target="_blank" className="text-white/40 hover:text-primary transition-colors font-bold uppercase tracking-widest text-xs flex items-center gap-1">
                            {t('x')} <Twitter className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <p className="text-white/20">{t('copyright')}</p>
                    <p className="text-primary">{t('status')}</p>
                </div>
            </div>
        </footer>
    );
}

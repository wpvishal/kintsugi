"use client";

import React from "react";

import Link from "next/link";
import { Github, Twitter, Disc, ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import TransparencyReport from "./TransparencyReport";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className="w-full border-t border-[#D4AF37]/20 bg-[#121212] pt-16 pb-8 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/washi.png')] mix-blend-overlay" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

                {/* Ecosystem Links */}
                <div className="space-y-6">
                    <h3 className="font-serif text-lg text-[#D4AF37]">{t("ecosystem")}</h3>
                    <ul className="space-y-3 text-sm text-[#D4AF37]/80">
                        <li><Link href="/scanner" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("senseiScanner")}</Link></li>
                        <li><Link href="/hall" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("restorationHall")}</Link></li>
                        <li><Link href="/vault" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("theVault")}</Link></li>
                    </ul>
                </div>

                {/* Wisdom Links */}
                <div className="space-y-6">
                    <h3 className="font-serif text-lg text-[#D4AF37]">{t("wisdom")}</h3>
                    <ul className="space-y-3 text-sm text-[#D4AF37]/80">
                        <li><Link href="/scroll" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("theScroll")}</Link></li>
                        <li><a href="#" className="hover:text-[#D4AF37] hover:pl-1 transition-all flex items-center gap-1">{t("zenBlog")} <ArrowUpRight className="w-3 h-3" /></a></li>
                    </ul>
                </div>

                {/* Foundation Links */}
                <div className="space-y-6">
                    <h3 className="font-serif text-lg text-[#D4AF37]">{t("foundation")}</h3>
                    <ul className="space-y-3 text-sm text-[#D4AF37]/80">
                        <li><Link href="/terms" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("terms")}</Link></li>
                        <li><Link href="/privacy" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("privacy")}</Link></li>
                        <li><a href="#" className="hover:text-[#D4AF37] hover:pl-1 transition-all">{t("riskDisclosure")}</a></li>
                    </ul>
                </div>

                {/* Community & Branding */}
                <div className="space-y-6 flex flex-col items-start md:items-end">

                    {/* Golden Seal */}
                    <Link href="/" className="w-16 h-16 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center relative group cursor-pointer hover:border-[#D4AF37]/60 transition-colors">
                        <div className="absolute inset-0 rounded-full border border-[#D4AF37]/10 animate-spin-slow" />
                        <span className="font-serif text-2xl text-[#D4AF37] group-hover:scale-110 transition-transform">金</span>
                    </Link>

                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <SocialIcon href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} label="X (Twitter)" />
                        <SocialIcon href="https://discord.com" icon={<Disc className="w-5 h-5" />} label="Discord" />
                        <SocialIcon href="https://github.com/Start-With-A-Name/Kintsugi" icon={<Github className="w-5 h-5" />} label="GitHub" />
                    </div>
                </div>
            </div>

            {/* Transparency Report */}
            <div className="max-w-xl mx-auto px-6 mt-16 mb-12">
                <TransparencyReport />
            </div>

            {/* Bottom Bar: Global Status */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#D4AF37]/10 flex flex-col items-center gap-4 text-xs">

                {/* Global Status Indicator */}
                <div className="flex items-center gap-4 text-[#D4AF37]/70 font-mono tracking-wider bg-[#D4AF37]/5 px-4 py-2 rounded-full border border-[#D4AF37]/10">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {t("statusSensei")}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                    <span className="flex items-center gap-2">
                        {t("statusSolana")}: <span className="text-[#D4AF37]">{t("statusHealthy")}</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
                    <span className="flex items-center gap-2">
                        {t("statusAudit")}: <span className="text-[#D4AF37]">{t("statusVerified")}</span>
                    </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full items-center mt-4 text-[#D4AF37]/40">
                    <p>{t("copyright")}</p>
                    <p>{t("tagline")}</p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300"
            title={label}
        >
            {icon}
        </a>
    );
}

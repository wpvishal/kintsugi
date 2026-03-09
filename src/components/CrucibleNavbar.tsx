"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import WalletConnectBtn from "@/components/WalletConnectBtn";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function CrucibleNavbar() {
    const t = useTranslations("crucible");

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-6 px-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white font-serif text-2xl font-bold group-hover:border-[#FFB000] group-hover:text-[#FFB000] transition-all duration-500">
                        金
                    </div>
                </Link>

                {/* Right Area */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                        Home
                    </Link>
                    <LanguageSwitcher />
                    <div className="relative group">
                        <div className="absolute inset-0 bg-[#FFB000]/5 rounded-sm blur-md group-hover:bg-[#FFB000]/10 transition-all duration-500" />
                        <WalletConnectBtn />
                    </div>
                </div>
            </div>
        </header>
    );
}

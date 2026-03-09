"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeroProps {
    onJoinWaitlist: () => void;
}

export default function Hero({ onJoinWaitlist }: HeroProps) {
    const { setVisible } = useWalletModal();
    const { connected } = useWallet();
    const t = useTranslations("home");

    const handleConnect = () => {
        if (!connected) {
            setVisible(true);
        }
    };

    return (
        <section className="relative pt-32 pb-20 overflow-hidden w-full">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
                <svg viewBox="0 0 800 800" className="w-full max-w-4xl h-full animate-pulse-slow">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="15" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <path
                        d="M400,100 L410,250 L380,350 L420,450 L390,600 L400,700"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="2"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="opacity-50"
                    />
                    <path
                        d="M400,100 L410,250 L380,350 L420,450 L390,600 L400,700"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1"
                        className="animate-draw-line"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                {/* The Main Title - FIXED & TIGHTENED */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                    <span className="text-stone-100">{t('heroTitle')} </span>
                    {/* This span holds the Gold Text */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500 italic">
                        {t('heroTitleAccent')}
                    </span>
                </h1>

                {/* The Subheadline - AUTHENTIC PHASE 1 TEXT */}
                <p className="text-xl text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {t('heroSubtitle')}
                </p>

                {/* The Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* Hard-Coded Connect Wallet Button */}
                    <button
                        onClick={handleConnect}
                        className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center gap-2 cursor-pointer"
                    >
                        {/* Keep your wallet icon here if you have one */}
                        <span>{t('ctaConnect')}</span>
                    </button>

                    <button
                        onClick={onJoinWaitlist}
                        className="px-8 py-3 border border-stone-700 hover:border-amber-500/50 text-stone-300 hover:text-amber-100 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-2"
                    >
                        {t('ctaWaitlist')} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Orynth Badge */}
                <div className="mt-10 flex justify-center">
                    <a href="https://orynth.dev/projects/kintsugi-protocol" target="_blank" rel="noopener">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://orynth.dev/api/badge/kintsugi-protocol?theme=light&style=default"
                            alt="Featured on Orynth"
                            width={260}
                            height={80}
                            className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}

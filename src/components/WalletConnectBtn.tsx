"use client";

import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import { useState, useEffect } from "react";

export default function WalletConnectBtn() {
    const t = useTranslations("nav");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-10 w-40 bg-white/5" />;

    return (
        <button 
            disabled
            className="group relative px-6 py-2 border border-white/10 text-white/20 font-bold text-xs uppercase tracking-widest cursor-not-allowed flex items-center gap-2 overflow-hidden"
        >
            <Lock className="w-3 h-3" />
            <span>{t('connect')}</span>
            
            {/* Locked Overlay */}
            <div className="absolute inset-0 bg-white/[0.02]" />
        </button>
    );
}



"use client";

import { ShieldCheck, CircleDollarSign, Github } from "lucide-react";

export default function TransparencyReport() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-4 px-4 bg-primary/5 rounded-lg border border-primary/10 backdrop-blur-sm">
            {/* Audit Status */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Audited Contracts: <span className="text-primary font-mono font-bold">100%</span></span>
            </div>

            {/* Separator (Hidden on mobile) */}
            <div className="hidden sm:block w-px h-4 bg-primary/20" />

            {/* Liquidity Health */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CircleDollarSign className="w-4 h-4 text-blue-400" />
                <span>Liquidity Health: <span className="text-[#D4AF37] font-serif italic">Gold Standard</span></span>
            </div>

            {/* Separator (Hidden on mobile) */}
            <div className="hidden sm:block w-px h-4 bg-primary/20" />

            {/* GitHub Link */}
            <a
                href="https://github.com/Start-With-A-Name/Kintsugi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-primary/30 group-hover:decoration-primary underline-offset-4">View Code</span>
            </a>
        </div>
    );
}

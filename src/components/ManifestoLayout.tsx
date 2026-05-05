"use client";

import Link from "next/link";
import { Twitter, LayoutGrid, Cpu, BarChart3 } from "lucide-react";
import WalletConnectBtn from "@/components/WalletConnectBtn";

export function ManifestoNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center text-black font-bold text-xl">
                        金
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase hidden sm:block">Kintsugi</span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                            <LayoutGrid className="w-3 h-3" /> Ecosystem
                        </Link>
                        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                            <Cpu className="w-3 h-3" /> dApp
                        </Link>
                        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                            <BarChart3 className="w-3 h-3" /> Analytics
                        </Link>
                        <a href="https://x.com/Kintsugionton" target="_blank" className="hover:text-primary transition-colors flex items-center gap-2">
                            <Twitter className="w-3 h-3" /> Twitter
                        </a>
                    </div>
                    <WalletConnectBtn />
                </div>
            </div>
        </nav>
    );
}

export function ManifestoFooter() {
    return (
        <footer className="w-full bg-black border-t border-white/5 py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary flex items-center justify-center text-black font-bold text-xl">
                        金
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white uppercase">Kintsugi</span>
                </Link>

                <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    <a href="https://ton.org" target="_blank" className="hover:text-primary transition-colors">TON Network</a>
                    <a href="https://x.com/Kintsugionton" target="_blank" className="hover:text-primary transition-colors">Community</a>
                </div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                    © 2026 KINTSUGI PROTOCOL
                </p>
            </div>
        </footer>
    );
}

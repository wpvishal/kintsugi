"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Hammer, ArrowLeft, Users, TrendingUp, Sparkles, Coins, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import WalletConnectBtn from "@/components/WalletConnectBtn";
import { useSearchParams } from "next/navigation";
import VesselCard from "@/components/VesselCard";
import { useState, Suspense } from "react";

// Initial Static Data
const initialVessels = [
    {
        id: "smb-classic",
        name: "SMB Classic",
        originalSymbol: "SMB",
        restorationScore: 92,
        fundingGoal: 50000,
        funded: 42000,
        status: "In Repair",
        desc: "Restoring the original metadata standard for the Gen1 Monkes.",
        size: "large" // col-span-2
    },
    {
        id: "serum-v3",
        name: "Serum V3",
        originalSymbol: "SRM",
        restorationScore: 45,
        fundingGoal: 120000,
        funded: 15000,
        status: "Awaiting Soul",
        desc: "Community takeover of the abandoned liquidity layer.",
        size: "medium"
    },
    {
        id: "degods-dust",
        name: "DeGods Dust",
        originalSymbol: "DUST",
        restorationScore: 88,
        fundingGoal: 25000,
        funded: 25000,
        status: "Restored",
        desc: "The dust has settled. Staking contracts are now immutable.",
        size: "medium"
    },
    {
        id: "raydium-legacy",
        name: "Raydium Legacy",
        originalSymbol: "RAY",
        restorationScore: 65,
        fundingGoal: 80000,
        funded: 40000,
        status: "In Repair",
        desc: "Optimizing the old AMM pools for the new age.",
        size: "medium"
    },
    {
        id: "foxy-dao",
        name: "Foxy DAO",
        originalSymbol: "FOXY",
        restorationScore: 30,
        fundingGoal: 10000,
        funded: 1200,
        status: "Awaiting Soul",
        desc: "Rebuilding the governance structure from the ground up.",
        size: "medium"
    },
    {
        id: "cope-protocol",
        name: "Cope Protocol",
        originalSymbol: "COPE",
        restorationScore: 12,
        fundingGoal: 5000,
        funded: 0,
        status: "Awaiting Soul",
        desc: "A final attempt to salvage the sharding logic.",
        size: "small"
    }
];

type FilterType = 'all' | 'repairable' | 'recent';

export default function HallOfRestoration() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <HallContent />
        </Suspense>
    );
}

function HallContent() {
    const searchParams = useSearchParams();
    const highlightAddress = searchParams.get('address');

    // Check for new listing params
    const newName = searchParams.get('name');
    const newSymbol = searchParams.get('symbol');
    const newScore = searchParams.get('score');

    const [filter, setFilter] = useState<FilterType>('all');

    // Initialize with static data, prepend new discovery if params exist
    const [vessels, setVessels] = useState(() => {
        if (newName && newScore && highlightAddress) {
            const newVessel = {
                id: highlightAddress, // Use address as ID
                name: newName,
                originalSymbol: newSymbol || "UNK",
                restorationScore: parseInt(newScore),
                fundingGoal: 10000, // Default mock goal
                funded: 0,
                status: "Awaiting Soul",
                desc: "A newly discovered vessel seeking the golden repair.",
                size: "large" // Feature it
            };
            // Check if already exists to prevent duplicates (simple check by ID)
            if (initialVessels.some(v => v.id === highlightAddress)) return initialVessels;
            return [newVessel, ...initialVessels];
        }
        return initialVessels;
    });

    const filteredVessels = vessels.filter(vessel => {
        if (filter === 'repairable') return vessel.restorationScore > 80;
        if (filter === 'recent') return vessel.status === 'Restored';
        return true;
    });

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-6 sm:p-12 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/washi.png')] mix-blend-overlay" />

            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">

                {/* Header Section */}
                <div className="space-y-6">
                    {/* Back Link */}
                    <Link href="/scanner" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Meditation (Scanner)
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-primary/20 pb-8 gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-serif text-foreground font-medium">The Restoration Hall</h1>
                            <p className="text-muted-foreground font-light text-lg max-w-2xl">
                                Browse the vessels currently undergoing the <span className="text-primary italic">Golden Repair</span>.
                            </p>
                        </div>

                        {/* Stats / Actions */}
                        <div className="flex gap-6 text-sm font-light text-muted-foreground">
                            <div className="text-right">
                                <span className="block text-xs uppercase tracking-widest text-primary/70">Total Repaired</span>
                                <span className="text-2xl text-primary font-serif">142</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs uppercase tracking-widest text-primary/70">Gold Staked</span>
                                <span className="text-2xl text-primary font-serif">4.2M</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap gap-4 items-center">
                    <Filter className="w-4 h-4 text-primary/50 mr-2" />
                    {[
                        { label: 'All Vessels', value: 'all' },
                        { label: 'Highly Repairable', value: 'repairable' },
                        { label: 'Recent Rebirths', value: 'recent' }
                    ].map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value as FilterType)}
                            className={cn(
                                "px-4 py-2 text-xs uppercase tracking-widest rounded-sm border transition-all duration-300",
                                filter === opt.value
                                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_-5px_var(--primary)]"
                                    : "border-primary/10 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Bento Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredVessels.map((project, i) => (
                            <VesselCard
                                key={project.id}
                                project={project}
                                isSelected={highlightAddress === project.id}
                                i={i}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

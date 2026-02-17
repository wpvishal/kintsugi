"use client";

import LockedButton from "@/components/LockedButton";

import { motion } from "framer-motion";
import { Timer, CheckCircle2, XCircle, BarChart3, ArrowUpRight, Scale, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import VotingModal from "@/components/VotingModal";

// Mock Data for Governance Proposals
const proposals = [
    {
        id: "prop-104",
        project: "Solana Monkey Business",
        symbol: "SMB",
        title: "Ratify Gen1 Metadata Restoration Standard",
        status: "Active Voting",
        votesYes: 850000,
        votesNo: 45000,
        endTime: "2026-02-15T12:00:00",
        description: "Proposal to officially adopt the new immutable metadata standard for all Gen1 SMBs, securing their legacy on-chain."
    },
    {
        id: "prop-103",
        project: "Serum DAO",
        symbol: "SRM",
        title: "Liquidity Migration to OpenBook V2",
        status: "Awaiting Quorum",
        votesYes: 1200000,
        votesNo: 900000, // Close vote
        endTime: "2026-02-18T00:00:00",
        description: "Should the DAO migrate the remaining treasury liquidity to the community-forked OpenBook V2 contract?"
    },
    {
        id: "prop-102",
        project: "DeGods Legacy",
        symbol: "DUST",
        title: "Re-enable Staking Rewards for Season 3",
        status: "Passed",
        votesYes: 5500000,
        votesNo: 120000,
        endTime: "2026-02-10T00:00:00",
        description: "Reactivating the staking contract to distribute accumulated fees to loyal holders."
    },
    {
        id: "prop-101",
        project: "PsyOptions",
        symbol: "PSY",
        title: "Dissolve Treasury and Refund Holders",
        status: "Defeated",
        votesYes: 300000,
        votesNo: 2100000,
        endTime: "2026-02-01T00:00:00",
        description: "A proposal to liquidate all assets and return value to token holders (Rug Redemption)."
    }
];

export default function GovernanceHall() {
    const [selectedProposal, setSelectedProposal] = useState<typeof proposals[0] | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-6 sm:p-12 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/washi.png')] mix-blend-overlay" />

            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="mb-24 space-y-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-[0.2em]"
                    >
                        <Scale className="w-4 h-4" />
                        <span>DAO Governance</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif text-foreground font-medium"
                    >
                        The Governance Hall
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground font-light text-lg max-w-xl mx-auto"
                    >
                        Cast your <span className="text-primary">$GOLD</span> to determine the future of the vessels.
                    </motion.p>
                </div>

                {/* Proposals Feed & Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Proposals Vertical Feed */}
                    <div className="lg:col-span-8 space-y-16">
                        {proposals.map((prop, i) => {
                            const totalVotes = prop.votesYes + prop.votesNo;
                            const yesPercent = totalVotes > 0 ? (prop.votesYes / totalVotes) * 100 : 0;
                            const isActive = prop.status === "Active Voting" || prop.status === "Awaiting Quorum";

                            // Fake countdown calc
                            const deadline = new Date(prop.endTime);
                            const now = new Date(); // In real app, use robust hook
                            const diff = deadline.getTime() - now.getTime();
                            const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
                            const hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const timeLeftString = diff > 0 ? `${daysLeft}d ${hoursLeft}h left` : "Closed";

                            return (
                                <motion.div
                                    key={prop.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    className="group relative"
                                >
                                    {/* Connecting Line (Visual Continuity) */}
                                    {i !== proposals.length - 1 && (
                                        <div className="absolute left-[26px] top-full h-16 w-[1px] bg-gradient-to-b from-primary/20 to-transparent" />
                                    )}

                                    <div className="flex gap-6 md:gap-8 items-start">
                                        {/* Icon / Avatar Column */}
                                        <div className="hidden sm:flex flex-col items-center shrink-0 space-y-4">
                                            <div className="w-14 h-14 rounded-sm border border-primary/20 bg-card flex items-center justify-center font-serif text-xl text-primary shadow-[0_0_15px_-5px_var(--primary)] text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {prop.symbol.slice(0, 1)}
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 space-y-6 pt-1">

                                            {/* Status & Meta */}
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-mono text-muted-foreground">{prop.symbol}</span>
                                                        <h3 className="text-2xl font-serif text-foreground leading-tight group-hover:text-primary transition-colors">
                                                            {prop.title}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className={cn(
                                                    "shrink-0 px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-sm border",
                                                    prop.status === 'Passed' ? "border-green-500/30 text-green-400 bg-green-500/5" :
                                                        prop.status === 'Defeated' ? "border-red-500/30 text-red-500 bg-red-500/5" :
                                                            prop.status === 'Active Voting' ? "border-primary/30 text-primary bg-primary/5 animate-pulse" :
                                                                "border-muted/30 text-muted-foreground bg-muted/5"
                                                )}>
                                                    {prop.status}
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground font-light text-sm leading-relaxed max-w-2xl">
                                                {prop.description}
                                            </p>

                                            {/* Voting Interface */}
                                            <div className="bg-card/30 border border-primary/10 p-6 rounded-sm space-y-4 relative overflow-hidden">

                                                {/* Progress Bar Label */}
                                                <div className="flex justify-between text-xs uppercase tracking-wider text-muted-foreground">
                                                    <span className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-3 h-3 text-primary" /> Yes {yesPercent.toFixed(1)}%
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        No {(100 - yesPercent).toFixed(1)}% <XCircle className="w-3 h-3 text-red-500/70" />
                                                    </span>
                                                </div>

                                                {/* The Gold Line (Progress) */}
                                                <div className="h-[2px] w-full bg-muted/20 relative">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${yesPercent}%` }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className="h-full bg-primary relative"
                                                    >
                                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary blur-[2px] rounded-full" />
                                                    </motion.div>
                                                </div>

                                                {/* Footer Info */}
                                                <div className="flex justify-between items-center pt-2">
                                                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground/60">
                                                        {diff > 0 ? (
                                                            <span className="flex items-center gap-1.5 text-primary/80">
                                                                <Timer className="w-3 h-3" />
                                                                {timeLeftString}
                                                            </span>
                                                        ) : (
                                                            <span>Ended {new Date(prop.endTime).toLocaleDateString()}</span>
                                                        )}
                                                        <span className="hidden sm:inline-block">•</span>
                                                        <span className="hidden sm:inline-block">{totalVotes.toLocaleString()} Votes</span>
                                                    </div>

                                                    {isActive && (
                                                        <LockedButton
                                                            onClick={() => setSelectedProposal(prop)}
                                                            className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors group/btn"
                                                        >
                                                            <span>Cast Vote</span>
                                                            <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                                        </LockedButton>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Sidebar: The Governance Scroll */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24">
                            <div className="relative p-8 rounded-sm bg-[#1a1814] border border-primary/20 shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden group">
                                {/* Parchment Texture Overlay */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/washi.png')]" />

                                {/* Gold Thread Border Effect (Double Border) */}
                                <div className="absolute inset-1 border border-primary/10 rounded-sm pointer-events-none" />
                                <div className="absolute inset-0 border-t border-b border-primary/5 pointer-events-none" />

                                <div className="relative z-10 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <ScrollText className="w-5 h-5 text-primary" />
                                        <h2 className="text-xl font-serif text-primary tracking-wide">The Governance Scroll</h2>
                                    </div>

                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                                    <ul className="space-y-6">
                                        <li className="flex gap-4">
                                            <div className="w-1 h-full min-h-[40px] bg-primary/20 rounded-full" />
                                            <div className="space-y-1">
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Balanced Wisdom</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                                    Voting uses <span className="text-primary">Quadratic Cost</span> (Cost = Votes²). 1 Vote = 1 $GOLD, 10 Votes = 100 $GOLD. Influence is expensive.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex gap-4">
                                            <div className="w-1 h-full min-h-[40px] bg-primary/20 rounded-full" />
                                            <div className="space-y-1">
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Quorum</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                                    A minimum of <span className="text-primary">10%</span> of the total supply must participate for any repair to be sanctioned by the Hall.
                                                </p>
                                            </div>
                                        </li>

                                        <li className="flex gap-4">
                                            <div className="w-1 h-full min-h-[40px] bg-primary/20 rounded-full" />
                                            <div className="space-y-1">
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">The Sage Delay</h3>
                                                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                                                    After a vote passes, a <span className="text-primary">24-hour</span> meditation period is observed before execution, allowing for final contemplation.
                                                </p>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="pt-6">
                                        <button className="w-full py-3 border border-primary/20 text-xs uppercase tracking-widest text-primary/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
                                            Read Full Constitution
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <VotingModal
                    isOpen={!!selectedProposal}
                    onClose={() => setSelectedProposal(null)}
                    proposalTitle={selectedProposal?.title || ""}
                    proposalSymbol={selectedProposal?.symbol || ""}
                />
            </div>
        </div>
    );
}

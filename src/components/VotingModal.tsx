"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Hammer, Coins, ScrollText, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VotingModalProps {
    isOpen: boolean;
    onClose: () => void;
    proposalTitle: string;
    proposalSymbol: string;
}

type VoteState = 'idle' | 'voting' | 'confirmed';

export default function VotingModal({ isOpen, onClose, proposalTitle, proposalSymbol }: VotingModalProps) {
    const [status, setStatus] = useState<VoteState>('idle');
    const [voteType, setVoteType] = useState<'repair' | 'ignore' | null>(null);
    const [voteCount, setVoteCount] = useState(1);

    const voteCost = voteCount * voteCount;

    // Reset state on open
    useEffect(() => {
        if (isOpen) {
            setStatus('idle');
            setVoteType(null);
        }
    }, [isOpen]);

    const handleVote = (type: 'repair' | 'ignore') => {
        setVoteType(type);
        setStatus('voting');

        // Simulate transaction and animation timing
        setTimeout(() => {
            setStatus('confirmed');
        }, 1500); // 1.5s for doors to close and "process"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-md bg-card border border-primary/20 shadow-2xl rounded-sm overflow-hidden"
                    >
                        {/* Shoji Doors Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none flex">
                            {/* Left Door */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: status !== 'idle' ? "0%" : "-100%" }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="w-1/2 h-full bg-[#1a1a1a] border-r border-primary/30 relative"
                            >
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/washi.png')]" />
                                {/* Grid lines */}
                                <div className="absolute top-1/4 w-full h-[1px] bg-primary/10" />
                                <div className="absolute top-2/4 w-full h-[1px] bg-primary/10" />
                                <div className="absolute top-3/4 w-full h-[1px] bg-primary/10" />
                            </motion.div>

                            {/* Right Door */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: status !== 'idle' ? "0%" : "100%" }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="w-1/2 h-full bg-[#1a1a1a] border-l border-primary/30 relative"
                            >
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/washi.png')]" />
                                {/* Grid lines */}
                                <div className="absolute top-1/4 w-full h-[1px] bg-primary/10" />
                                <div className="absolute top-2/4 w-full h-[1px] bg-primary/10" />
                                <div className="absolute top-3/4 w-full h-[1px] bg-primary/10" />
                            </motion.div>
                        </div>

                        {/* Confirmation Content (Appears on top of doors) */}
                        <AnimatePresence>
                            {status === 'confirmed' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6 space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center bg-primary/10 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                        <CheckCircle2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif text-primary mb-1">Ritual Complete</h3>
                                        <p className="font-serif text-muted-foreground/80 italic">
                                            Your will has been etched into the ledger.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Return to Hall
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>


                        {/* Content (Idle State) */}
                        <div className="p-8 space-y-6 relative z-10 transition-opacity duration-300" style={{ opacity: status === 'idle' ? 1 : 0.2 }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-serif text-foreground">Cast Your Vote</h2>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {proposalTitle}
                                    </p>
                                </div>
                                <button onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Vote Weight / Balance */}
                            <div className="flex items-center gap-4 bg-primary/5 border border-primary/10 p-4 rounded-sm">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Coins className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Your Balance ($GOLD)</div>
                                    <div className="text-xl font-mono text-primary">4,500.00</div>
                                </div>
                            </div>

                            {/* Quadratic Voting Input */}
                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs uppercase tracking-widest text-foreground font-bold">Balanced Wisdom</label>
                                    <div className="text-right">
                                        <span className="text-2xl font-serif text-primary">{voteCount}</span>
                                        <span className="text-xs text-muted-foreground ml-1">Votes</span>
                                    </div>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={voteCount}
                                    onChange={(e) => setVoteCount(parseInt(e.target.value))}
                                    className="w-full h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--primary)]"
                                />

                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground">Cost: {voteCount}²</span>
                                    <span className="font-mono text-primary/80">{voteCost.toLocaleString()} $GOLD</span>
                                </div>

                                <p className="text-[10px] text-muted-foreground/60 italic border-l-2 border-primary/20 pl-2">
                                    "The cost of influence grows with its weight. Choose wisely."
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button
                                    onClick={() => handleVote('ignore')}
                                    className="py-4 border border-muted-foreground/20 hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground transition-colors rounded-sm flex flex-col items-center justify-center gap-2 group"
                                >
                                    <XCircle className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                                    <span className="text-xs uppercase tracking-widest">Let Go</span>
                                </button>

                                <button
                                    onClick={() => handleVote('repair')}
                                    className="py-4 bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] rounded-sm flex flex-col items-center justify-center gap-2 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <Hammer className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                                    <span className="text-xs uppercase tracking-widest font-bold relative z-10">Repair</span>
                                </button>
                            </div>

                            <p className="text-[10px] text-center text-muted-foreground/40 font-light">
                                Voting incurs a small network fee.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Helper component for icon import (if XCircle wasn't imported)
function XCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
        </svg>
    )
}

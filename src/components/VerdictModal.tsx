"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Hammer, AlertTriangle, ArrowRight } from "lucide-react";
import { type AnalysisResult } from "@/lib/scanner";
import { useRouter } from "next/navigation";

interface VerdictModalProps {
    isOpen: boolean;
    onClose: () => void;
    result: AnalysisResult | null;
    address: string;
}

export default function VerdictModal({ isOpen, onClose, result, address }: VerdictModalProps) {
    const router = useRouter();

    if (!result) return null;

    const isWorthy = result.score >= 70;

    // Sensei's Message
    const senseiMessage = isWorthy
        ? "This vessel holds light. Worthy of the golden repair."
        : "The clay is poisoned. Let it return to the earth.";

    const handleSubmitToHall = () => {
        // Mocking name/symbol derivation for the prototype
        const shortAddr = address.slice(0, 4) + '...' + address.slice(-4);
        const name = `Vessel ${shortAddr}`;
        const symbol = "UNK";

        const params = new URLSearchParams({
            address,
            name,
            symbol,
            score: result.score.toString(),
            status: "Awaiting Soul" // Default status for new listings
        });

        router.push(`/hall?${params.toString()}`);
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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-card border border-primary/20 shadow-2xl overflow-hidden rounded-sm"
                    >
                        {/* Golden Seam Decor at top */}
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

                        <div className="p-8 space-y-8">
                            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors">
                                <X className="w-5 h-5" />
                            </button>

                            {/* Sensei's Verdict */}
                            <div className="text-center space-y-4">
                                <div className="text-sm font-serif italic text-primary/80">
                                    — The Sensei Speaks —
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-serif text-foreground leading-tight">
                                    "{senseiMessage}"
                                </h2>
                            </div>

                            {/* Divider */}
                            <div className="w-12 h-[1px] bg-primary/30 mx-auto" />

                            {/* Cracks List */}
                            <div className="space-y-4 bg-primary/5 p-6 rounded-sm border border-primary/10">
                                <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3 text-primary" />
                                    Detected Fractures
                                </h3>
                                {result.cracks.length > 0 ? (
                                    <ul className="space-y-2">
                                        {result.cracks.map((crack, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-primary/80 font-light leading-relaxed">
                                                <span className="text-primary mt-1 text-xs">●</span>
                                                <span>{crack}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">No visible fractures detected.</p>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 space-y-3">
                                {isWorthy ? (
                                    <>
                                        <button
                                            onClick={handleSubmitToHall}
                                            className="w-full py-4 bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] flex items-center justify-center gap-2 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                            <span className="relative z-10">List in Restoration Hall</span>
                                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        <button className="w-full py-3 bg-transparent border border-primary/30 text-primary font-mono text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                                            <Hammer className="w-4 h-4" />
                                            <span>Stake $GOLD to Repair</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <button disabled className="w-full py-4 bg-muted/20 border border-muted text-muted-foreground font-mono text-sm cursor-not-allowed opacity-50 mb-2">
                                            Unworthy of Repair
                                        </button>
                                        <p className="text-xs text-destructive/70 font-light italic">
                                            Risk too high. Do not engage.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

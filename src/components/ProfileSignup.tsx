"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function ProfileSignup() {
    const { connected, publicKey } = useWallet();
    const [isOpen, setIsOpen] = useState(false);
    const [zenName, setZenName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    useEffect(() => {
        if (connected && publicKey) {
            const hasSignedUp = localStorage.getItem(`kintsugi_signup_${publicKey.toString()}`);
            if (!hasSignedUp) {
                // Add a small delay for better UX after wallet connect
                const timer = setTimeout(() => setIsOpen(true), 1000);
                return () => clearTimeout(timer);
            }
        } else {
            setIsOpen(false);
        }
    }, [connected, publicKey]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (publicKey) {
            localStorage.setItem(`kintsugi_signup_${publicKey.toString()}`, "true");
        }

        setStatus("success");

        // Close after success message
        setTimeout(() => {
            setIsOpen(false);
            // Reset for next time (though local storage will block it)
            setStatus("idle");
            setZenName("");
            setEmail("");
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed z-[101] w-full max-w-md bg-[#121212] border border-[#D4AF37]/30 rounded-lg shadow-2xl overflow-hidden"
                        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                    >
                        <div className="relative p-8">

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full pointer-events-none" />

                            <div className="text-center mb-8 relative z-10">
                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20 relative">
                                    {status === "success" ? (
                                        <Sparkles className="w-8 h-8 text-[#D4AF37] animate-pulse" />
                                    ) : (
                                        <User className="w-8 h-8 text-[#D4AF37]" />
                                    )}
                                    <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-spin-slow opacity-50" />
                                </div>
                                <h2 className="text-2xl font-serif text-[#D4AF37] mb-2">
                                    {status === "success" ? "Soul Verified" : "Identity Restoration"}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {status === "success"
                                        ? "The Kintsugi Vanguard welcomes you."
                                        : "Complete your profile to join the Genesis Waitlist."}
                                </p>
                            </div>

                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-6 rounded text-center space-y-2"
                                >
                                    <p className="text-[#D4AF37] font-medium text-lg">Multiplier Activated</p>
                                    <p className="text-xs text-muted-foreground">
                                        You will receive a bonus allocation of
                                        <strong className="text-[#D4AF37] ml-1">$GOLD</strong> at launch.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase text-muted-foreground font-mono ml-1">Zen Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                placeholder="Enter your alias"
                                                value={zenName}
                                                onChange={(e) => setZenName(e.target.value)}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded px-10 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-muted-foreground/30 focus:bg-white/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase text-muted-foreground font-mono ml-1">Restoration Alerts (Optional)</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded px-10 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-muted-foreground/30 focus:bg-white/10"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "loading" || !zenName.trim()}
                                        className="w-full bg-[#D4AF37] text-[#121212] font-medium py-3 rounded hover:bg-[#D4AF37]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Mint Identity
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

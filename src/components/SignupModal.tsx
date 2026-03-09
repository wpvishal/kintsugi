"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setTimeout(onClose, 2000);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                >
                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#121212] border border-[#D4AF37]/30 rounded-lg shadow-2xl"
                    >
                        <div className="relative p-8">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-[#D4AF37] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center mb-8">
                                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#D4AF37]/20">
                                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                                </div>
                                <h2 className="text-2xl font-serif text-[#D4AF37] mb-2">Join the Kintsugi Vanguard</h2>
                                <p className="text-sm text-muted-foreground">
                                    Be the first to know when the Sensei goes live. Value restoration begins soon.
                                </p>
                            </div>

                            {status === "success" ? (
                                <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded text-center text-sm">
                                    Welcome to the fold. Watch your inbox.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-muted-foreground/50"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-[#D4AF37] text-[#121212] font-medium py-3 rounded hover:bg-[#D4AF37]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <>
                                                Request Early Access
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Footer Stripe */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

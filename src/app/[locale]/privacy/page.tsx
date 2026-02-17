"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Brain, Shield, Fingerprint, Lock } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1814] font-sans p-6 md:p-12 selection:bg-primary/20">

            {/* Parchment Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] z-0 mix-blend-multiply" />

            <div className="max-w-3xl mx-auto relative z-10 space-y-12">

                {/* Header */}
                <div className="space-y-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Return to Protocol
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1a1814] mb-2">Privacy Policy</h1>
                        <p className="text-muted-foreground font-serif italic text-lg">In Code We Trust, In Silence We Respect.</p>
                    </motion.div>
                </div>

                {/* Content Sections */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="prose prose-stone max-w-none space-y-12"
                >
                    {/* Data Collection */}
                    <Section title="1. Public Data Only" icon={Fingerprint}>
                        <p>
                            Kintsugi is built on the philosophy of <strong>Web3 privacy</strong>. We do not collect, store, or process:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-muted-foreground">
                            <li>IP Addresses (We use decentralized RPC endpoints)</li>
                            <li>Email Addresses or Phone Numbers</li>
                            <li>Personal Identifiable Information (PII)</li>
                            <li>Geolocation Data</li>
                        </ul>
                        <p className="mt-4">
                            The only data we interact with is your <strong>Public Wallet Address</strong>, which is transparently available on the Solana blockchain.
                        </p>
                    </Section>

                    {/* AI Usage */}
                    <Section title="2. The Sensei & AI Processing" icon={Brain}>
                        <div className="bg-primary/5 border-l-2 border-primary p-6 rounded-r-sm text-sm">
                            <p className="font-bold mb-2">Powered by Gemini 3</p>
                            <p className="opacity-90">
                                When you use the "Sensei Scanner," the smart contract code (bytecode) is processed by our AI models (Gemini 3) to identify vulnerabilities.
                            </p>
                        </div>
                        <p className="mt-4">
                            This process is <strong>stateless and anonymized</strong>. The code you scan is not linked to your identity. We do not use user-submitted queries to train our models without explicit opt-in consent.
                        </p>
                    </Section>

                    {/* Compliance */}
                    <Section title="3. 2026 Compliance Standards" icon={Shield}>
                        <p>
                            We adhere to the latest <strong>Global Digital Rights Framework (2026)</strong>, including:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="p-4 border border-primary/10 rounded-sm bg-white/50">
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <Lock className="w-4 h-4 text-primary" /> GDPR (Europe)
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    As we do not collect PII, we are inherently compliant "by design." You maintain the "Right to be Forgotten" because we never remembered you.
                                </p>
                            </div>
                            <div className="p-4 border border-primary/10 rounded-sm bg-white/50">
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    <Lock className="w-4 h-4 text-primary" /> CCPA (California)
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    We do not sell data. We do not track cookies. You have the right to non-discrimination for exercising your privacy rights.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* Contact or Footer */}
                    <div className="pt-12 border-t border-primary/10 text-center">
                        <p className="text-sm text-muted-foreground">
                            Your wallet is your identity. Guard it well.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-serif font-bold text-sm">
                                金
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

function Section({ title, icon: Icon, children }: { title: string, icon?: any, children: React.ReactNode }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-serif text-[#1a1814] flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-primary" />}
                {title}
            </h2>
            <div className="text-muted-foreground leading-relaxed">
                {children}
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ScrollText, AlertTriangle, Cpu, Globe } from "lucide-react";

export default function TermsPage() {
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
                        <h1 className="text-4xl md:text-5xl font-serif text-[#1a1814] mb-2">Terms of Service</h1>
                        <p className="text-muted-foreground font-serif italic text-lg">Last Updated: February 2026</p>
                    </motion.div>
                </div>

                {/* Content Sections */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="prose prose-stone max-w-none space-y-12"
                >
                    {/* Introduction */}
                    <Section title="1. The Protocol Agreement">
                        <p>
                            By accessing or using the Kintsugi interface, you acknowledge that you are interacting with a
                            <strong> decentralized, permissionless protocol</strong> on the Solana blockchain.
                            Kintsugi is a software interface, not a financial institution, bank, or exchange.
                        </p>
                    </Section>

                    {/* No Financial Advice */}
                    <Section title="2. No Financial Advice" icon={ScrollText}>
                        <div className="bg-primary/5 border-l-2 border-primary p-6 rounded-r-sm italic text-muted-foreground">
                            "Nothing contained herein constitutes financial, investment, legal, or tax advice."
                        </div>
                        <p className="mt-4">
                            The information provided by the Kintsugi protocol, including data from the Sensei Scanner and
                            Restoration Hall, is for informational purposes only. You are solely responsible for your
                            investment decisions. Cryptographic tokens are highly volatile assets; never stake or trade
                            funds you cannot afford to lose.
                        </p>
                    </Section>

                    {/* SaaS Disclaimer */}
                    <Section title="3. Software-as-a-Service (SaaS)" icon={Globe}>
                        <p>
                            Kintsugi operates strictly as a <strong>Technical Service Provider</strong>. We provide
                            software tools that facilitate interaction with the Solana blockchain. We do not have custody
                            of your funds, nor do we facilitate fiat-to-crypto transactions.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-muted-foreground">
                            <li>We are <strong>Non-Custodial</strong>: You retain full control of your private keys.</li>
                            <li>We are <strong>Permissionless</strong>: The protocol code runs autonomously on-chain.</li>
                            <li>We are <strong>Jurisdiction-Neutral</strong>: The protocol exists globally on the decentralized web.</li>
                        </ul>
                    </Section>

                    {/* AI Accuracy Clause */}
                    <Section title="4. Artificial Intelligence Disclaimer" icon={Cpu}>
                        <div className="bg-orange-500/5 border-l-2 border-orange-500/50 p-6 rounded-r-sm text-orange-900/80 dark:text-orange-100 flex gap-4">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-1" />
                            <div>
                                <p className="font-bold mb-1">Tool, Not Truth</p>
                                <p className="text-sm opacity-90">
                                    The "Sensei Scanner" utilizes AI models to analyze smart contract code. While rigorous,
                                    AI outputs can be hallucinated, incomplete, or incorrect.
                                </p>
                            </div>
                        </div>
                        <p className="mt-4">
                            A high "Safety Score" does not guarantee a contract is exploit-free. A low score does not
                            definitively prove malice. The Scanner is a diagnostic aid, not a security audit. Users must
                            verify all contract interactions independently.
                        </p>
                    </Section>

                    {/* Jurisdiction */}
                    <Section title="5. Governing Law & Jurisdiction">
                        <p>
                            These Terms are governed by the principles of <strong>International Decentralized Law</strong>.
                            Disputes arising from the use of the protocol shall be resolved through on-chain governance
                            proposals where applicable, or through binding arbitration in a neutral jurisdiction compliant
                            with 2026 Digital Asset Standards.
                        </p>
                    </Section>

                    {/* Contact or Footer */}
                    <div className="pt-12 border-t border-primary/10 text-center">
                        <p className="text-sm text-muted-foreground">
                            Interacting with the protocol constitutes acceptance of these terms.
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FAQ() {
    const t = useTranslations("faq");

    const faqs = [
        { question: t("q1"), answer: t("a1") },
        { question: t("q2"), answer: t("a2") },
        { question: t("q3"), answer: t("a3") },
    ];

    return (
        <section className="w-full max-w-3xl mx-auto px-6 py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                    {t("title")}
                </h2>
                <div className="w-12 h-[1px] bg-primary/40 mx-auto" />
            </motion.div>

            <div className="space-y-6">
                {faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} index={i} />
                ))}
            </div>
        </section>
    );
}

function FAQItem({ faq, index }: { faq: { question: string, answer: string }, index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-primary/20 overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
            >
                <span className="text-lg md:text-xl font-serif text-foreground/80 group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                </span>
                <span className="text-primary/50 group-hover:text-primary transition-colors duration-300">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <p className="pb-8 text-muted-foreground font-light leading-relaxed max-w-2xl">
                            {faq.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

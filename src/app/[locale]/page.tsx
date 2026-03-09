"use client";

import Link from "next/link";
import { ArrowRight, ScrollText, TrendingUp, Users, Flame } from "lucide-react";
import { motion, useInView } from "framer-motion";
import BentoGrid from "@/components/BentoGrid";
import Roadmap from "@/components/Roadmap";
import Ticker from "@/components/Ticker";
import FAQ from "@/components/FAQ";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Hero from "@/components/Hero";
import WalletConnectBtn from "@/components/WalletConnectBtn";
import SignupModal from "@/components/SignupModal";

// Counter Component for Stats
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = nodeRef.current;
    if (!element || !inView) return;

    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const current = Math.floor(easeOutQuart * (to - from) + from);
      element.textContent = current.toLocaleString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [from, to, inView]);

  return <span ref={nodeRef} />;
};

export default function Home() {
  const t = useTranslations('home');
  const tp = useTranslations('philosophy');
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 relative z-10 w-full overflow-hidden">

        {/* Hero Section */}
        <Hero onJoinWaitlist={() => setIsSignupOpen(true)} />

        {/* Live Ticker */}
        <Ticker />

        {/* Stats Ribbon */}
        <section className="w-full max-w-6xl mx-auto py-32 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-y border-primary/20 py-8 bg-card/20 backdrop-blur-sm">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary/80 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-bold">{t('statsTVR')}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-serif text-primary">
                $<Counter from={0} to={100000} />+
              </div>
            </div>

            <div className="text-center space-y-2 relative md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-12 md:before:w-[1px] md:before:bg-primary/20 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-12 md:after:w-[1px] md:after:bg-primary/20">
              <div className="flex items-center justify-center gap-2 text-primary/80 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-bold">{t('statsReborn')}</span>
              </div>
              <div className="text-4xl sm:text-5xl font-serif text-primary">
                <Counter from={0} to={25} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary/80 mb-2">
                <Flame className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-bold">{t('statsBurned')}</span>
              </div>
              <div className="text-lg font-serif text-primary mt-4">
                {t('statsSupply')}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="about" className="w-full max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: tp('wabiSabiTitle'),
              subtitle: tp('wabiSabiSubtitle'),
              description: tp('wabiSabiDesc')
            },
            {
              title: tp('kintsugiTitle'),
              subtitle: tp('kintsugiSubtitle'),
              description: tp('kintsugiDesc')
            },
            {
              title: tp('zenTitle'),
              subtitle: tp('zenSubtitle'),
              description: tp('zenDesc')
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-[#f0f0e8]/5 backdrop-blur-sm border border-primary/30 p-8 rounded-sm text-center space-y-4 hover:border-primary/60 transition-colors shadow-lg shadow-black/20"
            >
              <h3 className="text-3xl font-serif text-primary">{item.title}</h3>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{item.subtitle}</p>
              <div className="w-12 h-[1px] bg-primary/40 mx-auto" />
              <p className="text-foreground/80 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Bento Grid Section */}
        <BentoGrid />

        {/* Roadmap Section */}
        <Roadmap />

        {/* FAQ Section */}
        <FAQ />

      </div >
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
}

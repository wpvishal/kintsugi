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
import WalletConnectBtn from "@/components/WalletConnectBtn";
import SignupModal from "@/components/SignupModal";

// Counter Component for Stats
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!process.browser) return;

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
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12 relative z-10 w-full overflow-hidden">

      {/* Background Glowing Crack Effect */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <svg viewBox="0 0 800 800" className="w-full max-w-4xl h-full animate-pulse-slow">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M400,100 L410,250 L380,350 L420,450 L390,600 L400,700"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#glow)"
            className="opacity-50"
          />
          <path
            d="M400,100 L410,250 L380,350 L420,450 L390,600 L400,700"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            className="animate-draw-line"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-6 max-w-4xl relative z-10 pt-20"
      >
        <h1 className="text-6xl sm:text-8xl font-serif font-medium tracking-tight text-foreground">
          {t('heroTitle')}
          <span className="block text-primary italic mt-2 animate-golden-glow">{t('heroTitleAccent')}</span>
        </h1>

        <p className="text-xl sm:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          {t('heroSubtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 items-center">
          <div className="scale-110">
            <WalletConnectBtn />
          </div>

          <button
            onClick={() => setIsSignupOpen(true)}
            className="px-8 py-3 bg-transparent border border-primary text-primary font-medium text-lg rounded-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group"
          >
            Join Genesis Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Live Ticker */}
      <Ticker />

      {/* App Preview Gallery */}
      <section className="w-full max-w-7xl mx-auto py-24 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-serif text-primary mb-4">The Restored Vessel</h2>
          <p className="text-muted-foreground">A glimpse into the mended future.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { src: "/images/screenshot-scanner.png", label: "The Sensei" },
            { src: "/images/screenshot-vault.png", label: "The Vault" },
            { src: "/images/screenshot-hall.png", label: "Restoration Hall" }
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm shadow-2xl"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-serif text-[#D4AF37]">{img.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="w-full max-w-6xl mx-auto py-32 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-y border-primary/20 py-8 bg-card/20 backdrop-blur-sm">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary/80 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">{t('statsTVR')}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-serif text-primary">
              $<Counter from={0} to={12450000} />
            </div>
          </div>

          <div className="text-center space-y-2 relative md:before:absolute md:before:left-0 md:before:top-1/2 md:before:-translate-y-1/2 md:before:h-12 md:before:w-[1px] md:before:bg-primary/20 md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-12 md:after:w-[1px] md:after:bg-primary/20">
            <div className="flex items-center justify-center gap-2 text-primary/80 mb-2">
              <Users className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">{t('statsReborn')}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-serif text-primary">
              <Counter from={0} to={42} />
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary/80 mb-2">
              <Flame className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-bold">{t('statsBurned')}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-serif text-primary">
              <Counter from={0} to={850000} />
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

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />



    </div >
  );
}

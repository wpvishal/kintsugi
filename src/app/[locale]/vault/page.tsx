"use client";

import LockedButton from "@/components/LockedButton";

import { motion, AnimatePresence } from "framer-motion";
import { Coins, Lock, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react";

// Mock Treasury PDA
const TREASURY_PDA = new PublicKey("11111111111111111111111111111111"); // System Program default

export default function VaultPage() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [mode, setMode] = useState<'stake' | 'unstake'>('stake');
    const [amount, setAmount] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [rewardCounter, setRewardCounter] = useState(124.5678);
    const [calcAmount, setCalcAmount] = useState(10000); // Default for calculator

    // Transaction State
    const [txStatus, setTxStatus] = useState<'idle' | 'simulating' | 'ready' | 'processing' | 'success' | 'error'>('idle');
    const [simData, setSimData] = useState<{ fee: number; slippage: number } | null>(null);
    const [kGoldBalance, setKGoldBalance] = useState(0);

    // Petal State
    const [petals, setPetals] = useState<{ id: number; left: number; top: number }[]>([]);

    // Simulate real-time rewards & Petals
    useEffect(() => {
        let lastMilestone = Math.floor(124.5678 / 10) * 10;

        const interval = setInterval(() => {
            setRewardCounter(prev => {
                const newValue = prev + 0.05; // Increased speed for demo (approx 1 GOLD per 2s)

                // Check for 10 GOLD milestone
                const currentMilestone = Math.floor(newValue / 10) * 10;
                if (currentMilestone > lastMilestone) {
                    lastMilestone = currentMilestone;
                    // Spawn Petal
                    setPetals(current => [
                        ...current,
                        {
                            id: Date.now(),
                            left: Math.random() * 20, // Start from left side 0-20%
                            top: Math.random() * 80   // Random height 0-80%
                        }
                    ]);

                    // Cleanup old petals to prevent memory leak
                    setTimeout(() => {
                        setPetals(current => current.slice(1));
                    }, 8000);
                }

                return newValue;
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Handle Staking
    const handleStaking = async () => {
        if (!publicKey || !amount) return;

        try {
            // 1. Simulation Step
            setTxStatus('simulating');

            // In a real app, we would build the actual transaction here
            // const transaction = new Transaction().add(...);
            // const { value } = await connection.simulateTransaction(transaction);

            // Mock Simulation Delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock Simulation Result
            setSimData({
                fee: 0.00005,
                slippage: 0.05 // < 0.1%
            });
            setTxStatus('ready');

        } catch (error) {
            console.error("Simulation failed", error);
            setTxStatus('error');
            setTimeout(() => setTxStatus('idle'), 3000);
        }
    };

    const confirmTransaction = async () => {
        if (!publicKey || !amount) return;

        try {
            setTxStatus('processing');

            // Mock Processing Delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // "Mint" virtual kGOLD
            setKGoldBalance(prev => prev + parseFloat(amount));
            setTxStatus('success');

            // Spawn a burst of petals on success
            const burstTime = Date.now();
            const newPetals = Array.from({ length: 5 }).map((_, i) => ({
                id: burstTime + i,
                left: 50, // Center
                top: 50
            }));
            setPetals(prev => [...prev, ...newPetals]);

            // Reset after success
            setTimeout(() => {
                setTxStatus('idle');
                setAmount("");
                setSimData(null);
            }, 3000);

        } catch (error) {
            console.error("Transaction failed", error);
            setTxStatus('error');
        }
    };

    // Mock Data
    const totalStaked = 45000.00;
    const walletBalance = 12000.00;
    const apy = 12.4;
    // Update totalStaked to reflect local kGOLD if needed, or just keep mock
    const totalStakedDisplay = 45000.00 + kGoldBalance;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans p-6 sm:p-12 relative overflow-hidden flex flex-col items-center justify-center">

            {/* Petal Container (Overlay) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                <AnimatePresence>
                    {petals.map((petal) => (
                        <motion.div
                            key={petal.id}
                            initial={{
                                opacity: 0,
                                x: `${petal.left}vw`,
                                y: `${petal.top}vh`,
                                rotate: 0,
                                scale: 0
                            }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                x: [`${petal.left}vw`, `${petal.left + 40}vw`], // Drift right
                                y: [`${petal.top}vh`, `${petal.top + 60}vh`],   // Drift down
                                rotate: [0, 180, 360],
                                scale: [0, 1, 0.8]
                            }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="absolute w-4 h-4"
                        >
                            {/* Cherry Blossom Petal Shape */}
                            <svg viewBox="0 0 24 24" fill="#D4AF37" className="w-full h-full drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
                                <path d="M12 2C12 2 14 6 17 8C20 10 22 12 22 12C22 12 20 14 17 15C14 16 12 18 12 22C12 22 10 16 7 15C4 14 2 12 2 12C2 12 4 10 7 8C10 6 12 2 12 2Z" />
                            </svg>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/washi.png')] mix-blend-overlay" />

            {/* Ambient Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-lg relative z-10 space-y-12">

                {/* Header */}
                <h1 className="text-4xl font-serif text-foreground">The Golden Vault</h1>
                <p className="text-muted-foreground font-light max-w-sm mx-auto">
                    Stake <span className="text-primary">$GOLD</span> to receive <span className="text-primary">kGOLD</span>. Use your liquid tokens to govern and restore while you earn.
                </p>

                {/* Zen Garden Circle */}
                <div className="relative flex justify-center py-8">
                    {/* Pulsing Aura */}
                    <div className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5 bg-primary/5 transition-all duration-1000",
                        txStatus === 'success' ? "w-[500px] h-[500px] bg-primary/20 animate-pulse" : "w-80 h-80 animate-pulse"
                    )} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-primary/5 opacity-50" />

                    {/* Main Circle */}
                    <motion.div
                        className="w-64 h-64 rounded-full bg-[#1a1814] border border-primary/30 shadow-[0_0_50px_-10px_rgba(212,175,55,0.2)] flex flex-col items-center justify-center relative z-10 backdrop-blur-sm group"
                        animate={{
                            boxShadow: isInputFocused || txStatus === 'processing'
                                ? "0 0 80px -10px rgba(212,175,55,0.4)"
                                : "0 0 50px -10px rgba(212,175,55,0.2)",
                            scale: isInputFocused ? 1.05 : 1,
                            borderColor: txStatus === 'success' ? '#D4AF37' : 'rgba(212,175,55,0.3)'
                        }}
                    >
                        <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Liquid Balance</span>
                        <div className="text-4xl font-serif text-primary flex items-center gap-2">
                            <Coins className="w-6 h-6 opacity-80" />
                            {totalStakedDisplay.toLocaleString()}
                        </div>
                        <span className="text-xs font-mono text-primary/50 mt-1">kGOLD</span>

                        {/* Governance Badge */}
                        <div className="absolute -bottom-8 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-primary/80 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Lock className="w-3 h-3" />
                            Governance Enabled
                        </div>
                    </motion.div>
                </div>

                {/* Interaction Section */}
                <div className="space-y-8 relative">

                    {/* Connecting Line Animation (Abstract representation) */}
                    {/* We'll use a simple absolute positioned SVG line that connects the input label area to the circle area */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-12 w-[1px] bg-gradient-to-b from-primary/0 to-primary/50 overflow-hidden">
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: isInputFocused || amount ? "0%" : "-100%" }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="w-full h-full bg-primary blur-[1px]"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center">
                        <div className="inline-flex p-1 rounded-full bg-primary/5 border border-primary/10">
                            {(['stake', 'unstake'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setMode(t)}
                                    className={cn(
                                        "px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300",
                                        mode === t
                                            ? "bg-primary text-primary-foreground shadow-lg"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs px-2">
                            <span className="text-muted-foreground uppercase tracking-widest">Amount</span>
                            <span className="text-primary/80 font-mono">Balance: {walletBalance.toLocaleString()} $GOLD</span>
                        </div>

                        <div className="relative group">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={txStatus !== 'idle'}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                placeholder="0.00"
                                className="w-full bg-transparent border-b border-primary/30 py-4 text-3xl font-serif text-center focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/20 disabled:opacity-50"
                            />
                            {/* Faint connecting line origin point visualization */}
                            <AnimatePresence>
                                {(isInputFocused || amount) && (
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        exit={{ width: "0%" }}
                                        className="absolute bottom-0 left-0 h-[1px] bg-primary shadow-[0_0_10px_var(--primary)]"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Transaction Feedback Area */}
                        <AnimatePresence>
                            {(txStatus === 'ready' || txStatus === 'simulating') && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="bg-primary/5 border border-primary/20 rounded-sm p-4 text-xs space-y-2 overflow-hidden"
                                >
                                    <div className="flex justify-between items-center text-muted-foreground">
                                        <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-green-500" /> Simulation</span>
                                        <span className="uppercase tracking-widest">Passed</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Est. Gas Fee</span>
                                        <span className="font-mono text-primary">
                                            {txStatus === 'simulating' ? <Loader2 className="w-3 h-3 animate-spin" /> : `${simData?.fee} SOL`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Max Slippage</span>
                                        <span className="font-mono text-primary">
                                            {txStatus === 'simulating' ? <Loader2 className="w-3 h-3 animate-spin" /> : `${simData?.slippage}%`}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <LockedButton
                            onClick={txStatus === 'ready' ? confirmTransaction : handleStaking}
                            disabled={!amount || txStatus === 'processing' || txStatus === 'simulating' || txStatus === 'success'}
                            className="w-full py-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary transition-all rounded-sm flex items-center justify-center gap-2 group uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {txStatus === 'idle' && (mode === 'stake' ? "Confirm Stake" : "Initiate Withdrawal")}
                            {txStatus === 'simulating' && "Simulating Transaction..."}
                            {txStatus === 'ready' && "Sign & Mint kGOLD"}
                            {txStatus === 'processing' && "Processing..."}
                            {txStatus === 'success' && "Staking Complete"}

                            {(txStatus === 'idle' || txStatus === 'ready') && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                            {(txStatus === 'simulating' || txStatus === 'processing') && <Loader2 className="w-4 h-4 animate-spin" />}
                        </LockedButton>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-primary/10">
                        <div className="text-center space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Current APY</div>
                            <div className="text-xl font-serif text-foreground flex justify-center items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-green-500/80" />
                                {apy}%
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Liquid Earned</div>
                            <div className="text-xl font-mono text-primary flex justify-center items-center gap-1">
                                <Sparkles className="w-3 h-3 text-primary/50" />
                                {rewardCounter.toFixed(4)}
                            </div>
                        </div>
                        <div className="text-center space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Limit</div>
                            <div className="text-xl font-serif text-foreground flex justify-center items-center gap-1">
                                <Lock className="w-4 h-4 text-muted-foreground" />
                                Flexible
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Yield Calculator */}
            <div className="w-full max-w-lg pt-12 border-t border-primary/10 space-y-8">
                <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-serif text-foreground">Yield Projection</h2>
                </div>

                <div className="space-y-8 bg-card/30 p-8 rounded-sm border border-primary/5">

                    {/* Slider Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Staking Amount</label>
                            <div className="text-right">
                                <span className="text-2xl font-serif text-primary">{calcAmount.toLocaleString()}</span>
                                <span className="text-xs text-muted-foreground ml-1 font-mono">$GOLD</span>
                            </div>
                        </div>

                        <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={calcAmount}
                            onChange={(e) => setCalcAmount(parseInt(e.target.value))}
                            className="w-full h-1 bg-primary/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--primary)]"
                        />
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Est. Daily Rewards</div>
                            <div className="text-2xl font-serif text-foreground">
                                {(calcAmount * (apy / 100) / 365).toFixed(2)}
                            </div>
                            <div className="text-[10px] text-primary/60">$GOLD / Day</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Monthly Rebirths</div>
                            <div className="text-2xl font-serif text-foreground">
                                {(calcAmount * (apy / 100) / 12).toFixed(2)}
                            </div>
                            <div className="text-[10px] text-primary/60">$GOLD / Month</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Annual Restoration Power</div>
                            <div className="text-2xl font-serif text-foreground">
                                {(calcAmount * (apy / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-[10px] text-primary/60">$GOLD / Year</div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

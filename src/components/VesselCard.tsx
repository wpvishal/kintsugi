"use client";

import { motion } from "framer-motion";
import { Hammer, Sparkles, AlertCircle, CheckCircle2, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface VesselProps {
    project: {
        id: string;
        name: string;
        originalSymbol: string;
        restorationScore: number;
        status: string;
        desc: string;
        size?: string;
    };
    isSelected?: boolean;
    i?: number;
}

export default function VesselCard({ project, isSelected, i = 0 }: VesselProps) {
    const isRestored = project.status === 'Restored';
    const isLarge = project.size === 'large';

    // Circular Progress Calculation
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (project.restorationScore / 100) * circumference;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
                "group relative bg-card/40 backdrop-blur-sm border border-primary/10 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col justify-between rounded-sm",
                isLarge ? "md:col-span-2 lg:col-span-2" : "col-span-1",
                isSelected ? "ring-2 ring-primary shadow-[0_0_30px_-5px_var(--primary)]" : "",
                isRestored ? "shadow-[0_0_30px_-10px_rgba(212,175,55,0.3)]" : ""
            )}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Restored Sparkle Effect */}
            {isRestored && (
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                </div>
            )}

            <div className="p-8 space-y-6 relative z-10 flex-1 flex flex-col">

                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors truncate">
                                {project.name}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded border border-primary/20 text-primary/60 font-mono shrink-0">
                                {project.originalSymbol}
                            </span>
                        </div>

                        {/* Sensei's Note */}
                        <div className="flex items-start gap-2 text-sm text-muted-foreground font-light leading-relaxed">
                            <span className="mt-1 text-primary/50 text-[10px]">
                                {isRestored ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                            </span>
                            <span className="italic opacity-80">"{project.desc}"</span>
                        </div>
                    </div>

                    {/* Circular Health Gauge */}
                    <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="transparent"
                                className="text-primary/10"
                            />
                            <circle
                                cx="24"
                                cy="24"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className={cn(
                                    "transition-all duration-1000 ease-out",
                                    project.restorationScore > 70 ? "text-primary" :
                                        project.restorationScore > 40 ? "text-yellow-500/80" : "text-red-500/80"
                                )}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-foreground">
                            {project.restorationScore}
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-primary/10 space-y-4">

                    {/* Status Badge */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">Status</span>
                        <span className={cn(
                            "text-xs font-bold uppercase tracking-wider",
                            isRestored ? "text-primary drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" : "text-muted-foreground"
                        )}>
                            {project.status}
                        </span>
                    </div>

                    {/* Action Button */}
                    <button className="w-full py-3 bg-transparent border border-primary/30 hover:bg-primary hover:text-primary-foreground text-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden rounded-sm">
                        <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity" />
                        <Hammer className="w-4 h-4 transition-transform group-hover/btn:-rotate-45 relative z-10" />
                        <span className="text-xs uppercase tracking-widest font-bold relative z-10">Support Repair</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

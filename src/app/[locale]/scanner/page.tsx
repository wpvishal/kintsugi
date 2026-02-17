"use client";

import LockedButton from "@/components/LockedButton";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import VerdictModal from "@/components/VerdictModal";
import { type AnalysisResult } from "@/lib/scanner";
import { useTranslations } from "next-intl";

// 3D Bowl Component with "Kintsugi" Gold effect
const KintsugiBowl = ({ isHealing }: { isHealing: boolean }) => {
    const meshRef = useRef<any>(null);

    useFrame((state: any, delta: number) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            if (isHealing) {
                meshRef.current.rotation.z += delta * 0.5;
            }
        }
    });

    return (
        <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
            <MeshDistortMaterial
                color={isHealing ? "#D4AF37" : "#1a1a1a"}
                emissive={isHealing ? "#FFD700" : "#000000"}
                emissiveIntensity={isHealing ? 0.5 : 0}
                roughness={0.2}
                metalness={isHealing ? 1 : 0.8}
                distort={isHealing ? 0.3 : 0}
                speed={2}
            />
        </Sphere>
    );
};

export default function ZenScannerPage() {
    const [address, setAddress] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const t = useTranslations("scanner");

    const handleInspect = async () => {
        if (!address) return;
        setIsThinking(true);
        setResult(null);

        if (typeof window !== 'undefined') {
            (document.activeElement as HTMLElement)?.blur();
        }

        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address })
            });
            const data = await response.json();

            if (!isThinking) await new Promise(r => setTimeout(r, 1000));

            setIsThinking(false);
            setResult(data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Scan failed", error);
            setIsThinking(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background w-full">

            <VerdictModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                result={result}
                address={address}
            />

            {/* Ambient "Ma" Space */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[800px] sm:h-[800px] bg-primary/5 rounded-full blur-[80px] sm:blur-[150px]" />
            </div>

            {/* 3D Centerpiece */}
            <div className="h-48 sm:h-64 w-full max-w-lg mb-8 sm:mb-12 relative z-10 transition-all duration-1000">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF37" />
                    <Suspense fallback={null}>
                        <KintsugiBowl isHealing={isThinking} />
                    </Suspense>
                </Canvas>
                {isThinking && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center text-primary font-serif tracking-widest text-xs sm:text-sm uppercase pointer-events-none bg-background/50 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
                    >
                        {t("fusingShards")}
                    </motion.div>
                )}
            </div>

            {/* Input Vessel */}
            <div className="w-full max-w-xl z-20 space-y-12 text-center px-4">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={t("placeholder")}
                                className="w-full bg-transparent border-b border-muted-foreground/30 focus:border-primary text-center text-xl sm:text-2xl font-light py-4 text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-all font-serif rounded-none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleInspect()}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 ease-out" />
                        </div>

                        <LockedButton
                            onClick={handleInspect}
                            disabled={isThinking || !address}
                            className="w-full sm:w-auto px-8 py-4 text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em] text-xs font-light disabled:opacity-30 border border-transparent hover:border-primary/20 rounded-sm active:scale-95 touch-manipulation"
                        >
                            {isThinking ? t("meditating") : t("beginRitual")}
                        </LockedButton>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Mobile Helper Text */}
            <div className="absolute bottom-6 text-[10px] text-muted-foreground/20 font-mono sm:hidden">
                {t("mobileHelper")}
            </div>

        </div>
    );
}

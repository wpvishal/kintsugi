"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function WalletConnectBtn() {
    const { publicKey, connected } = useWallet();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if (!connected || !publicKey) {
        return (
            <WalletMultiButton style={{
                backgroundColor: 'transparent',
                color: '#D4AF37', // Gold
                border: '1px solid #D4AF37',
                fontFamily: 'var(--font-serif)',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                borderRadius: '0.125rem', // sm rounded
                height: '40px',
                padding: '0 24px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
            }}>
                Connect Soul
            </WalletMultiButton>
        );
    }

    // Connected State
    const base58 = publicKey.toBase58();
    const truncated = `${base58.slice(0, 4)}...${base58.slice(-4)}`;

    return (
        <WalletMultiButton style={{
            backgroundColor: 'rgba(212, 175, 55, 0.1)', // Low opacity gold bg
            color: '#D4AF37',
            border: '1px solid #D4AF37',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            borderRadius: '0.125rem',
            height: '40px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <span>{truncated}</span>
            <div className="bg-primary/20 rounded-full p-0.5">
                <Check className="w-3 h-3 text-primary" />
            </div>
        </WalletMultiButton>
    );
}

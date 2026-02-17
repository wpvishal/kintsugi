import Link from "next/link";
import { mockTokens } from "@/data/mockTokens";
import { Hammer, Skull, AlertTriangle, Ghost } from "lucide-react";
import { cn } from "@/lib/utils";
import WalletConnectBtn from "@/components/WalletConnectBtn";

export default function Dashboard() {
    return (
        <div className="min-h-screen p-8 sm:p-20 font-sans selection:bg-primary/20">
            <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                    <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
                        <div className="p-2 rounded-full bg-secondary/30">
                            <Hammer className="w-6 h-6 text-primary" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-2xl font-light tracking-wide text-foreground/90">Kintsugi Dashboard</h1>
                    </Link>
                </div>
                <div>
                    <WalletConnectBtn />
                </div>
            </header>

            <main>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockTokens.map((token) => (
                        <Link
                            key={token.id}
                            href={`/dashboard/token/${token.id}`}
                            className="group relative overflow-hidden rounded-sm border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-medium group-hover:text-primary transition-colors text-foreground">{token.name}</h2>
                                    <span className="text-xs tracking-wider text-muted-foreground uppercase">{token.symbol}</span>
                                </div>
                                <div className={cn(
                                    "px-2.5 py-0.5 rounded-full text-[10px] tracking-widest font-medium border uppercase",
                                    token.status === "rugged" && "bg-destructive/5 text-destructive border-destructive/20",
                                    token.status === "dead" && "bg-muted text-muted-foreground border-muted-foreground/20",
                                    token.status === "abandoned" && "bg-primary/10 text-primary border-primary/20"
                                )}>
                                    {token.status}
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-foreground/70">
                                <div className="flex items-center gap-2.5">
                                    {token.status === 'rugged' ? <Skull size={14} className="text-muted-foreground" /> : <Ghost size={14} className="text-muted-foreground" />}
                                    <span>{token.deathCause}</span>
                                </div>
                                <div className="flex justify-between pt-6 border-t border-border mt-4 text-xs text-muted-foreground uppercase tracking-wider">
                                    <span>Cap: ${token.marketCap}</span>
                                    <span>Holders: {token.holders}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

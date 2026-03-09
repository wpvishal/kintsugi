"use client";

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const routeWithoutLocale = pathname.replace(/^\/(ja|en)/, "") || "/";
    const isCrucible = routeWithoutLocale === "/crucible";

    if (isCrucible) {
        return <>{children}</>;
    }

    return (
        <div className="flex-1 flex flex-col p-4 sm:p-8 pt-24 sm:pt-28">
            <div className="flex-1 border-0 border-primary/20 relative rounded-sm overflow-visible">
                {/* Golden Border Container */}
                <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
                    <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />

                    <div className="absolute top-0 left-0 w-8 h-8 opacity-60">
                        <div className="absolute top-0 left-0 w-[1px] h-full bg-primary" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 opacity-60">
                        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-primary" />
                        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-primary" />
                    </div>
                </div>

                <div className="relative min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    );
}

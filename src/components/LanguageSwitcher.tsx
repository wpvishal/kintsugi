"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const locales = [
    { code: "ja", label: "JP" },
    { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const switchLocale = (newLocale: string) => {
        if (newLocale === locale) return;

        // Save preference in cookie (30 days)
        document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;

        // Replace the locale segment in the current path
        // pathname is like /ja/scanner or /en/vault
        const segments = pathname.split("/");
        segments[1] = newLocale; // Replace the locale segment
        const newPath = segments.join("/") || "/";

        // Save scroll position
        const scrollY = window.scrollY;

        startTransition(() => {
            router.replace(newPath);
            // Restore scroll after navigation
            requestAnimationFrame(() => {
                window.scrollTo(0, scrollY);
            });
        });
    };

    return (
        <div className={`flex items-center gap-1 font-serif text-xs tracking-widest ${isPending ? "opacity-50" : ""}`}>
            {locales.map((loc, i) => {
                const isActive = locale === loc.code;
                return (
                    <span key={loc.code} className="flex items-center gap-1">
                        {i > 0 && <span className="text-primary/20 select-none">|</span>}
                        <button
                            onClick={() => switchLocale(loc.code)}
                            className={`relative px-1 py-0.5 transition-all duration-300 ${isActive
                                    ? "text-primary"
                                    : "text-muted-foreground/60 hover:text-muted-foreground"
                                }`}
                        >
                            {loc.label}
                            {/* Gold Kintsugi seam underline */}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                            )}
                        </button>
                    </span>
                );
            })}
        </div>
    );
}

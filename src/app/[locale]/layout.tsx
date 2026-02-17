import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import AppWalletProvider from "@/components/AppWalletProvider";
import GoldenSeam from "@/components/GoldenSeam";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import LaunchLock from "@/components/LaunchLock";
import ProfileSignup from "@/components/ProfileSignup";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    // Load messages for the provider
    let messages;
    try {
        messages = (await import(`../../../messages/${locale}.json`)).default;
    } catch {
        messages = (await import(`../../../messages/ja.json`)).default;
    }

    return (
        <div data-locale={locale}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <AppWalletProvider>
                    <GoldenSeam />
                    <Navbar />

                    <div className="flex-1 flex flex-col p-4 sm:p-8 pt-24 sm:pt-28">
                        <div className="flex-1 border-0 border-primary/20 relative rounded-sm overflow-visible">

                            {/* Golden Border Container */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Irregular Top Border */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                                {/* Irregular Bottom Border */}
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                                {/* Irregular Left Border */}
                                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
                                {/* Irregular Right Border */}
                                <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-primary/60 to-transparent" />

                                {/* Gold Accents at Corners */}
                                <div className="absolute top-0 left-0 w-8 h-8 opacity-60">
                                    <div className="absolute top-0 left-0 w-[1px] h-full bg-primary" />
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-primary" />
                                </div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 opacity-60">
                                    <div className="absolute bottom-0 right-0 w-[1px] h-full bg-primary" />
                                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-primary" />
                                </div>
                            </div>

                            <div className="h-full relative overflow-auto custom-scrollbar">
                                <PageTransition>
                                    <LaunchLock>
                                        {children}
                                    </LaunchLock>
                                </PageTransition>
                            </div>
                        </div>
                    </div>
                    <Footer />
                    <ProfileSignup />
                </AppWalletProvider>
            </NextIntlClientProvider>
        </div>
    );
}

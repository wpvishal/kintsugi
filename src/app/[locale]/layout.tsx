import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import GoldenSeam from "@/components/GoldenSeam";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import LaunchLock from "@/components/LaunchLock";
import ProfileSignup from "@/components/ProfileSignup";
import LayoutWrapper from "@/components/LayoutWrapper";
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
                <GoldenSeam />
                <Navbar />

                <PageTransition>
                    <LaunchLock>
                        <LayoutWrapper>
                            {children}
                        </LayoutWrapper>
                    </LaunchLock>
                </PageTransition>

                <Footer />
                <ProfileSignup />
            </NextIntlClientProvider>
        </div>
    );
}

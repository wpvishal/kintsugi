import type { Metadata } from "next";
import { Inter, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "@/components/AppWalletProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const shippori = Shippori_Mincho({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-shippori",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kintsugi Protocol | Rebirth of the Broken Code",
  description: "The first AI-powered 'Rug-Pull Recovery' platform on Solana.",
  openGraph: {
    title: "Kintsugi Protocol | Rebirth of the Broken Code",
    description: "The first AI-powered 'Rug-Pull Recovery' platform on Solana.",
    url: "https://kintsugi.protocol",
    siteName: "Kintsugi Protocol",
    images: [
      {
        url: "/kintsugi-og.png",
        width: 1200,
        height: 630,
        alt: "Kintsugi Protocol - The Golden Repair",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kintsugi Protocol | Rebirth of the Broken Code",
    description: "The first AI-powered 'Rug-Pull Recovery' platform on Solana.",
    images: ["/kintsugi-og.png"],
    creator: "@KintsugiProtocol",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${shippori.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppWalletProvider>
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get("host") || "";

    // Subdomain configuration for kintsugi-web project
    const subHost = "crucible.kintsugi.asia";
    const devSubHost = "crucible.localhost:3000";

    // 🌪️ Subdomain Logic (Directs root queries of the subdomain to the crucible app internal route)
    if (hostname.includes(subHost) || hostname.includes(devSubHost)) {
        if (url.pathname === "/") {
            const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
            url.pathname = `/${locale}/crucible`;
            return NextResponse.rewrite(url);
        }
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};

export const IS_LIVE = process.env.NEXT_PUBLIC_LAUNCH_STATUS === "true";

export const LAUNCH_DATE = "2026-06-01T00:00:00Z";
export const ACCESS_CODE_HASH = "8d969qf..."; // Placeholder logic if needed for bypass

/**
 * Routes that are always accessible, even when IS_LIVE = false.
 * These are matched AFTER stripping the locale prefix (e.g., /ja or /en).
 */
export const PUBLIC_ROUTES: string[] = [
    "/",        // Landing Page
    "/scroll",  // Whitepaper
    "/terms",   // Terms of Service
    "/privacy", // Privacy Policy
    "/crucible", // The Crucible Sub-Project
];


import { NextRequest, NextResponse } from "next/server";
import { analyzeContract } from "@/lib/scanner";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { address } = body;

        if (!address) {
            return NextResponse.json({ error: "Address is required" }, { status: 400 });
        }

        const result = await analyzeContract(address);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Analysis failed:", error);
        return NextResponse.json({ error: "Failed to analyze contract" }, { status: 500 });
    }
}

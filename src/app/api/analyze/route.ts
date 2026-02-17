import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { code, context } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Gemini API Key not configured" },
                { status: 500 }
            );
        }

        if (!code) {
            return NextResponse.json(
                { error: "No code provided for analysis" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Act as a senior smart contract auditor and blockchain archaeologist. 
      Analyze the following code snippet from a "dead" or abandoned Solana/EVM project.
      
      Context: ${context || "Unknown project"}
      
      Code:
      \`\`\`
      ${code}
      \`\`\`
      
      Provide a response in the following JSON format:
      {
        "vulnerabilities": ["List of critical bugs"],
        "salvageableCheck": "Boolean (true/false) if there is logic worth reusing",
        "repairPlan": "Short description of how to fix or repurpose this code",
        "goldenNugget": "One specific insight or valuable logic found in the code"
      }
      
      Return ONLY valid JSON.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return NextResponse.json(JSON.parse(cleanJson));

    } catch (error) {
        console.error("Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to analyze code" },
            { status: 500 }
        );
    }
}

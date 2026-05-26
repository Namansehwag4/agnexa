import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateAuditReport as fallbackAudit } from "./audit-engine";
import { productCatalog } from "@/lib/constants/products";

export type AuditInput = {
  buildingType: string;
  areaSqFt: number;
  floors: number;
  occupancyCount: number;
  electricalLoad: string;
  hasKitchen: boolean;
  hasIndustrialEquipment: boolean;
};

export async function askGeminiForAudit(input: AuditInput) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.info("Gemini API key is not configured. Falling back to rule-based engine.");
    return fallbackAudit(input);
  }

  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are a professional Fire Safety Audit Officer specializing in the National Building Code (NBC) of India.
Evaluate the fire hazard risk score (0 to 100) and compile a compliance checklist for the following building parameters.

Parameters:
- Building Type: ${input.buildingType}
- Total Area: ${input.areaSqFt} sq ft
- Number of Floors: ${input.floors}
- Occupancy Load: ${input.occupancyCount} people
- Electrical Systems Load: ${input.electricalLoad}
- Kitchen/Canteen Present: ${input.hasKitchen ? "Yes" : "No"}
- Heavy Industrial Machinery: ${input.hasIndustrialEquipment ? "Yes" : "No"}

Return ONLY a valid JSON object matching the following structure without markdown formatting or code blocks:
{
  "riskScore": number (between 0 and 100),
  "riskLevel": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "recommendations": string[] (at least 4 actionable items),
  "compliance": {
    "extinguisherCoverage": string,
    "evacuation": string,
    "inspection": string
  },
  "cards": [
    { "title": "Coverage", "copy": "summary copy" },
    { "title": "Inspection", "copy": "summary copy" },
    { "title": "Compliance", "copy": "summary copy" }
  ]
}`;

    const response = await model.generateContent(systemPrompt);
    const text = response.response.text();
    
    // Clean potential markdown blocks
    const cleanedText = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleanedText);

    // Populate suggested products from catalog
    result.suggestedProducts = productCatalog.slice(0, 3);
    
    return result;
  } catch (error) {
    console.error("Failed to query Gemini API, falling back to rules engine:", error);
    return fallbackAudit(input);
  }
}

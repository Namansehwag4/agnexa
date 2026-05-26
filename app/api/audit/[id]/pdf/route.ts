import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let report: any = null;

  try {
    if (id !== "sample" && id !== "draft") {
      report = await prisma.auditReport.findUnique({
        where: { id }
      });
    }
  } catch (err) {
    console.error("Prisma lookup failed, falling back to sample report", err);
  }

  // Fallback template report if not found in db or is mock "sample" ID
  if (!report) {
    report = {
      buildingType: "Commercial Office Tower",
      areaSqFt: 18500,
      floors: 6,
      occupancyCount: 220,
      electricalLoad: "High",
      hasKitchen: true,
      hasIndustrialEquipment: false,
      riskScore: 68,
      riskLevel: "HIGH",
      recommendations: [
        "Install at least 13 certified extinguishers across accessible fire points.",
        "Create QR-based asset logs for every extinguisher and safety device.",
        "Schedule monthly inspections for high-traffic and electrical zones.",
        "Add Class K/wet chemical protection and kitchen hood inspection routines.",
        "Maintain normal pantry fire controls."
      ],
      compliance: {
        extinguisherCoverage: "Review placement every 15-20 meters of travel distance.",
        evacuation: "Maintain illuminated exit routes and drill records.",
        inspection: "Keep refill, pressure, and expiry records audit-ready."
      }
    };
  }

  try {
    // Create a new PDF document
    const doc = new PDFDocument({ margin: 50, size: "A4" });

    // Collect buffer data
    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));

    // Wait for end to return response
    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    // --- Header ---
    doc.fillColor("#DC2626").fontSize(26).text("AGNEXA FIRE SAFETY", 50, 50, { characterSpacing: 1.5 });
    doc.fillColor("#0F172A").fontSize(12).text("CERTIFIED INDUSTRIAL PRODUCTS & AMC SERVICES", 50, 80);
    doc.strokeColor("#E2E8F0").lineWidth(1).moveTo(50, 105).lineTo(545, 105).stroke();

    // --- Document Title ---
    doc.font("Helvetica-Bold").fillColor("#0F172A").fontSize(18).text("Official Fire Safety Audit & Compliance Report", 50, 125);
    doc.font("Helvetica");
    
    // Date & ID
    const dateStr = new Date().toLocaleDateString("en-IN", { dateStyle: "long" });
    doc.fontSize(10).fillColor("#64748B").text(`Report Date: ${dateStr}`, 50, 150);
    doc.text(`Reference ID: AGN-AUD-${id.toUpperCase()}`, 50, 165);

    // --- Building Parameters Table/Grid ---
    doc.fillColor("#0F172A").fontSize(14).text("1. Building & Operational Profile", 50, 195, { underline: true });
    
    // Draw grey background for inputs summary
    doc.rect(50, 215, 495, 100).fill("#F8FAFC");
    doc.fillColor("#0F172A").fontSize(10);
    
    doc.text(`Building Structure:   ${report.buildingType}`, 70, 230);
    doc.text(`Coverage Area:        ${report.areaSqFt.toLocaleString("en-IN")} sq ft`, 70, 250);
    doc.text(`Floors Level:         ${report.floors} floors`, 70, 270);
    doc.text(`Occupancy Load:       ${report.occupancyCount} personnel`, 70, 290);

    doc.text(`Electrical System:    ${report.electricalLoad} Risk`, 320, 230);
    doc.text(`Pantry Kitchen:       ${report.hasKitchen ? "Present (High Risk)" : "Absent"}`, 320, 250);
    doc.text(`Industrial Assets:    ${report.hasIndustrialEquipment ? "Yes" : "No"}`, 320, 270);

    // --- Risk Assessment Callout ---
    doc.fillColor("#0F172A").fontSize(14).text("2. Risk Profile & Compliance Score", 50, 335, { underline: true });
    
    // Draw border box for risk
    const isCritical = report.riskScore >= 80;
    const isHigh = report.riskScore >= 60 && report.riskScore < 80;
    const riskColor = isCritical ? "#DC2626" : isHigh ? "#EF4444" : "#2563EB";
    
    doc.rect(50, 355, 495, 75).strokeColor("#E2E8F0").lineWidth(1.5).stroke();
    
    // Draw score circle background
    doc.circle(100, 392, 25).fill(riskColor);
    doc.fillColor("#FFFFFF").fontSize(16).text(`${report.riskScore}`, 88, 385, { width: 24, align: "center" });

    // Text details next to circle
    doc.font("Helvetica-Bold").fillColor("#0F172A").fontSize(12).text(`Evaluation Category: ${report.riskLevel}`, 145, 372);
    doc.font("Helvetica");
    doc.fontSize(9.5).fillColor("#64748B").text(
      "The calculated score is based on National Building Code (NBC) guidelines factoring occupancy load, height, and hazards.",
      145,
      390,
      { width: 380, lineGap: 3 }
    );

    // --- Recommendations Checklist ---
    doc.fillColor("#0F172A").fontSize(14).text("3. Actionable Safety Recommendations", 50, 455, { underline: true });
    
    let currentY = 480;
    const recs: string[] = report.recommendations || [];
    
    recs.forEach((rec, idx) => {
      if (currentY > 730) {
        doc.addPage();
        currentY = 50; // reset for new page
      }
      // Checkbox square
      doc.rect(50, currentY + 1, 8, 8).strokeColor("#64748B").lineWidth(1).stroke();
      doc.fillColor("#334155").fontSize(9.5).text(rec, 70, currentY, { width: 475, lineGap: 3 });
      
      // Calculate height of text to increment dynamically
      const textHeight = doc.heightOfString(rec, { width: 475, lineGap: 3 });
      currentY += Math.max(25, textHeight + 10);
    });

    // --- Compliance Notes Footer ---
    if (currentY > 700) {
      doc.addPage();
      currentY = 50;
    }
    
    doc.strokeColor("#E2E8F0").lineWidth(1).moveTo(50, 745).lineTo(545, 745).stroke();
    doc.fillColor("#94A3B8").fontSize(8).text(
      "Disclaimer: This safety assessment is powered by Agnexa Fire Safety Compliance engine. Recommendations should be audited by certified fire officers before installation.",
      50,
      760,
      { align: "center", width: 495 }
    );

    // Close document
    doc.end();

    // Await stream and return
    const buffer = await pdfPromise;
    return new NextResponse(buffer as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="Agnexa_Audit_${id}.pdf"`
      }
    });
  } catch (error) {
    console.error("PDF generation exception:", error);
    return NextResponse.json({ error: "Could not generate PDF" }, { status: 500 });
  }
}

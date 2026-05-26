import { Calendar, CheckCircle2, AlertTriangle, Clock, Wrench, ShieldAlert, ArrowLeft, ArrowRight, MapPin, Building, CalendarClock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { Button, LinkButton } from "@/components/ui/button";
import { productCatalog } from "@/lib/constants/products";

// Server action to register the new asset
async function registerAsset(formData: FormData) {
  "use server";
  const tag = String(formData.get("tag"));
  const location = String(formData.get("location"));
  const building = String(formData.get("building"));
  const floor = String(formData.get("floor"));
  const installedAt = new Date(String(formData.get("installedAt")));
  const nextInspection = new Date(String(formData.get("nextInspection")));

  const targetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/tracking/${tag}`;
  // Dynamically import to avoid node/browser buffer issues
  const { createAssetQrDataUrl } = await import("@/lib/services/qr");
  const qrCodeDataUrl = createAssetQrDataUrl(tag, targetUrl);

  await prisma.fireAsset.create({
    data: {
      assetTag: tag,
      location,
      building,
      floor,
      installedAt,
      nextInspection,
      health: "HEALTHY",
      qrCodeDataUrl
    }
  });

  redirect(`/tracking/${tag}`);
}

// Server action to add a maintenance log
async function addMaintenanceLog(formData: FormData) {
  "use server";
  const tag = String(formData.get("tag"));
  const action = String(formData.get("action"));
  const notes = String(formData.get("notes"));
  const performedBy = String(formData.get("performedBy"));

  const asset = await prisma.fireAsset.findUnique({
    where: { assetTag: tag }
  });

  if (asset) {
    await prisma.maintenanceLog.create({
      data: {
        assetId: asset.id,
        action,
        notes,
        performedBy
      }
    });

    // Update asset inspection details if it was an inspection/refill
    const updates: any = {};
    if (action.includes("Inspection")) {
      updates.lastInspection = new Date();
      updates.nextInspection = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      updates.health = "HEALTHY";
    } else if (action.includes("Refill")) {
      updates.lastInspection = new Date();
      updates.health = "HEALTHY";
    }

    await prisma.fireAsset.update({
      where: { assetTag: tag },
      data: updates
    });
  }

  redirect(`/tracking/${tag}`);
}

export default async function TagTrackingPage({
  params
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  
  let asset = null;
  try {
    asset = await prisma.fireAsset.findUnique({
      where: { assetTag: tag },
      include: { logs: { orderBy: { performedAt: "desc" } } }
    });
  } catch (err) {
    // Database might not be fully migrated yet or empty
  }

  // Predefined sample asset logic in case database doesn't have it or migration fails
  const isMockTag = tag.startsWith("AGN-QR-");
  let mockAsset = null;

  if (!asset && isMockTag) {
    const mockDetails: Record<string, any> = {
      "AGN-QR-1001": {
        assetTag: "AGN-QR-1001",
        location: "Main Lobby Entrance",
        building: "Tower A",
        floor: "Ground Floor",
        installedAt: new Date("2025-01-10"),
        lastInspection: new Date("2026-05-12"),
        nextInspection: new Date("2026-06-12"),
        health: "HEALTHY",
        logs: [
          { id: "l1", action: "Pressure Check & Cleaned", performedBy: "Ramesh Kumar (Tech ID: 228)", performedAt: new Date("2026-05-12"), notes: "Pressure dial within normal green range. Seals intact." },
          { id: "l2", action: "Initial Mounting", performedBy: "Suresh Singh (Tech ID: 104)", performedAt: new Date("2025-01-10"), notes: "Extinguisher mounted at 1.2m standard height with sign board." }
        ]
      },
      "AGN-QR-1002": {
        assetTag: "AGN-QR-1002",
        location: "UPS Room Server Cabinet",
        building: "Tower B",
        floor: "3rd Floor",
        installedAt: new Date("2024-06-15"),
        lastInspection: new Date("2025-12-10"),
        nextInspection: new Date("2026-01-10"),
        health: "SERVICE_DUE",
        logs: [
          { id: "l3", action: "Hydrostatic Pressure Test", performedBy: "Rahul Verma", performedAt: new Date("2025-06-12"), notes: "Passed cylinder integrity checks." }
        ]
      },
      "AGN-QR-1003": {
        assetTag: "AGN-QR-1003",
        location: "Loading Dock A",
        building: "Warehouse main",
        floor: "Ground floor",
        installedAt: new Date("2025-03-20"),
        lastInspection: new Date("2026-04-10"),
        nextInspection: new Date("2026-05-10"),
        health: "ATTENTION",
        logs: [
          { id: "l4", action: "Nozzle inspected", performedBy: "Ramesh Kumar", performedAt: new Date("2026-04-10"), notes: "Hose needs replacement next session due to surface wear." }
        ]
      }
    };
    mockAsset = mockDetails[tag] || null;
  }

  const activeAsset = asset || mockAsset;

  if (activeAsset) {
    const healthColors = {
      HEALTHY: "bg-emerald-50 text-emerald-700 border-emerald-200",
      SERVICE_DUE: "bg-amber-50 text-amber-700 border-amber-200",
      ATTENTION: "bg-blue-50 text-blue-700 border-blue-200",
      EXPIRED: "bg-red-50 text-red-700 border-red-200"
    };

    const healthIcons = {
      HEALTHY: CheckCircle2,
      SERVICE_DUE: Clock,
      ATTENTION: AlertTriangle,
      EXPIRED: ShieldAlert
    };

    const IconComponent = healthIcons[activeAsset.health as keyof typeof healthIcons] || CheckCircle2;

    return (
      <div className="bg-smoke min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="section-shell max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/tracking" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ember transition">
              <ArrowLeft className="size-4" /> Back to Dashboard
            </Link>
            <LinkButton href="/tracking/scan" variant="secondary" className="min-h-9 px-4 py-1.5 text-xs">Scan another</LinkButton>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Asset Details */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Asset tag: {activeAsset.assetTag}</span>
                    <h1 className="text-3xl font-black text-carbon mt-1">{activeAsset.location}</h1>
                    <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-2">
                      <Building className="size-4 text-bluefire" /> {activeAsset.building || "N/A"} • {activeAsset.floor || "N/A"}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${healthColors[activeAsset.health as keyof typeof healthColors]}`}>
                    <IconComponent className="size-4" /> {activeAsset.health.replace("_", " ")}
                  </span>
                </div>

                <div className="mt-8 border-t border-line pt-6 grid gap-4 sm:grid-cols-2 text-sm">
                  <div>
                    <p className="font-bold text-slate-500">Installation Date</p>
                    <p className="mt-1 font-semibold text-carbon flex items-center gap-2">
                      <Calendar className="size-4 text-slate-400" /> {activeAsset.installedAt ? new Date(activeAsset.installedAt).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-500">Next Scheduled Inspection</p>
                    <p className="mt-1 font-semibold text-carbon flex items-center gap-2">
                      <CalendarClock className="size-4 text-slate-400" /> {activeAsset.nextInspection ? new Date(activeAsset.nextInspection).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Maintenance Logs */}
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h2 className="text-xl font-black text-carbon mb-6 flex items-center gap-2">
                  <Wrench className="size-5 text-ember" /> Maintenance History
                </h2>
                {activeAsset.logs && activeAsset.logs.length > 0 ? (
                  <div className="relative border-l border-line ml-3 pl-6 space-y-6">
                    {activeAsset.logs.map((log: any) => (
                      <div key={log.id} className="relative">
                        {/* Dot indicator */}
                        <span className="absolute -left-[31px] top-1.5 flex size-4 items-center justify-center rounded-full bg-bluefire text-white ring-8 ring-white">
                          <span className="size-2 rounded-full bg-white" />
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-500">{new Date(log.performedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                          <h3 className="text-md font-bold text-carbon mt-1">{log.action}</h3>
                          <p className="text-sm leading-6 text-slate-600 mt-1">{log.notes}</p>
                          <p className="text-xs font-bold text-slate-500 mt-1">Performed by: {log.performedBy || "System"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 font-semibold italic">No maintenance logs found for this asset.</p>
                )}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="space-y-6">
              {/* Report Action Form */}
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
                <h2 className="text-xl font-black text-carbon mb-4">Log Maintenance Visit</h2>
                <form action={addMaintenanceLog} className="space-y-4">
                  <input type="hidden" name="tag" value={activeAsset.assetTag} />
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Action Taken</label>
                    <select name="action" required className="h-11 w-full rounded-2xl border border-line bg-transparent px-3 text-sm font-semibold outline-none focus:border-bluefire">
                      <option value="Routine Inspection Completed">Routine Monthly Inspection</option>
                      <option value="Extinguisher Refilled">Refill & Pressure Calibrated</option>
                      <option value="Hose/Nozzle Replaced">Hose or Nozzle Replacement</option>
                      <option value="Mounting Bracket Adjusted">Mounting Bracket Adjustment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Technician Name</label>
                    <input type="text" name="performedBy" placeholder="Technician Name" required className="h-11 w-full rounded-2xl border border-line bg-transparent px-3 text-sm font-semibold outline-none focus:border-bluefire" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Observation Notes</label>
                    <textarea name="notes" placeholder="e.g. Verified pressure dial, checked seals, replaced safety pin..." rows={3} className="w-full rounded-2xl border border-line bg-transparent px-3 py-2.5 text-sm font-semibold outline-none focus:border-bluefire" />
                  </div>
                  <Button type="submit" className="w-full">Submit Log Entry</Button>
                </form>
              </div>

              {/* Service Request Link */}
              <div className="rounded-3xl border border-line bg-white p-6 shadow-soft text-center">
                <h3 className="font-black text-lg text-carbon">Need Professional AMC Service?</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">Book a certified engineer visit for hydrostatic cylinder tests, refilling, or complete building audits.</p>
                <LinkButton href="/services" variant="secondary" className="w-full mt-4">Schedule Service Visit</LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration view if asset is not found
  return (
    <div className="bg-smoke min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="section-shell max-w-2xl mx-auto">
        <Link href="/tracking" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ember transition mb-6">
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>

        <div className="rounded-3xl border border-line bg-white p-8 shadow-soft">
          <div className="text-center mb-8">
            <span className="rounded-full bg-amber-50 text-amber-700 px-3.5 py-1 text-xs font-bold border border-amber-200">Unregistered QR Tag</span>
            <h1 className="text-3xl font-black text-carbon mt-3">Register Fire Asset</h1>
            <p className="text-sm leading-6 text-slate-600 mt-1">This scanned tag (<code className="font-bold">{tag}</code>) is not yet registered. Initialize it in your building registry.</p>
          </div>

          <form action={registerAsset} className="space-y-4">
            <input type="hidden" name="tag" value={tag} />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Asset Tag ID</label>
                <input type="text" value={tag} disabled className="h-12 w-full rounded-2xl border border-line bg-slate-50 px-4 text-sm font-bold text-slate-600 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Location Description</label>
                <input type="text" name="location" placeholder="e.g. Server Room Entrance" required className="h-12 w-full rounded-2xl border border-line bg-transparent px-4 text-sm font-semibold outline-none focus:border-bluefire" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Building Tower</label>
                <input type="text" name="building" placeholder="e.g. Tower B" required className="h-12 w-full rounded-2xl border border-line bg-transparent px-4 text-sm font-semibold outline-none focus:border-bluefire" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Floor Level</label>
                <input type="text" name="floor" placeholder="e.g. 4th Floor" required className="h-12 w-full rounded-2xl border border-line bg-transparent px-4 text-sm font-semibold outline-none focus:border-bluefire" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Installation Date</label>
                <input type="date" name="installedAt" required defaultValue={new Date().toISOString().split("T")[0]} className="h-12 w-full rounded-2xl border border-line bg-transparent px-4 text-sm font-semibold outline-none focus:border-bluefire" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Next Inspection Date</label>
                <input type="date" name="nextInspection" required defaultValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} className="h-12 w-full rounded-2xl border border-line bg-transparent px-4 text-sm font-semibold outline-none focus:border-bluefire" />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6 h-12 text-sm font-black flex items-center justify-center gap-2">
              Register & Add Asset <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

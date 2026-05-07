import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminQrPage() {
  return <AdminListPage title="QR asset management" description="Generate QR codes, assign assets, monitor extinguisher health, refill history, and expiry alerts." items={["QR code generation", "Asset assignment", "Inspection logs", "Refill history", "Expiry alerts"]} />;
}

import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminEmergencyPage() {
  return <AdminListPage title="Emergency requests" description="Handle panic alerts, live location payloads, quick contact state, and response workflow." items={["New alerts", "Location payloads", "Quick contacts", "Nearby stations", "Resolved incidents"]} />;
}

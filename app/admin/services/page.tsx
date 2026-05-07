import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminServicesPage() {
  return <AdminListPage title="Service requests" description="Coordinate AMC, refill, installation, inspection, and safety audit bookings." items={["AMC requests", "Refill bookings", "Installation jobs", "Inspection calendar", "Audit reports"]} />;
}

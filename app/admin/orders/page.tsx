import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminOrdersPage() {
  return <AdminListPage title="Orders" description="Manage fulfilment, payment state, shipment tracking, cancellations, and invoice generation." items={["Pending orders", "Paid orders", "COD verification", "GST invoice queue", "Shipment updates"]} />;
}

import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminInventoryPage() {
  return <AdminListPage title="Inventory" description="Monitor SKU stock, low inventory alerts, warehouse movements, and reorder priorities." items={["Low stock", "Fast moving SKUs", "Warehouse updates", "Reorder suggestions", "Bulk pricing"]} />;
}

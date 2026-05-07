import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminAuditsPage() {
  return <AdminListPage title="Safety audit reports" description="Review risk scores, recommendations, compliance analysis, and product suggestions." items={["New reports", "High-risk sites", "PDF exports", "Compliance gaps", "Product suggestions"]} />;
}

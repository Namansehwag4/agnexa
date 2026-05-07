import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminQuotesPage() {
  return <AdminListPage title="Quote requests" description="Handle B2B leads, corporate inquiries, quantity-based pricing, and win/loss status." items={["New leads", "Contacted", "Quoted", "Won", "Lost"]} />;
}

import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminAnalyticsPage() {
  return <AdminListPage title="Analytics" description="Track revenue, order conversion, product performance, lead sources, and service demand." items={["Revenue dashboard", "Top products", "Quote conversion", "AMC pipeline", "Service heatmap"]} />;
}

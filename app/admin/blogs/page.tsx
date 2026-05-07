import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminBlogsPage() {
  return <AdminListPage title="Blogs" description="Manage SEO content, local landing pages, guides, tags, and publishing status." items={["Draft posts", "Published posts", "Local SEO pages", "Meta previews", "Structured data"]} />;
}

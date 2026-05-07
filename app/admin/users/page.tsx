import { AdminListPage } from "@/components/admin/admin-list-page";

export default function AdminUsersPage() {
  return <AdminListPage title="Users" description="Manage customers, staff users, admin roles, account status, and B2B customer records." items={["Customers", "Staff", "Admins", "Corporate accounts", "Role changes"]} />;
}

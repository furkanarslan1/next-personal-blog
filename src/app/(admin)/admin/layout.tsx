import React from "react";
import AdminSidebar from "./components/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="p-4">
        <AdminSidebar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="px-4"></aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}

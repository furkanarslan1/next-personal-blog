import type { Category } from "@prisma/client";
import { prisma } from "@lib/prisma";
import CreateForm from "./components/CreateForm";

async function getCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return categories;
}

export default async function AdminCreatePage() {
  const categories = await getCategories();

  return <CreateForm categories={categories} />;
}

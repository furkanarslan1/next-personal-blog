// components/FilteredBlogSection.tsx
import { prisma } from "@lib/prisma";

import { Post, Category, User, Like } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

// Post verilerine Like, Category ve Author ilişkilerini ekleyen tip tanımı
type BlogWithDetails = Post & {
  author: User;
  category: Category | null;
  likes: Like[];
};

interface FilteredBlogSectionProps {
  slug: string; // Seçilen kategori slug'ı
}

// Next.js Server Component (async)
export default async function FilteredBlogSection({
  slug,
}: FilteredBlogSectionProps) {
  // Seçilen kategoriye ait blogları sunucuda çek
  const categoryBlogs: BlogWithDetails[] = await prisma.post.findMany({
    where: {
      category: {
        slug: slug, // Kategori slug'ına göre filtrele
      },
      isPublished: true,
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      category: true,
      // Beğeni sayısını göstermek isterseniz
      likes: true,
    },
  });

  if (categoryBlogs.length === 0) {
    return (
      <div className="text-center py-8 text-lg text-gray-400">
        Bu kategoride yayınlanmış herhangi bir blog yazısı bulunmamaktadır.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categoryBlogs.map((post) => (
        <Link
          href={`/blogs/${post.category?.slug || "general"}/${post.slug}`}
          className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          {post.imageUrl ? (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-opacity duration-500 group-hover:opacity-90"
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            //
            <div className="relative h-48 w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400">no image</span>
            </div>
          )}

          <div className="p-4 sm:p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-orange-500 transition duration-150">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

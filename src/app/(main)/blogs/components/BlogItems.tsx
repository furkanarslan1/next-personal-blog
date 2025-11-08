import { getBlogsByCategoryAction } from "@/actions/blogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosThumbsUp } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function BlogItems({
  categorySlug,
  currentPage,
}: {
  categorySlug?: string;
  currentPage: number;
}) {
  const { blogs, totalPages } = await getBlogsByCategoryAction(
    categorySlug,
    currentPage
  );

  if (!blogs.length)
    return (
      <p className="text-gray-500 h-64 flex items-center justify-center">
        No blogs found in this category.
      </p>
    );

  const createPageLink = (page: number) => {
    const basePath = "/blogs";
    const queryParts = [];

    if (categorySlug) {
      queryParts.push(`category=${categorySlug}`);
    }

    if (page > 1) {
      queryParts.push(`page=${page}`);
    }

    const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    return `${basePath}${queryString}`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6  p-6 bg-[url('/blog_pattern_2.webp')] bg-contain bg-center">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.category?.slug || "general"}/${blog.slug}`}
            className="flex flex-col justify-end gap-2 rounded-md   "
          >
            <div className="relative h-64  rounded-md ">
              <Image
                src={blog.imageUrl || "/personal-blog-hero.webp"}
                alt={blog.title || "post image"}
                fill
                className="object-cover object-top  rounded-md"
              />
            </div>

            <div className="  text-slate-800 z-20  flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {blog.title && blog.title.length > 20
                  ? blog.title.slice(0, 20)
                  : blog.title}
              </h3>
              <div className="flex items-center gap-4 text-slate-800 text-sm">
                <span className="flex items-center gap-1">
                  <IoIosThumbsUp className="text-orange-400" />
                  {blog._count?.likes || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegComment className="text-orange-400" />
                  {blog._count?.comments || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {blogs.length > 0 && (
        <div className="mt-8 mb-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 ? (
                  <PaginationPrevious href={createPageLink(currentPage - 1)} />
                ) : (
                  <PaginationPrevious />
                )}
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => {
                  if (
                    pageNumber <= 2 ||
                    pageNumber >= totalPages - 1 ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href={createPageLink(pageNumber)}
                          isActive={pageNumber === currentPage}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis /> 
                </PaginationItem>
              )}
              <PaginationItem>
                {currentPage < totalPages ? (
                  <PaginationNext href={createPageLink(currentPage + 1)} />
                ) : (
                  <PaginationNext />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

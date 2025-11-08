import { getBlogsByCategoryAction } from "@/actions/blogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosThumbsUp } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

export default async function HomeBlogs({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const blogs = await getBlogsByCategoryAction(categorySlug);

  if (!blogs.length)
    return (
      <p className="text-gray-500 h-96">No blogs found in this category.</p>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 px-4 md:py-4 md:px-0 bg-transparent bg-contain bg-center max-w-7xl mx-auto overflow-hidden">
      {blogs.map((blog) => (
        // <div key={blog.id} className="border rounded-xl p-4 shadow-sm">
        //   <h2 className="font-semibold text-lg">{blog.title}</h2>
        //   <p className="text-xs text-gray-400 mt-2">{blog.category?.name}</p>
        // </div>
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
          {/* <span className="absolute top-2 right-4 bg-orange-500 text-white rounded-2xl text-sm px-2">
            {blog.category?.name || "General"}
          </span> */}

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
  );
}

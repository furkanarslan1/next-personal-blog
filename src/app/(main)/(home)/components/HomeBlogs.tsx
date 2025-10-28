import { getBlogsByCategoryAction } from "@/actions/blogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6  p-6 bg-[url('/blog_pattern_2.jpg')] bg-contain bg-center">
      {blogs.map((blog) => (
        // <div key={blog.id} className="border rounded-xl p-4 shadow-sm">
        //   <h2 className="font-semibold text-lg">{blog.title}</h2>
        //   <p className="text-xs text-gray-400 mt-2">{blog.category?.name}</p>
        // </div>
        <Link
          key={blog.id}
          href={`/blogs/${blog.category?.slug || "general"}/${blog.slug}`}
          className="relative h-56 flex flex-col justify-end gap-2 border-4 border-orange-500 rounded-md bg-slate-800 text-white"
        >
          <Image
            src={blog.imageUrl || "/personal-blog-hero.jpg"}
            alt={blog.title || "post image"}
            fill
            className="object-cover object-top "
          />
          {/* <span className="absolute top-2 right-4 bg-orange-500 text-white rounded-2xl text-sm px-2">
            {blog.category?.name || "General"}
          </span> */}

          <div className=" bg-black/60 text-orange-500 z-20 p-4">
            <h3 className="font-bold text-sm">
              {blog.title && blog.title.length > 20
                ? blog.title.slice(0, 20)
                : blog.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

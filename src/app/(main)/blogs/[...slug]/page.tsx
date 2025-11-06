import { getBlogsByCategoryAction } from "@/actions/blogs";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import { prisma } from "@lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import BlogCommentForm from "../components/BlogCommentForm";
import { auth } from "@/auth";
import BlogComments from "../components/BlogComments";
import { getCommentByPostIdAction } from "@/actions/comments";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const awaitedParams = await params;
  const slugArray = awaitedParams.slug;

  if (!slugArray || slugArray.length < 2) {
    notFound();
  }

  const categorySlug = slugArray[0];
  const blogSlug = slugArray[1];

  const blog = await prisma.post.findUnique({
    where: { slug: blogSlug },
    include: {
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  const createdDate = new Date(blog.createdAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const keywordsArray =
    typeof blog.keywords === "string"
      ? blog.keywords
          .split(",")
          .map((k) => k.trim())
          .filter((k) => k.length > 0)
      : Array.isArray(blog.keywords)
      ? blog.keywords
      : [];

  const categoryByBlogs = await getBlogsByCategoryAction(categorySlug);
  const comments = await getCommentByPostIdAction(blog.id);

  const session = await auth();

  return (
    <div className="bg-[url('/blog_bg.jpg')] bg-contain bg-center min-h-screen relative">
      <span className="absolute top-0 left-0 h-16 bg-gradient-to-b from-black/80 to-black/10 "></span>
      <div className="pt-16 max-w-6xl mx-auto relative">
        <section className="flex flex-col items-center gap-6 p-6">
          <div className="relative  w-full h-96">
            <Image
              src={blog.imageUrl || "/personal-blog-hero.jpg"}
              alt={blog.title}
              className="object-cover object-center rounded-md"
              fill
            />
          </div>
          <div className="self-start">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-slate-300">Category: </p>
                <p className="bg-orange-500 rounded-xl px-2 py-1 text-sm text-white ">
                  {categorySlug}
                </p>
              </div>

              <div className="text-slate-300">
                <span className="font-bold">Creat Date: </span>
                {createdDate}
              </div>
            </div>
          </div>

          <h1 className="font-extrabold text-2xl md:text-4xl text-white border-b-4 border-orange-500">
            {blog.title}
          </h1>

          <div className="text-slate-300 space-y-6">
            <p className="text-slate-300 p-4">{blog.content}</p>

            <div className="flex gap-2 flex-wrap items-center z-20">
              <p className="text-sm">Keywords: </p>
              {keywordsArray.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-orange-500 px-2 py-1 text-xs rounded-full text-slate-800 font-bold shadow-lg"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>
        {categoryByBlogs.length > 0} && (
        <section className="px-6">
          <h2>Similar blogs</h2>
          <div>{<HorizontalSlider sliderItem={categoryByBlogs} />}</div>
        </section>
        ){/* ******COMMENTS */}
        <section className="px-6 mb-12">
          <BlogCommentForm postId={blog.id} isAuthenticated={!!session?.user} />
        </section>
        <section>
          <BlogComments comments={comments} />
        </section>
      </div>
    </div>
  );
}

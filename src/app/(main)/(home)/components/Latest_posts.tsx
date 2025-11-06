import HorizontalSlider from "@/app/components/HorizontalSlider";
import { HorizontalSliderItem } from "@/types/horizontalSlider_type";
import { prisma } from "@lib/prisma";
import React from "react";

async function getLatestPost(): Promise<HorizontalSliderItem[]> {
  try {
    const latestPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        slug: true,
        category: {
          select: { name: true, slug: true },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
    return latestPosts as HorizontalSliderItem[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Latest_posts() {
  const latestPost = await getLatestPost();
  return (
    <div className="p-4 md:py-4 md:px-0 max-w-7xl mx-auto">
      <h5 className="text-2xl text-slate-800 font-extrabold mb-2">
        My Latest Posts
      </h5>
      <div className="">
        <HorizontalSlider sliderItem={latestPost} />
      </div>
    </div>
  );
}

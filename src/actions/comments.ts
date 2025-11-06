"use server";

import { auth } from "@/auth";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

//  *************************** BLOGS COMMENTS **********************************************************************

export async function addPostComment(postId: string, content: string) {
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, message: "You need to log in." };
  }

  const userId = session.user.id;

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    return { success: false, message: "Blog post not found." };
  }

  const existingComment = await prisma.comment.findFirst({
    where: { postId, authorId: userId },
  });

  if (existingComment) {
    return {
      success: false,
      message: "You have already commented on this post.",
    };
  }

  await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: userId,
    },
  });

  if (post.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: post.categoryId },
    });

    if (category) {
      revalidatePath(`/blogs/${category.slug}/${post.slug}`);
    }
  } else {
    // Kategori yoksa genel blog sayfasını yenileyelim
    revalidatePath(`/blogs/${post.slug}`);
  }
  return { success: true, message: "Comment added successfully." };
}

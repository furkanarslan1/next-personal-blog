"use server";

import { auth } from "@/auth";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

interface ToggleLikeProps {
  type: "post" | "book" | "movie";
  id: string;
  path?: string;
}

export async function toggleLikeAction({ type, id, path }: ToggleLikeProps) {
  const session = await auth();

  if (!session || !session.user) {
    return { success: false, message: "You need to log in to like" };
  }

  const userId = session.user.id;

  try {
    const existingLike = await prisma.like.findFirst({
      where:
        type === "post"
          ? { postId: id, userId }
          : type === "book"
          ? { bookId: id, userId }
          : { movieId: id, userId },
    });

    //remove like
    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      if (path) revalidatePath(path);
      return { success: true, liked: false, message: "Like removed." };
    }

    //add like
    await prisma.like.create({
      data:
        type === "post"
          ? { postId: id, userId }
          : type === "book"
          ? { bookId: id, userId }
          : { movieId: id, userId },
    });
    if (path) revalidatePath(path);
    return { success: true, liked: true, message: "Liked successfully!" };
  } catch (error) {
    console.error("Toggle like failed:", error);
    return { success: false, message: "Something went wrong." };
  }
}

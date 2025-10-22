"use server";
import { blogFormSchema, type BlogFormInputs } from "@/schemas/blogFormSchema";

import slugify from "slugify";
import { Prisma, PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

interface FormState {
  message: string | null;
  success: boolean;
}

interface BlogFormData {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  categoryId?: string;
  authorId: string;
  isPublished?: "on" | undefined;
  keywords?: string;
  tags?: string;
  metaDescription?: string;
}

// *************************** BLOG ADD *****************************************************************

export async function addBlogAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return {
      message: "You must be logged in to add a blog.",
      success: false,
    };
  }

  // Capturing and validating FormData with Zod
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = blogFormSchema.safeParse(rawData);

  //If Verification Fails (Error Messages Come from Zod)
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    //
    const firstErrorKey = Object.keys(
      fieldErrors
    )[0] as keyof typeof fieldErrors;
    const firstErrorMessage = fieldErrors[firstErrorKey]
      ? fieldErrors[firstErrorKey][0]
      : "Invalid data.";

    return {
      message: firstErrorMessage || "Validation failed.",
      success: false,
    };
  }

  // Get Verified and Type Safe Data
  const data = validatedFields.data;

  //create slug
  const newSlug = slugify(data.title, {
    lower: true,
    strict: true,
    locale: "tr",
  });

  try {
    //CategoryId control
    const categoryConnect = data.categoryId
      ? { connect: { id: data.categoryId } }
      : undefined;

    //Publish status
    const isPublished = !!data.isPublished;
    const publishedAt = isPublished ? new Date() : null; //if published,save the published date

    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || null,
        imageUrl: data.imageUrl || null,
        slug: newSlug,
        isPublished: isPublished,
        viewCount: 0,
        tags: data.tags || null,
        keywords: data.keywords || null,
        metaDescription: data.metaDescription || null,
        publishedAt: publishedAt,
        author: { connect: { id: user.id } },
        category: categoryConnect,
      },
    });

    //successfully answer

    return {
      message: `Blog post successfully added ${newPost.title}`,
      success: true,
    };
  } catch (error) {
    console.error("An error occurred while adding the blog", error);

    //for slug uniqe control
    // if (
    //   error instanceof Error &&
    //   "code" in error &&
    //   (error as any).code === "P2002"
    // ) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        message: "This slug already exist. Please chance slug name",
        success: false,
      };
    }
  }
  //general error
  return {
    message: "Something went wrong",
    success: false,
  };
}

// ************************************************BLOG DELETE***************************************************************************************************

export async function deleteBlogAction(blogId: string): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return {
      message: "You must be logged in to delete a blog",
      success: false,
    };
  }

  //get blog id from come FormData

  // const blogId = formData.get("blogId") as string;

  if (!blogId) {
    return {
      message: "Blog ID is missing",
      success: false,
    };
  }

  try {
    //is blog exiting realy check
    const existingBlog = await prisma.post.findUnique({
      where: { id: blogId },
      select: { id: true, authorId: true, title: true },
    });

    if (!existingBlog) {
      return {
        message: "Blog not found",
        success: false,
      };
    }

    //delete blog
    await prisma.post.delete({ where: { id: blogId } });

    return {
      message: `Blog "${existingBlog.title}" has been successfully deleted.`,
      success: true,
    };
  } catch (error) {
    console.error("An error occured while deleting the blog", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      // P2025: Record to delete does not exist
      return {
        message: "This blog could not be found.",
        success: false,
      };
    }

    return {
      message: "Something went wrong while deleting the blog.",
      success: false,
    };
  }
}

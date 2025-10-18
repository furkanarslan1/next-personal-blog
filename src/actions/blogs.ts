"use server";
import { blogFormSchema, type BlogFormInputs } from "@/schemas/blogFormSchema";
// import { Prisma } from "@/generated/prisma";
import slugify from "slugify";
import { Prisma, PrismaClient } from "@prisma/client";

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

const admin_cont = "2";
// *************************** BLOG ADD *****************************************************************

export async function addBlogAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
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

  //
  //
  //   if (!data.authorId || data.authorId.trim() === "") {
  //     return {
  //       message: "Author information is missing. Please log in",
  //       success: false,
  //     };
  //   }

  //   const data: BlogFormData = {
  //     title: formData.get("title") as string, // Form alan adınızı "title" olarak değiştirin
  //     content: formData.get("content") as string,
  //     excerpt: formData.get("excerpt") as string,
  //     imageUrl: formData.get("imageUrl") as string,
  //     categoryId: formData.get("categoryId") as string,
  //     authorId: admin_cont, // Güvenli yazar ID'si
  //     isPublished: formData.get("isPublished") === "on" ? "on" : undefined,
  //     tags: formData.get("tags") as string,
  //     keywords: formData.get("keywords") as string,
  //     metaDescription: formData.get("metaDescription") as string,
  //   };

  //   if (!data.title || data.title.trim() === "") {
  //     return {
  //       message: "Title field cannot be left blank ",
  //       success: false,
  //     };
  //   }

  //   if (!data.content || data.content.trim() === "") {
  //     return {
  //       message: "Content field cannot be left blank",
  //       success: false,
  //     };
  //   }

  //   if (!data.authorId || data.authorId.trim() === "") {
  //     return {
  //       message: "Author information is missing. Please log in",
  //       success: false,
  //     };
  //   }

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
        author: { connect: { id: admin_cont } },
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

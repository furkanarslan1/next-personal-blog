"use server";

interface FormState {
  message: string | null;
  success: boolean;
}

import { auth } from "@/auth";
import { booksFormSchema } from "@/schemas/booksFormSchema";
import { prisma } from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function addBookAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return {
      message: "You must be logged in to add a blog",
      success: false,
    };
  }

  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = booksFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    const firstErrorkey = Object.keys(
      fieldErrors
    )[0] as keyof typeof fieldErrors;

    const firstErrorMessage = fieldErrors[firstErrorkey]
      ? fieldErrors[firstErrorkey][0]
      : "Invalid data";

    return {
      message: firstErrorMessage || "Validation failed",
      success: false,
    };
  }

  const data = validatedFields.data;

  const newSlug = slugify(data.title, {
    lower: true,
    strict: true,
    locale: "tr",
  });

  try {
    const newBook = await prisma.book.create({
      data: {
        title: data.title,
        authorName: data.authorName,
        coverImageUrl: data.coverImageUrl,
        description: data.description,
        publisher: data.publisher,
        publishYear: data.publishYear,
        pageCount: data.pageCount,
        myRating: data.myRating,
        slug: newSlug,
        genres: data.genres,
        status: data.status,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/admin/books/create");

    return {
      message: `Book successfully added ${newBook.title}`,
      success: true,
    };
  } catch (error) {
    console.error("An error occurred while adding the book", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        message: "This slug already exist. Please chance slug name",
        success: false,
      };
    }
    //general error
    return {
      message: "Something went wrong",
      success: false,
    };
  }
}

// ******************************* DELETE BOOK ****************************************************

export async function deleteBookAction(bookId: string): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return {
      message: "You must be logged in to delete a book",
      success: false,
    };
  }

  if (!bookId) {
    return {
      message: "Book ID is missing",
      success: false,
    };
  }

  try {
    const exitingBook = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        id: true,
        authorId: true,
        title: true,
      },
    });

    if (!exitingBook) {
      return {
        message: "Book not found",
        success: false,
      };
    }

    await prisma.book.delete({ where: { id: bookId } });

    return {
      message: `Book "${exitingBook.title}" has been successfully deleted.`,
      success: true,
    };
  } catch (error) {
    console.error("An error occured while deleting the book", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        message: "This book could not be found",
        success: false,
      };
    }

    return {
      message: "Something went wrong while deleting the book",
      success: false,
    };
  }
}

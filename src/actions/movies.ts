"use server";

import { auth } from "@/auth";
import { movieFormSchema } from "@/schemas/movieFormSchema";
import { Prisma, PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import slugify from "slugify";

const prisma = new PrismaClient();

interface FormState {
  message: string | null;
  success: boolean;
}

// **************************** ADD MOVİE********************************************************************

export async function addMovieAction(
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

  const validatedFields = movieFormSchema.safeParse(rawData);

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
    const newMovie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        posterUrl: data.posterUrl || null,
        backgroundUrl: data.backgroundUrl || null,
        trailerUrl: data.trailerUrl || null,
        rating: data.rating || null,
        releaseYear: data.releaseYear || null,
        genres: data.genres,
        slug: newSlug,
        status: data.status,
        author: {
          connect: { id: user.id },
        },
      },
    });
    // redirect("/admin/myMovies");
    return {
      message: `Movie successfully added ${newMovie.title}`,
      success: true,
    };
  } catch (error) {
    // if (
    //   typeof error === "object" &&
    //   error !== null &&
    //   "digest" in error &&
    //   typeof error.digest === "string" &&
    //   error.digest.includes("NEXT_REDIRECT")
    // ) {
    //   throw error;
    // }

    console.error("An error occurred while adding the movie", error);

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

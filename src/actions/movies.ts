"use server";

import { auth } from "@/auth";
import { movieFormSchema } from "@/schemas/movieFormSchema";
import { Prisma, PrismaClient } from "@prisma/client";

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
      message: "You must be logged in to add a movie",
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

// **************************** DELETE MOVİE********************************************************************

export async function deleteMovieAction(moveId: string): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    return {
      message: "You must be logged in to delete a book",
      success: false,
    };
  }

  if (!moveId) {
    return {
      message: "Movie ID is missing",
      success: false,
    };
  }

  try {
    //is movie exiting realy check
    const existingMovie = await prisma.movie.findUnique({
      where: { id: moveId },
      select: {
        id: true,
        authorId: true,
        title: true,
      },
    });

    if (!existingMovie) {
      return {
        message: "Blog not found",
        success: false,
      };
    }

    //delete movie
    await prisma.movie.delete({ where: { id: moveId } });

    return {
      message: `Movie "${existingMovie.title}" has been successfully deleted.`,
      success: true,
    };
  } catch (error) {
    console.error("An error occured while deleting the movie", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        message: "This movie could not be found",
        success: false,
      };
    }

    return {
      message: "Something went wrong while deleting the movie",
      success: false,
    };
  }
}

// *********************************** SET WEKKLY MOVİE ****************************************************

export async function setWeeklyMovieAction(
  movieId: string
): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id || user.role !== "ADMIN") {
    return {
      message: "You must be logged in to delete a book",
      success: false,
    };
  }

  //movie ID control
  if (!movieId) {
    return {
      message: "Movie ID is missing",
      success: false,
    };
  }

  // exist movie
  try {
    const movieExists = await prisma.movie.findUnique({
      where: { id: movieId },
      select: { title: true },
    });

    if (!movieExists) {
      return {
        message: "An error occurred with the specified ID.",
        success: false,
      };
    }

    //upsert fonc.
    const updatedSetting = await prisma.setting.upsert({
      where: { key: "weekly_movie_id" },
      update: {
        value: movieId,
      },
      create: {
        key: "weekly_movie_id",
        value: movieId,
      },
    });

    return {
      message: `Movie: "${movieExists.title}" set as movie of the week`,
      success: true,
    };
  } catch (error) {
    console.error(
      "An error occurred while setting the movie of the week:",
      error
    );
    return {
      message: "An error occurred while setting up the movie of the week.",
      success: false,
    };
  }
}

// ***************** CHANGE MOVİE STATUS ************************************************************************

type MovieStatus = "WATCHED" | "PLAN_TO_WATCH";
export async function updateMovieStatusAction(
  movieId: string,
  newStatus: MovieStatus
): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    return {
      message: "You must be logged in to update the movie.",
      success: false,
    };
  }

  if (!movieId || !newStatus) {
    return {
      message: "Movie ID and new status required.",
      success: false,
    };
  }

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        status: newStatus,
      },
      select: {
        title: true,
        status: true,
      },
    });

    return {
      message: `${updatedMovie.title} status of the movie has been updated to '${updatedMovie.status}'.`,
      success: true,
    };
  } catch (error) {
    console.error("An error occurred while updating the movie status:", error);
    return {
      message: "An error occurred while updating the movie status.",
      success: false,
    };
  }
}

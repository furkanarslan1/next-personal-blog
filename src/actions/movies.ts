"use server";

import { auth } from "@/auth";
import { movieFormSchema } from "@/schemas/movieFormSchema";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

// ********************************** EDIT MOVİE *******************************************************************

export async function updateMovieAction(
  movieId: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  const user = session?.user;

  if (!user || user.role !== "ADMIN") {
    return {
      message: "You must be logged in to update the movie.",
      success: false,
    };
  }

  if (!movieId) {
    return {
      message: "Movie ID  required.",
      success: false,
    };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const posterUrl = formData.get("posterUrl") as string | null;
  const backgroundUrl = formData.get("backgroundUrl") as string | null;
  const trailerUrl = formData.get("trailerUrl") as string | null;
  const releaseYearStr = formData.get("releaseYear") as string;
  const ratingStr = formData.get("rating") as string;
  const genresJson = formData.get("genres") as string;
  const status = formData.get("status") as "WATCHED" | "PLAN_TO_WATCH";

  if (!title || !description || !movieId) {
    return {
      success: false,
      message: "Title, Description and ID are required.",
    };
  }

  const releaseYear = releaseYearStr ? parseInt(releaseYearStr) : null;
  const rating = ratingStr ? parseFloat(ratingStr) : null;

  let genresArray: string[] = [];
  try {
    if (genresJson) {
      const parsedGenres = JSON.parse(genresJson);
      if (Array.isArray(parsedGenres)) {
        genresArray = parsedGenres.filter(
          (g) => typeof g === "string" && g.trim().length > 0
        );
      }
    }
  } catch (e) {
    return { success: false, message: "Genres format is invalid." };
  }

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        title,
        description,
        posterUrl,
        backgroundUrl,
        trailerUrl,
        releaseYear,
        rating,
        genres: genresArray,
        status,
        slug: slugify(title),
      },
    });

    revalidatePath(`/admin/movies/edit/${movieId}`);
    revalidatePath(
      `/movies/${updatedMovie.genres[0]?.toLowerCase() || "all"}/${
        updatedMovie.slug
      }`
    );

    return {
      message: `${updatedMovie.title} movie updated successfully.`,
      success: true,
    };
  } catch (error) {
    console.error("Update Error:", error);
    return {
      message: "A database error occurred during the update.",
      success: false,
    };
  }
}

// ********************************** RANDOM MOVİE *******************************************************************

export interface RandomMovieData {
  movieSlug: string;
  categorySlug: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
}

export async function getRandomMovieData(): Promise<RandomMovieData | null> {
  const result = await prisma.$queryRaw<{ slug: string }[]>(
    Prisma.sql`SELECT slug FROM "Movie" ORDER BY RANDOM() LIMIT 1`
  ); // PostgreSQL: RANDOM()

  const randomIdResult = await prisma.$queryRaw<{ id: string }[]>(
    Prisma.sql`SELECT id FROM "Movie" ORDER BY RANDOM() LIMIT 1`
  );

  if (randomIdResult.length === 0) {
    return null;
  }

  const randomMovieId = randomIdResult[0].id;

  const randomMovie = await prisma.movie.findUnique({
    where: { id: randomMovieId },
    select: {
      slug: true,
      genres: true,
      title: true,
      posterUrl: true,
      rating: true,
    },
  });

  if (!randomMovie || !randomMovie.slug || randomMovie.genres.length === 0) {
    return null;
  }

  const primaryGenreSlug = randomMovie.genres[0]
    .toLowerCase()
    .replace(/\s/g, "-");

  return {
    categorySlug: primaryGenreSlug,
    movieSlug: randomMovie.slug,
    posterUrl: randomMovie.posterUrl,
    title: randomMovie.title,
    rating: randomMovie.rating,
  };
}

// export async function redirectToRandomMovie() {
//   const slugs = await getRandomMovieSlugs();

//   if (!slugs) {
//     redirect("/movies");
//   }

//   redirect(`/movies/${slugs.categorySlug}/${slugs.movieSlug}`);
// }

// ************************** GET MOVIES ********************************************************

interface allMoviesType {
  id: string;
  title: string;
  posterUrl: string | null;
  rating: number | null;
  status: "WATCHED" | "PLAN_TO_WATCH";
  genres: string[];
  slug: string;
}

const PAGE_SIZE = 12;

interface GetMoviesParams {
  skip: number;
  take: number;
  statusFilter?: "WATCHED" | "PLAN_TO_WATCH";
}

export async function getPaginatedMovies({
  skip = 0,
  take = PAGE_SIZE,
  statusFilter,
}: GetMoviesParams): Promise<{ movies: allMoviesType[]; hasMore: boolean }> {
  try {
    const allMovies = await prisma.movie.findMany({
      where: statusFilter ? { status: statusFilter } : {},
      select: {
        id: true,
        title: true,
        posterUrl: true,
        rating: true,
        status: true,
        genres: true,
        slug: true,
      },
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take + 1,
    });

    const hasMore = allMovies.length > take;
    const movies = allMovies.slice(0, take);

    return { movies, hasMore };
  } catch (error) {
    console.error("Failed to fetch paginated movies:", error);
    return { movies: [], hasMore: false };
  }
}

"use server";

import { auth } from "@/auth";
import { prisma } from "@lib/prisma";
import { revalidatePath } from "next/cache";

interface FormState {
  message: string | null;
  success: boolean;
}

//Retrieves the current reading goal for the specified year.

export async function getReadingGoalForYear(year: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { goal: null, message: "No login." };

  try {
    const goal = await prisma.readingGoal.findUnique({
      where: {
        year_authorId: {
          year: year,
          authorId: userId,
        },
      },
      select: { year: true, targetBookCount: true, targetPageCount: true },
    });
    return { goal: goal, message: null };
  } catch (error) {
    console.error("An error occurred while capturing the target:", error);
    return {
      goal: null,
      message: "An error occurred while capturing the target.",
    };
  }
}

// ******************************* CREATE OR UPDATE *********************************************

export async function createOrUpdateReadingGoalAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "You must be logged in to perform this action.",
      success: false,
    };
  }

  const rawYear = formData.get("year");

  const rawBookCount = formData.get("targetBookCount");
  const rawPageCount = formData.get("targetPageCount");

  const year = parseInt(rawYear as string, 10);
  const targetBookCount = parseInt(rawBookCount as string, 10);
  const targetPageCount = parseInt(rawPageCount as string, 10);

  if (
    isNaN(year) ||
    isNaN(targetBookCount) ||
    isNaN(targetPageCount) ||
    year < 2024 ||
    targetBookCount < 1 ||
    targetPageCount < 100
  ) {
    return {
      message: "Please fill in all fields with correct and valid values.",
      success: false,
    };
  }

  const goalData = {
    year,
    targetBookCount,
    targetPageCount,
    authorId: userId,
  };

  try {
    const goal = await prisma.readingGoal.upsert({
      where: {
        year_authorId: {
          year: year,
          authorId: userId,
        },
      },
      update: {
        targetBookCount: goalData.targetBookCount,
        targetPageCount: goalData.targetPageCount,
      },
      create: goalData,
    });

    revalidatePath("/");

    return {
      message: `${goal.year} Reading goal for the year was successfully updated`,
      success: true,
    };
  } catch (error) {
    console.error("Error creating/updating target:", error);
    return {
      message: "There was a problem saving the target. Please try again.",
      success: false,
    };
  }
}

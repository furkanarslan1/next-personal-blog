import React from "react";
import ReadingGoalForm from "./components/ReadingGoalForm";
import {
  createOrUpdateReadingGoalAction,
  getReadingGoalForYear,
} from "@/actions/readGoal";
import { auth } from "@/auth";

export default async function ReadingGoalPage() {
  const currentYear = new Date().getFullYear();
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-red-500">
        Unauthorized Access. Only the blog administrator can view this page.
      </div>
    );
  }

  const { goal, message } = await getReadingGoalForYear(currentYear);

  return (
    <ReadingGoalForm
      initialGoal={goal}
      year={currentYear}
      action={createOrUpdateReadingGoalAction}
    />
  );
}

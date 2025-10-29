import React from "react";
import ReadingGoalForm from "./components/ReadingGoalForm";
import {
  createOrUpdateReadingGoalAction,
  getReadingGoalForYear,
} from "@/actions/readGoal";

export default async function ReadingGoalPage() {
  const currentYear = new Date().getFullYear();

  const { goal, message } = await getReadingGoalForYear(currentYear);

  if (message && message === "No login.") {
    return (
      <div className="p-8 text-center text-red-500">
        You are not authorized to view this page
      </div>
    );
  }

  return (
    <ReadingGoalForm
      initialGoal={goal}
      year={currentYear}
      action={createOrUpdateReadingGoalAction}
    />
  );
}

import { getWorkout } from "@/app/actions/workout";
import WorkoutForm from "./WorkoutForm";
import { DayWorkout } from "@/app/types/workout";

export const dynamic = "force-dynamic";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  // Try to get existing workout
  const result = await getWorkout(date);

  // If no workout exists, provide empty initial data
  const emptyWorkout: DayWorkout = {
    dayName: "",
    weight: null,
    exercises: [],
  };

  const workoutData =
    result.success && result.data ? result.data : emptyWorkout;

  if (!result.success) {
    return <div></div>;
  }

  return <WorkoutForm initialData={workoutData} date={date} />;
}

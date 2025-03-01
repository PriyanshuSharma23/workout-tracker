import {
  saveWorkout,
  getWorkout,
  initializeWorkout,
} from "@/app/actions/workout";
import WorkoutForm from "./WorkoutForm";

export default async function WorkoutPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  // Get or initialize workout data
  const result = await getWorkout(date);
  let workoutData = result.data;

  if (!workoutData) {
    const initResult = await initializeWorkout(date);
    workoutData = initResult.data;
  }

  return <WorkoutForm initialData={workoutData} date={date} />;
}

// export default function WorkoutPage() {
// }

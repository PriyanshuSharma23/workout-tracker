import {
  saveWorkout,
  getWorkout,
  initializeWorkout,
} from "@/app/actions/workout";
import WorkoutForm from "./WorkoutForm";

export default async function WorkoutPage({
  params,
}: {
  params: { date: string };
}) {
  // Get or initialize workout data
  const result = await getWorkout(params.date);
  let workoutData = result.data;

  if (!workoutData) {
    const initResult = await initializeWorkout(params.date);
    workoutData = initResult.data;
  }

  return <WorkoutForm initialData={workoutData} date={params.date} />;
}

// export default function WorkoutPage() {
// }

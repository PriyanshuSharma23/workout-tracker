import { getWorkouts } from "@/app/actions/workout";
import { NavBar } from "./components/NavBar";
import { WorkoutList } from "./components/WorkoutList";

export default async function HistoryPage() {
  const result = await getWorkouts();
  const workouts = result.success ? result.data : [];

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      <div className="p-4 max-w-md mx-auto">
        <WorkoutList workouts={workouts} />
      </div>
    </div>
  );
}

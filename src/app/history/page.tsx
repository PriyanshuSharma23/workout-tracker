import { getWorkouts } from "@/app/actions/workout";
import { NavBar } from "./components/NavBar";
import { WorkoutList } from "./components/WorkoutList";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const result = await getWorkouts();

  if (!result.success) {
    console.error("Error fetching workouts:", result.error);
    return <div>Error fetching workouts</div>;
  }

  if (!result.data) {
    return <div>No workouts found</div>;
  }

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

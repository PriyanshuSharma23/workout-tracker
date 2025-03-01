"use client";

import { useRouter } from "next/navigation";

type Workout = {
  id: string;
  date: Date;
  dayName: string;
  exercises: any[];
};

type WorkoutListProps = {
  workouts: Workout[];
};

export function WorkoutList({ workouts }: WorkoutListProps) {
  const router = useRouter();

  const dateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <button
          key={workout.id}
          onClick={() => router.push(`/workout/${dateKey(workout.date)}`)}
          className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 text-left hover:bg-gray-700 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-white">{workout.dayName}</h3>
            <span className="text-sm text-gray-400">
              {new Date(workout.date).toLocaleDateString()}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {workout.exercises.length} exercises
          </div>
        </button>
      ))}

      {workouts.length === 0 && (
        <div className="text-center text-gray-400 py-8">No workouts found</div>
      )}
    </div>
  );
}

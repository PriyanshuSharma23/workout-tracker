"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Exercise, Set } from "@/app/types/workout";

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();

  const [dayName, setDayName] = useState("");
  const [weight, setWeight] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState("");

  const addExercise = () => {
    if (!currentExercise.trim()) return;
    setExercises([
      ...exercises,
      {
        name: currentExercise,
        sets: [{ weight: "", reps: "" }],
      },
    ]);
    setCurrentExercise("");
  };

  const addSet = (exerciseIndex: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({
      weight: "",
      reps: "",
    });
    setExercises(newExercises);
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof Set,
    value: string
  ) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(newExercises);
  };

  const formattedDate = new Date(params.date as string).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="sticky top-0 bg-gray-800 border-b border-gray-700 z-10 shadow-md">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
            <div className="text-center flex-1 mx-4">
              <p className="text-sm text-gray-400 mt-0.5">{formattedDate}</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      <div className="p-4 max-w-md mx-auto">
        <div className="space-y-4 mb-6">
          <div className="flex flex-col">
            <label
              htmlFor="dayName"
              className="text-sm font-medium mb-1 text-gray-300 block"
            >
              Workout Name
            </label>
            <input
              type="text"
              id="dayName"
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
              placeholder="e.g. Push Day, Upper Body, etc."
              className="w-full border rounded-lg p-2 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="text-sm font-medium mb-1 text-gray-300"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              className="w-full border rounded-lg p-2 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentExercise}
              onChange={(e) => setCurrentExercise(e.target.value)}
              placeholder="Enter exercise name"
              className="flex-1 border rounded-lg p-2 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
            <button
              onClick={addExercise}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>

          {exercises.map((exercise, exerciseIndex) => (
            <div
              key={exerciseIndex}
              className="border border-gray-700 rounded-lg p-4 space-y-2 bg-gray-800"
            >
              <h3 className="font-medium text-white">{exercise.name}</h3>

              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex gap-2">
                  <input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      updateSet(
                        exerciseIndex,
                        setIndex,
                        "weight",
                        e.target.value
                      )
                    }
                    placeholder="Weight (kg)"
                    className="w-24 border rounded-lg p-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      updateSet(exerciseIndex, setIndex, "reps", e.target.value)
                    }
                    placeholder="Reps"
                    className="w-20 border rounded-lg p-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                  <span className="self-center text-sm text-gray-400">
                    Set {setIndex + 1}
                  </span>
                </div>
              ))}

              <button
                onClick={() => addSet(exerciseIndex)}
                className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
              >
                + Add Set
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Exercise, Set, WorkoutSession } from "@/app/types/workout";

export default function WorkoutSessionCard() {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [currentExercise, setCurrentExercise] = useState("");

  const addMuscleGroup = () => {
    if (!muscleGroup.trim()) return;
    setSessions([...sessions, { muscleGroup, exercises: [] }]);
    setMuscleGroup("");
  };

  const addExercise = (sessionIndex: number) => {
    if (!currentExercise.trim()) return;
    const newSessions = [...sessions];
    newSessions[sessionIndex].exercises.push({
      name: currentExercise,
      sets: [{ weight: "", reps: "" }],
    });
    setSessions(newSessions);
    setCurrentExercise("");
  };

  const addSet = (sessionIndex: number, exerciseIndex: number) => {
    const newSessions = [...sessions];
    newSessions[sessionIndex].exercises[exerciseIndex].sets.push({
      weight: "",
      reps: "",
    });
    setSessions(newSessions);
  };

  const updateSet = (
    sessionIndex: number,
    exerciseIndex: number,
    setIndex: number,
    field: keyof Set,
    value: string
  ) => {
    const newSessions = [...sessions];
    newSessions[sessionIndex].exercises[exerciseIndex].sets[setIndex][field] =
      value;
    setSessions(newSessions);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          placeholder="Enter muscle group"
          className="flex-1 border rounded-lg p-2"
        />
        <button
          onClick={addMuscleGroup}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>

      {sessions.map((session, sessionIndex) => (
        <div key={sessionIndex} className="border rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-semibold">{session.muscleGroup}</h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentExercise}
              onChange={(e) => setCurrentExercise(e.target.value)}
              placeholder="Enter exercise name"
              className="flex-1 border rounded-lg p-2"
            />
            <button
              onClick={() => addExercise(sessionIndex)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Exercise
            </button>
          </div>

          {session.exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="pl-4 space-y-2">
              <h3 className="font-medium">{exercise.name}</h3>

              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex gap-2">
                  <input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      updateSet(
                        sessionIndex,
                        exerciseIndex,
                        setIndex,
                        "weight",
                        e.target.value
                      )
                    }
                    placeholder="Weight (kg)"
                    className="w-24 border rounded-lg p-2"
                  />
                  <input
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      updateSet(
                        sessionIndex,
                        exerciseIndex,
                        setIndex,
                        "reps",
                        e.target.value
                      )
                    }
                    placeholder="Reps"
                    className="w-20 border rounded-lg p-2"
                  />
                  <span className="self-center text-sm text-gray-500">
                    Set {setIndex + 1}
                  </span>
                </div>
              ))}

              <button
                onClick={() => addSet(sessionIndex, exerciseIndex)}
                className="text-blue-600 text-sm hover:text-blue-700 transition-colors"
              >
                + Add Set
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

import { Exercise, WorkoutSet } from "@/app/types/workout";

type ExerciseListProps = {
  exercises: Exercise[];
  currentExercise: string;
  setCurrentExercise: (value: string) => void;
  addExercise: () => void;
  addSet: (exerciseIndex: number) => void;
  deleteSet: (exerciseIndex: number, setIndex: number) => void;
  deleteExercise: (exerciseIndex: number) => void;
  updateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: string,
  ) => void;
};

export function ExerciseList({
  exercises,
  currentExercise,
  setCurrentExercise,
  addExercise,
  addSet,
  deleteSet,
  deleteExercise,
  updateSet,
}: ExerciseListProps) {
  return (
    <div className="space-y-6 mt-6">
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
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-white">{exercise.name}</h3>
            <button
              onClick={() => deleteExercise(exerciseIndex)}
              className="text-red-400 hover:text-red-300 transition-colors"
              aria-label="Delete exercise"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} className="flex gap-2">
              <input
                type="text"
                value={set.weight}
                onChange={(e) =>
                  updateSet(exerciseIndex, setIndex, "weight", e.target.value)
                }
                placeholder="Weight (kg)"
                className="w-24 border rounded-lg p-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <span className="flex justify-center items-center">kg</span>
              <input
                type="text"
                value={set.reps}
                onChange={(e) =>
                  updateSet(exerciseIndex, setIndex, "reps", e.target.value)
                }
                placeholder="Reps"
                className="w-20 border rounded-lg p-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <span className="flex justify-center items-center">reps</span>
              <span className="self-center text-sm text-gray-400">
                Set {setIndex + 1}
              </span>
              <button
                onClick={() => deleteSet(exerciseIndex, setIndex)}
                className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                aria-label="Delete set"
              >
                ×
              </button>
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
  );
}

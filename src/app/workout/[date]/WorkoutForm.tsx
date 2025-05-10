"use client";
import { saveWorkout } from "@/app/actions/workout";
import { DayWorkout, Exercise, WorkoutSet } from "@/app/types/workout";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavBar } from "./components/NavBar";
import { WorkoutDetails } from "./components/WorkoutDetails";
import { ExerciseList } from "./components/ExerciseList";
import { SaveButton } from "./components/SaveButton";

type WorkoutFormProps = {
  initialData?: DayWorkout;
  date: string;
};

const WorkoutForm = ({ initialData, date }: WorkoutFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [dayName, setDayName] = useState(initialData?.dayName || "");
  const [weight, setWeight] = useState(initialData?.weight?.toString() || "");
  const [exercises, setExercises] = useState<Exercise[]>(
    initialData?.exercises || [],
  );
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

  const deleteSet = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(newExercises);
  };

  const deleteExercise = (exerciseIndex: number) => {
    const newExercises = [...exercises];
    newExercises.splice(exerciseIndex, 1);
    setExercises(newExercises);
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: string,
  ) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(newExercises);
  };

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSave = async () => {
    if (!dayName.trim()) {
      toast.error("Please enter a workout name");
      return;
    }

    setIsLoading(true);
    try {
      const result = await saveWorkout(date, dayName, weight, exercises);
      if (result.success) {
        toast.success("Workout saved successfully!");
      } else {
        toast.error(result.error || "Failed to save workout");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar formattedDate={formattedDate} date={date} />

      <div className="p-4 max-w-md mx-auto">
        <WorkoutDetails
          dayName={dayName}
          setDayName={setDayName}
          weight={weight}
          setWeight={setWeight}
        />

        <SaveButton isLoading={isLoading} onClick={handleSave} />

        <ExerciseList
          exercises={exercises}
          currentExercise={currentExercise}
          setCurrentExercise={setCurrentExercise}
          addExercise={addExercise}
          addSet={addSet}
          deleteSet={deleteSet}
          deleteExercise={deleteExercise}
          updateSet={updateSet}
        />

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default WorkoutForm;

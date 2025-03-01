export type WorkoutSet = {
  weight: string;
  reps: string;
};

export type Exercise = {
  name: string;
  sets: WorkoutSet[];
};

export type WorkoutData = {
  dayName: string;
  exercises: Exercise[];
};

export type WorkoutSession = {
  muscleGroup: string;
  exercises: Exercise[];
};

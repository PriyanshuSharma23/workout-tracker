export type Set = {
  weight: string;
  reps: string;
};

export type Exercise = {
  name: string;
  sets: Set[];
};

export type WorkoutData = {
  dayName: string;
  exercises: Exercise[];
};

export type WorkoutSession = {
  muscleGroup: string;
  exercises: Exercise[];
};

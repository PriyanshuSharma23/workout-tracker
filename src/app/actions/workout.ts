"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Exercise } from "../types/workout";

const prisma = new PrismaClient();

export async function initializeWorkout(date: string) {
  try {
    // Generate a unique ID using the date
    const id = `workout_${date}`;

    const workout = await prisma.workout.upsert({
      where: {
        id: id, // Use the unique ID
      },
      update: {},
      create: {
        id: id,
        date: new Date(date),
        dayName: "",
        exercises: [],
      },
    });

    return { success: true, data: workout };
  } catch (error) {
    console.error("Error initializing workout:", error);
    return { success: false, error: "Failed to initialize workout" };
  }
}

export async function getWorkout(date: string) {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: `workout_${date}`, // Use the same ID format
      },
    });

    return { success: true, data: workout };
  } catch (error) {
    console.error("Error fetching workout:", error);
    return { success: false, error: "Failed to fetch workout" };
  }
}

export async function getWorkouts() {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return { success: true, data: workouts };
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return { success: false, error: "Failed to fetch workouts" };
  }
}

export async function saveWorkout(
  date: string,
  dayName: string,
  weight: string,
  exercises: Exercise[]
) {
  try {
    const workout = await prisma.workout.upsert({
      where: {
        id: `workout_${date}`, // Use the same ID format
      },
      update: {
        weight: weight ? parseFloat(weight) : null,
        exercises: exercises,
        dayName: dayName,
        updatedAt: new Date(),
      },
      create: {
        id: `workout_${date}`,
        date: new Date(date),
        dayName,
        weight: weight ? parseFloat(weight) : null,
        exercises: exercises,
      },
    });

    revalidatePath("/workout/[date]");
    return { success: true, data: workout };
  } catch (error) {
    console.error("Error saving workout:", error);
    return { success: false, error: "Failed to save workout" };
  }
}

export async function generateWorkoutCSV() {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: {
        date: "desc",
      },
    });

    const csvRows = [
      ["Date", "Workout Name", "Weight (kg)", "Exercises", "Sets"].join(","),
      // @ts-ignore
      ...workouts.map((workout) => {
        const exerciseDetails = workout.exercises
          .map(
            (ex: any) =>
              `${ex.name} (${ex.sets
                .map((set: any) => `${set.weight}kg x ${set.reps}`)
                .join(", ")})`
          )
          .join("; ");

        return [
          new Date(workout.date).toLocaleDateString(),
          workout.dayName,
          workout.weight || "",
          exerciseDetails,
        ].join(",");
      }),
    ];

    return {
      success: true,
      data: csvRows.join("\n"),
    };
  } catch (error) {
    console.error("Error generating CSV:", error);
    return { success: false, error: "Failed to generate CSV" };
  }
}

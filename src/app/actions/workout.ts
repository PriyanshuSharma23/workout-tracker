"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Exercise } from "../types/workout";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function getWorkout(date: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id: `workout_${date}`,
        userId: userId,
      },
    });

    return { success: true, data: workout };
  } catch (error) {
    console.error("Error fetching workout:", error);
    return { success: false, error: "Failed to fetch workout" };
  }
}

export async function getWorkouts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId: userId,
      },
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
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workout = await prisma.workout.upsert({
      where: {
        id: `workout_${date}`,
        userId: userId,
      },
      update: {
        weight: weight ? parseFloat(weight) : null,
        exercises: exercises,
        dayName: dayName,
        updatedAt: new Date(),
      },
      create: {
        id: `workout_${date}`,
        userId: userId,
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
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workouts = await prisma.workout.findMany({
      where: {
        userId: userId,
      },
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

export async function copyWorkoutToToday(fromDate: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

  try {
    // Get the source workout
    const sourceWorkout = await prisma.workout.findUnique({
      where: {
        id: `workout_${fromDate}`,
        userId: userId,
      },
    });

    if (!sourceWorkout) {
      return { success: false, error: "Source workout not found" };
    }

    // Create new workout for today with data from source workout
    const workout = await prisma.workout.upsert({
      where: {
        id: `workout_${todayKey}`,
        userId: userId,
      },
      update: {
        weight: sourceWorkout.weight,
        // @ts-ignore
        exercises: sourceWorkout.exercises,
        dayName: sourceWorkout.dayName,
        updatedAt: new Date(),
      },
      create: {
        id: `workout_${todayKey}`,
        userId: userId,
        date: new Date(today),
        dayName: sourceWorkout.dayName,
        weight: sourceWorkout.weight,
        // @ts-ignore
        exercises: sourceWorkout.exercises,
      },
    });

    revalidatePath("/workout/[date]");
    return { success: true, data: workout };
  } catch (error) {
    console.error("Error copying workout:", error);
    return { success: false, error: "Failed to copy workout" };
  }
}

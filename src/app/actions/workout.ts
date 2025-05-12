"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DayWorkout, Exercise } from "../types/workout";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

function normalizeDate(date: Date | string) {
  const dateObj = new Date(date);
  const yyyyMmDd = dateObj.toISOString().split("T")[0]; // "yyyy-mm-dd"
  return yyyyMmDd;
}

export async function getWorkout(date: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workout = (await prisma.workout.findUnique({
      where: {
        userId_date: {
          date: normalizeDate(date),
          userId: userId,
        },
      },
    })) as DayWorkout | null;

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
  exercises: Exercise[],
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const workout = await prisma.workout.upsert({
      where: {
        userId_date: {
          date: normalizeDate(date),
          userId: userId,
        },
        userId: userId,
      },
      update: {
        weight: weight ? parseFloat(weight) : null,
        exercises: exercises,
        dayName: dayName,
        updatedAt: new Date(),
      },
      create: {
        date: normalizeDate(date),
        userId: userId,
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
      ...workouts.map((workout) => {
        const exerciseDetails = (workout.exercises as Exercise[])
          .map(
            (ex) =>
              `${ex.name} (${ex.sets
                .map((set) => `${set.weight}kg x ${set.reps}`)
                .join(", ")})`,
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

  try {
    // Get the source workout
    const sourceWorkout = await prisma.workout.findUnique({
      where: {
        userId_date: {
          date: normalizeDate(fromDate),
          userId: userId,
        },
      },
    });

    if (!sourceWorkout) {
      return { success: false, error: "Source workout not found" };
    }

    // Create new workout for today with data from source workout
    const workout = await prisma.workout.upsert({
      where: {
        userId_date: {
          date: normalizeDate(today),
          userId: userId,
        },
      },
      update: {
        weight: sourceWorkout.weight,
        // @ts-expect-error JSONValue Issue
        exercises: sourceWorkout.exercises,
        dayName: sourceWorkout.dayName,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        date: normalizeDate(today),
        dayName: sourceWorkout.dayName,
        weight: sourceWorkout.weight,
        // @ts-expect-error JSONValue Issue
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

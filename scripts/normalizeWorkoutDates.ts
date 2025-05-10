const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function normalizeWorkoutDates() {
  try {
    const workouts = await prisma.workout.findMany();

    for (const workout of workouts) {
      // Format date to yyyy-mm-dd (ISO string, no time)
      const dateObj = new Date(workout.date);
      const yyyyMmDd = dateObj.toISOString().split("T")[0]; // "yyyy-mm-dd"

      // Only update if the date is not already normalized
      if (workout.date !== yyyyMmDd) {
        await prisma.workout.update({
          where: {
            userId_date: {
              userId: workout.userId,
              date: workout.date,
            },
          },
          data: {
            date: yyyyMmDd,
          },
        });
        console.log(`Updated workout ${yyyyMmDd} for user ${workout.userId}`);
      }
    }
    console.log("All workout dates normalized!");
  } catch (error) {
    console.error("Error normalizing workout dates:", error);
  } finally {
    await prisma.$disconnect();
  }
}

normalizeWorkoutDates();

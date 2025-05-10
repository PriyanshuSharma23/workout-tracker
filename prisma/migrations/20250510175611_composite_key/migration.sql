/*
  Warnings:

  - The primary key for the `Workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_pkey",
DROP COLUMN "id",
ALTER COLUMN "date" SET DATA TYPE TEXT,
ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("userId", "date");

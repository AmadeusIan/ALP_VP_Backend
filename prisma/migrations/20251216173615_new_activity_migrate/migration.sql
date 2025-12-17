/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Activity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "dateTime",
ADD COLUMN     "endDateTime" TIMESTAMP(3),
ADD COLUMN     "startDateTime" TIMESTAMP(3);

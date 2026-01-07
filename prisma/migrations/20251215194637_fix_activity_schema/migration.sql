/*
  Warnings:

  - You are about to drop the column `due_date` on the `activitys` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `activitys` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `activitys` table. All the data in the column will be lost.
  - Added the required column `end_date` to the `activitys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `activitys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `activitys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `activitys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activitys" DROP COLUMN "due_date",
DROP COLUMN "priority",
DROP COLUMN "status",
ADD COLUMN     "end_date" VARCHAR(100) NOT NULL,
ADD COLUMN     "end_time" VARCHAR(100) NOT NULL,
ADD COLUMN     "start_date" VARCHAR(100) NOT NULL,
ADD COLUMN     "start_time" VARCHAR(100) NOT NULL;

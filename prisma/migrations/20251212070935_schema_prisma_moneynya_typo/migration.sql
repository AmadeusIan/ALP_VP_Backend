/*
  Warnings:

  - You are about to drop the column `Amount` on the `moneys` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `moneys` table. All the data in the column will be lost.
  - Added the required column `amount` to the `moneys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `moneys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "moneys" DROP COLUMN "Amount",
DROP COLUMN "Type",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "type" VARCHAR(20) NOT NULL;

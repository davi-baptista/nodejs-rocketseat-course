/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "species" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `genrer` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genrer" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "genrer" "Genrer" NOT NULL;

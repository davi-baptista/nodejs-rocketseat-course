/*
  Warnings:

  - Changed the type of `portage` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Portage" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "portage",
ADD COLUMN     "portage" "Portage" NOT NULL;

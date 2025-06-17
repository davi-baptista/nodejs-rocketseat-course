/*
  Warnings:

  - Made the column `org_id` on table `pets` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "org_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

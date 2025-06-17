/*
  Warnings:

  - You are about to drop the column `whatsapp_number` on the `users` table. All the data in the column will be lost.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "whatsapp_number",
ADD COLUMN     "phone" TEXT NOT NULL;

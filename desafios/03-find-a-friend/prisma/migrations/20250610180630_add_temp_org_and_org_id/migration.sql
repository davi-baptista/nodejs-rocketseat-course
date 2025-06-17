-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "org_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

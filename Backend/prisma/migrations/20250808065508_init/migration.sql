-- DropForeignKey
ALTER TABLE "public"."Treasure" DROP CONSTRAINT "Treasure_companyId_fkey";

-- AlterTable
ALTER TABLE "public"."Treasure" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Treasure" ADD CONSTRAINT "Treasure_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

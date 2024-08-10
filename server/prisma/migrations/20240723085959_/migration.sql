-- AlterTable
ALTER TABLE "Good" ADD COLUMN     "campId" INTEGER;

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_campId_fkey" FOREIGN KEY ("campId") REFERENCES "Camp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

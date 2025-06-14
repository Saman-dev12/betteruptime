-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_monitorId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_monitorId_fkey";

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

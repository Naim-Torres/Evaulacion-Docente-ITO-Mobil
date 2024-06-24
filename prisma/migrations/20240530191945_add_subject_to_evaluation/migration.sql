-- AlterTable
ALTER TABLE "Evaluation" ADD COLUMN     "id_subject" TEXT;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_id_subject_fkey" FOREIGN KEY ("id_subject") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

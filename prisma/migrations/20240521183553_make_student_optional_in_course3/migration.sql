-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_id_student_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "id_student" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

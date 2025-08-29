/*
  Warnings:

  - The values [NOT_STARTED] on the enum `GoalStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Goal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Goal` table. All the data in the column will be lost.
  - The `id` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."GoalStatus_new" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "public"."Goal" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Goal" ALTER COLUMN "status" TYPE "public"."GoalStatus_new" USING ("status"::text::"public"."GoalStatus_new");
ALTER TYPE "public"."GoalStatus" RENAME TO "GoalStatus_old";
ALTER TYPE "public"."GoalStatus_new" RENAME TO "GoalStatus";
DROP TYPE "public"."GoalStatus_old";
ALTER TABLE "public"."Goal" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropIndex
DROP INDEX "public"."Goal_userId_idx";

-- AlterTable
ALTER TABLE "public"."Goal" DROP CONSTRAINT "Goal_pkey",
DROP COLUMN "userId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ADD CONSTRAINT "Goal_pkey" PRIMARY KEY ("id");

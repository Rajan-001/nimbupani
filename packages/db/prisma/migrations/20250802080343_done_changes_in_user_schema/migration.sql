/*
  Warnings:

  - Made the column `email` on table `UserInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserInfo" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "email" SET NOT NULL;

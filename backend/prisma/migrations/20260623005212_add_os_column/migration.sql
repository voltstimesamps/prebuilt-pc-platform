/*
  Warnings:

  - Added the required column `os` to the `System` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "System" ADD COLUMN     "os" TEXT NOT NULL;

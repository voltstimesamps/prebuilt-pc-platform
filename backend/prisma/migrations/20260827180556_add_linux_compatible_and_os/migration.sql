/*
  Warnings:

  - Changed the type of `os` on the `System` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OsType" AS ENUM ('windows', 'macos', 'linux');

-- AlterTable
ALTER TABLE "System" ADD COLUMN     "linuxCompatible" BOOLEAN,
DROP COLUMN "os",
ADD COLUMN     "os" "OsType" NOT NULL;

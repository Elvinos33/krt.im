/*
  Warnings:

  - You are about to drop the column `timer` on the `Link` table. All the data in the column will be lost.
  - Added the required column `expires` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "timer",
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;

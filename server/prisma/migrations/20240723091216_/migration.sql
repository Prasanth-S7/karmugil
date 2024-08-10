/*
  Warnings:

  - Added the required column `address` to the `Camp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Camp" ADD COLUMN     "address" INTEGER NOT NULL;

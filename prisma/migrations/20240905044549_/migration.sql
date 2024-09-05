/*
  Warnings:

  - Added the required column `anime_name` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `anime_name` VARCHAR(191) NOT NULL;

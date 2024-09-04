/*
  Warnings:

  - A unique constraint covering the columns `[userId,anime_id]` on the table `Comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `anime_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` ADD COLUMN `anime_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Comment_userId_anime_id_key` ON `Comment`(`userId`, `anime_id`);

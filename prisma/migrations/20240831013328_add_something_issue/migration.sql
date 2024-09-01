/*
  Warnings:

  - A unique constraint covering the columns `[userId,anime_id]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Collection_userId_anime_id_key` ON `Collection`(`userId`, `anime_id`);

-- CreateTable
CREATE TABLE `Collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `anime_id` VARCHAR(191) NOT NULL,
    `anime_name` VARCHAR(191) NOT NULL,
    `anime_image` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Collection_anime_id_key`(`anime_id`),
    INDEX `Collection_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Collection` ADD CONSTRAINT `Collection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

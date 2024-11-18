/*
  Warnings:

  - Added the required column `return_date` to the `Borrowings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Borrowings` ADD COLUMN `return_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `books` ADD COLUMN `quantity` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `isBlocked` BOOLEAN NOT NULL DEFAULT false;

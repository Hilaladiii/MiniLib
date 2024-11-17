/*
  Warnings:

  - You are about to drop the column `return_date` on the `Borrowings` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Borrowings` DROP COLUMN `return_date`,
    ALTER COLUMN `borrow_date` DROP DEFAULT,
    MODIFY `status` ENUM('BORROWED', 'PROCESS', 'RETURNED', 'OVERDUE') NOT NULL DEFAULT 'PROCESS';

-- AlterTable
ALTER TABLE `books` DROP COLUMN `description`;

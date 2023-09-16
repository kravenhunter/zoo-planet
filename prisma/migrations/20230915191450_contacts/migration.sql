/*
  Warnings:

  - Added the required column `copyright` to the `ContactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `ContactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `ContactUs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactUs" ADD COLUMN     "copyright" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "socialLink_1" TEXT,
ADD COLUMN     "socialLink_2" TEXT,
ADD COLUMN     "socialLink_3" TEXT,
ADD COLUMN     "socialLink_4" TEXT,
ADD COLUMN     "socialLink_5" TEXT;

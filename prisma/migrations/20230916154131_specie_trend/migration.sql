/*
  Warnings:

  - Added the required column `populationTrend` to the `Specie` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PopulationTrend" AS ENUM ('Decreasing', 'Increasing', 'Stable');

-- AlterTable
ALTER TABLE "Specie" ADD COLUMN     "populationTrend" "PopulationTrend" NOT NULL;

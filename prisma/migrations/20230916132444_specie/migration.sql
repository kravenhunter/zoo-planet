-- CreateEnum
CREATE TYPE "ConservationStatus" AS ENUM ('LC', 'NT', 'VU', 'EN', 'CR', 'EW', 'EX');

-- CreateTable
CREATE TABLE "Specie" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "imageBgLink" TEXT NOT NULL,
    "habitain" TEXT NOT NULL,
    "countLeft" TEXT NOT NULL,
    "conservationStatus" "ConservationStatus" NOT NULL,
    "shordDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "extraeDscription" TEXT,

    CONSTRAINT "Specie_pkey" PRIMARY KEY ("id")
);

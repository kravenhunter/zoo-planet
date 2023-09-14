-- CreateTable
CREATE TABLE "ContentPages" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageBgLink" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "extraeDscription" TEXT,

    CONSTRAINT "ContentPages_pkey" PRIMARY KEY ("id")
);

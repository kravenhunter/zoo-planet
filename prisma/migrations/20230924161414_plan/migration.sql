-- CreateTable
CREATE TABLE "PlanPrice" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "admission" TEXT NOT NULL,
    "faunaPark" TEXT NOT NULL,
    "adultRatio" TEXT NOT NULL,

    CONSTRAINT "PlanPrice_pkey" PRIMARY KEY ("id")
);

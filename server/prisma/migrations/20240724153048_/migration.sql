-- CreateTable
CREATE TABLE "campRequests" (
    "id" SERIAL NOT NULL,
    "campName" TEXT NOT NULL,
    "requiredAmount" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "campRequests_pkey" PRIMARY KEY ("id")
);

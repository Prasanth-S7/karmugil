-- CreateTable
CREATE TABLE "CampGoodRequests" (
    "id" SERIAL NOT NULL,
    "campName" TEXT NOT NULL,
    "goodsNeeded" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CampGoodRequests_pkey" PRIMARY KEY ("id")
);

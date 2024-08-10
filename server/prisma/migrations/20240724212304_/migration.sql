-- CreateTable
CREATE TABLE "DonationsFromPublic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "goodsNeeded" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DonationsFromPublic_pkey" PRIMARY KEY ("id")
);

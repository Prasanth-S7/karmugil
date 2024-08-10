-- CreateEnum
CREATE TYPE "AuthorityIncharge" AS ENUM ('GOVT', 'NGO', 'PRIVATE');

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "inventoryName" TEXT NOT NULL,
    "inventoryAddress" TEXT NOT NULL,
    "authorityIncharge" "AuthorityIncharge" NOT NULL,
    "inventoryManager" TEXT NOT NULL,
    "Manageraddress" TEXT NOT NULL,
    "setUpInventoryAccess" BOOLEAN NOT NULL DEFAULT false,
    "contact" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Good" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

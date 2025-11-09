-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE', 'DORMITORY');

-- CreateTable
CREATE TABLE "hostelRents" (
    "id" TEXT NOT NULL,
    "hostelName" TEXT NOT NULL,
    "hostelImages" TEXT[],
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pricePerMonth" INTEGER NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "roomType" "RoomType" NOT NULL,
    "bedCount" INTEGER NOT NULL,
    "bathCount" INTEGER NOT NULL,
    "facilities" "Facility"[],
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hostelRents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hostelRents" ADD CONSTRAINT "hostelRents_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostelRents" ADD CONSTRAINT "hostelRents_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "hosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

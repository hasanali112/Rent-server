/*
  Warnings:

  - The values [SINGLE,DOUBLE,TRIPLE,DORMITORY] on the enum `RoomType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `bathCount` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `bedCount` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `facilities` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `hostelImages` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `hostelName` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerMonth` on the `hostelRents` table. All the data in the column will be lost.
  - You are about to drop the column `areaInSqft` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `bathCount` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `bedCount` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `contactNumber` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `furnishingType` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `houseImages` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `houseName` on the `houseRents` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `houseRents` table. All the data in the column will be lost.
  - Added the required column `address` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `division` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealOptions` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantType` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFloors` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `hostelRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `availableFrom` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bedrooms` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `division` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `furnishing` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyType` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `houseRents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFloors` to the `houseRents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Apartment', 'House', 'Studio', 'Duplex', 'Penthouse');

-- CreateEnum
CREATE TYPE "Furnishing" AS ENUM ('Furnished', 'Semi_Furnished', 'Unfurnished');

-- CreateEnum
CREATE TYPE "RentType" AS ENUM ('Mess', 'Hostel');

-- CreateEnum
CREATE TYPE "TenantType" AS ENUM ('Student', 'Job_Holder', 'Both');

-- CreateEnum
CREATE TYPE "MealOption" AS ENUM ('Included', 'Not_Included', 'Optional');

-- AlterEnum
BEGIN;
CREATE TYPE "RoomType_new" AS ENUM ('Single', 'Shared_2_person', 'Shared_3_4_person');
ALTER TABLE "hostelRents" ALTER COLUMN "roomType" TYPE "RoomType_new" USING ("roomType"::text::"RoomType_new");
ALTER TYPE "RoomType" RENAME TO "RoomType_old";
ALTER TYPE "RoomType_new" RENAME TO "RoomType";
DROP TYPE "public"."RoomType_old";
COMMIT;

-- AlterTable
ALTER TABLE "hostelRents" DROP COLUMN "bathCount",
DROP COLUMN "bedCount",
DROP COLUMN "contactNumber",
DROP COLUMN "facilities",
DROP COLUMN "hostelImages",
DROP COLUMN "hostelName",
DROP COLUMN "location",
DROP COLUMN "pricePerMonth",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "division" TEXT NOT NULL,
ADD COLUMN     "floor" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mealOptions" "MealOption" NOT NULL,
ADD COLUMN     "mealTiming" TEXT[],
ADD COLUMN     "mealsPerDay" INTEGER,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tenantType" "TenantType" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalFloors" INTEGER NOT NULL,
ADD COLUMN     "type" "RentType" NOT NULL;

-- AlterTable
ALTER TABLE "houseRents" DROP COLUMN "areaInSqft",
DROP COLUMN "bathCount",
DROP COLUMN "bedCount",
DROP COLUMN "contactNumber",
DROP COLUMN "furnishingType",
DROP COLUMN "houseImages",
DROP COLUMN "houseName",
DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "availableFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bathrooms" INTEGER NOT NULL,
ADD COLUMN     "bedrooms" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "division" TEXT NOT NULL,
ADD COLUMN     "floor" TEXT NOT NULL,
ADD COLUMN     "furnishing" "Furnishing" NOT NULL,
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
ADD COLUMN     "size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalFloors" INTEGER NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- DropEnum
DROP TYPE "Facility";

-- DropEnum
DROP TYPE "FurnishingType";

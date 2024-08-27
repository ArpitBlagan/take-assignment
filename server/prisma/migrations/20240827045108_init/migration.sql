-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImage" DROP NOT NULL;

/*
  Warnings:

  - Added the required column `movieId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('WATCHED', 'PLAN_TO_WATCH');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "movieId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "posterUrl" TEXT,
    "backgroundUrl" TEXT,
    "trailerUrl" TEXT,
    "rating" DOUBLE PRECISION,
    "releaseYear" INTEGER,
    "genres" TEXT[],
    "slug" TEXT NOT NULL,
    "status" "MovieStatus" NOT NULL DEFAULT 'PLAN_TO_WATCH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

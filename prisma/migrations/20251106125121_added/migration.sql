/*
  Warnings:

  - A unique constraint covering the columns `[bookId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[movieId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_bookId_userId_key" ON "Like"("bookId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_movieId_userId_key" ON "Like"("movieId", "userId");

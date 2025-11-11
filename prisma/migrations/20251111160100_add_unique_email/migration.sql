/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Intent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Intent_email_key" ON "Intent"("email");

/*
  Warnings:

  - You are about to drop the `Intention` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `expiresAt` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `intentionId` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `invitationId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Member` table. All the data in the column will be lost.
  - Added the required column `email` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Invitation` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Intention";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Intent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invitation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Invitation" ("createdAt", "id", "token") SELECT "createdAt", "id", "token" FROM "Invitation";
DROP TABLE "Invitation";
ALTER TABLE "new_Invitation" RENAME TO "Invitation";
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");
CREATE TABLE "new_Member" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Member" ("company", "email", "id", "name", "phone") SELECT "company", "email", "id", "name", "phone" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

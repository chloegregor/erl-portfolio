/*
  Warnings:

  - You are about to drop the column `content` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Work` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,
    CONSTRAINT "Language_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Language" ("description", "id", "locale", "slug", "subtitle", "title", "type", "workId") SELECT "description", "id", "locale", "slug", "subtitle", "title", "type", "workId" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "illustration" TEXT NOT NULL,
    "placement_x" TEXT,
    "placement_y" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Work" ("createdAt", "id", "illustration", "placement_x", "placement_y", "updatedAt") SELECT "createdAt", "id", "illustration", "placement_x", "placement_y", "updatedAt" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

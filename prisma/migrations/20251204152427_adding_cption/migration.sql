/*
  Warnings:

  - You are about to drop the column `caption` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Language` table without a default value. This is not possible if the table is not empty.

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
    "photos_caption" TEXT,
    "videos_caption" TEXT,
    "workId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Language_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Language" ("description", "id", "locale", "slug", "subtitle", "title", "type", "workId") SELECT "description", "id", "locale", "slug", "subtitle", "title", "type", "workId" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workId" INTEGER NOT NULL,
    CONSTRAINT "Photo_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("createdAt", "id", "titre", "updatedAt", "url", "workId") SELECT "createdAt", "id", "titre", "updatedAt", "url", "workId" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - Made the column `placement_x` on table `Work` required. This step will fail if there are existing NULL values in that column.
  - Made the column `placement_y` on table `Work` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "photos_caption" TEXT,
    "videos_caption" TEXT,
    "workId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Language_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Language" ("createdAt", "description", "id", "locale", "photos_caption", "slug", "subtitle", "title", "type", "updatedAt", "videos_caption", "workId") SELECT "createdAt", "description", "id", "locale", "photos_caption", "slug", "subtitle", "title", "type", "updatedAt", "videos_caption", "workId" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE UNIQUE INDEX "Language_slug_key" ON "Language"("slug");
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "illustration" TEXT NOT NULL,
    "placement_x" TEXT NOT NULL,
    "placement_y" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Work" ("createdAt", "id", "illustration", "placement_x", "placement_y", "updatedAt", "year") SELECT "createdAt", "id", "illustration", "placement_x", "placement_y", "updatedAt", "year" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

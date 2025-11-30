/*
  Warnings:

  - Added the required column `slug` to the `Language` table without a default value. This is not possible if the table is not empty.

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
    "content" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,
    CONSTRAINT "Language_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Language" ("content", "description", "id", "locale", "subtitle", "title", "type", "workId") SELECT "content", "description", "id", "locale", "subtitle", "title", "type", "workId" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - Added the required column `year` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
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

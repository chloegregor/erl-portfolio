-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "illustration" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Work" ("createdAt", "description", "id", "illustration", "subtitle", "title", "updatedAt") SELECT "createdAt", "description", "id", "illustration", "subtitle", "title", "updatedAt" FROM "Work";
DROP TABLE "Work";
ALTER TABLE "new_Work" RENAME TO "Work";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

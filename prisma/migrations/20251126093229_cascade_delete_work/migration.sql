-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workId" INTEGER NOT NULL,
    CONSTRAINT "Photo_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("caption", "createdAt", "id", "titre", "updatedAt", "url", "workId") SELECT "caption", "createdAt", "id", "titre", "updatedAt", "url", "workId" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "workId" INTEGER NOT NULL,
    CONSTRAINT "Video_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("caption", "createdAt", "id", "updatedAt", "url", "workId") SELECT "caption", "createdAt", "id", "updatedAt", "url", "workId" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

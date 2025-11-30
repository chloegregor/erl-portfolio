-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,
    CONSTRAINT "Language_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

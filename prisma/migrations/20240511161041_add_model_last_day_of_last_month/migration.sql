/*
  Warnings:

  - The primary key for the `day_off` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateTable
CREATE TABLE "lastDayOfLastMonth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "CollaboratorId" TEXT NOT NULL,
    "QtdDayOff" INTEGER NOT NULL,
    "WeekDay" TEXT NOT NULL,
    CONSTRAINT "lastDayOfLastMonth_CollaboratorId_fkey" FOREIGN KEY ("CollaboratorId") REFERENCES "collaborator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_day_off" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    CONSTRAINT "day_off_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "collaborator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_day_off" ("collaboratorId", "date", "id") SELECT "collaboratorId", "date", "id" FROM "day_off";
DROP TABLE "day_off";
ALTER TABLE "new_day_off" RENAME TO "day_off";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "day_off" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "collaboratorId" TEXT NOT NULL,
    CONSTRAINT "day_off_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "collaborator" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

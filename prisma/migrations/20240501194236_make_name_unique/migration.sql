/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `collaborator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "collaborator_name_key" ON "collaborator"("name");

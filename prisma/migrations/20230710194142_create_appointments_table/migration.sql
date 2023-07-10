/*
  Warnings:

  - You are about to drop the `Appoiments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Appoiments";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "prdvider" TEXT NOT NULL
);

/*
  Warnings:

  - You are about to drop the column `prdvider` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `provider` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL
);
INSERT INTO "new_appointments" ("id") SELECT "id" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

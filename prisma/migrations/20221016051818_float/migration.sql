/*
  Warnings:

  - You are about to alter the column `totalBilled` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `DoublePrecision`.
  - You are about to alter the column `value` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `DoublePrecision`.
  - You are about to alter the column `price` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "totalBilled" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "value" SET DEFAULT 0,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "InvoiceItem" ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "CompanyDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "vatNumber" TEXT NOT NULL,
    "regNumber" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "swift" TEXT NOT NULL,

    CONSTRAINT "CompanyDetails_pkey" PRIMARY KEY ("id")
);

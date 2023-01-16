-- CreateTable
CREATE TABLE "testTable" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,

    CONSTRAINT "testTable_pkey" PRIMARY KEY ("id")
);

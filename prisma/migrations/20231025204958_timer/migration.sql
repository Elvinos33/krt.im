-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "timer" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_path_key" ON "Link"("path");

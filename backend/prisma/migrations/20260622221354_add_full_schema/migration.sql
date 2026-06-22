-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" SERIAL NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "baseClockGhz" DOUBLE PRECISION NOT NULL,
    "boostClockGhz" DOUBLE PRECISION,
    "passmarkScore" INTEGER,
    "eccSupport" BOOLEAN NOT NULL DEFAULT false,
    "integratedGraphics" BOOLEAN NOT NULL DEFAULT false,
    "tdpWatts" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" SERIAL NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "vramGb" INTEGER NOT NULL,
    "passmarkScore" INTEGER,
    "tdpWatts" INTEGER,
    "isIntegrated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RamConfig" (
    "id" SERIAL NOT NULL,
    "capacityGb" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "eccSupport" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RamConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageConfig" (
    "id" SERIAL NOT NULL,
    "capacityGb" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StorageConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "System" (
    "id" SERIAL NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priceUsd" DOUBLE PRECISION NOT NULL,
    "releaseYear" INTEGER,
    "url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "System_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemCpu" (
    "id" SERIAL NOT NULL,
    "systemId" INTEGER NOT NULL,
    "cpuId" INTEGER NOT NULL,

    CONSTRAINT "SystemCpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemGpu" (
    "id" SERIAL NOT NULL,
    "systemId" INTEGER NOT NULL,
    "gpuId" INTEGER NOT NULL,

    CONSTRAINT "SystemGpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemRam" (
    "id" SERIAL NOT NULL,
    "systemId" INTEGER NOT NULL,
    "ramConfigId" INTEGER NOT NULL,

    CONSTRAINT "SystemRam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemStorage" (
    "id" SERIAL NOT NULL,
    "systemId" INTEGER NOT NULL,
    "storageConfigId" INTEGER NOT NULL,

    CONSTRAINT "SystemStorage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CpuScore" (
    "id" SERIAL NOT NULL,
    "cpuId" INTEGER NOT NULL,
    "gamingScore" INTEGER,
    "productivityScore" INTEGER,
    "developmentScore" INTEGER,
    "cadScore" INTEGER,

    CONSTRAINT "CpuScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GpuScore" (
    "id" SERIAL NOT NULL,
    "gpuId" INTEGER NOT NULL,
    "gamingScore" INTEGER,
    "aiComputeScore" INTEGER,

    CONSTRAINT "GpuScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "displayText" TEXT NOT NULL,
    "requirementsField" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "displayText" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_name_key" ON "Manufacturer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CpuScore_cpuId_key" ON "CpuScore"("cpuId");

-- CreateIndex
CREATE UNIQUE INDEX "GpuScore_gpuId_key" ON "GpuScore"("gpuId");

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "System" ADD CONSTRAINT "System_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemCpu" ADD CONSTRAINT "SystemCpu_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemCpu" ADD CONSTRAINT "SystemCpu_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemGpu" ADD CONSTRAINT "SystemGpu_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemGpu" ADD CONSTRAINT "SystemGpu_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Gpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemRam" ADD CONSTRAINT "SystemRam_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemRam" ADD CONSTRAINT "SystemRam_ramConfigId_fkey" FOREIGN KEY ("ramConfigId") REFERENCES "RamConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemStorage" ADD CONSTRAINT "SystemStorage_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemStorage" ADD CONSTRAINT "SystemStorage_storageConfigId_fkey" FOREIGN KEY ("storageConfigId") REFERENCES "StorageConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CpuScore" ADD CONSTRAINT "CpuScore_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GpuScore" ADD CONSTRAINT "GpuScore_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Gpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

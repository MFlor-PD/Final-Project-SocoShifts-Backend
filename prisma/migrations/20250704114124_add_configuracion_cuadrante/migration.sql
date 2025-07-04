-- CreateTable
CREATE TABLE "configuracion_cuadrante" (
    "id" SERIAL NOT NULL,
    "mes" TEXT NOT NULL,
    "horasDiarias" DOUBLE PRECISION NOT NULL,
    "horasLegalesMes" DOUBLE PRECISION NOT NULL,
    "socorristasPorDia" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configuracion_cuadrante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuracion_cuadrante_mes_key" ON "configuracion_cuadrante"("mes");

-- CreateTable
CREATE TABLE "asignaciones_trabajo" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "es_obligatorio" BOOLEAN DEFAULT false,

    CONSTRAINT "asignaciones_trabajo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "playa" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "asignaciones_trabajo_usuario_id_fecha_key" ON "asignaciones_trabajo"("usuario_id", "fecha");

-- AddForeignKey
ALTER TABLE "asignaciones_trabajo" ADD CONSTRAINT "asignaciones_trabajo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

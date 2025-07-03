const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function guardarCuadranteEnBD(cuadrante) {
  try {
    for (const trabajador of cuadrante) {
      const usuario = await prisma.usuarios.findFirst({
        where: { nombre: trabajador.trabajador }
      });

      if (!usuario) {
        console.warn(`Usuario no encontrado: ${trabajador.trabajador}`);
        continue;
      }

      for (const dia of trabajador.dias_trabajados) {
        await prisma.asignaciones_trabajo.upsert({
          where: {
            usuario_id_fecha: {
              usuario_id: usuario.id,
              fecha: new Date(dia.fecha)
            }
          },
          update: {},
          create: {
            usuario_id: usuario.id,
            fecha: new Date(dia.fecha),
            es_obligatorio: false
          }
        });
      }
    }
  } catch (error) {
    console.error("Error guardando cuadrante en BD:", error);
    throw error;
  }
}

module.exports = { guardarCuadranteEnBD };


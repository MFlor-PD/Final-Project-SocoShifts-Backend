const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function guardarCuadranteEnBD(cuadrante) {
  try {
    for (const { trabajador, dias_trabajados } of cuadrante) {
      const usuario = await prisma.usuarios.findFirst({
        where: { nombre: trabajador }
      });

      if (!usuario) {
        console.warn(`Usuario no encontrado: ${trabajador}`);
        continue;
      }

      for (const { fecha } of dias_trabajados) {
        await prisma.asignaciones_trabajo.upsert({
          where: {
            usuario_id_fecha: {
              usuario_id: usuario.id,
              fecha: new Date(fecha),
            },
          },
          update: {},
          create: {
            usuario_id: usuario.id,
            fecha: new Date(fecha),
            es_obligatorio: false,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error guardando cuadrante en BD:", error);
    throw error;
  }
}

async function editarAsignacion({ usuario_id, fecha, es_obligatorio }) {
  try {
    return await prisma.asignaciones_trabajo.upsert({
      where: {
        usuario_id_fecha: {
          usuario_id,
          fecha: new Date(fecha),
        },
      },
      update: { es_obligatorio },
      create: {
        usuario_id,
        fecha: new Date(fecha),
        es_obligatorio,
      },
    });
  } catch (error) {
    console.error("Error editando asignación:", error);
    throw error;
  }
}

async function eliminarAsignacion({ usuario_id, fecha }) {
  try {
    return await prisma.asignaciones_trabajo.delete({
      where: {
        usuario_id_fecha: {
          usuario_id,
          fecha: new Date(fecha),
        },
      },
    });
  } catch (error) {
    console.error("Error eliminando asignación:", error);
    throw error;
  }
}

async function guardarConfiguracionCuadrante({ mes, horas_diarias, horas_legales_mes, socorristas_por_dia }) {
  return await prisma.configuracion_cuadrante.upsert({
    where: { mes },
    update: {
      horasDiarias: horas_diarias,
      horasLegalesMes: horas_legales_mes,
      socorristasPorDia: socorristas_por_dia,
      updatedAt: new Date(),
    },
    create: {
      mes,
      horasDiarias: horas_diarias,
      horasLegalesMes: horas_legales_mes,
      socorristasPorDia: socorristas_por_dia,
    },
  });
}

async function obtenerConfiguracionCuadrante(mes) {
  return await prisma.configuracion_cuadrante.findUnique({ where: { mes } });
}

async function borrarMesCompleto(mes) {
  const fechaInicio = new Date(`${mes}-01T00:00:00Z`);
  const fechaFin = new Date(fechaInicio);
  fechaFin.setMonth(fechaFin.getMonth() + 1);

  try {
    await prisma.asignaciones_trabajo.deleteMany({
      where: {
        fecha: {
          gte: fechaInicio,
          lt: fechaFin,
        }
      }
    });

    await prisma.configuracion_cuadrante.deleteMany({
      where: {
        mes,
      }
    });

    return { message: `Datos del mes ${mes} borrados correctamente` };
  } catch (error) {
    console.error('Error borrando mes completo:', error);
    throw error;
  }
}



module.exports = {
  guardarCuadranteEnBD,
  editarAsignacion,
  eliminarAsignacion,
  guardarConfiguracionCuadrante,
  obtenerConfiguracionCuadrante,
  borrarMesCompleto
};



const { getUsuariosConPreferencias } = require('../models/cuadranteModel');
const { generarCuadranteIndividual } = require('../helpers/logicaCuadrante');

const horasMensualesPorRol = {
  socorrista: 160,
  supervisor: 172,
};

const generarCuadrante = async ({ mes, periodos }) => {
  const usuarios = await getUsuariosConPreferencias();
  const cuadranteFinal = [];

  for (const usuario of usuarios) {
    const cuadrante = generarCuadranteIndividual({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.nombre_rol,
      playaAsignada: usuario.playas_preferidas[0] || "Sin playa", 
      diasPreferidos: usuario.dias_preferidos || [],
      mes,
      periodos,
      horasTotalesAsignadas: horasMensualesPorRol[usuario.nombre_rol.toLowerCase()] || 160
    });

    cuadranteFinal.push(cuadrante);
  }

  return cuadranteFinal;
};

module.exports = {
  generarCuadrante
};
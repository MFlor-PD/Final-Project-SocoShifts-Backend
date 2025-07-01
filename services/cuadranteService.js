const { getUsuariosConAsignacionesObligatorias } = require('../models/cuadranteModel');
const generarCuadranteDesdeObligatorios = require('../helpers/generarCuadranteDesdeObligatorios');

const horasMensualesPorRol = {
  socorrista: 160,
  supervisor: 172
};

const generarCuadrante = async ({ mes, periodos }) => {
  const usuarios = await getUsuariosConAsignacionesObligatorias();

  const cuadranteFinal = usuarios.map(usuario =>
    generarCuadranteDesdeObligatorios({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      playa: usuario.playa,
      dias_obligatorios: usuario.dias_obligatorios || [],
      mes,
      periodos,
      horasTotalesAsignadas: horasMensualesPorRol[usuario.rol.toLowerCase()] || 160
    })
  );

  return cuadranteFinal;
};

module.exports = {
  generarCuadrante
};

const { getUsuariosConAsignacionesObligatorias } = require('../models/cuadranteModel');
const generarCuadranteDesdeObligatorios = require('../helpers/generarCuadranteDesdeObligatorios');

const generarCuadrante = async ({ mes, periodos, horasMensuales }) => {
  if (typeof horasMensuales !== 'number') {
    throw new Error('El campo horasMensuales es obligatorio y debe ser un número');
  }

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
      horasTotalesAsignadas: horasMensuales
    })
  );

  return cuadranteFinal;
};

module.exports = {
  generarCuadrante
};


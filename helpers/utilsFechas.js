const { differenceInCalendarDays } = require('date-fns');

function getNumeroSemana(fechaStr, mes) {
  const fecha = new Date(fechaStr);
  const [anio, mesStr] = mes.split('-');
  const primerDiaMes = new Date(anio, parseInt(mesStr) - 1, 1);
  const diff = differenceInCalendarDays(fecha, primerDiaMes);
  return Math.floor(diff / 7);
}

module.exports = {
  getNumeroSemana
};

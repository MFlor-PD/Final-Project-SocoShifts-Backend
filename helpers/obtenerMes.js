const { format, addDays, startOfMonth, endOfMonth } = require('date-fns');

function obtenerDiasDelMes(mes) {
  const [anio, mesStr] = mes.split('-');
  const inicio = startOfMonth(new Date(anio, parseInt(mesStr) - 1));
  const fin = endOfMonth(inicio);

  const dias = [];
  for (let d = inicio; d <= fin; d = addDays(d, 1)) {
    dias.push({
      fecha: format(d, 'yyyy-MM-dd'),
      dia: format(d, 'EEEE', { locale: undefined }).toLowerCase()
    });
  }
  return dias;
}

module.exports = obtenerDiasDelMes;

const obtenerDiasDelMes = require('./obtenerDiasDelMes');

// Devuelve un array de semanas, cada una con un array de días del mes
function dividirMesEnSemanas(mes) {
  const diasDelMes = obtenerDiasDelMes(mes);
  const semanas = [];
  let semanaActual = [];

  for (const dia of diasDelMes) {
    semanaActual.push(dia);

    // Si llegamos a domingo o es el último día del mes, cerramos la semana
    const diaSemana = new Date(dia.fecha).getDay(); // 0 = domingo
    const esUltimoDia = dia === diasDelMes[diasDelMes.length - 1];

    if (diaSemana === 0 || esUltimoDia) {
      semanas.push(semanaActual);
      semanaActual = [];
    }
  }

  return semanas;
}

module.exports = dividirMesEnSemanas;


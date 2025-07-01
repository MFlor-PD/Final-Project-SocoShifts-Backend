function obtenerDiasDelMes(mes) {
  const [anio, mesStr] = mes.split('-');
  const mesNum = parseInt(mesStr, 10) - 1;
  const dias = [];
  let fecha = new Date(anio, mesNum, 1);

  while (fecha.getMonth() === mesNum) {
    const diaNombre = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
    const diaFormateado = fecha.toISOString().slice(0, 10);
    dias.push({ fecha: diaFormateado, dia: diaNombre.toLowerCase() });
    fecha.setDate(fecha.getDate() + 1);
  }

  return dias;
}

module.exports = obtenerDiasDelMes;

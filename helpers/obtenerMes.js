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



/*--------------------------------------------------------*/
/*const { format, getDaysInMonth } = require('date-fns');

function obtenerDiasDelMes(mes) {
  const [anio, mesStr] = mes.split('-');
  const year = parseInt(anio);
  const month = parseInt(mesStr) - 1; // Los meses en JavaScript son 0-indexados
  
  // Obtener el número total de días en el mes
  const totalDias = getDaysInMonth(new Date(year, month));
  
  console.log(`📅 Procesando mes: ${mes}`);
  console.log(`📅 Total días en el mes: ${totalDias}`);

  const dias = [];
  
  // Generar todos los días del mes
  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = new Date(year, month, dia);
    dias.push({
      fecha: format(fecha, 'yyyy-MM-dd'),
      dia: format(fecha, 'EEEE', { locale: undefined }).toLowerCase()
    });
  }

  console.log(`📅 Total días generados: ${dias.length}`);
  console.log(`📅 Primer día: ${dias[0]?.fecha}`);
  console.log(`📅 Último día: ${dias[dias.length - 1]?.fecha}`);
  
  return dias;
}

module.exports = obtenerDiasDelMes;*/

const dividirMesEnSemanas = require('./dividirMesEnSemanas');
const asignarSemanaEquitativa = require('./asignarSemanaEquitativa');
const { getUsuariosConAsignacionesObligatorias } = require('../models/cuadranteModel');

async function generarCuadranteGlobal({ 
  mes, 
  periodos, 
  horasMensuales, 
  socorristasPorDia = 2 // Nueva parámetro
}) {
  const usuarios = await getUsuariosConAsignacionesObligatorias();
  
  console.log('=== INICIO generarCuadranteGlobal ===');
  console.log('Parámetros:', { mes, horasMensuales, socorristasPorDia });

  // Separar socorristas de otros roles
  const socorristas = usuarios.filter(u => u.rol.toLowerCase() === 'socorrista');
  const otrosRoles = usuarios.filter(u => u.rol.toLowerCase() !== 'socorrista');
  
  console.log(`Socorristas encontrados: ${socorristas.length}`);
  console.log(`Otros roles: ${otrosRoles.length}`);

  // Inicializar trabajadores
  let trabajadoresSocorristas = socorristas.map(u => ({
    ...u,
    diasAsignados: [],
    horasAcumuladas: 0,
    horasSemanales: 0,
    ultimaSemanaCompleta: -1 // Para evitar trabajar semanas seguidas
  }));

  let trabajadoresOtros = otrosRoles.map(u => ({
    ...u,
    diasAsignados: [],
    horasAcumuladas: 0
  }));

  const semanas = dividirMesEnSemanas(mes);
  console.log('Número de semanas:', semanas.length);

  // Procesar semana por semana
  for (let i = 0; i < semanas.length; i++) {
    console.log(`\n--- Procesando semana ${i + 1} ---`);
    
    // Resetear horas semanales al inicio de cada semana
    trabajadoresSocorristas.forEach(t => {
      t.horasSemanales = 0;
    });
    
    // Asignar socorristas con distribución equitativa
    trabajadoresSocorristas = asignarSemanaEquitativa(
      semanas[i], 
      trabajadoresSocorristas, 
      periodos, 
      horasMensuales,
      socorristasPorDia,
      i
    );
    
    // Asignar otros roles (lógica simple, un trabajador por día si es necesario)
    trabajadoresOtros = asignarOtrosRoles(
      semanas[i],
      trabajadoresOtros,
      periodos,
      horasMensuales
    );
  }

  // Combinar resultados
  const todosLosTrabajadores = [...trabajadoresSocorristas, ...trabajadoresOtros];

  console.log('\n=== RESULTADO FINAL ===');
  todosLosTrabajadores.forEach(t => {
    console.log(`${t.nombre}: ${t.horasAcumuladas} horas, ${t.diasAsignados.length} días`);
  });

  return todosLosTrabajadores.map(t => ({
    trabajador: `${t.nombre} ${t.apellido}`,
    rol: t.rol.toLowerCase(),
    playa_asignada: t.playa,
    dias_trabajados: t.diasAsignados,
    horas_totales: horasMensuales,
    horas_cumplidas: t.horasAcumuladas,
    eficiencia: `${Math.round((t.horasAcumuladas / horasMensuales) * 100)}%`
  }));
}

// Función auxiliar para otros roles (supervisores, etc.)
function asignarOtrosRoles(semana, trabajadores, periodos, horasTotales) {
  const trabajadoresState = trabajadores.map(t => ({
    ...t,
    diasAsignados: [...t.diasAsignados],
    horasAcumuladas: t.horasAcumuladas
  }));

  for (const dia of semana) {
    // Buscar trabajador con menos horas que necesite trabajar
    const candidato = trabajadoresState
      .filter(t => {
        const yaAsignado = t.diasAsignados.some(d => d.fecha === dia.fecha);
        return !yaAsignado && t.horasAcumuladas < horasTotales;
      })
      .sort((a, b) => a.horasAcumuladas - b.horasAcumuladas)[0];

    if (candidato) {
      const obtenerHorasParaDia = require('./obtenerHorasParaDia');
      const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
      
      candidato.diasAsignados.push(dia);
      candidato.horasAcumuladas += horasDia;
    }
  }

  return trabajadoresState;
}

module.exports = generarCuadranteGlobal;























/*const dividirMesEnSemanas = require('./dividirMesEnSemanas');
const asignarSemana = require('./asignarSemana');
const { getUsuariosConAsignacionesObligatorias } = require('../models/cuadranteModel');

async function generarCuadranteGlobal({ mes, periodos, horasMensuales }) {
  const usuarios = await getUsuariosConAsignacionesObligatorias();
  
  console.log('=== INICIO generarCuadranteGlobal ===');
  console.log('Usuarios obtenidos:', usuarios.length);

  let trabajadores = usuarios.map(u => ({
    ...u,
    diasAsignados: [],
    horasAcumuladas: 0  // Inicializar en 0
  }));

  console.log('Trabajadores inicializados:', trabajadores.map(t => ({
    nombre: t.nombre,
    horasAcumuladas: t.horasAcumuladas
  })));

  const semanas = dividirMesEnSemanas(mes);
  console.log('Número de semanas:', semanas.length);
  console.log('Contenido de las semanas:', JSON.stringify(semanas, null, 2));
  console.log('Períodos recibidos:', JSON.stringify(periodos, null, 2));
  
  // Verificar días obligatorios
  trabajadores.forEach(t => {
    console.log(`${t.nombre} - días obligatorios:`, t.dias_obligatorios);
  });

  for (let i = 0; i < semanas.length; i++) {
    console.log(`\n--- Procesando semana ${i + 1} ---`);
    console.log('Estado antes de asignar semana:', trabajadores.map(t => ({
      nombre: t.nombre,
      horasAcumuladas: t.horasAcumuladas,
      diasAsignados: t.diasAsignados.length
    })));
    
    // IMPORTANTE: asignarSemana debe devolver trabajadores con horasAcumuladas actualizadas
    trabajadores = asignarSemana(semanas[i], trabajadores, periodos, horasMensuales);
    
    console.log('Estado después de asignar semana:', trabajadores.map(t => ({
      nombre: t.nombre,
      horasAcumuladas: t.horasAcumuladas,
      diasAsignados: t.diasAsignados.length
    })));
  }

  console.log('\n=== RESULTADO FINAL ===');
  console.log('Trabajadores finales:', trabajadores.map(t => ({
    nombre: t.nombre,
    horasAcumuladas: t.horasAcumuladas,
    diasAsignados: t.diasAsignados.length
  })));

  return trabajadores.map(t => ({
    trabajador: `${t.nombre} ${t.apellido}`,
    rol: t.rol.toLowerCase(),
    playa_asignada: t.playa,
    dias_trabajados: t.diasAsignados,
    horas_totales: horasMensuales,
    horas_cumplidas: t.horasAcumuladas || 0  // Asegurar que no sea null
  }));
}

module.exports = generarCuadranteGlobal;*/


/*const dividirMesEnSemanas = require('./dividirMesEnSemanas');
const asignarSemana = require('./asignarSemana');
const { getUsuariosConAsignacionesObligatorias } = require('../models/cuadranteModel');

async function generarCuadranteGlobal({ mes, periodos, horasMensuales }) {
  const usuarios = await getUsuariosConAsignacionesObligatorias();

  let trabajadores = usuarios.map(u => ({
    ...u,
    diasAsignados: [],
    horasAcumuladas: 0
  }));

  const semanas = dividirMesEnSemanas(mes);

  for (const semana of semanas) {
    trabajadores = asignarSemana(semana, trabajadores, periodos, horasMensuales);
  }

  return trabajadores.map(t => ({
    trabajador: `${t.nombre} ${t.apellido}`,
    rol: t.rol.toLowerCase(),
    playa_asignada: t.playa,
    dias_trabajados: t.diasAsignados,
    horas_totales: horasMensuales,  // <-- Aquí solo un número
    horas_cumplidas: t.horasAcumuladas
  }));
}

module.exports = generarCuadranteGlobal;
*/

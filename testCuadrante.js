const fs = require('fs');
const path = require('path');
const { generarCuadrante } = require('./services/cuadranteService');

const input = {
  mes: '2025-07',
  periodos: [
    { inicio: '2025-07-01', fin: '2025-07-15', horasDiarias: 8 },
    { inicio: '2025-07-16', fin: '2025-07-31', horasDiarias: 6 }
  ]
};

(async () => {
  try {
    const cuadrante = await generarCuadrante(input);
    console.log('✅ Cuadrante generado con éxito:');
    console.log(JSON.stringify(cuadrante, null, 2));

    // Guardar en archivo
    const outputPath = path.join(__dirname, 'cuadrante_generado.json');
    fs.writeFileSync(outputPath, JSON.stringify(cuadrante, null, 2), 'utf-8');
    console.log(`📁 Resultado guardado en: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generando cuadrante:', error);
  }
})();


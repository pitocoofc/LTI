// graficos.js
const fs = require('fs');

function desenharGrafico(arquivoRelatorio) {
    const dados = JSON.parse(fs.readFileSync(arquivoRelatorio, 'utf8'));
    
    console.log("\n--- Gráfico de Ocupação ---");
    dados.forEach(item => {
        // Cria uma barra de 50 caracteres para representar 100%
        const tamanhoBarra = Math.round((parseFloat(item.porcentagem) / 100) * 50);
        const barra = "#".repeat(tamanhoBarra);
        console.log(`${item.linguagem.padEnd(12)} | ${barra} ${item.porcentagem}%`);
    });
}

// O script A (analisador) deve salvar num JSON tipo:
// [{ "linguagem": "C", "porcentagem": "55.00" }, { "linguagem": "Java", "porcentagem": "45.00" }]
desenharGrafico('relatorio.json');


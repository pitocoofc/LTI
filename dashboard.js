
const fs = require('fs');
const path = require('path');

function gerarDashboard(arquivoRelatorio) {
    try {
        const dados = JSON.parse(fs.readFileSync(arquivoRelatorio, 'utf8'));
        
        const cores = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', 
                       '#fa709a', '#fee140', '#a18cd1', '#fbc2eb', '#8ec5fc'];
        
        const total = dados.reduce((sum, item) => sum + parseInt(item.caracteres), 0);
        

        const pizzaCores = dados.map((item, i) => 
            `${cores[i % cores.length]} ${item.porcentagem}%`
        ).join(', ');
        
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📊 Dashboard - Análise de Código</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #2d3748;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .subtitle {
            text-align: center;
            color: #718096;
            margin-bottom: 30px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
        }
        .stat .numero {
            font-size: 2.2em;
            font-weight: bold;
        }
        .stat .label {
            opacity: 0.9;
            font-size: 0.9em;
        }
        .chart-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }
        .bars {
            background: #f7fafc;
            padding: 20px;
            border-radius: 12px;
        }
        .bar-item {
            display: flex;
            align-items: center;
            margin: 8px 0;
            padding: 4px;
        }
        .bar-item:hover {
            background: rgba(102, 126, 234, 0.1);
            border-radius: 6px;
        }
        .bar-label {
            min-width: 120px;
            font-weight: 500;
            color: #2d3748;
            font-size: 0.95em;
        }
        .bar-track {
            flex: 1;
            height: 28px;
            background: #edf2f7;
            border-radius: 14px;
            overflow: hidden;
            margin: 0 10px;
            position: relative;
        }
        .bar-fill {
            height: 100%;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 8px;
            color: white;
            font-size: 0.75em;
            font-weight: bold;
            transition: width 0.5s ease;
        }
        .bar-value {
            color: #4a5568;
            font-size: 0.85em;
        }
        .pie-section {
            background: #f7fafc;
            padding: 20px;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .pie {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: conic-gradient(${pizzaCores});
            margin: 15px auto;
        }
        .legend {
            width: 100%;
            margin-top: 10px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            font-size: 0.85em;
            padding: 3px 0;
        }
        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            flex-shrink: 0;
        }
        @media (max-width: 768px) {
            .chart-container {
                grid-template-columns: 1fr;
            }
            .container { padding: 20px; }
        }
        .footer {
            text-align: center;
            color: #a0aec0;
            font-size: 0.85em;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Dashboard de Análise de Código</h1>
        <p class="subtitle">Distribuição de linguagens por caracteres</p>
        
        <div class="stats">
            <div class="stat">
                <div class="numero">${dados.length}</div>
                <div class="label">Linguagens</div>
            </div>
            <div class="stat">
                <div class="numero">${total.toLocaleString()}</div>
                <div class="label">Caracteres</div>
            </div>
            <div class="stat">
                <div class="numero">${dados[0]?.linguagem || 'N/A'}</div>
                <div class="label">Principal</div>
            </div>
            <div class="stat">
                <div class="numero">${dados[0]?.porcentagem || 0}%</div>
                <div class="label">Destaque</div>
            </div>
        </div>
        
        <div class="chart-container">
            <div class="bars">
                <h3 style="margin-bottom:15px;color:#2d3748;">📈 Distribuição</h3>
                ${dados.map((item, i) => `
                    <div class="bar-item">
                        <span class="bar-label">${item.linguagem}</span>
                        <div class="bar-track">
                            <div class="bar-fill" style="width:${item.porcentagem}%;background:${cores[i % cores.length]}">
                                ${item.porcentagem}%
                            </div>
                        </div>
                        <span class="bar-value">${parseInt(item.caracteres).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="pie-section">
                <h3 style="margin-bottom:10px;color:#2d3748;">🍕 Pizza</h3>
                <div class="pie"></div>
                <div class="legend">
                    ${dados.map((item, i) => `
                        <div class="legend-item">
                            <div class="legend-color" style="background:${cores[i % cores.length]}"></div>
                            ${item.linguagem} (${item.porcentagem}%)
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="footer">
            Gerado em ${new Date().toLocaleString()} • ${dados.length} linguagens • ${total.toLocaleString()} caracteres
        </div>
    </div>
</body>
</html>`;
        
        const nomeArquivo = 'dashboard.html';
        fs.writeFileSync(nomeArquivo, html);
        console.log(`✅ Dashboard gerado: ${nomeArquivo}`);
        console.log(`🌐 Abra no navegador: file://${path.resolve(nomeArquivo)}`);
        
    } catch (error) {
        console.error(`❌ Erro: ${error.message}`);
        console.log('💡 Uso: node dashboard.js [relatorio.json]');
        process.exit(1);
    }
}


const arquivo = process.argv[2] || 'relatorio.json';
gerarDashboard(arquivo);

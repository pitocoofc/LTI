const fs = require('fs').promises;
const path = require('path');

/**
 * Configurações do gráfico
 */
const CONFIG = {
    BARRA_LARGURA_MAX: 60,          // Largura máxima da barra em caracteres
    CORES: {
        reset: '\x1b[0m',
        brilho: '\x1b[1m',
        dim: '\x1b[2m',
        vermelho: '\x1b[31m',
        verde: '\x1b[32m',
        amarelo: '\x1b[33m',
        azul: '\x1b[34m',
        magenta: '\x1b[35m',
        ciano: '\x1b[36m',
        branco: '\x1b[37m',
        bgVerde: '\x1b[42m',
        bgAzul: '\x1b[44m',
        bgMagenta: '\x1b[45m',
        bgCiano: '\x1b[46m'
    },
    PALETA_CORES: [
        '\x1b[31m', // Vermelho
        '\x1b[32m', // Verde
        '\x1b[33m', // Amarelo
        '\x1b[34m', // Azul
        '\x1b[35m', // Magenta
        '\x1b[36m', // Ciano
        '\x1b[91m', // Vermelho claro
        '\x1b[92m', // Verde claro
        '\x1b[93m', // Amarelo claro
        '\x1b[94m', // Azul claro
        '\x1b[95m', // Magenta claro
        '\x1b[96m'  // Ciano claro
    ]
};

/**
 * Classe principal para gerar gráficos
 */
class GeradorGraficos {
    constructor(arquivoRelatorio) {
        this.arquivoRelatorio = arquivoRelatorio;
        this.dados = [];
        this.total = 0;
    }

    /**
     * Carrega e valida os dados do relatório
     */
    async carregarDados() {
        try {
            // Verifica se o arquivo existe
            await fs.access(this.arquivoRelatorio);
            
            const conteudo = await fs.readFile(this.arquivoRelatorio, 'utf8');
            this.dados = JSON.parse(conteudo);
            
            // Validação dos dados
            if (!Array.isArray(this.dados) || this.dados.length === 0) {
                throw new Error('Arquivo JSON vazio ou inválido');
            }
            
            // Calcula total
            this.total = this.dados.reduce((sum, item) => {
                return sum + (parseFloat(item.porcentagem) || 0);
            }, 0);
            
            // Ordena por porcentagem (decrescente)
            this.dados.sort((a, b) => parseFloat(b.porcentagem) - parseFloat(a.porcentagem));
            
            return true;
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error.message);
            return false;
        }
    }

    /**
     * Escolhe cor baseada no índice
     */
    getCor(index) {
        return CONFIG.PALETA_CORES[index % CONFIG.PALETA_CORES.length];
    }

    /**
     * Gera uma barra com cores
     */
    gerarBarra(porcentagem, cor, largura = CONFIG.BARRA_LARGURA_MAX) {
        const tamanho = Math.round((porcentagem / 100) * largura);
        const vazia = largura - tamanho;
        
        // Usa caracteres Unicode para barras mais bonitas
        const barraCheia = '█'.repeat(tamanho);
        const barraVazia = '░'.repeat(vazia);
        
        return `${cor}${barraCheia}${CONFIG.CORES.reset}${barraVazia}`;
    }

    /**
     * Gera gráfico de barras horizontal
     */
    gerarGraficoBarras() {
        console.log('\n📊 --- GRÁFICO DE BARRAS --- 📊');
        console.log(`📁 Fonte: ${path.basename(this.arquivoRelatorio)}`);
        console.log(`📈 Total de linguagens: ${this.dados.length}\n`);
        
        // Encontra maior nome para alinhamento
        const maxNomeLen = Math.max(...this.dados.map(item => item.linguagem.length));
        
        this.dados.forEach((item, index) => {
            const porcentagem = parseFloat(item.porcentagem);
            const cor = this.getCor(index);
            const barra = this.gerarBarra(porcentagem, cor);
            
            // Formata nome com padding
            const nomeFormatado = item.linguagem.padEnd(maxNomeLen + 2);
            
            // Barra com porcentagem e caracteres
            console.log(
                `${(index + 1).toString().padStart(3)}. ` +
                `${cor}${CONFIG.CORES.brilho}${nomeFormatado}${CONFIG.CORES.reset}` +
                `${barra} ` +
                `${cor}${porcentagem.toFixed(1)}%${CONFIG.CORES.reset}` +
                ` ${CONFIG.CORES.dim}(${item.caracteres?.toLocaleString() || ''} chars)${CONFIG.CORES.reset}`
            );
        });
        
        console.log(`\n📌 Total: ${this.total.toFixed(1)}%`);
    }

    /**
     * Gera gráfico de pizza (ASCII)
     */
    gerarGraficoPizza() {
        console.log('\n🍕 --- GRÁFICO DE PIZZA --- 🍕');
        
        // Calcula ângulos
        const dadosComAngulos = this.dados.map((item, index) => {
            const porcentagem = parseFloat(item.porcentagem);
            const angulo = (porcentagem / 100) * 360;
            return {
                ...item,
                porcentagem,
                angulo,
                cor: this.getCor(index)
            };
        });
        
        // Desenha pizza ASCII (simplificada)
        const raio = 10;
        const centro = raio;
        const tamanho = raio * 2 + 1;
        const pizza = Array(tamanho).fill().map(() => Array(tamanho).fill(' '));
        
        // Preenche a pizza (versão simplificada)
        let anguloAtual = 0;
        dadosComAngulos.forEach((item) => {
            const anguloFinal = anguloAtual + item.angulo;
            const corChar = item.cor + '●' + CONFIG.CORES.reset;
            
            for (let y = -raio; y <= raio; y++) {
                for (let x = -raio; x <= raio; x++) {
                    if (x*x + y*y <= raio*raio) {
                        const anguloPonto = Math.atan2(y, x) * 180 / Math.PI;
                        const anguloAjustado = (anguloPonto + 360) % 360;
                        
                        if (anguloAjustado >= anguloAtual && anguloAjustado < anguloFinal) {
                            const px = x + centro;
                            const py = y + centro;
                            if (px >= 0 && px < tamanho && py >= 0 && py < tamanho) {
                                pizza[py][px] = corChar;
                            }
                        }
                    }
                }
            }
            anguloAtual = anguloFinal;
        });
        
        // Exibe pizza
        pizza.forEach(linha => {
            console.log('  ' + linha.join(''));
        });
        
        // Legenda
        console.log('\n📋 Legenda:');
        dadosComAngulos.forEach((item, index) => {
            const cor = item.cor;
            console.log(
                `  ${cor}●${CONFIG.CORES.reset} ` +
                `${item.linguagem.padEnd(15)} ` +
                `${item.porcentagem.toFixed(1)}% ` +
                `(${item.angulo.toFixed(0)}°)`
            );
        });
    }

    /**
     * Gera gráfico de tendência (comparativo)
     */
    gerarGraficoTendencia() {
        console.log('\n📈 --- GRÁFICO DE TENDÊNCIA --- 📈');
        
        const maxNomeLen = Math.max(...this.dados.map(item => item.linguagem.length));
        
        this.dados.forEach((item, index) => {
            const porcentagem = parseFloat(item.porcentagem);
            const cor = this.getCor(index);
            
            // Compara com a média
            const media = this.total / this.dados.length;
            const diferenca = porcentagem - media;
            const sinal = diferenca >= 0 ? '▲' : '▼';
            const corDiferenca = diferenca >= 0 ? CONFIG.CORES.verde : CONFIG.CORES.vermelho;
            
            const nomeFormatado = item.linguagem.padEnd(maxNomeLen + 2);
            console.log(
                `${cor}${nomeFormatado}${CONFIG.CORES.reset}` +
                `${porcentagem.toFixed(1)}% `.padStart(10) +
                `${corDiferenca}${sinal} ${Math.abs(diferenca).toFixed(1)}% ${CONFIG.CORES.reset}` +
                `${CONFIG.CORES.dim}(média: ${media.toFixed(1)}%)${CONFIG.CORES.reset}`
            );
        });
    }

    /**
     * Gera gráfico de distribuição acumulada
     */
    gerarGraficoAcumulado() {
        console.log('\n📊 --- DISTRIBUIÇÃO ACUMULADA --- 📊');
        
        let acumulado = 0;
        const maxNomeLen = Math.max(...this.dados.map(item => item.linguagem.length));
        
        this.dados.forEach((item, index) => {
            const porcentagem = parseFloat(item.porcentagem);
            acumulado += porcentagem;
            const cor = this.getCor(index);
            
            const nomeFormatado = item.linguagem.padEnd(maxNomeLen + 2);
            const barra = this.gerarBarra(acumulado, cor, 40);
            
            console.log(
                `${cor}${nomeFormatado}${CONFIG.CORES.reset}` +
                `${barra} ` +
                `${acumulado.toFixed(1)}% ` +
                `${CONFIG.CORES.dim}(+${porcentagem.toFixed(1)}%)${CONFIG.CORES.reset}`
            );
        });
    }

    /**
     * Exporta gráfico para arquivo de texto
     */
    async exportarParaArquivo(nomeArquivo = 'grafico.txt') {
        // Redireciona console.log para capturar saída
        const originalLog = console.log;
        const output = [];
        
        console.log = (...args) => {
            output.push(args.join(' '));
        };
        
        // Gera todos os gráficos
        this.gerarGraficoBarras();
        this.gerarGraficoTendencia();
        this.gerarGraficoAcumulado();
        
        // Restaura console.log
        console.log = originalLog;
        
        // Salva no arquivo
        try {
            await fs.writeFile(nomeArquivo, output.join('\n'), 'utf8');
            console.log(`✅ Gráfico exportado para: ${nomeArquivo}`);
        } catch (error) {
            console.error('❌ Erro ao exportar:', error.message);
        }
    }

    /**
     * Gera todos os gráficos
     */
    async gerarTodos() {
        const carregado = await this.carregarDados();
        if (!carregado) return;
        
        this.gerarGraficoBarras();
        this.gerarGraficoPizza();
        this.gerarGraficoTendencia();
        this.gerarGraficoAcumulado();
        
        // Opção de exportar
        console.log('\n📁 Deseja exportar para arquivo? (s/N)');
        // Aqui poderia adicionar input do usuário
        await this.exportarParaArquivo();
    }
}

/**
 * Função principal para compatibilidade com versão anterior
 */
async function desenharGrafico(arquivoRelatorio) {
    const gerador = new GeradorGraficos(arquivoRelatorio);
    await gerador.gerarTodos();
}

// Executa se chamado diretamente
if (require.main === module) {
    const arquivo = process.argv[2] || 'relatorio.json';
    desenharGrafico(arquivo);
}

module.exports = { GeradorGraficos, desenharGrafico };

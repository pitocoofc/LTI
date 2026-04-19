const fs = require('fs');
const path = require('path');

const extMap = {
    '.js': 'JavaScript', '.c': 'C', '.java': 'Java', '.py': 'Python', '.lua': 'Lua',
    '.cpp': 'C++', 
    '.html': 'HTML', 
    '.css': 'CSS', 
    '.rb': 'Ruby', 
    '.rs': 'Rust',
    '.ts': 'TypeScript', 
    '.php': 'PHP', 
    '.go': 'Go', 
    '.swift': 'Swift', 
    '.kt': 'Kotlin',
    '.cs': 'C#', 
    '.sh': 'Shell Script', 
    '.sql': 'SQL', 
    '.dart': 'Dart', 
    '.r': 'R',
    '.ex': 'Elixir', 
    '.clj': 'Clojure', 
    '.scala': 'Scala', 
    '.f90': 'Fortran',
    '.cbl': 'COBOL', 
    '.pas': 'Pascal', 
    '.ada': 'Ada', 
    '.lisp': 'Lisp', 
    '.pl': 'Perl',
    '.asm': 'Assembly', 
    '.m': 'Objective-C', 
    '.bas': 'BASIC', 
    '.bf': 'Brainfuck',
    '.ws': 'Whitespace', 
    '.lol': 'LOLCODE', 
    '.i': 'INTERCAL', 
    '.cow': 'COW',
    '.spl': 'Shakespeare', 
    '.piet': 'Piet', 
    '.mal': 'Malbolge', 
    '.arnoldc': 'ArnoldC',
    '.b98': 'Befunge', 
    '.json': 'JSON', 
    '.yaml': 'YAML', 
    '.md': 'Markdown',
    '.xml': 'XML', 
    '.toml': 'TOML'
};

function processarDiretorio(listaTxt) {
    if (!fs.existsSync(listaTxt)) {
        console.error(`Erro: Arquivo ${listaTxt} não encontrado.`);
        return;
    }

    const estatisticas = {};
    let totalChars = 0;

    const linhas = fs.readFileSync(listaTxt, 'utf8').split(/\r?\n/);

    linhas.forEach(nomeArquivo => {
        nomeArquivo = nomeArquivo.trim();
        
        // Verifica se o arquivo existe no sistema antes de processar
        if (!nomeArquivo || !fs.existsSync(nomeArquivo)) {
            if (nomeArquivo) console.log(`Aviso: ${nomeArquivo} não encontrado, pulando...`);
            return;
        }

        try {
            const conteudo = fs.readFileSync(nomeArquivo, 'utf8');
            const ext = path.extname(nomeArquivo).toLowerCase();
            
            // UTILIDADE PADRÃO: Se não está no mapa, usa a extensão como nome da linguagem
            // Ex: .txt vira "TXT" ao invés de sumir ou ir para "Outros"
            const lang = extMap[ext] || (ext ? ext.replace('.', '').toUpperCase() : 'SEM EXTENSÃO');

            if (!estatisticas[lang]) estatisticas[lang] = 0;

            estatisticas[lang] += conteudo.length;
            totalChars += conteudo.length;
        } catch (e) {
            console.log(`Erro ao ler ${nomeArquivo}: ${e.message}`);
        }
    });

    if (totalChars === 0) {
        console.log("Nenhum conteúdo válido foi encontrado.");
        return;
    }

    // Gerar array para o JSON
    const relatorioFinal = [];
    for (const lang in estatisticas) {
        const percent = ((estatisticas[lang] / totalChars) * 100).toFixed(2);
        relatorioFinal.push({
            linguagem: lang,
            porcentagem: percent,
            caracteres: estatisticas[lang]
        });
    }

    // Salvar JSON
    try {
        fs.writeFileSync('relatorio.json', JSON.stringify(relatorioFinal, null, 2));
        console.log("\nRelatório salvo com sucesso em: relatorio.json");
    } catch (err) {
        console.error("Erro ao salvar o arquivo JSON:", err);
    }

    // Exibir no console
    console.log("--- Relatório de Ocupação ---");
    relatorioFinal.forEach(item => {
        console.log(`${item.linguagem}: ${item.porcentagem}% (${item.caracteres} caracteres)`);
    });
}

// Inicia o processo
processarDiretorio('lista.txt');

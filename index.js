const fs = require('fs');
const path = require('path');

const extMap = {
    // LINGUAGENS MODERNAS E POPULARES
{
    '.js': 'JavaScript', 
    '.c': 'C', 
    '.java': 'Java', 
    '.py': 'Python', 
    '.lua': 'Lua',
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
    '.f90': 'Fortran 90',
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
    '.toml': 'TOML',
    '.zig': 'Zig',
    '.v': 'Verilog', 
    '.nim': 'Nim',
    '.crystal': 'Crystal',
    '.elixir': 'Elixir',       
    '.exs': 'Elixir Script',
    '.gleam': 'Gleam',
    '.roc': 'Roc',
    '.hx': 'Haxe',
    '.d': 'D',
    '.julia': 'Julia',
    '.jl': 'Julia',
    '.s': 'Assembly',
    '.S': 'Assembly (AT&T)',
    '.a51': 'Assembly 8051',
    '.vhd': 'VHDL',
    '.vhdl': 'VHDL',
    '.verilog': 'Verilog',
    '.sv': 'SystemVerilog',
    '.elm': 'Elm',
    '.fs': 'F#',
    '.fsx': 'F# Script',
    '.ml': 'OCaml',
    '.mli': 'OCaml Interface',
    '.rak': 'Raku',
    '.raku': 'Raku',
    '.vue': 'Vue.js',
    '.svelte': 'Svelte',
    '.astro': 'Astro',
    '.tsx': 'TypeScript React',
    '.jsx': 'JavaScript React',
    '.scss': 'SCSS',
    '.sass': 'Sass',
    '.less': 'Less',
    '.styl': 'Stylus',
    '.pug': 'Pug',
    '.ejs': 'EJS',
    '.hbs': 'Handlebars',
    '.mustache': 'Mustache',
    '.plsql': 'PL/SQL',
    '.pgsql': 'PostgreSQL',
    '.sqlite': 'SQLite',
    '.prisma': 'Prisma',
    '.dockerfile': 'Dockerfile',
    '.Dockerfile': 'Dockerfile',
    '.tf': 'Terraform',
    '.hcl': 'HCL',
    '.nomad': 'Nomad',
    '.pkr': 'Packer',
    '.ansible': 'Ansible',
    '.pp': 'Puppet', 
    '.sls': 'Serverless',
    '.k8s': 'Kubernetes',
    '.yml': 'YAML',
    '.ini': 'INI',
    '.cfg': 'Config',
    '.conf': 'Config',
    '.env': 'Environment Variables',
    '.ipynb': 'Jupyter Notebook',
    '.rmd': 'R Markdown',
    '.qmd': 'Quarto Markdown',
    '.stan': 'Stan',
    '.bug': 'BUGS',
    '.jags': 'JAGS',
    '.hlsl': 'HLSL',
    '.glsl': 'GLSL',
    '.wgsl': 'WGSL',
    '.shader': 'Shader',
    '.cg': 'Cg',
    '.unity': 'Unity Shader',
    '.uasset': 'Unreal Asset',
    '.ps1': 'PowerShell',
    '.psm1': 'PowerShell Module',
    '.psd1': 'PowerShell Data',
    '.bat': 'Batch',
    '.cmd': 'Command Prompt',
    '.vbs': 'VBScript',
    '.mjs': 'JavaScript Module',
    '.cjs': 'CommonJS',
    '.scratch': 'Scratch',
    '.sb3': 'Scratch 3',
    '.al': 'AL',
    '.abl': 'ABL',
    '.4gl': '4GL',
    '.cob': 'COBOL',
    '.cobol': 'COBOL',
    '.sol': 'Solidity',
    '.vy': 'Vyper',
    '.move': 'Move',
    '.rust': 'Rust',
    '.ino': 'Arduino',
    '.pde': 'Processing',
    '.b': 'Brainfuck',
    '.cl': 'Common Lisp', 
    '.cu': 'CUDA',
    '.hip': 'HIP',
    '.rst': 'reStructuredText',
    '.tex': 'LaTeX',
    '.ltx': 'LaTeX',
    '.bib': 'BibTeX',
    '.adoc': 'AsciiDoc',
    '.org': 'Org Mode',
    '.wiki': 'Wiki',
    '.mediawiki': 'MediaWiki',
    '.wat': 'WebAssembly Text',
    '.wast': 'WebAssembly Text',
    '.wasm': 'WebAssembly',
    '.solid': 'Solid',
    '.qml': 'QML',
    '.k': 'K',
    '.q': 'Q',
    '.j': 'J',
    '.apl': 'APL',
    '.prolog': 'Prolog',
    '.logtalk': 'Logtalk',
    '.mercury': 'Mercury',
    '.eiffel': 'Eiffel',
    '.e': 'Eiffel',
    '.idl': 'IDL',
    '.proto': 'Protocol Buffers',
    '.thrift': 'Thrift',
    '.avro': 'Avro',
    '.graphql': 'GraphQL',
    '.gql': 'GraphQL',
    '.json5': 'JSON5',
    '.jsonc': 'JSON with Comments',
    '.hjson': 'HJSON',
    '.xsd': 'XML Schema',
    '.dtd': 'DTD',
    '.sgml': 'SGML',
    '.rss': 'RSS',
    '.atom': 'Atom',
    '.pod': 'Pod',
    '.pod6': 'Pod6',
    '.p6': 'Perl 6',
    '.abap': 'ABAP',
    '.lsp': 'Lisp',
    '.scheme': 'Scheme',
    '.ss': 'Scheme',
    '.scm': 'Scheme',
    '.rkt': 'Racket',
    '.cljs': 'ClojureScript',
    '.cljc': 'Clojure Common',
    '.edn': 'EDN',
    '.groovy': 'Groovy',
    '.gvy': 'Groovy',
    '.gradle': 'Groovy (Gradle)',
    '.jenkins': 'Jenkinsfile',
    '.jenkinsfile': 'Jenkinsfile',
    '.cirrus': 'Cirrus CI',
    '.gitlab': 'GitLab CI',
    '.github': 'GitHub Actions',
    '.htm': 'HTML',
    '.xhtml': 'XHTML',
    '.svg': 'SVG',
    '.php3': 'PHP 3',
    '.php4': 'PHP 4',
    '.php5': 'PHP 5',
    '.phtml': 'PHP',
    '.ctp': 'CakePHP',
    '.twig': 'Twig',
    '.jinja': 'Jinja',
    '.jinja2': 'Jinja2',
    '.njk': 'Nunjucks',
    '.liquid': 'Liquid',
    '.erb': 'ERB',
    '.haml': 'Haml',
    '.slim': 'Slim',
    '.jade': 'Jade',
    '.dust': 'Dust.js',
    '.swig': 'Swig',
    '.eco': 'Eco',
    '.jst': 'JavaScript Template',
    '.tmpl': 'Template',
    '.tpl': 'Template',
    '.vm': 'Velocity',
    '.vtl': 'Velocity Template',
    '.ftl': 'FreeMarker',
    '.wlua': 'Lua (Web)',
    '.ijulia': 'Julia (IJulia)',
    '.mat': 'MATLAB',
    '.mex': 'MATLAB Mex',
    '.oct': 'Octave',
    '.scilab': 'Scilab',
    '.gms': 'GAMS',
    '.mod': 'MOD',
    '.f': 'Fortran',
    '.f77': 'Fortran 77',
    '.f95': 'Fortran 95',
    '.f03': 'Fortran 2003',
    '.f08': 'Fortran 2008',
    '.for': 'Fortran',
    '.ftn': 'Fortran',
    '.ccp': 'COBOL',
    '.dpr': 'Delphi',
    '.dpk': 'Delphi Package',
    '.bdsproj': 'Delphi',
    '.lpr': 'Lazarus',
    '.lpi': 'Lazarus',
    '.adb': 'Ada Body',
    '.ads': 'Ada Spec',
    '.ch': 'Ch',
    '.cxx': 'C++',
    '.hpp': 'C++ Header',
    '.hxx': 'C++ Header',
    '.cc': 'C++',
    '.c++': 'C++',
    '.h++': 'C++ Header',
    '.hh': 'C++ Header',
    '.inl': 'C++ Inline',
    '.tcc': 'C++ Template',
    '.mm': 'Objective-C++',
    '.M': 'Objective-C++',
    '.kts': 'Kotlin Script',
    '.ktm': 'Kotlin Module',
    '.R': 'R',
    '.rdata': 'R Data',
    '.rds': 'RDS',
    '.rda': 'R Data',
    '.rnw': 'R Sweave',
    '.do': 'Stata',
    '.ado': 'Stata',
    '.dta': 'Stata Data',
    '.sas': 'SAS',
    '.sas7bdat': 'SAS Data',
    '.spss': 'SPSS',
    '.sav': 'SPSS',
    '.zsav': 'SPSS',
    '.por': 'SPSS'
}
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

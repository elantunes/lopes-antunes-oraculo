// Cache de elementos DOM para evitar queries repetidas
const elementos = {
    dataHora: null,
    dataHoraHora: null,
    dataHoraDiaSemana: null,
    dataHoraData: null
};

// Formatters reutilizáveis para melhor performance
const formatadorMes = new Intl.DateTimeFormat('pt-BR', { month: 'long' });
const formatadorDiaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

function atualizarDataHora() {
    const agora = new Date();
    exibirData(agora);
    exibirDiaDaSemana(agora);
}

/**
 * Exibe a data em pt-BR (dd MMMM yyyy) no container com id "data-hora-data".
 * @param {Date} data - Data a ser exibida.
 */
function exibirData(data) {
    const ano = data.getFullYear();
    const mes = formatadorMes.format(data);
    const dia = data.getDate();
    const texto = `${dia} ${mes} ${ano}`;
    
    // Só atualiza se o conteúdo mudou
    if (elementos.dataHoraData.textContent !== texto)
        elementos.dataHoraData.textContent = texto;
}

/**
 * Exibe o dia da semana (por exemplo, "segunda") no container com id
 * "data-hora-dia-semana".
 * @param {Date} data - Data para obter o dia da semana.
 */
function exibirDiaDaSemana(data) {
    const diaSemana = formatadorDiaSemana.format(data).replace('-feira', '');
    
    // Só atualiza se o conteúdo mudou
    if (elementos.dataHoraDiaSemana.textContent !== diaSemana)
        elementos.dataHoraDiaSemana.textContent = diaSemana;
}

/**
 * Exibe a hora no formato "HH:MM" no container com id "data-hora-hora".
 * @param {Date} data - Data a partir da qual a hora será extraída.
 */

// Inicializa cache de elementos DOM
function inicializarElementos() {
    elementos.dataHora = document.querySelector('#data-hora');
    elementos.dataHoraHora = document.querySelector('#data-hora-hora');
    elementos.dataHoraDiaSemana = document.querySelector('#data-hora-dia-semana');
    elementos.dataHoraData = document.querySelector('#data-hora-data');
}

function mostrarCursor() {
    const agora = Date.now();
    
    // Throttle para mousemove - só processa se passou o tempo mínimo
    if (agora - ultimaAtualizacaoCursor < throttleCursor)
        return;

    ultimaAtualizacaoCursor = agora;

    // Só manipula DOM se necessário
    if (document.body.classList.contains('cursor-hidden'))
        document.body.classList.remove('cursor-hidden');
    
    clearTimeout(timeoutCursor);
    timeoutCursor = setTimeout(ocultarCursor, tempoInatividadeCursor);
}

function ocultarCursor() {
    // Só manipula DOM se necessário
    if (!document.body.classList.contains('cursor-hidden')) {
        document.body.classList.add('cursor-hidden');
        console.log('Cursor ocultado por inatividade');
    }
}

/**
 * Posiciona o container com id "data-hora" em uma posição aleatória na janela.
 * A posição é escolhida de forma a garantir que o container caiba inteiramente na
 * janela e esteja visível.
 */
function posicionarDataHoraAleatoriamente() {
    const retangulo = elementos.dataHora.getBoundingClientRect();
    elementos.dataHora.style.top = `${Math.floor(Math.random() * (innerHeight - retangulo.height))}px`;
    elementos.dataHora.style.left = `${Math.floor(Math.random() * (innerWidth - retangulo.width))}px`;
}

// Controle de cursor
const segundo = 1000;
const minuto = segundo * 60;
const intervaloAtulizacaoDataHora = segundo * 20;
const intervaloReposicionamento = minuto * 10; // 10 minutos
const tempoInatividadeCursor = minuto * 5; // 5 minutos

let timeoutCursor;
let ultimaAtualizacaoCursor = 0;
const throttleCursor = 100; // Throttle de 100ms para mousemove

// Relógio digital com animação
const teste = false;

function animateDigit(el, newChar){
    const current = el.getAttribute('data-value') ?? '';
    
    if(current === newChar) return;
    
    el.innerHTML = '';
    
    const oldPanel = document.createElement('div');
    oldPanel.className = 'panel old';
    const oldSpan = document.createElement('span');
    oldSpan.textContent = (current === '') ? newChar : current;
    oldPanel.appendChild(oldSpan);
    
    const newPanel = document.createElement('div');
    newPanel.className = 'panel new';
    const newSpan = document.createElement('span');
    newSpan.textContent = newChar;
    newPanel.appendChild(newSpan);
    
    el.appendChild(oldPanel);
    el.appendChild(newPanel);
    
    void el.offsetWidth;
    
    if(current === ''){
        oldPanel.classList.remove('old');
        oldPanel.classList.add('panel');
        el.setAttribute('data-value', newChar);
        newPanel.style.display = 'none';
        return;
    }
    
    oldPanel.classList.add('flip');
    newPanel.classList.add('flip');
    
    setTimeout(()=>{
        el.innerHTML = `<div class="panel old"><span>${newChar}</span></div>`;
        el.setAttribute('data-value', newChar);
    }, 430);
}

function tick(){
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    
    animateDigit(document.getElementById('h1'), h[0]);
    animateDigit(document.getElementById('h2'), h[1]);
    
    animateDigit(document.getElementById('m1'), m[0]);
    animateDigit(document.getElementById('m2'), m[1]);
    
    animateDigit(document.getElementById('s1'), s[0]);
    animateDigit(document.getElementById('s2'), s[1]);
}

function initClock(){
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    
    let ids = [];
    
    if (!teste)
        ids = ['h1', 'h2', 'm1', 'm2'];
    else
        ids = ['h1', 'h2', 'm1', 'm2', 's1', 's2'];
    
    let vals = [];
    
    if (!teste)
        vals = [h[0], h[1], m[0], m[1]];
    else
        vals = [h[0], h[1], m[0], m[1], s[0], s[1]];
    
    ids.forEach((id,i)=>{
        const el = document.getElementById(id);
        if (el) {
            el.setAttribute('data-value', vals[i]);
            el.innerHTML = `<div class="panel old"><span>${vals[i]}</span></div>`;
        }
    });
    
    setInterval(tick, 1000);
}

// Inicialização
(function init() {
    // Eventos que indicam interação do usuário
    // mousemove precisa de throttle especial
    let throttleTimeout;
    document.addEventListener('mousemove', () => {
        if (!throttleTimeout)
            throttleTimeout = setTimeout(() => {
                mostrarCursor();
                throttleTimeout = null;
            }, throttleCursor);
    }, { passive: true });

    // Outros eventos não precisam de throttle
    const outrosEventos = ['mousedown', 'mouseup', 'click', 'touchstart', 'touchmove', 'keydown', 'scroll'];
    outrosEventos.forEach(evento => {
        document.addEventListener(evento, mostrarCursor, { passive: true });
    });

    // Inicia o timeout para ocultar o cursor após o tempo de inatividade
    timeoutCursor = setTimeout(ocultarCursor, tempoInatividadeCursor);

    // Inicializa elementos DOM antes de usar
    inicializarElementos();
    atualizarDataHora();
    
    // Inicializa o relógio digital
    initClock();

    setInterval(atualizarDataHora, intervaloAtulizacaoDataHora);
    setInterval(posicionarDataHoraAleatoriamente, intervaloReposicionamento);
})();

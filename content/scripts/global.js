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
    exibirHora(agora);
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

function exibirHora(data) {
    const hora = data.toTimeString().slice(0, 5);
    
    // Só atualiza se o conteúdo mudou
    if (elementos.dataHoraHora.textContent !== hora)
        elementos.dataHoraHora.textContent = hora;
}

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
const intervaloReposicionamento = minuto * 5;
const tempoInatividadeCursor = minuto * .1; // 5 minutos

let timeoutCursor;
let ultimaAtualizacaoCursor = 0;
const throttleCursor = 100; // Throttle de 100ms para mousemove

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

    setInterval(atualizarDataHora, intervaloAtulizacaoDataHora);
    setInterval(posicionarDataHoraAleatoriamente, intervaloReposicionamento);
})();

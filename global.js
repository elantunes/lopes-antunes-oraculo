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

/**
 * Posiciona o container com id "data-hora" em uma posição aleatória na janela.
 * A posição é escolhida de forma a garantir que o container caiba inteiramente na
 * janela e esteja visível.
 */
function posicionarDataHoraAleatoriamente() {
    const retangulo = elementos.dataHora.getBoundingClientRect();
    elementos.dataHora.style.top = `${Math.floor(Math.random() * (window.innerHeight - retangulo.height))}px`;
    elementos.dataHora.style.left = `${Math.floor(Math.random() * (window.innerWidth - retangulo.width))}px`;
}

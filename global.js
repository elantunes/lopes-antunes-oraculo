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
    const mes = data.toLocaleString('pt-BR', { month: 'long' });
    const dia = data.getDate();
    document.querySelector('#data-hora-data').innerHTML = `${dia} ${mes} ${ano}`;
}


/**
 * Exibe o dia da semana (por exemplo, "segunda") no container com id
 * "data-hora-dia-semana".
 * @param {Date} data - Data para obter o dia da semana.
 */
function exibirDiaDaSemana(data) {
    const diaSemana = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(data).replace('-feira', '');
    document.querySelector('#data-hora-dia-semana').textContent = diaSemana;
}


/**
 * Exibe a hora no formato "HH:MM" no container com id "data-hora-hora".
 * @param {Date} data - Data a partir da qual a hora será extraída.
 */

function exibirHora(data) {
    document.querySelector('#data-hora-hora').innerHTML = data.toTimeString().slice(0, 5);
}


/**
 * Posiciona o container com id "data-hora" em uma posição aleatória na janela.
 * A posição é escolhida de forma a garantir que o container caiba inteiramente na
 * janela e esteja visível.
 */
function posicionarDataHoraAleatoriamente() {
    const elem = document.querySelector('#data-hora');
    const retangulo = elem.getBoundingClientRect();
    elem.style.top = `${Math.floor(Math.random() * (window.innerHeight - retangulo.height))}px`;
    elem.style.left = `${Math.floor(Math.random() * (window.innerWidth - retangulo.width))}px`;
}

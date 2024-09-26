let currentIndex = 0;
const cardsPerPage = 5;
let rhythms = []; // Inicializa um array vazio para os ritmos

async function loadRhythms() {
    const response = await fetch('data/ritmos.json'); // Carrega o arquivo JSON
    rhythms = await response.json(); // Converte a resposta em JSON e armazena no array
    displayCards(currentIndex); // Exibe os cards após o carregamento
}

function displayCards(startIndex) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Limpa os cards anteriores

    // Exibe os próximos 5 ritmos
    for (let i = startIndex; i < startIndex + cardsPerPage && i < rhythms.length; i++) {
        const rhythm = rhythms[i];
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${rhythm.nome}</h3>
            <p><strong>Descrição:</strong> ${rhythm.descricao}</p>
            <p><strong>Visualização:</strong> ${rhythm.visualizacao}</p>
            <p><strong>Exemplo de música:</strong> ${rhythm.exemplo}</p>
            <p><strong>Observação:</strong> ${rhythm.observacao}</p>
        `;
        cardContainer.appendChild(card);
    }

    // Atualiza o estado dos botões
    document.getElementById('prev').disabled = startIndex === 0;
    document.getElementById('next').disabled = startIndex + cardsPerPage >= rhythms.length;
}

// Carrega os ritmos ao inicializar a página
loadRhythms();

// Função para navegação
document.getElementById('next').addEventListener('click', function() {
    currentIndex += cardsPerPage;
    displayCards(currentIndex);
});

document.getElementById('prev').addEventListener('click', function() {
    currentIndex -= cardsPerPage;
    displayCards(currentIndex);
});

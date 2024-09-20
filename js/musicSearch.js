let musicDatabase = [];

// Função para carregar o banco de dados de músicas
async function loadMusicDatabase() {
    try {
        const response = await fetch('data/musicDatabase.json'); // Ajuste o caminho conforme necessário
        if (!response.ok) {
            throw new Error('Erro ao carregar o banco de dados');
        }
        musicDatabase = await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Função para pesquisar músicas
async function searchSong() {
    const searchQuery = document.getElementById('search').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Limpa resultados anteriores

    if (searchQuery) {
        // Filtra músicas que correspondem à pesquisa
        const filteredSongs = musicDatabase.filter(song => song.title.toLowerCase().includes(searchQuery));

        if (filteredSongs.length > 0) {
            filteredSongs.forEach(song => {
                const songElement = createSongElement(song);
                resultsContainer.appendChild(songElement);
            });
            openModal('results-modal'); // Abre o modal quando houver resultados
        } else {
            resultsContainer.innerHTML = '<p class="alert-red">Nenhuma música encontrada.</p>';
            openModal('results-modal'); // Abre o modal mesmo que não haja resultados
        }
    } else {
        resultsContainer.innerHTML = '<p class="alert-yellow">Por favor, digite um termo de busca.</p>';
        openModal('results-modal'); // Abre o modal se a consulta estiver vazia
    }
}

// Função para exibir músicas por categoria
function displayCategorySongs(category) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Limpa resultados anteriores

    const filteredSongs = musicDatabase.filter(song => song.category.toLowerCase() === category.toLowerCase());
    if (filteredSongs.length > 0) {
        const table = document.createElement('table');
        const tableHeader = `
            <thead>
                <tr>
                    <th>MÚSICA</th>
                    <th>TOM</th>
                </tr>
            </thead>`;
        table.innerHTML = tableHeader;

        const tableBody = document.createElement('tbody');
        filteredSongs.forEach(song => {
            const songRow = document.createElement('tr');
            songRow.innerHTML = `
                <td class="clickable-song">${song.title}</td>
                <td>${song.key}</td>`;
            tableBody.appendChild(songRow);
        });

        table.appendChild(tableBody);

        const tableFooter = document.createElement('tfoot');
        tableFooter.innerHTML = `
            <tr>
                <th>Total de músicas</th>
                <td>${filteredSongs.length}</td>
            </tr>`;
        table.appendChild(tableFooter);

        searchResults.appendChild(table);

        // Adiciona event listeners após criar a tabela
        const clickableSongs = document.querySelectorAll('.clickable-song');
        clickableSongs.forEach((element, index) => {
            element.addEventListener('click', () => {
                const song = filteredSongs[index];
                const songElement = createSongElement(song);
                searchResults.innerHTML = ''; // Limpa os resultados da tabela
                searchResults.appendChild(songElement);
            });
        });
    } else {
        searchResults.innerHTML = '<p class="alert-red">Nenhuma música encontrada.</p>';
    }

    // Abre o modal com as músicas da categoria
    openModal('category-modal'); // Use o ID do modal correto aqui
}

// Função para abrir o modal
function openModal(modalId) {
    closeModal(); // Fecha qualquer modal aberto antes de abrir um novo
    document.getElementById(modalId).style.display = "block";
}

// Função para fechar o modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = "none");
}

// Função para criar um elemento de música
function createSongElement(song) {
    const songElement = document.createElement('div');
    songElement.className = 'song-result'; // Adiciona uma classe para estilização
    songElement.innerHTML = `
        <h3>${song.title}</h3>
        <p>Tom: ${song.key}</p>
        ${song.options.option1 ? `<p>Opção 1: ${song.options.option1}</p>` : ''}
        ${song.options.option2 ? `<p>Opção 2: ${song.options.option2}</p>` : ''}
        ${song.options.fingerpicking ? `<p>Dedilhado: ${song.options.fingerpicking}</p>` : ''}
        ${song.options.rhythm ? `<p>Rítmo: ${song.options.rhythm}</p>` : ''}
        ${song.options.refrain_rhythm ? `<p>Rítmo do refrão: ${song.options.refrain_rhythm}</p>` : ''}
        ${song.options.verse_rhythm ? `<p>Rítmo da estrofe: ${song.options.verse_rhythm}</p>` : ''}
        <div>${song.content}</div>
    `;
    return songElement;
}

// Evento para carregar o banco de dados ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    await loadMusicDatabase(); // Carrega o banco de dados
});

// Função para abrir o modal da categoria ao clicar no botão
function openCategoryModal(category) {
    displayCategorySongs(category); // Exibe as músicas da categoria no modal
}

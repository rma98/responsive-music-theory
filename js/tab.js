let tabs = {};
let currentTab = '';
let currentPart = 0;

// Carregar dados das músicas do JSON
async function loadMusicData() {
    const response = await fetch('data/musicas.json');
    const data = await response.json();
    tabs = data;
    populateSongSelector();
    updateTab();
}

// Preencher o seletor de músicas
function populateSongSelector() {
    const songSelect = document.getElementById('song');
    songSelect.innerHTML = '';

    Object.keys(tabs).forEach(song => {
        const option = document.createElement('option');
        option.value = song;
        option.textContent = tabs[song].name;
        songSelect.appendChild(option);
    });

    songSelect.addEventListener('change', (event) => {
        currentTab = event.target.value;
        currentPart = 0;
        updateTab();
    });

    currentTab = songSelect.value;
}

// Atualizar a exibição da TAB
function updateTab() {
    const tabContainer = document.getElementById('tab-container');
    tabContainer.innerHTML = '';

    if (tabs[currentTab] && tabs[currentTab].tabs[currentPart]) {
        tabs[currentTab].tabs[currentPart].forEach(line => {
            const tabLine = document.createElement('div');
            tabLine.className = 'tab-line';
            tabLine.textContent = line;
            tabContainer.appendChild(tabLine);
        });
        document.getElementById('current-part').textContent = `Parte ${currentPart + 1}`;
    }
}

// Navegação entre partes
document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPart < tabs[currentTab].tabs.length - 1) {
        currentPart++;
        updateTab();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPart > 0) {
        currentPart--;
        updateTab();
    }
});

// Inicializar
loadMusicData();

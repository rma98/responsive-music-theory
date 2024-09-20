const tonalidades = {
  "C": ["1º C", "2º Dm", "3º Em", "4º F", "5º G", "6º Am", "7º B°"],
  "D": ["1º D", "2º Em", "3º F#m", "4º G", "5º A", "6º Bm", "7º C#°"],
  "E": ["1º E", "2º F#m", "3º G#m", "4º A", "5º B", "6º C#m", "7º D#°"],
  "F": ["1º F", "2º Gm", "3º Am", "4º Bb", "5º C", "6º Dm", "7º E°"],
  "G": ["1º G", "2º Am", "3º Bm", "4º C", "5º D", "6º Em", "7º F#°"],
  "A": ["1º A", "2º Bm", "3º C#m", "4º D", "5º E", "6º F#m", "7º G#°"],
  "B": ["1º B", "2º C#m", "3º D#m", "4º E", "5º F#", "6º G#m", "7º A#°"]
};

const campoHarmonicoDiv = document.getElementById("campoHarmonico");
const tonalidadeSelect = document.getElementById("tonalidadeSelect");
const escalaSelect = document.getElementById("escalaSelect");
const toggleViewCheckbox = document.getElementById("toggleView");
const toggleButton = document.getElementById('toggleMode');
let darkMode = false;

function carregarCampoHarmonico(tonalidade) {
  const acordes = tonalidades[tonalidade];
  const classificacoes = [
    "Tônica", 
    "Subdominante menor", 
    "Mediante", 
    "Subdominante", 
    "Dominante", 
    "Tônica menor relativa", 
    "Subtônica diminuta"
  ];

  if (toggleViewCheckbox.checked) {
    carregarCampoHarmonicoSequencial(acordes, classificacoes);
  } else {
    carregarCampoHarmonicoNormal(acordes, classificacoes);
  }
}

function carregarCampoHarmonicoNormal(acordes, classificacoes) {
  let acordesMaiores = `<div class="acordes-maiores"><h3>Acordes Maiores</h3><ul>`;
  let acordesMenores = `<div class="acordes-menores"><h3>Acordes Menores</h3><ul>`;
  let acordeDiminuto = `<div class="acorde-diminuto"><h3>Acorde Diminuto</h3><ul>`;

  acordes.forEach((acorde, index) => {
    if (index === 6) {
      acordeDiminuto += `<li>${acorde} - ${classificacoes[index]}</li>`;
    } else if (index % 2 === 0) {
      acordesMaiores += `<li>${acorde} - ${classificacoes[index]}</li>`;
    } else {
      acordesMenores += `<li>${acorde} - ${classificacoes[index]}</li>`;
    }
  });

  acordesMaiores += `</ul></div>`;
  acordesMenores += `</ul></div>`;
  acordeDiminuto += `</ul></div>`;

  campoHarmonicoDiv.innerHTML = acordesMaiores + acordesMenores + acordeDiminuto;
}

function carregarCampoHarmonicoSequencial(acordes, classificacoes) {
  campoHarmonicoDiv.innerHTML = "";
  acordes.forEach((acorde, index) => {
    const acordeElemento = document.createElement("div");
    acordeElemento.classList.add(index === 6 ? "acorde-diminuto" : index % 2 === 0 ? "acordes-maiores" : "acordes-menores");
    acordeElemento.innerHTML = `<h3>${acorde}</h3><ul><li>${classificacoes[index]}</li></ul>`;
    campoHarmonicoDiv.appendChild(acordeElemento);
  });
}

// Nova função para carregar a escala
function carregarEscala(escala) {
  const outputDiv = document.getElementById('campoHarmonico');
  outputDiv.innerHTML = ''; // Limpa o conteúdo anterior

  if (escala === 'maior') {
    outputDiv.innerHTML = `
      <div class="escala-container escala-maior">
        <h3>Escala Maior</h3>
        <p>A escala maior é composta pelos acordes: I, ii, iii, IV, V, vi, vii°.</p>
        <ul>
          <li>I - Tônica</li>
          <li>ii - Supertônica</li>
          <li>iii - Mediante</li>
          <li>IV - Subdominante</li>
          <li>V - Dominante</li>
          <li>vi - Submediante</li>
          <li>vii° - Sensível</li>
        </ul>
      </div>
    `;
  } else if (escala === 'menor') {
    outputDiv.innerHTML = `
      <div class="escala-container escala-menor">
        <h3>Escala Menor</h3>
        <p>A escala menor é composta pelos acordes: i, ii°, III, iv, v, VI, VII.</p>
        <ul>
          <li>i - Tônica menor</li>
          <li>ii° - Supertônica diminuta</li>
          <li>III - Mediante maior</li>
          <li>iv - Subdominante menor</li>
          <li>v - Dominante menor</li>
          <li>VI - Submediante maior</li>
          <li>VII - Sensível maior</li>
        </ul>
      </div>
    `;
  } else if (escala === 'pentatonica') {
    outputDiv.innerHTML = `
      <div class="escala-container escala-pentatonica">
        <h3>Escala Pentatônica</h3>
        <p>A escala pentatônica é composta por cinco notas e é amplamente utilizada em várias músicas.</p>
        <ul>
          <li>Notas da escala pentatônica maior: I, II, III, V, VI</li>
          <li>Notas da escala pentatônica menor: i, III, IV, V, VII</li>
        </ul>
      </div>
    `;
  }
}

// Evento de mudança de tonalidade
tonalidadeSelect.addEventListener("change", (event) => {
  carregarCampoHarmonico(event.target.value);
});

// Evento de mudança de escala
escalaSelect.addEventListener("change", (event) => {
  carregarEscala(event.target.value);
});

// Evento para alternar a visão sequencial
toggleViewCheckbox.addEventListener("change", () => {
  carregarCampoHarmonico(tonalidadeSelect.value);
});

// Alternar modo claro/escuro
toggleButton.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  document.querySelector('.fa-sun').classList.toggle('hidden', darkMode);
  document.querySelector('.fa-moon').classList.toggle('hidden', !darkMode);
});

// Carregar o campo harmônico inicial
carregarCampoHarmonico(tonalidadeSelect.value);

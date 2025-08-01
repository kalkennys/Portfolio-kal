// Referências do DOM
const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restart-button');
const victoryScreen = document.getElementById('victory-screen');
const finalMoves = document.getElementById('final-moves');
const finalTime = document.getElementById('final-time');
const closeVictory = document.getElementById('close-victory');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Símbolos do jogo
const symbols = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻'];

// Estado do jogo
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let time = 0;
let timer = null;

// ======================
// 1. Modo Escuro
// ======================
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️ Modo Claro';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️ Modo Claro';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌓 Modo Escuro';
  }
});

// ======================
// 2. Embaralhar
// ======================
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// ======================
// 3. Criar Grade
// ======================
function createGrid() {
  grid.innerHTML = '';
  cards = shuffle([...symbols, ...symbols]);
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  movesDisplay.textContent = moves;

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${symbol}</div>
        <div class="card-back"></div>
      </div>
    `;

    card.addEventListener('click', () => flipCard(card));
    grid.appendChild(card);
  });
}

// ======================
// 4. Virar Carta
// ======================
function flipCard(card) {
  if (flippedCards.length === 2) return;

  const id = card.dataset.id;
  const symbol = cards[id];

  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  flippedCards.push({ card, symbol, id });

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    const [first, second] = flippedCards;
    if (first.symbol === second.symbol) {
      // Par correto
      setTimeout(() => {
        first.card.classList.add('matched');
        second.card.classList.add('matched');
        flippedCards = [];
        matchedPairs++;

        if (matchedPairs === symbols.length) {
          endGame();
        }
      }, 600);
    } else {
      // Par errado
      setTimeout(() => {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
        flippedCards = [];
      }, 800);
    }
  }
}

// ======================
// 5. Temporizador
// ======================
function startTimer() {
  clearInterval(timer);
  time = 0;
  timeDisplay.textContent = time;
  timer = setInterval(() => {
    time++;
    timeDisplay.textContent = time;
  }, 1000);
}

// ======================
// 6. Fim do Jogo
// ======================
function endGame() {
  clearInterval(timer);
  finalMoves.textContent = moves;
  finalTime.textContent = time;
  victoryScreen.classList.remove('hidden');
}

// ======================
// 7. Reiniciar
// ======================
function restart() {
  victoryScreen.classList.add('hidden');
  createGrid();
  startTimer();
}

// ======================
// 8. Eventos
// ======================
restartButton.addEventListener('click', restart);
closeVictory.addEventListener('click', restart);

// ======================
// 9. Iniciar
// ======================
window.onload = () => {
  createGrid();
  startTimer();
};
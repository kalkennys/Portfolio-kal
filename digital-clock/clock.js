// ======================
// 1. Referências do DOM
// ======================
const clockDisplay = document.getElementById('clock');
const dateDisplay = document.getElementById('date');
const toggleFormatButton = document.getElementById('toggle-format');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// ======================
// 2. Modo Escuro
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
// 3. Configuração do Relógio
// ======================
let is24Hour = true;

// Atualiza o formato no botão
function updateToggleButtonText() {
  toggleFormatButton.textContent = is24Hour 
    ? 'Alternar para 12h' 
    : 'Alternar para 24h';
}

toggleFormatButton.addEventListener('click', () => {
  is24Hour = !is24Hour;
  updateToggleButtonText();
  updateClock(); // Atualiza imediatamente
});

// ======================
// 4. Função para Atualizar o Relógio
// ======================
function updateClock() {
  const now = new Date();

  // Formato de hora
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  let period = '';

  if (!is24Hour) {
    period = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 -> 12
  }

  const hourStr = is24Hour ? String(hours).padStart(2, '0') : String(hours);
  clockDisplay.textContent = `${hourStr}:${minutes}:${seconds}${period}`;

  // Data
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  dateDisplay.textContent = now.toLocaleDateString('pt-BR', options)
    .replace(/^\w/, c => c.toUpperCase()); // Primeira letra maiúscula
}

// ======================
// 5. Iniciar
// ======================
updateToggleButtonText();
updateClock();
setInterval(updateClock, 1000);
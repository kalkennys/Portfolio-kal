// ======================
// 1. Modo Escuro / Claro
// ======================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica preferência salva
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
// 2. Animações ao Rolar (Scroll Reveal)
// ======================
const sections = document.querySelectorAll('.animation-section[data-animation="fade-in"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// ======================
// 3. Transição de Cores
// ======================
const colorBox = document.getElementById('color-transition');
const toggleColorButton = document.getElementById('toggle-color');
let colorState = 0;

toggleColorButton.addEventListener('click', () => {
  // Remove todas as classes de cor
  colorBox.classList.remove('color-red', 'color-green');
  
  colorState++;
  if (colorState === 1) {
    colorBox.classList.add('color-red');
    toggleColorButton.textContent = 'Mudar para Verde';
  } else if (colorState === 2) {
    colorBox.classList.add('color-green');
    toggleColorButton.textContent = 'Mudar para Azul';
  } else {
    colorState = 0;
    toggleColorButton.textContent = 'Alterar Cor';
  }
});

// ======================
// 4. Animação de Elementos (Slide + Rotate)
// ======================
const elementBox = document.getElementById('element-animation');
let isAnimating = false;

document.getElementById('start-animation').addEventListener('click', () => {
  if (!isAnimating) {
    elementBox.style.animation = 'slideAndRotate 2s ease-in-out infinite';
    document.getElementById('start-animation').textContent = 'Parar Animação';
    isAnimating = true;
  } else {
    elementBox.style.animation = 'none';
    document.getElementById('start-animation').textContent = 'Iniciar Animação';
    isAnimating = false;
  }
});

/* Mova o bloco @keyframes slideAndRotate para seu arquivo CSS */

// ======================
// 5. Animação de Pulsar
// ======================
const pulseBox = document.getElementById('pulse-animation');
const pulseButton = document.getElementById('toggle-pulse');
let pulsing = true;

pulseButton.addEventListener('click', () => {
  if (pulsing) {
    pulseBox.classList.remove('pulse');
    pulseButton.textContent = 'Iniciar Pulsar';
  } else {
    pulseBox.classList.add('pulse');
    pulseButton.textContent = 'Parar Pulsar';
  }
  pulsing = !pulsing;
});

// ======================
// 6. Animação de Girar
// ======================
const rotateBox = document.getElementById('rotate-animation');
const rotateButton = document.getElementById('toggle-rotate');
let rotating = false;

rotateButton.addEventListener('click', () => {
  if (!rotating) {
    rotateBox.classList.add('rotate');
    rotateButton.textContent = 'Parar Giro';
  } else {
    rotateBox.classList.remove('rotate');
    rotateButton.textContent = 'Iniciar Giro';
  }
  rotating = !rotating;
});

// ======================
// 7. Animação de Fade
// ======================
const fadeBox = document.getElementById('fade-animation');
const fadeButton = document.getElementById('toggle-fade');
let faded = false;

fadeButton.addEventListener('click', () => {
  if (faded) {
    fadeBox.classList.remove('hide');
    fadeButton.textContent = 'Alternar Fade';
  } else {
    fadeBox.classList.add('hide');
    fadeButton.textContent = 'Mostrar';
  }
  faded = !faded;
}); 
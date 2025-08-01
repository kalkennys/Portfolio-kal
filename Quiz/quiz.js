// ======================
// 1. Perguntas do Quiz
// ======================
const questions = [
  {
    question: "Qual é a linguagem usada para estilizar páginas web?",
    options: ["HTML", "JavaScript", "CSS", "Python"],
    correct: 2
  },
  {
    question: "Qual destes NÃO é um elemento de bloco em HTML?",
    options: ["<div>", "<p>", "<span>", "<header>"],
    correct: 2
  },
  {
    question: "Qual é a extensão do CSS?",
    options: [".html", ".js", ".css", ".web"],
    correct: 2
  },
  {
    question: "O que significa 'HTML'?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    correct: 0
  },
  {
    question: "Qual é a função principal do JavaScript?",
    options: ["Estilizar sites", "Criar banco de dados", "Adicionar interatividade", "Criar layouts"],
    correct: 2
  },
  {
    question: "Qual tag HTML é usada para links?",
    options: ["<img>", "<a>", "<p>", "<div>"],
    correct: 1
  },
  {
    question: "O que é 'responsivo' em web design?",
    options: ["Site rápido", "Site que se adapta a telas", "Site colorido", "Site com animações"],
    correct: 1
  },
  {
    question: "Qual ferramenta é usada para controle de versão?",
    options: ["VS Code", "GitHub", "Chrome", "Figma"],
    correct: 1
  },
  {
    question: "Qual é a cor do céu em um dia claro?",
    options: ["Verde", "Vermelho", "Azul", "Amarelo"],
    correct: 2
  },
  {
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
    correct: 2
  }
];

// ======================
// 2. Referências do DOM
// ======================
const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next-question');
const resultContainer = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const currentQuestionSpan = document.getElementById('current');
const totalQuestionSpan = document.getElementById('total');
const feedback = document.getElementById('feedback');

// ======================
// 3. Variáveis do Quiz
// ======================
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

// ======================
// 4. Modo Escuro
// ======================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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
// 5. Iniciar Quiz
// ======================
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.disabled = true;
  resultContainer.classList.add('hidden');
  showQuestion();
}

// ======================
// 6. Mostrar Pergunta
// ======================
function showQuestion() {
  const question = questions[currentQuestionIndex];
  quizContainer.innerHTML = '';

  const questionElement = document.createElement('div');
  questionElement.classList.add('question-container', 'fade-in');

  const title = document.createElement('h2');
  title.textContent = question.question;
  questionElement.appendChild(title);

  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('options');

  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => selectOption(optionElement, index));
    optionsContainer.appendChild(optionElement);
  });

  questionElement.appendChild(optionsContainer);
  quizContainer.appendChild(questionElement);

  // Atualiza contador
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  totalQuestionSpan.textContent = questions.length;
  totalQuestionsSpan.textContent = questions.length;

  selectedOptionIndex = null;
}

// ======================
// 7. Selecionar Alternativa
// ======================
function selectOption(element, index) {
  if (selectedOptionIndex !== null) return;

  selectedOptionIndex = index;
  const options = document.querySelectorAll('.option');
  options.forEach(opt => opt.classList.remove('selected'));
  element.classList.add('selected');
  nextButton.disabled = false;
}

// ======================
// 8. Próxima Pergunta
// ======================
nextButton.addEventListener('click', () => {
  const options = document.querySelectorAll('.option');
  const correctIndex = questions[currentQuestionIndex].correct;

  // Mostra feedback visual
  options.forEach((opt, index) => {
    if (index === correctIndex) {
      opt.classList.add('correct');
    } else if (index === selectedOptionIndex && index !== correctIndex) {
      opt.classList.add('incorrect');
    }
  });

  if (selectedOptionIndex === correctIndex) {
    score++;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
});

// ======================
// 9. Mostrar Resultado
// ======================
function showResult() {
  quizContainer.innerHTML = '';
  nextButton.disabled = true;
  scoreSpan.textContent = score;

  // Feedback personalizado
  let message = '';
  if (score === questions.length) {
    message = "Parabéns! Você acertou todas! 🎉";
  } else if (score >= questions.length * 0.7) {
    message = "Ótimo trabalho! Você sabe bastante! 👏";
  } else if (score >= questions.length * 0.5) {
    message = "Bom! Você está no caminho certo! 💪";
  } else {
    message = "Continue estudando! Você vai melhorar! 📚";
  }

  feedback.textContent = message;
  resultContainer.classList.remove('hidden');
  resultContainer.style.opacity = 0;
  resultContainer.style.transform = 'translateY(20px)';
  setTimeout(() => {
    resultContainer.style.opacity = 1;
    resultContainer.style.transform = 'translateY(0)';
  }, 100);
}

// ======================
// 10. Iniciar ao carregar
// ======================
startQuiz();
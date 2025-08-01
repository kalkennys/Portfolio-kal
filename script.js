// ======================
// 1. Troca de Tema Claro/Escuro
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
// 2. Animação ao Rolar a Página (Scroll Reveal)
// ======================
const sections = document.querySelectorAll('section');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// ======================
// 3. Formulário de Contato
// ======================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Aqui você pode integrar com EmailJS, Formspree, etc.
  // Por enquanto, apenas simula o envio
  alert('Mensagem enviada com sucesso! (Em breve integrado com e-mail real)');
  contactForm.reset();
});

// ======================
// 4. Smooth Scroll para Links de Navegação
// ======================
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});
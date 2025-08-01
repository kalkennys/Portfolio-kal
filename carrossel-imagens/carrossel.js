const images = [
  'https://placehold.co/800x400/3498db/ffffff?text=Imagem+1',
  'https://placehold.co/800x400/e74c3c/ffffff?text=Imagem+2',
  'https://placehold.co/800x400/2ecc71/ffffff?text=Imagem+3',
  'https://placehold.co/800x400/f39c12/ffffff?text=Imagem+4',
  'https://placehold.co/800x400/9b59b6/ffffff?text=Imagem+5'
];

let currentSlide = 0;

function createCarousel() {
  const slides = document.getElementById('slides');
  const dots = document.getElementById('dots');
  slides.innerHTML = '';
  dots.innerHTML = '';

  images.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    if (index === 0) slide.classList.add('active');
    slide.style.backgroundImage = `url(${img})`;
    slides.appendChild(slide);

    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function goToSlide(n) {
  currentSlide = n;
  updateSlides();
  updateDots();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % images.length;
  updateSlides();
  updateDots();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + images.length) % images.length;
  updateSlides();
  updateDots();
}

function updateSlides() {
  document.querySelectorAll('.slide').forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
}

window.onload = createCarousel;
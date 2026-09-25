const slider = document.querySelector('.row-slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dots = document.querySelectorAll('.controls svg');

let currentSlide = 0;
let touchStartX = 0;

const updateDots = () => {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
};

const showSlide = (index) => {
    currentSlide = (index + dots.length) % dots.length;

    slider.scrollTo({
        left: slider.clientWidth * currentSlide,
        behavior: 'smooth'
    });

    updateDots();
};

prev.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

next.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

slider.addEventListener('scroll', () => {
    const visibleSlide = Math.round(slider.scrollLeft / slider.clientWidth);

    if (visibleSlide !== currentSlide) {
        currentSlide = visibleSlide;
        updateDots();
    }
});

slider.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

slider.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 40) {
        return;
    }

    if (currentSlide === 0 && swipeDistance > 0) {
        showSlide(dots.length - 1);
    }

    if (currentSlide === dots.length - 1 && swipeDistance < 0) {
        showSlide(0);
    }
}, { passive: true });

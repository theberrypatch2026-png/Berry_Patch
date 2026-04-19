// Loading Screen Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 2000);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        if (!document.body.classList.contains('process-page')) {
            navbar?.classList.remove('scrolled');
        }
    }
});

// Intersection Observer for Reveal Animations
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Hero Carousel Logic
const carousel = document.getElementById('hero-carousel');
if (carousel) {
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        items[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (index + items.length) % items.length;
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetInterval();
        });
    });

    function startInterval() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    startInterval();
}

// Check if we are on process page to keep navbar scrolled
if (window.location.pathname.includes('process.html')) {
    document.body.classList.add('process-page');
    navbar?.classList.add('scrolled');
}

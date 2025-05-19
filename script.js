document.addEventListener('DOMContentLoaded', () => {
    
    window.addEventListener('scroll', () => {
        document.body.classList.toggle('scrolled', window.scrollY > 100);
    });

    
    const videoSection = document.querySelector('.bike-slide');
    const iframe = videoSection.querySelector('iframe');
    const loading = videoSection.querySelector('.video-loading');
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            if (!iframe.src) {
                iframe.src = iframe.dataset.src + '?autoplay=1';
                loading.classList.add('active');
                iframe.onload = () => loading.classList.remove('active');
            }
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(videoSection);

    
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let autoPlayInterval = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
            dots[i].setAttribute('aria-selected', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(Number(dot.dataset.slide));
            stopAutoPlay();
            startAutoPlay();
        });
    });
    document.querySelector('.slideshow-container').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.slideshow-container').addEventListener('mouseleave', startAutoPlay);

        document.querySelector('.slideshow-container').addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.addEventListener('error', () => {
            img.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
            img.alt = 'Fallback Image';
        });
    });

    
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoPlay();
    } else {
        console.error('No slides found in slideshow.');
    }
});

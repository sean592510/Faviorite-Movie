document.addEventListener('DOMContentLoaded', () => {
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    
    const videoSection = document.querySelector('.bike-slide');
    const iframe = videoSection.querySelector('iframe');
    let hasPlayed = false;
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !hasPlayed) {
            const src = iframe.src.includes('autoplay=1') ? iframe.src : iframe.src + '?autoplay=1';
            iframe.src = src;
            hasPlayed = true;
        }
    }, { threshold: 0.5 });
    observer.observe(videoSection);

    
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let autoPlayInterval = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }


    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    document.querySelector('.slideshow-container').addEventListener('mouseenter', stopAutoPlay);
    document.querySelector('.slideshow-container').addEventListener('mouseleave', startAutoPlay);

  
    showSlide(currentSlide);
    startAutoPlay();
});

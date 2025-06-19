// Global variables
let carousel = null;
let productCarousel = null;

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Hero Carousel
    carousel = new HeroCarousel();
    
    // Initialize Product Carousel
    initializeProductCarousel();
    
    // Initialize other components
    initializeImageModal();
});

// Navigation Toggle
function toggleNav() {
    console.log('toggleNav called');
    const overlay = document.getElementById('myNav');
    const body = document.body;
    
    if (overlay && body) {
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }
}

// Close navigation when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.overlay a').forEach(link => {
        link.addEventListener('click', () => {
            const overlay = document.getElementById('myNav');
            const body = document.body;
            
            if (overlay && body) {
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.custom_menu-btn button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleNav);
    }
});
// Hero Carousel Class
class HeroCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.isTransitioning = false;
        
        // Only initialize if slides exist
        if (this.totalSlides > 0) {
            this.init();
        }
    }
    
    init() {
        // Set up event listeners
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle visibility change (pause when tab is not active)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
        
        // Initialize first slide
        this.updateSlide(0);
    }
    
    updateSlide(newIndex, direction = 'next') {
        if (this.isTransitioning || newIndex === this.currentSlide) return;
        
        this.isTransitioning = true;
        
        // Remove active class from current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.remove('active');
        }
        
        // Update current slide index
        this.currentSlide = newIndex;
        
        // Add active class to new slide with a slight delay for smooth transition
        setTimeout(() => {
            if (this.slides[this.currentSlide]) {
                this.slides[this.currentSlide].classList.add('active');
            }
            
            // Reset transition flag after animation completes
            setTimeout(() => {
                this.isTransitioning = false;
            }, 1000);
        }, 100);
        
        // Trigger content animations
        this.animateSlideContent();
    }
    
    animateSlideContent() {
        const currentSlideContent = this.slides[this.currentSlide]?.querySelector('.slide-content');
        if (!currentSlideContent) return;
        
        const elements = currentSlideContent.querySelectorAll('h2, p, .cta-button');
        
        // Reset animations
        elements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
        });
        
        // Restart animations with staggered delays
        elements.forEach((el, index) => {
            const delay = (index + 1) * 0.3;
            el.style.animation = `slideInContent 1s ease forwards ${delay}s`;
        });
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide(nextIndex, 'next');
        this.resetAutoPlay();
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide(prevIndex, 'prev');
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (index !== this.currentSlide && index >= 0 && index < this.totalSlides) {
            const direction = index > this.currentSlide ? 'next' : 'prev';
            this.updateSlide(index, direction);
            this.resetAutoPlay();
        }
    }
    
    startAutoPlay() {
        this.pauseAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.startAutoPlay();
    }
    
    handleResize() {
        // Handle any resize-specific logic if needed
        // For now, just ensure the current slide is properly displayed
        this.slides.forEach((slide, index) => {
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }
}

// Product Carousel Class
class ProductCarousel {
    constructor(carouselSelector) {
        this.carousel = document.querySelector(carouselSelector);
        this.track = this.carousel?.querySelector('.kry-carousel-track');
        this.slides = this.carousel?.querySelectorAll('.kry-carousel-slide');
        this.prevBtn = this.carousel?.querySelector('.kry-prev');
        this.nextBtn = this.carousel?.querySelector('.kry-next');
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
        
        if (this.carousel && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.slidesPerView = this.getSlidesPerView();
            this.maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            this.updateCarousel();
        });
        
        // Initialize position
        this.updateCarousel();
    }
    
    getSlidesPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    updateCarousel() {
        if (!this.track) return;
        
        const slideWidth = 100 / this.slidesPerView;
        const translateX = -this.currentIndex * slideWidth;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update button states
        if (this.prevBtn) {
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
            this.prevBtn.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';
        }
        if (this.nextBtn) {
            this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
            this.nextBtn.style.pointerEvents = this.currentIndex >= this.maxIndex ? 'none' : 'auto';
        }
    }
}

// Initialize Product Carousel
function initializeProductCarousel() {
    // Initialize all product carousels on the page
    const carousels = document.querySelectorAll('.kry-carousel-wrapper');
    carousels.forEach((wrapper, index) => {
        new ProductCarousel(`#${wrapper.querySelector('.kry-carousel').id || 'kry-carousel'}`);
    });
}

// Image Modal Functionality
function initializeImageModal() {
    // Handle image modal clicks
    document.querySelectorAll('.search-box').forEach(searchBox => {
        searchBox.addEventListener('click', function() {
            const bigImage = this.getAttribute('data-bigimage');
            const modalImage = document.getElementById('image');
            if (modalImage && bigImage) {
                modalImage.src = bigImage;
            }
        });
    });
}

// Smooth Scroll for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (carousel) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                carousel.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                carousel.nextSlide();
                break;
            case 'Escape':
                // Close navigation if open
                const overlay = document.getElementById('myNav');
                const body = document.body;
                if (overlay && body && overlay.classList.contains('active')) {
                    overlay.classList.remove('active');
                    body.classList.remove('menu-open');
                }
                break;
        }
    }
});

// Contact Form Handling (if contactForm.js is not loaded)
function sendEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const phone = document.getElementById('phone')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
    const formMessage = document.getElementById('formMessage');
    
    if (!name || !phone || !email || !message) {
        if (formMessage) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.style.color = 'red';
        }
        return;
    }
    
    // Here you would typically send the email using EmailJS or your preferred service
    // For now, just show a success message
    if (formMessage) {
        formMessage.textContent = 'Message sent successfully!';
        formMessage.style.color = 'green';
    }
    
    // Reset form
    document.getElementById('contactForm')?.reset();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle page load
window.addEventListener('load', function() {
    // Any additional initialization code can go here
    console.log('Page loaded successfully');
});

// Handle page unload
window.addEventListener('beforeunload', function() {
    // Clean up intervals and event listeners
    if (carousel) {
        carousel.pauseAutoPlay();
    }
});


//app js

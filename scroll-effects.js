// Enhanced scrolling effects for resume website

// Smooth scroll function
function smoothScrollTo(target, offset = 70) {
    const element = document.querySelector(target);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Section progress indicator
function createSectionProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
    `;
    
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    sections.forEach(sectionId => {
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        `;
        dot.dataset.section = sectionId;
        
        dot.addEventListener('click', () => {
            smoothScrollTo(`#${sectionId}`);
        });
        
        progressContainer.appendChild(dot);
    });
    
    document.body.appendChild(progressContainer);
    return progressContainer;
}

// Scroll animations observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize scroll animations
function initScrollAnimations() {
    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });
    
    // About section elements
    document.querySelectorAll('.about-text p').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-left' : 'slide-right');
        scrollObserver.observe(el);
    });
    
    // Stats
    document.querySelectorAll('.stat').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.transitionDelay = `${index * 0.2}s`;
        scrollObserver.observe(el);
    });
    
    // Skill categories
    document.querySelectorAll('.skill-category').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.3}s`;
        scrollObserver.observe(el);
    });
    
    // Project cards
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.classList.add('rotate-in');
        el.style.transitionDelay = `${index * 0.2}s`;
        scrollObserver.observe(el);
    });
    
    // Contact elements
    document.querySelector('.contact-info')?.classList.add('slide-left');
    document.querySelector('.contact-form')?.classList.add('slide-right');
    document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sectionProgress = createSectionProgress();
    
    // Enhanced scroll effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax effects
        const heroBackground = document.querySelector('.hero::before');
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${scrolled * -0.3}px, 0)`;
        }
        
        const profileImg = document.querySelector('.profile-placeholder');
        if (profileImg) {
            profileImg.style.transform = `translate3d(0, ${scrolled * -0.1}px, 0)`;
        }
        
        // Enhanced navbar
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.style.backdropFilter = 'blur(30px) saturate(200%)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.4)';
            navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
            navbar.style.boxShadow = 'none';
        }
        
        // Active section detection
        let current = '';
        const sections = document.querySelectorAll('section');
        const progressDots = sectionProgress.querySelectorAll('div');
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
            
            // Update progress dots
            const dot = progressDots[index];
            if (dot && scrollY >= (sectionTop - 300) && scrollY < (sectionTop + sectionHeight - 300)) {
                dot.style.background = 'linear-gradient(45deg, #00d4ff, #ff0080)';
                dot.style.transform = 'scale(1.3)';
                dot.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
            } else if (dot) {
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';
            }
        });

        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Floating skill tags
        document.querySelectorAll('.skill-tag').forEach((tag, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            tag.style.transform = `translateY(${Math.sin(scrolled * 0.01 + index) * speed}px)`;
        });
    });
    
    // Initialize animations
    initScrollAnimations();
    
    // Enhanced smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
});
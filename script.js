// Enhanced smooth scrolling
function smoothScrollTo(target, offset = 70) {
    const element = document.querySelector(target);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScrollTo(this.getAttribute('href'));
    });
});

// Particle system
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

new ParticleSystem();

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: left 0.3s ease;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu .nav-link {
            font-size: 1.5rem;
            margin: 1rem 0;
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.3s ease;
        }
        
        .nav-menu.active .nav-link {
            opacity: 1;
            transform: translateX(0);
        }
        
        .nav-menu.active .nav-link:nth-child(1) { transition-delay: 0.1s; }
        .nav-menu.active .nav-link:nth-child(2) { transition-delay: 0.2s; }
        .nav-menu.active .nav-link:nth-child(3) { transition-delay: 0.3s; }
        .nav-menu.active .nav-link:nth-child(4) { transition-delay: 0.4s; }
        .nav-menu.active .nav-link:nth-child(5) { transition-delay: 0.5s; }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Scroll progress
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,#00d4ff,#ff0080);z-index:1001;transition:width 0.1s ease';
document.body.appendChild(scrollProgress);



// Scroll animations
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

function initAnimations() {
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    document.querySelectorAll('.stat').forEach((el, i) => {
        el.classList.add('scale-in');
        el.style.transitionDelay = `${i * 0.2}s`;
        observer.observe(el);
    });
    
    document.querySelectorAll('.skill-category').forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.3}s`;
        observer.observe(el);
    });
    
    document.querySelectorAll('.project-card').forEach((el, i) => {
        el.classList.add('rotate-in');
        el.style.transitionDelay = `${i * 0.2}s`;
        observer.observe(el);
    });
}

// Enhanced scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax
    const hero = document.querySelector('.hero::before');
    if (hero) hero.style.transform = `translate3d(0,${scrolled * -0.3}px,0)`;
    
    const profile = document.querySelector('.profile-placeholder');
    if (profile) profile.style.transform = `translate3d(0,${scrolled * -0.1}px,0)`;
    
    // Progress bar
    const scrollPercent = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
    
    // Navbar
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        navbar.style.background = 'rgba(0,0,0,0.8)';
        navbar.style.boxShadow = '0 8px 32px rgba(0,212,255,0.2)';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.4)';
        navbar.style.boxShadow = 'none';
    }
    
    // Active sections for sidebar dots
    const sections = document.querySelectorAll('section');
    const sidebarDots = document.querySelectorAll('.sidebar-dot');
    
    sections.forEach((section, i) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrolled >= top - 300 && scrolled < top + height - 300) {
            sidebarDots[i]?.classList.add('active');
        } else {
            sidebarDots[i]?.classList.remove('active');
        }
    });
    
    // Floating tags
    document.querySelectorAll('.skill-tag').forEach((tag, i) => {
        tag.style.transform = `translateY(${Math.sin(scrolled * 0.01 + i) * 0.5}px)`;
    });
});

// Typing effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.innerHTML = text;
            }, 1000);
        }
    }
    
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .cursor {
            animation: blink 1s infinite;
            color: #00d4ff;
        }
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyles);
    
    type();
}

// Enhanced loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.1)';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 2500);
    initAnimations();
    
    // Hero elements
    document.querySelectorAll('.hero-content > *').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 200);
    });
    
    // Profile image
    const profile = document.querySelector('.profile-placeholder');
    if (profile) {
        profile.style.opacity = '0';
        profile.style.transform = 'scale(0.5) rotate(180deg)';
        setTimeout(() => {
            profile.style.transition = 'all 1.2s ease';
            profile.style.opacity = '1';
            profile.style.transform = 'scale(1) rotate(0deg)';
        }, 800);
    }
    
    setTimeout(() => typeWriter(document.querySelector('.hero-content h2'), 'Full Stack Web Developer', 150), 3000);
});

// Contact form
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
        return;
    }
    
    submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-lg"></i> Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            this.reset();
        }, 2000);
    }, 1500);
});

const shakeStyles = document.createElement('style');
shakeStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyles);

// Mouse trail
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
        this.animate();
    }

    addTrailPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }
    }

    animate() {
        this.trail.forEach((point, index) => {
            point.life -= 0.05;
            if (point.life <= 0) {
                this.trail.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

new MouseTrail();



// Glitch effect
function glitchEffect() {
    const title = document.querySelector('.hero-content h1');
    if (!title) return;
    
    const originalText = title.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchInterval = setInterval(() => {
        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += originalText[i];
            }
        }
        title.textContent = glitchedText;
    }, 50);
    
    setTimeout(() => {
        clearInterval(glitchInterval);
        title.textContent = originalText;
    }, 200);
}

setInterval(() => {
    if (Math.random() < 0.1) {
        glitchEffect();
    }
}, 5000);

// Morphing shapes
function createMorphingShapes() {
    const shapes = document.createElement('div');
    shapes.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-2';
    shapes.innerHTML = `
        <div style="position:absolute;top:10%;left:10%;width:200px;height:200px;background:radial-gradient(circle,rgba(0,212,255,0.1) 0%,transparent 70%);border-radius:50%;animation:morph1 20s ease-in-out infinite;"></div>
        <div style="position:absolute;top:60%;right:10%;width:300px;height:300px;background:radial-gradient(circle,rgba(255,0,128,0.1) 0%,transparent 70%);border-radius:50%;animation:morph2 25s ease-in-out infinite;"></div>
        <div style="position:absolute;bottom:20%;left:30%;width:150px;height:150px;background:radial-gradient(circle,rgba(138,43,226,0.1) 0%,transparent 70%);border-radius:50%;animation:morph3 15s ease-in-out infinite;"></div>
    `;
    document.body.appendChild(shapes);
}

const morphingStyles = document.createElement('style');
morphingStyles.textContent = `
    @keyframes morph1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        25% { transform: translate(100px, -50px) scale(1.2); }
        50% { transform: translate(-50px, 100px) scale(0.8); }
        75% { transform: translate(150px, 50px) scale(1.1); }
    }
    @keyframes morph2 {
        0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        33% { transform: translate(-80px, -100px) scale(1.3) rotate(120deg); }
        66% { transform: translate(120px, -80px) scale(0.9) rotate(240deg); }
    }
    @keyframes morph3 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(-100px, -150px) scale(1.5); }
    }
`;
document.head.appendChild(morphingStyles);

createMorphingShapes();
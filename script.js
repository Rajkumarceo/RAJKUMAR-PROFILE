// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// ============================================

// DOM Elements
const ctaButton = document.querySelector('.cta-button');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('a[href^="#"]');

// ============================================
// SMOOTH SCROLLING
// ============================================

navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-menu')?.classList.remove('active');
            
            // Add active state to nav links
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// ============================================
// CTA BUTTON FUNCTIONALITY
// ============================================

if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ============================================
// NAVBAR EFFECTS ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 255, 136, 0.15)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 255, 136, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ============================================
// UPDATE ACTIVE NAV LINK
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for cards
            const cards = entry.target.querySelectorAll('.achievement-card, .course-card, .service-card, .skill-category, .project-card, .testimonial-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.6s ease-out';
                card.style.transitionDelay = `${index * 0.1}s`;
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            });
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============================================
// MOUSE MOVE GLOW EFFECT - HERO SECTION
// ============================================

const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const glowCircles = document.querySelectorAll('.glow-circle');
        glowCircles.forEach((circle, index) => {
            const moveX = (x - 0.5) * (index + 1) * 30;
            const moveY = (y - 0.5) * (index + 1) * 30;
            circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            circle.style.transition = 'transform 0.5s ease-out';
        });
    });
    
    hero.addEventListener('mouseleave', function() {
        const glowCircles = document.querySelectorAll('.glow-circle');
        glowCircles.forEach(circle => {
            circle.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// CONTACT EMAIL HANDLING
// ============================================

const contactLink = document.querySelector('.contact-link');
if (contactLink) {
    contactLink.addEventListener('click', function(e) {
        // Email client will open automatically with href
        console.log('Opening email client...');
    });
    
    // Copy email on click (alternative)
    contactLink.setAttribute('title', 'Click to open email client');
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

document.querySelectorAll('.cta-button, .social-icon, .skill-tag').forEach(button => {
    button.addEventListener('click', function(e) {
        // Prevent ripple for scrolling buttons
        if (this.tagName === 'BUTTON' || this.href.startsWith('#')) {
            createRipple(e, this);
        }
    });
});

function createRipple(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remove existing ripple
    const existingRipple = element.querySelector('.ripple');
    if (existingRipple) existingRipple.remove();
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// ============================================
// HOVER EFFECTS FOR CARDS
// ============================================

document.querySelectorAll('.achievement-card, .course-card, .service-card, .project-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', function() {
    document.body.style.transition = 'opacity 0.3s ease-in';
    document.body.style.opacity = '1';
    console.log('Portfolio website loaded successfully!');
});

// ============================================
// PERFORMANCE OPTIMIZATION - DEBOUNCE
// ============================================

let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        // Scroll animations handled by intersection observer
    });
}, { passive: true });

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
    // ESC key to close any modals (if added in future)
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }
    
    // Ctrl/Cmd + K to focus search (if added in future)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search shortcut triggered');
    }
});

// ============================================
// RESUME DOWNLOAD SIMULATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Can add resume download functionality here
    console.log('DOM Content Loaded - Portfolio initialized');
});

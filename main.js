// main.js
// Custom Interactions and GSAP Animations

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Auto-Close on Click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Use Bootstrap's Collapse API
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // 3. Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation
    gsap.to('.gsap-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    // Fade Up Elements on Scroll
    const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
    
    fadeUpElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%', // trigger when top of element hits 85% of viewport
                toggleActions: 'play none none reverse' // animate in and out
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Staggered list items (e.g., Certifications)
    const certItems = document.querySelectorAll('.cert-list li');
    if(certItems.length > 0) {
        gsap.from(certItems, {
            scrollTrigger: {
                trigger: '.cert-list',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        });
    }

    // Smooth Scroll for anchor links (fallback/enhancement over CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

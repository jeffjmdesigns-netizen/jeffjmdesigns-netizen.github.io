/* ============================================
   PHILOSOPHIA SCRIPTS — Interactions & Reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const navbarLogo = document.getElementById('navbarLogo');
    let lastScroll = 0;

    const portalRings = document.querySelectorAll('.portal-ring');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar effect
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
            if (navbarLogo) navbarLogo.src = 'imagery/primary-logo.png';
        } else {
            navbar.classList.remove('scrolled');
            if (navbarLogo) navbarLogo.src = 'imagery/primary-logo-reversed.png';
        }

        // Portal rings scroll drama
        portalRings.forEach((ring, index) => {
            const speed = (index + 1) * 0.15;
            const rotation = scrollY * speed;
            const scale = 1 + (scrollY * 0.0005);
            // Combine with existing translate(-50%, -50%) from CSS
            ring.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
        });

        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Mobile nav toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ---- Intersection Observer — Scroll Reveals ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Script Cards — Staggered Reveal ----
    const scriptCards = document.querySelectorAll('.script-card');

    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    scriptCards.forEach(card => cardObserver.observe(card));

    // ---- Scroll Spy — Active Section Tracking ----
    const sections = ['about', 'projects', 'contact'].map(id => document.getElementById(id));
    const navItems = document.querySelectorAll('.navbar__links a');

    const scrollSpyObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navItems.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        // Threshold: 0.5 means when 50% of the section is visible
        { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' }
    );

    sections.forEach(section => {
        if (section) scrollSpyObserver.observe(section);
    });


    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Parallax on portal rings (subtle) ----
    const portal = document.querySelector('.hero__portal');

    if (portal && window.matchMedia('(min-width: 768px)').matches) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            portal.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        }, { passive: true });
    }

});


    // Script toggle menu mobile
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            // Animasi ikon menu
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
    }

    // Lightbox functionality
    function openLightbox(el) {
        const img = el.querySelector("img");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        if (img && lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.remove("hidden");
        }
    }

    function closeLightbox() {
        const lightbox = document.getElementById("lightbox");
        if (lightbox) {
            lightbox.classList.add("hidden");
        }
    }

    // Close lightbox dengan ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Scroll reveal animation
    function checkScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    // Navbar scroll effect - DIPERBAIKI
    function handleNavbarScroll() {
        const navbar = document.querySelector('nav'); // Menggunakan selector nav saja
        const backToTop = document.getElementById('back-to-top');
        
        if (navbar && backToTop) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled-nav');
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                navbar.classList.remove('scrolled-nav');
                backToTop.classList.remove('opacity-100', 'visible');
                backToTop.classList.add('opacity-0', 'invisible');
            }
        }
    }

    // Back to top functionality - DIPERBAIKI
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        checkScroll();
        handleNavbarScroll();
    });

    // Back to top event listener - DIPERBAIKI
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    // Reset menu icon
                    if (menuBtn) {
                        menuBtn.querySelector('i').className = 'fas fa-bars';
                    }
                }
            }
        });
    });

    // Typing animation
    document.addEventListener('DOMContentLoaded', function() {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            // Reset animation
            setTimeout(() => {
                typingElement.style.animation = 'none';
                setTimeout(() => {
                    typingElement.style.animation = 'typing 3s steps(20, end), blink-caret 0.75s step-end infinite';
                }, 10);
            }, 3000);
        }

        // Add scroll animation for features
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all fade-in-up elements
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });
    });

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        checkScroll();
        handleNavbarScroll();
        
        // Animate underline in hero section
        const heroText = document.querySelector('#home h1 span');
        if (heroText) {
            setTimeout(() => {
                const underline = heroText.querySelector('span');
                if (underline) {
                    underline.classList.add('scale-x-100');
                }
            }, 1000);
        }
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                if (menuBtn) {
                    menuBtn.querySelector('i').className = 'fas fa-bars';
                }
            }
        });
    });

// Bandar Florist - Simplified JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Bandar Florist Website Loaded');
    
    // Initialize all functionality
    initMobileMenu();
    initLightbox();
    initScrollEffects();
    initSmoothScroll();
    initGalleryFilter();
    initVideoPlayers();
    initContactForm();
    initProductInteractions();
    startAnimations();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            icon.className = mobileMenu.classList.contains('hidden') 
                ? 'fas fa-bars' 
                : 'fas fa-times';
        });

        // Close menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                if (menuBtn) {
                    menuBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }
}

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    // Close lightbox with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox when clicking outside
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
}

// Global lightbox functions
function openLightbox(element) {
    const img = element.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Scroll Effects
function initScrollEffects() {
    // Scroll reveal animation
    function checkScroll() {
        const elements = document.querySelectorAll('.scroll-reveal');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('nav');
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
    
    window.addEventListener('scroll', function() {
        checkScroll();
        handleNavbarScroll();
    });
    
    // Initial check
    checkScroll();
    handleNavbarScroll();
}

// Smooth Scrolling
function initSmoothScroll() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                const mobileMenu = document.getElementById('mobile-menu');
                const menuBtn = document.getElementById('menu-btn');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    if (menuBtn) {
                        menuBtn.querySelector('i').className = 'fas fa-bars';
                    }
                }
            }
        });
    });
    
    // Back to top functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Gallery Buat Filter Cuy
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('bg-green-500', 'text-white');
                b.classList.add('text-gray-600', 'hover:text-green-600');
            });
            this.classList.add('bg-green-500', 'text-white');
            this.classList.remove('text-gray-600', 'hover:text-green-600');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Video Players Functionality - FIXED
function initVideoPlayers() {
    const videoCards = document.querySelectorAll('.gallery-item.video');
    
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const fallback = card.querySelector('.video-fallback');
        const playOverlay = card.querySelector('.video-play-overlay') || card.querySelector('.video-play-trigger');
        
        if (video && playOverlay) {
            // Click to play/pause
            const playVideo = function(e) {
                e.stopPropagation();
                
                if (video.paused || video.ended) {
                    video.play().then(() => {
                        playOverlay.style.opacity = '0';
                        if (fallback) fallback.style.opacity = '0';
                    }).catch(error => {
                        console.log('Video play failed:', error);
                        // Fallback ke image jika video gagal
                        playOverlay.style.opacity = '1';
                        if (fallback) fallback.style.opacity = '1';
                    });
                } else {
                    video.pause();
                    playOverlay.style.opacity = '1';
                }
            };
            
            playOverlay.addEventListener('click', playVideo);
            
            // Juga bisa klik video langsung
            video.addEventListener('click', playVideo);
            
            // Handle video events
            video.addEventListener('play', function() {
                playOverlay.style.opacity = '0';
                if (fallback) fallback.style.opacity = '0';
            });
            
            video.addEventListener('pause', function() {
                playOverlay.style.opacity = '1';
            });
            
            video.addEventListener('ended', function() {
                video.currentTime = 0;
                playOverlay.style.opacity = '1';
            });
            
            // Handle video errors
            video.addEventListener('error', function() {
                console.error('Video error:', video.error);
                playOverlay.style.opacity = '1';
                if (fallback) fallback.style.opacity = '1';
                
                // Show error icon
                const playButton = playOverlay.querySelector('.video-play-button') || playOverlay.querySelector('div');
                if (playButton) {
                    playButton.innerHTML = '<i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>';
                }
            });
            
            // Hover effects untuk play button
            card.addEventListener('mouseenter', function() {
                const playButton = playOverlay.querySelector('.video-play-button') || playOverlay.querySelector('div');
                if (playButton) {
                    playButton.classList.add('scale-110');
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const playButton = playOverlay.querySelector('.video-play-button') || playOverlay.querySelector('div');
                if (playButton) {
                    playButton.classList.remove('scale-110');
                }
            });
        }
    });
}

// Product card interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const buyBtn = card.querySelector('button');
        if (buyBtn) {
            buyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = card.querySelector('h3').textContent;
                alert(`Terima kasih! Produk "${productName}" telah ditambahkan ke keranjang.`);
            });
        }
        
        // Add to cart animation
        card.addEventListener('click', function(e) {
            if (!e.target.closest('button')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// Animations
function startAnimations() {
    // Typing animation reset
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        // Reset animation setelah selesai
        typingElement.addEventListener('animationend', function() {
            setTimeout(() => {
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'typing 3s steps(20, end), blink-caret 0.75s step-end infinite';
                }, 100);
            }, 2000);
        });
    }
    
    // Hero underline animation
    const heroText = document.querySelector('#home h1 span');
    if (heroText) {
        setTimeout(() => {
            const underline = heroText.querySelector('span');
            if (underline) {
                underline.classList.add('scale-x-100');
            }
        }, 1000);
    }
}

// Image loading handler
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Skip if image already loaded
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                console.warn('Image failed to load:', this.src);
                this.classList.add('error');
                // Fallback image bisa ditambahkan di sini
            });
        }
    });
}

// Initialize image loading
initImageLoading();

// Global functions untuk HTML onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Utility function untuk debounce (jika diperlukan)
window.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

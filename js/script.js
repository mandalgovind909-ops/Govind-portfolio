document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    function toggleMenu() {
        mobileMenuOverlay.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        const isActive = mobileMenuOverlay.classList.contains('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Sticky Navbar & Active Link Highlighting
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // Active Link Highlighting (URL based)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Exact match or index.html for empty paths
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                    // Small delay to allow display:block to apply before animating opacity if we were using CSS transitions
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hide');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            });
        });
    });

    // 5. Contact Form Validation (Client-side)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset previous invalid states
            [nameInput, emailInput, messageInput].forEach(input => {
                input.parentElement.classList.remove('invalid');
            });

            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            }

            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="spin"></i>';
                lucide.createIcons();

                setTimeout(() => {
                    formStatus.textContent = "Thank you! Your message has been sent successfully.";
                    formStatus.className = "form-status success";
                    contactForm.reset();
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    lucide.createIcons();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 5000);
                }, 1500);
            } else {
                formStatus.textContent = "Please fill out all required fields correctly.";
                formStatus.className = "form-status error";
            }
        });
    }

    // 6. Initialize tsParticles
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            background: {
                color: {
                    value: "transparent",
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5,
                        },
                    },
                },
            },
            particles: {
                color: {
                    value: "#60A5FA",
                },
                links: {
                    color: "#3B82F6",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 0.8,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 40,
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 2 },
                },
            },
            detectRetina: true,
        });
    }
});

// Dashboard Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('dashboardModal');
    const modalImg = document.getElementById('dashboardModalImg');
    const closeBtn = document.querySelector('.dashboard-modal-close');
    const dashboardBtns = document.querySelectorAll('.dashboard-btn');

    if(modal && modalImg && dashboardBtns) {
        dashboardBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = btn.getAttribute('data-img');
                if(imgSrc) {
                    modalImg.src = imgSrc;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling under modal
                }
            });
        });

        // Close on clicking X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        // Close on clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Theme Toggle
    const themeBtns = document.querySelectorAll('.theme-btn, .mobile-theme-btn');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    function updateThemeUI(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.querySelectorAll('.theme-icon-sun').forEach(icon => { if(icon) icon.style.display = 'block'; });
            document.querySelectorAll('.theme-icon-moon').forEach(icon => { if(icon) icon.style.display = 'none'; });
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.querySelectorAll('.theme-icon-sun').forEach(icon => { if(icon) icon.style.display = 'none'; });
            document.querySelectorAll('.theme-icon-moon').forEach(icon => { if(icon) icon.style.display = 'block'; });
        }
    }
    updateThemeUI(savedTheme);
    
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            updateThemeUI(newTheme);
        });
    });});

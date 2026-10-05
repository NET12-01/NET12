document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MODO OSCURO (DARK MODE)
    // =========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // =========================================
    // 2. CUENTA REGRESIVA DE PROMOCIÓN
    // =========================================
    const countdownEl = document.getElementById('countdown');
    
    // Fecha objetivo: 7 días desde ahora (puedes cambiarla a una fecha fija)
    // Para usar una fecha fija: new Date('2026-12-31T23:59:59')
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 días desde hoy
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            countdownEl.textContent = '¡Promo finalizada!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    if (countdownEl) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // =========================================
    // 3. MENÚ HAMBURGUESA
    // =========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // =========================================
    // 4. HEADER SCROLL EFFECT
    // =========================================
    const header = document.querySelector('.header');
    const logoImg = document.querySelector('.logo img');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            if(window.innerWidth > 768 && logoImg) {
                logoImg.style.height = '48px'; 
            }
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'var(--shadow-sm)';
            if(window.innerWidth > 768 && logoImg) {
                logoImg.style.height = '55px'; 
            }
        }
    });

    // =========================================
    // 5. VERIFICADOR DE COBERTURA
    // =========================================
    const coverageInput = document.getElementById('coverageInput');
    const checkCoverageBtn = document.getElementById('checkCoverageBtn');
    const coverageResult = document.getElementById('coverageResult');
    
    // Base de datos de zonas con cobertura (fácil de modificar)
    const coverageZones = [
        'villa devoto', 'devoto', '1417', '1419',
        'villa del parque', 'parque', '1416',
        'agronomia', 'agronomía', '1429',
        'villa santa rita', 'santa rita', '1416',
        'monte castro', 'castro', '1407',
        'versalles', 'versalles', '1407',
        'floresta', 'floresta', '1407',
        'velez sarsfield', 'velez', '1407'
    ];
    
    function checkCoverage() {
        const query = coverageInput.value.trim().toLowerCase();
        
        if (!query) {
            coverageResult.textContent = '⚠️ Por favor, ingresá un barrio o código postal.';
            coverageResult.className = 'coverage-result error';
            return;
        }
        
        // Simular carga
        coverageResult.textContent = '⏳ Verificando disponibilidad...';
        coverageResult.className = 'coverage-result loading';
        
        setTimeout(() => {
            const hasCoverage = coverageZones.some(zone => 
                query.includes(zone) || zone.includes(query)
            );
            
            if (hasCoverage) {
                coverageResult.innerHTML = '✅ ¡Buenas noticias! Tenemos cobertura en tu zona. <a href="#contacto" style="color: inherit; text-decoration: underline;">Contratá ahora</a>';
                coverageResult.className = 'coverage-result success';
            } else {
                coverageResult.innerHTML = '❌ Todavía no llegamos a tu zona, pero estamos expandiéndonos. <a href="#contacto" style="color: inherit; text-decoration: underline;">Contactanos</a> para avisarte cuando esté disponible.';
                coverageResult.className = 'coverage-result error';
            }
        }, 800);
    }
    
    if (checkCoverageBtn) {
        checkCoverageBtn.addEventListener('click', checkCoverage);
        coverageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkCoverage();
            }
        });
    }

    // =========================================
    // 6. SCROLL REVEAL (ANIMACIONES)
    // =========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // =========================================
    // 7. FAQ ACORDEÓN
    // =========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            faqItem.classList.toggle('active');
        });
    });

    // =========================================
    // 8. FORMULARIO DE CONTACTO
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formMessage.textContent = '¡Solicitud enviada con éxito! Nos contactaremos a la brevedad.';
            formMessage.style.color = '#22c55e';
            
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    // =========================================
    // 9. BOTÓN VOLVER ARRIBA
    // =========================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =========================================
    // 10. SMOOTH SCROLL
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para el header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

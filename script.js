document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. MODO OSCURO (DARK MODE)
    // =========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
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
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
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
    // 5. VERIFICADOR DE COBERTURA - SANTA ROSA, LA PAMPA
    // =========================================
    
    // Base de datos de barrios y zonas con cobertura en Santa Rosa
    const coverageDatabase = [
        { 
            barrio: 'Villa Parque', 
            cps: ['L6300', '6300'],
            variantes: ['villa parque', 'parque', 'v parque']
        },
        { 
            barrio: 'Nuestra Señora de Luján', 
            cps: ['L6300'],
            variantes: ['lujan', 'nuestra senora de lujan', 'ns de lujan', 'virgen de lujan']
        },
        { 
            barrio: 'Villa Santillán', 
            cps: ['L6300'],
            variantes: ['santillan', 'villa santillan', 'v santillan']
        },
        { 
            barrio: 'Villa Alonso Norte', 
            cps: ['L6300'],
            variantes: ['villa alonso', 'alonso norte', 'alonso', 'v alonso']
        },
        { 
            barrio: 'Aeropuerto', 
            cps: ['L6300'],
            variantes: ['aeropuerto', 'aeropuerto 1', 'barrio aeropuerto']
        },
        { 
            barrio: 'Villa Martita', 
            cps: ['L6300'],
            variantes: ['martita', 'villa martita', 'v martita']
        },
        { 
            barrio: 'Centro Empleados de Comercio', 
            cps: ['L6300'],
            variantes: ['centro empleados', 'empleados de comercio', 'cec', 'empleados comercio']
        },
        { 
            barrio: 'Centro', 
            cps: ['L6300'],
            variantes: ['centro', 'microcentro', 'centro santa rosa']
        },
        { 
            barrio: 'Polonia', 
            cps: ['B1867CAT', 'B1867', 'L6300'],
            variantes: ['polonia', 'polonia 1756', 'calle polonia']
        },
        { 
            barrio: 'Villa Germinal', 
            cps: ['L6300'],
            variantes: ['germinal', 'villa germinal']
        },
        { 
            barrio: 'Barrio Este', 
            cps: ['L6300'],
            variantes: ['barrio este', 'este']
        },
        { 
            barrio: 'Barrio Norte', 
            cps: ['L6300'],
            variantes: ['barrio norte', 'norte']
        },
        { 
            barrio: 'Barrio Sur', 
            cps: ['L6300'],
            variantes: ['barrio sur', 'sur']
        },
        { 
            barrio: 'Barrio Oeste', 
            cps: ['L6300'],
            variantes: ['barrio oeste', 'oeste']
        },
        { 
            barrio: 'Santa Rosa', 
            cps: ['L6300'],
            variantes: ['santa rosa', 'santa rosa la pampa', 'la pampa']
        }
    ];

    // Normalizar texto (quita acentos, minúsculas, etc.)
    function normalizeText(text) {
        return text
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,#-]/g, '')
            .replace(/\s+/g, ' ');
    }

    const coverageInput = document.getElementById('coverageInput');
    const checkCoverageBtn = document.getElementById('checkCoverageBtn');
    const coverageResult = document.getElementById('coverageResult');

    function checkCoverage() {
        const query = normalizeText(coverageInput.value);
        
        if (!query) {
            coverageResult.innerHTML = '⚠️ Por favor, ingresá un barrio, dirección o código postal.';
            coverageResult.className = 'coverage-result error';
            return;
        }
        
        coverageResult.innerHTML = '⏳ Verificando disponibilidad...';
        coverageResult.className = 'coverage-result loading';
        
        setTimeout(() => {
            let matchFound = null;
            
            for (const zona of coverageDatabase) {
                const barrioNorm = normalizeText(zona.barrio);
                const coincideBarrio = barrioNorm.includes(query) || query.includes(barrioNorm);
                
                const coincideVariante = zona.variantes.some(v => {
                    const vNorm = normalizeText(v);
                    return query.includes(vNorm) || vNorm.includes(query);
                });
                
                const coincideCP = zona.cps.some(cp => 
                    query === normalizeText(cp) || query.includes(normalizeText(cp))
                );
                
                if (coincideBarrio || coincideVariante || coincideCP) {
                    matchFound = zona;
                    break;
                }
            }
            
            if (matchFound) {
                coverageResult.innerHTML = `✅ ¡Buenas noticias! Tenemos cobertura en <strong>${matchFound.barrio}</strong>. <a href="#contacto" style="color: inherit; text-decoration: underline;">Contratá ahora</a>`;
                coverageResult.className = 'coverage-result success';
            } else {
                // Guardar búsqueda sin cobertura para análisis
                try {
                    const busquedas = JSON.parse(localStorage.getItem('busquedasSinCobertura') || '[]');
                    busquedas.push({ zona: query, fecha: new Date().toISOString() });
                    localStorage.setItem('busquedasSinCobertura', JSON.stringify(busquedas));
                } catch(e) {}
                
                coverageResult.innerHTML = `❌ Todavía no llegamos a tu zona. <a href="https://wa.me/5491150059148?text=Hola,%20quiero%20saber%20si%20tienen%20cobertura%20en%20${encodeURIComponent(query)}" target="_blank" style="color: inherit; text-decoration: underline;">Avisanos por WhatsApp</a> y te confirmamos.`;
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
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

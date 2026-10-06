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
    // Base de datos completa con todos los barrios de Santa Rosa
    // =========================================
    const coverageDatabase = [
        // --- Barrios con cobertura confirmada por CPE ---
        { barrio: 'Villa Parque', cps: ['L6300', '6300'], variantes: ['villa parque', 'parque', 'v parque'] },
        { barrio: 'Nuestra Señora de Luján', cps: ['L6300', '6300'], variantes: ['lujan', 'nuestra senora de lujan', 'ns de lujan', 'virgen de lujan'] },
        { barrio: 'Villa Santillán', cps: ['L6300', '6300'], variantes: ['santillan', 'villa santillan', 'v santillan'] },
        { barrio: 'Villa Alonso Norte', cps: ['L6300', '6300'], variantes: ['villa alonso', 'alonso norte', 'alonso', 'v alonso'] },
        { barrio: 'Aeropuerto', cps: ['L6300', '6300'], variantes: ['aeropuerto', 'aeropuerto 1', 'barrio aeropuerto'] },
        { barrio: 'Villa Martita', cps: ['L6300', '6300'], variantes: ['martita', 'villa martita', 'v martita'] },
        { barrio: 'Centro Empleados de Comercio', cps: ['L6300', '6300'], variantes: ['centro empleados', 'empleados de comercio', 'cec', 'empleados comercio'] },
        { barrio: 'Centro', cps: ['L6300', '6300'], variantes: ['centro', 'microcentro', 'centro santa rosa'] },
        { barrio: 'Polonia', cps: ['B1867CAT', 'B1867', 'L6300'], variantes: ['polonia', 'polonia 1756', 'calle polonia'] },

        // --- Otros barrios de Santa Rosa ---
        { barrio: 'Villa Germinal', cps: ['L6300'], variantes: ['germinal', 'villa germinal'] },
        { barrio: 'Barrio Este', cps: ['L6300'], variantes: ['barrio este', 'este'] },
        { barrio: 'Barrio Norte', cps: ['L6300'], variantes: ['barrio norte', 'norte'] },
        { barrio: 'Barrio Sur', cps: ['L6300'], variantes: ['barrio sur', 'sur'] },
        { barrio: 'Barrio Oeste', cps: ['L6300'], variantes: ['barrio oeste', 'oeste'] },
        { barrio: 'Villa Elvina', cps: ['L6300'], variantes: ['elvina', 'villa elvina'] },
        { barrio: 'Villa del Busto', cps: ['L6300'], variantes: ['busto', 'villa del busto', 'v del busto'] },
        { barrio: 'Villa Sarmiento', cps: ['L6300'], variantes: ['sarmiento', 'villa sarmiento'] },
        { barrio: 'Villa Las Camelias', cps: ['L6300'], variantes: ['camelias', 'villa las camelias', 'v las camelias'] },
        { barrio: 'Villa Uhalde', cps: ['L6300'], variantes: ['uhalde', 'villa uhalde', 'v uhalde'] },
        { barrio: 'Villa Thomas Mason', cps: ['L6300'], variantes: ['thomas mason', 'villa thomas mason', 'v thomas mason'] },
        { barrio: 'Villa Elisa', cps: ['L6300'], variantes: ['elisa', 'villa elisa'] },
        { barrio: 'Sagrado Corazón de Jesús', cps: ['L6300'], variantes: ['sagrado corazon', 'sagrado corazon de jesus', 'sc de jesus'] },
        { barrio: 'Malvinas Argentinas', cps: ['L6300'], variantes: ['malvinas', 'malvinas argentinas'] },
        { barrio: 'Almafuerte', cps: ['L6300'], variantes: ['almafuerte', 'barrio almafuerte'] },
        { barrio: 'Bella Vista', cps: ['L6300'], variantes: ['bella vista', 'b vista'] },
        { barrio: 'Fitte', cps: ['L6300'], variantes: ['fitte', 'barrio fitte'] },
        { barrio: 'Butaló', cps: ['L6300'], variantes: ['butalo', 'barrio butalo', 'butalo 1', 'butalo 2', 'butalo 3'] },
        { barrio: 'FONAVI', cps: ['L6300'], variantes: ['fonavi', 'fonavi 25', 'fonavi 27', 'fonavi 34', 'fonavi 42', 'fonavi 1702'] },
        { barrio: 'Plan 5000', cps: ['L6300'], variantes: ['plan 5000', 'plan 5.000', 'plan cinco mil'] },
        { barrio: '26 de Septiembre', cps: ['L6300'], variantes: ['26 de septiembre', 'veintiseis de septiembre'] },
        { barrio: 'Los Hornos', cps: ['L6300'], variantes: ['los hornos', 'hornos'] },
        { barrio: 'Escondido', cps: ['L6300'], variantes: ['escondido', 'barrio escondido'] },
        { barrio: 'El Salitral', cps: ['L6300'], variantes: ['el salitral', 'nuevo salitral', 'salitral'] },
        { barrio: 'Micaela García', cps: ['L6300'], variantes: ['micaela garcia', 'micaela'] },
        { barrio: 'Nuevo Amanecer', cps: ['L6300'], variantes: ['nuevo amanecer', 'el amanecer', 'amanecer'] },
        { barrio: 'Santa María de las Pampas', cps: ['L6300'], variantes: ['santa maria de las pampas', 'santa maria'] },
        { barrio: 'Villa Navarro Sarmiento', cps: ['L6300'], variantes: ['navarro sarmiento', 'villa navarro sarmiento'] },
        { barrio: 'Villa Amalia', cps: ['L6300'], variantes: ['amalia', 'villa amalia'] },
        { barrio: 'Villa Hilda', cps: ['L6300'], variantes: ['hilda', 'villa hilda'] },
        { barrio: 'Inti Hue', cps: ['L6300'], variantes: ['inti hue', 'intihue'] },
        { barrio: 'Lowo Che', cps: ['L6300', 'L6301'], variantes: ['lowo che', 'lowoche', 'lowo che este', 'lowo che oeste'] },
        { barrio: 'Nueva Vista', cps: ['L6300'], variantes: ['nueva vista', 'nva vista'] },
        { barrio: 'El Faro', cps: ['L6300'], variantes: ['el faro', 'faro'] },
        { barrio: 'Colonos Pampeanos', cps: ['L6300'], variantes: ['colonos pampeanos', 'colonos'] },
        { barrio: 'Portal del Sur', cps: ['L6300'], variantes: ['portal del sur', 'portal sur'] },
        { barrio: 'Pueblos Originarios', cps: ['L6300'], variantes: ['pueblos originarios', 'originarios'] },
        { barrio: 'Nelson Mandela', cps: ['L6300'], variantes: ['nelson mandela', 'mandela'] },
        { barrio: 'ARA San Juan', cps: ['L6300'], variantes: ['ara san juan', 'ara'] },
        { barrio: 'Peñi Ruca', cps: ['L6300'], variantes: ['peni ruca', 'peñi ruca'] },
        { barrio: 'Regazzoli', cps: ['L6300'], variantes: ['regazzoli', 'aquiles regazzoli'] },
        { barrio: 'Néstor Kirchner', cps: ['L6300'], variantes: ['nestor kirchner', 'kirchner'] },
        { barrio: 'Esperanza', cps: ['L6300'], variantes: ['esperanza', 'barrio esperanza'] },
        { barrio: 'Matadero', cps: ['L6300'], variantes: ['matadero', 'barrio matadero'] },
        { barrio: 'Congreso', cps: ['L6300'], variantes: ['congreso', 'barrio congreso'] },
        { barrio: 'Pioneros', cps: ['L6300'], variantes: ['pioneros', 'barrio pioneros'] },
        { barrio: 'Chakra Raíz', cps: ['L6300', 'L6301'], variantes: ['chakra raiz', 'chakra'] },
        { barrio: 'Zona Quintas', cps: ['L6300'], variantes: ['zona quintas', 'quintas', 'zona quintas oeste', 'zona quintas sur'] },
        { barrio: 'Villa Ale', cps: ['L6300'], variantes: ['villa ale', 'ale'] },
        { barrio: 'Villa Alonso', cps: ['L6300'], variantes: ['villa alonso', 'alonso'] },
        { barrio: 'Villa Aurora', cps: ['L6300', 'L6301'], variantes: ['villa aurora', 'aurora'] },
        { barrio: 'Villa Bertotti', cps: ['L6300', 'L6301'], variantes: ['villa bertotti', 'bertotti'] },
        { barrio: 'Villa Olga', cps: ['L6300', 'L6301'], variantes: ['villa olga', 'olga'] },

        // --- Zona Toay (limítrofe) ---
        { barrio: 'Toay', cps: ['L6301'], variantes: ['toay', 'ciudad de toay'] },

        // --- Ciudad completa (por si escriben "Santa Rosa") ---
        { barrio: 'Santa Rosa', cps: ['L6300'], variantes: ['santa rosa', 'santa rosa la pampa', 'la pampa', 'capital'] }
    ];

    // Normalizar texto
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

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================================
    // 1. MODO OSCURO
    // =========================================
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (themeToggle && themeIcon) {
        // Verificar preferencia guardada
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', function() {
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
    }

    // =========================================
    // 2. MENÚ HAMBURGUESA
    // =========================================
    var menuToggle = document.getElementById('menuToggle');
    var mainNav = document.getElementById('mainNav');
    var menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

    if (menuToggle && mainNav && menuIcon) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            if (mainNav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic en cualquier enlace
        var allNavLinks = mainNav.querySelectorAll('a');
        allNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // =========================================
    // 3. HEADER SCROLL EFFECT
    // =========================================
    var header = document.querySelector('.header');
    var logoImg = document.querySelector('.logo img');
    
    if (header && logoImg) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                if (window.innerWidth > 768) {
                    logoImg.style.height = '48px';
                }
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = 'var(--shadow-sm)';
                if (window.innerWidth > 768) {
                    logoImg.style.height = '55px';
                }
            }
        });
    }

    // =========================================
    // 4. VERIFICADOR DE COBERTURA - SANTA ROSA
    // =========================================
    var coverageDatabase = [
        { barrio: 'Villa Parque', cps: ['L6300', '6300'], variantes: ['villa parque', 'parque', 'v parque'] },
        { barrio: 'Nuestra Señora de Luján', cps: ['L6300', '6300'], variantes: ['lujan', 'nuestra senora de lujan', 'ns de lujan', 'virgen de lujan'] },
        { barrio: 'Villa Santillán', cps: ['L6300', '6300'], variantes: ['santillan', 'villa santillan', 'v santillan'] },
        { barrio: 'Villa Alonso Norte', cps: ['L6300', '6300'], variantes: ['villa alonso', 'alonso norte', 'alonso', 'v alonso'] },
        { barrio: 'Aeropuerto', cps: ['L6300', '6300'], variantes: ['aeropuerto', 'aeropuerto 1', 'barrio aeropuerto'] },
        { barrio: 'Villa Martita', cps: ['L6300', '6300'], variantes: ['martita', 'villa martita', 'v martita'] },
        { barrio: 'Centro Empleados de Comercio', cps: ['L6300', '6300'], variantes: ['centro empleados', 'empleados de comercio', 'cec', 'empleados comercio'] },
        { barrio: 'Centro', cps: ['L6300', '6300'], variantes: ['centro', 'microcentro', 'centro santa rosa'] },
        { barrio: 'Polonia', cps: ['B1867CAT', 'B1867', 'L6300'], variantes: ['polonia', 'polonia 1756', 'calle polonia'] },
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
        { barrio: 'Butaló', cps: ['L6300'], variantes: ['butalo', 'barrio butalo'] },
        { barrio: 'FONAVI', cps: ['L6300'], variantes: ['fonavi'] },
        { barrio: 'Plan 5000', cps: ['L6300'], variantes: ['plan 5000', 'plan cinco mil'] },
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
        { barrio: 'Lowo Che', cps: ['L6300', 'L6301'], variantes: ['lowo che', 'lowoche'] },
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
        { barrio: 'Zona Quintas', cps: ['L6300'], variantes: ['zona quintas', 'quintas'] },
        { barrio: 'Villa Ale', cps: ['L6300'], variantes: ['villa ale', 'ale'] },
        { barrio: 'Villa Alonso', cps: ['L6300'], variantes: ['villa alonso', 'alonso'] },
        { barrio: 'Villa Aurora', cps: ['L6300', 'L6301'], variantes: ['villa aurora', 'aurora'] },
        { barrio: 'Villa Bertotti', cps: ['L6300', 'L6301'], variantes: ['villa bertotti', 'bertotti'] },
        { barrio: 'Villa Olga', cps: ['L6300', 'L6301'], variantes: ['villa olga', 'olga'] },
        { barrio: 'Toay', cps: ['L6301'], variantes: ['toay', 'ciudad de toay'] },
        { barrio: 'Santa Rosa', cps: ['L6300'], variantes: ['santa rosa', 'santa rosa la pampa', 'la pampa', 'capital'] }
    ];

    function normalizeText(text) {
        return text
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,#-]/g, '')
            .replace(/\s+/g, ' ');
    }

    var coverageInput = document.getElementById('coverageInput');
    var checkCoverageBtn = document.getElementById('checkCoverageBtn');
    var coverageResult = document.getElementById('coverageResult');

    function checkCoverage() {
        if (!coverageInput || !coverageResult) return;
        
        var query = normalizeText(coverageInput.value);
        
        if (!query) {
            coverageResult.innerHTML = '⚠️ Por favor, ingresá un barrio, dirección o código postal.';
            coverageResult.className = 'coverage-result error';
            return;
        }
        
        coverageResult.innerHTML = '⏳ Verificando disponibilidad...';
        coverageResult.className = 'coverage-result loading';
        
        setTimeout(function() {
            var matchFound = null;
            
            for (var i = 0; i < coverageDatabase.length; i++) {
                var zona = coverageDatabase[i];
                var barrioNorm = normalizeText(zona.barrio);
                var coincideBarrio = barrioNorm.indexOf(query) !== -1 || query.indexOf(barrioNorm) !== -1;
                
                var coincideVariante = zona.variantes.some(function(v) {
                    var vNorm = normalizeText(v);
                    return query.indexOf(vNorm) !== -1 || vNorm.indexOf(query) !== -1;
                });
                
                var coincideCP = zona.cps.some(function(cp) {
                    var cpNorm = normalizeText(cp);
                    return query === cpNorm || query.indexOf(cpNorm) !== -1;
                });
                
                if (coincideBarrio || coincideVariante || coincideCP) {
                    matchFound = zona;
                    break;
                }
            }
            
            if (matchFound) {
                coverageResult.innerHTML = '✅ ¡Buenas noticias! Tenemos cobertura en <strong>' + matchFound.barrio + '</strong>. <a href="#contacto" style="color: inherit; text-decoration: underline;">Contratá ahora</a>';
                coverageResult.className = 'coverage-result success';
            } else {
                try {
                    var busquedas = JSON.parse(localStorage.getItem('busquedasSinCobertura') || '[]');
                    busquedas.push({ zona: query, fecha: new Date().toISOString() });
                    localStorage.setItem('busquedasSinCobertura', JSON.stringify(busquedas));
                } catch(e) {}
                
                coverageResult.innerHTML = '❌ Todavía no llegamos a tu zona. <a href="https://wa.me/5491150059148?text=Hola,%20quiero%20saber%20si%20tienen%20cobertura%20en%20' + encodeURIComponent(query) + '" target="_blank" style="color: inherit; text-decoration: underline;">Avisanos por WhatsApp</a> y te confirmamos.';
                coverageResult.className = 'coverage-result error';
            }
        }, 800);
    }

    if (checkCoverageBtn && coverageInput) {
        checkCoverageBtn.addEventListener('click', checkCoverage);
        coverageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkCoverage();
            }
        });
    }

    // =========================================
    // 5. SCROLL REVEAL
    // =========================================
    if ('IntersectionObserver' in window) {
        var observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        var animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(function(el, index) {
            el.style.transitionDelay = (index * 0.1) + 's';
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antiguos
        var animatedElements2 = document.querySelectorAll('.animate-on-scroll');
        animatedElements2.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // =========================================
    // 6. FAQ ACORDEÓN
    // =========================================
    var faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            var faqItem = question.parentElement;
            
            document.querySelectorAll('.faq-item').forEach(function(item) {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            faqItem.classList.toggle('active');
        });
    });

    // =========================================
    // 7. FORMULARIO DE CONTACTO
    // =========================================
    var contactForm = document.getElementById('contactForm');
    var formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            formMessage.textContent = '¡Solicitud enviada con éxito! Nos contactaremos a la brevedad.';
            formMessage.style.color = '#22c55e';
            
            contactForm.reset();
            
            setTimeout(function() {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    // =========================================
    // 8. BOTÓN VOLVER ARRIBA
    // =========================================
    var backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =========================================
    // 9. SMOOTH SCROLL
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

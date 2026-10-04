document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Menú Hamburguesa para Móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Cambiar icono de hamburguesa a X
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

    // Cerrar menú al hacer clic en un enlace (para móviles)
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

    // 2. Efecto de scroll en el Header
    const header = document.querySelector('.header');
    const logoImg = document.querySelector('.logo img');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            // Reducir logo sutilmente al hacer scroll (solo en escritorio)
            if(window.innerWidth > 768 && logoImg) {
                logoImg.style.height = '50px'; 
            }
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'var(--shadow-sm)';
            if(window.innerWidth > 768 && logoImg) {
                logoImg.style.height = '55px'; 
            }
        }
    });

    // 3. Animación de aparición para las tarjetas (Scroll Reveal)
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

    // Aplicar animación a las tarjetas de planes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`; // Retraso escalonado
        observer.observe(el);
    });

    // 4. Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulación de envío exitoso
            formMessage.textContent = '¡Solicitud enviada con éxito! Nos contactaremos a la brevedad.';
            formMessage.style.color = '#22c55e'; // Verde éxito
            
            // Resetear formulario
            contactForm.reset();
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    // 5. Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
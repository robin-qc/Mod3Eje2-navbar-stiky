/* ===============================================
   NAVBAR STICKY UPDS - JAVASCRIPT PROFESIONAL
   ===============================================
   
   Funcionalidades implementadas:
   1. Detectar scroll y aplicar estilos al navbar
   2. Botón "Volver arriba" con animación
   3. Menú hamburguesa responsive
   4. Highlight de sección activa
   5. Smooth scroll mejorado
   6. Dropdown del estudiante UPDS
   7. Efectos y animaciones avanzadas
   =============================================== */

// Elementos del DOM
const navbar = document.getElementById('navbar');
const btnTop = document.getElementById('btnTop');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const studentBtn = document.getElementById('studentBtn');
const studentDropdown = document.getElementById('studentDropdown');

// Variables de control
let lastScroll = 0;
let isScrolling = false;
let dropdownTimeout;

// ===== NAVBAR SCROLLED CON EFECTOS AVANZADOS =====

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Limitar la frecuencia de ejecución
    if (!isScrolling) {
        isScrolling = true;
        
        requestAnimationFrame(() => {
            // Añadir clase .scrolled cuando scrolleamos más de 50px
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Efecto de opacidad progresiva
            const scrollProgress = Math.min(currentScroll / 100, 1);
            navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.9 + (0.08 * scrollProgress)})`;
            navbar.style.backdropFilter = `blur(${10 + (10 * scrollProgress)}px)`;
            
            // Mostrar botón "Volver arriba" después de 300px
            if (currentScroll > 300) {
                btnTop.classList.add('visible');
            } else {
                btnTop.classList.remove('visible');
            }
            
            // Actualizar sección activa
            updateActiveSection();
            
            isScrolling = false;
        });
    }
    
    lastScroll = currentScroll;
});

// ===== VOLVER ARRIBA CON ANIMACIÓN SUAVE =====

btnTop.addEventListener('click', () => {
    // Animación suave personalizada
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 800; // ms
    
    function scrollToTop(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeInOutCubic)
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition * (1 - easedProgress));
        
        if (progress < 1) {
            requestAnimationFrame(scrollToTop);
        }
    }
    
    requestAnimationFrame(scrollToTop);
});

// ===== MENÚ HAMBURGUESA RESPONSIVE =====

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    // Añadir animación a los enlaces del menú
    const menuItems = navMenu.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
        if (navMenu.classList.contains('active')) {
            item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        } else {
            item.style.animation = '';
        }
    });
});

// Cerrar menú al hacer click en enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Cerrar menú con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== DROPDOWN DEL ESTUDIANTE UPDS =====

studentBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    studentDropdown.classList.toggle('active');
    
    if (studentDropdown.classList.contains('active')) {
        studentBtn.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
    } else {
        studentBtn.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
    }
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    if (!studentBtn.contains(e.target) && !studentDropdown.contains(e.target)) {
        studentDropdown.classList.remove('active');
        studentBtn.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
    }
});

// Animación de entrada del dropdown
studentDropdown.addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
});

studentDropdown.addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        studentDropdown.classList.remove('active');
        studentBtn.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
    }, 300);
});

// ===== HIGHLIGHT ACTIVE SECTION MEJORADO =====

const sections = document.querySelectorAll('section[id]');

function updateActiveSection() {
    let current = '';
    const scrollPosition = window.pageYOffset + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLL MEJORADO =====

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Solo procesar enlaces internos
        if (href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const headerHeight = document.querySelector('.upds-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - headerHeight;
                
                // Animación smooth scroll personalizada
                smoothScrollTo(targetPosition, 800);
            }
        }
    });
});

// Función de smooth scroll personalizada
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
        const easedProgress = easeOutQuart(progress);
        
        window.scrollTo(0, startPosition + (distance * easedProgress));
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// ===== EFECTOS DE HOVER EN CARDS =====

const featureCards = document.querySelectorAll('.feature-card, .concept-card, .pricing-card, .testimonial');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ===== ANIMACIÓN DE ELEMENTOS AL SCROLL (Intersection Observer) =====

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.feature-card, .concept-card, .pricing-card, .testimonial, .step').forEach(el => {
    observer.observe(el);
});

// ===== INICIALIZACIÓN Y LOGS =====

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 NAVBAR STICKY UPDS - CARGADO');
    console.log('📚 Proyecto educativo por: Maycol Robin Quispe Calani');
    console.log('🏫 Universidad: UPDS - Universidad Privada Domingo Savio');
    console.log('📍 Características implementadas:');
    console.log('   - Navbar con position: sticky');
    console.log('   - Efectos blur al hacer scroll');
    console.log('   - Smooth scroll personalizado');
    console.log('   - Menú responsive con animaciones');
    console.log('   - Dropdown informativo del estudiante');
    console.log('   - Highlight de sección activa');
    console.log('   - Animaciones al hacer scroll');
    console.log('   - Efectos hover profesionales');
    console.log('=========================================');
    
    // Añadir clase inicial
    updateActiveSection();
});

// ===== PREVENIR ANIMACIONES DURANTE EL SCROLL (PERFORMANCE) =====

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Actualizar posiciones después del resize
        updateActiveSection();
    }, 250);
});

// ===== ANIMACIÓN CSS ADICIONAL =====

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .nav-link {
        opacity: 0;
    }
`;
document.head.appendChild(style);
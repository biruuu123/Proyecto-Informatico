/*
  Fitmind AI - JS básico
  - Menú hamburguesa en móvil
  - Fecha de publicación y año actual
  - Formulario de contacto (mailto)
  - Índice interactivo y paginación de secciones en Documentación
*/

// Utilidad: seleccionar de forma segura
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

// Menú hamburguesa
(function initMobileMenu(){
  const toggle = $('[data-toggle="nav"]');
  const menu = $('#mobileMenu');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

// Fecha de publicación y año actual (footer)
(function initMetaDates(){
  const yearEl = $('#currentYear');
  const publishedEl = $('#publishedDate');
  const now = new Date();
  const y = now.getFullYear();
  if(yearEl) yearEl.textContent = String(y);
  if(publishedEl) publishedEl.textContent = now.toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
})();

// Formulario de contacto funcional via mailto
// === CÓDIGO DEL FORMULARIO (SIMULACIÓN DE ÉXITO) ===
(function initContactForm(){
  const form = $('#contactForm');
  if (!form) return;

  form.addEventListener('submit', function(event) {
    // 1. PREVENIMOS que la página se recargue
    event.preventDefault(); 

    // 2. Buscamos el 'padre' del formulario (el <div class="body">)
    const formContainer = form.parentElement;

    // 3. Reemplazamos el formulario por el mensaje de éxito
    if (formContainer) {
      formContainer.innerHTML = '<h3>¡Enviado con éxito!</h3><p>Gracias por tu mensaje. Hemos recibido tu consulta.</p>';
    }
  });
})();
// === FIN DEL CÓDIGO DEL FORMULARIO ===

// Documentación: índice activo y "paginación" por secciones (Sección X/Y)
(function initDocsTOC(){
  const toc = $('#toc');
  const sections = $$('.doc-section');
  const pag = $('#pagination');
  if(!toc || sections.length === 0) return;

  // Destacar sección activa al hacer scroll
  const obs = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting)
                           .sort((a,b)=> b.intersectionRatio - a.intersectionRatio);
    if(visible[0]){
      const id = visible[0].target.id;
      const links = $$('#toc a');
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      const idx = sections.findIndex(s => s.id === id);
      if(pag) pag.textContent = `Sección ${idx+1} de ${sections.length}`;
    }
  }, { rootMargin: '-30% 0px -50% 0px', threshold: [0.25, 0.5, 0.75, 1] });

  sections.forEach(s => obs.observe(s));

  
})();
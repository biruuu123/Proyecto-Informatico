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
(function initContactForm(){
  const form = $('#contactForm');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = $('#nombre')?.value?.trim() || '';
    const email = $('#email')?.value?.trim() || '';
    const asunto = $('#asunto')?.value?.trim() || 'Consulta Fitmind AI';
    const mensaje = $('#mensaje')?.value?.trim() || '';

    // Construir cuerpo del mensaje
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`
    );
    const subject = encodeURIComponent(asunto);

    // Dirección oficial (editar en producción si cambia)
    const to = 'fitmind.ai@gmail.com';

    // Abrir cliente de correo
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
})();

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
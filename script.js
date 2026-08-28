(function () {
  const root = document.documentElement;
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  function systemPrefersDark() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    if (theme) {
      root.setAttribute('data-theme', theme);
      body.setAttribute('data-theme-resolved', theme);
    } else {
      root.removeAttribute('data-theme');
      body.setAttribute('data-theme-resolved', systemPrefersDark() ? 'dark' : 'light');
    }
  }

  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('theme');
  } catch (e) {}
  applyTheme(storedTheme);

  themeToggle.addEventListener('click', function () {
    const current = body.getAttribute('data-theme-resolved');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  });

  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.project-card');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;
      cards.forEach(function (card) {
        card.hidden = filter !== 'all' && card.dataset.type !== filter;
      });
    });
  });

  const translations = {
    es: {
      'nav.projects': 'Proyectos',
      'nav.about': 'Sobre mí',
      'nav.contact': 'Contacto',
      'theme.toggleAria': 'Cambiar tema',
      'hero.role': 'Desarrollador Full Stack · Enfoque Back-End',
      'hero.bio': 'Construyo proyectos modulares y escalables, pensados para facilitar el trabajo en equipo. Bogotá, Colombia.',
      'hero.contact': 'Contactar',
      'featured.title': 'Proyectos destacados',
      'featured.tag': 'En producción',
      'featured.pizza.desc': 'Aplicación web construida con Next.js. Desplegada y funcionando en vivo.',
      'featured.videogames.desc': 'Proyecto individual (SoyHenry): catálogo de videojuegos con filtros, CRUD y backend propio.',
      'common.demo': 'Ver demo',
      'common.code': 'Código',
      'common.download': 'Descargar',
      'common.viewRepo': 'Ver repositorio',
      'filters.all': 'Todos',
      'filters.demo': 'Con demo',
      'filters.desktop': 'Escritorio',
      'filters.code': 'Solo código',
      'filters.reference': 'Referencia',
      'projects.multipi.desc': 'Proyecto Next.js desplegado en Vercel.',
      'projects.dofus.desc': 'Aplicación de escritorio para gestionar la crianza de monturas en Dofus: hasta 6 cercados en paralelo, cálculo en tiempo real de madurez, nivel y serenidad. Proyecto más reciente y activo.',
      'projects.pifood.desc': 'Proyecto individual (SoyHenry): aplicación de recetas con backend propio y base de datos relacional.',
      'projects.pipokemon.desc': 'Proyecto individual (SoyHenry): explorador de Pokémon con filtros, creación de entradas propias y backend a medida.',
      'projects.angularzc.desc': 'Aplicación construida con Angular.',
      'projects.clinica.desc': 'Aplicación backend construida en Ruby on Rails.',
      'projects.griky.stack': 'Contenido / Documentación',
      'projects.griky.desc': 'Repositorio de referencia con material y estructura de cursos.',
      'about.title': 'Sobre mí',
      'about.text': 'Desarrollador Full Stack enfocado en Back-End, con foco en crear proyectos modulares y escalables que faciliten el trabajo en equipo. Con experiencia en JavaScript/TypeScript (Node, React, Next.js, Angular), C# (.NET), Ruby on Rails y diseño de APIs con bases de datos relacionales.',
      'footer.cta': '¿Trabajamos juntos?'
    },
    en: {
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'theme.toggleAria': 'Toggle theme',
      'hero.role': 'Full-Stack Developer · Back-End Focused',
      'hero.bio': 'I build modular, scalable projects designed to make teamwork easier. Bogotá, Colombia.',
      'hero.contact': 'Contact',
      'featured.title': 'Featured projects',
      'featured.tag': 'In production',
      'featured.pizza.desc': 'Web application built with Next.js. Deployed and running live.',
      'featured.videogames.desc': 'Individual project (SoyHenry): video game catalog with filters, CRUD, and a custom backend.',
      'common.demo': 'View demo',
      'common.code': 'Code',
      'common.download': 'Download',
      'common.viewRepo': 'View repository',
      'filters.all': 'All',
      'filters.demo': 'Live demo',
      'filters.desktop': 'Desktop',
      'filters.code': 'Code only',
      'filters.reference': 'Reference',
      'projects.multipi.desc': 'Next.js project deployed on Vercel.',
      'projects.dofus.desc': 'Desktop app for managing mount breeding in Dofus: up to 6 parallel pens, real-time tracking of maturity, level, and serenity. Most recent and actively maintained project.',
      'projects.pifood.desc': 'Individual project (SoyHenry): recipe app with a custom backend and relational database.',
      'projects.pipokemon.desc': 'Individual project (SoyHenry): Pokémon explorer with filters, custom entry creation, and a tailored backend.',
      'projects.angularzc.desc': 'Application built with Angular.',
      'projects.clinica.desc': 'Backend application built with Ruby on Rails.',
      'projects.griky.stack': 'Content / Documentation',
      'projects.griky.desc': 'Reference repository with course material and structure.',
      'about.title': 'About me',
      'about.text': 'Full-Stack developer focused on Back-End, dedicated to building modular, scalable projects that make teamwork easier. Experienced in JavaScript/TypeScript (Node, React, Next.js, Angular), C# (.NET), Ruby on Rails, and API design with relational databases.',
      'footer.cta': "Let's work together?"
    }
  };

  function applyLang(lang) {
    root.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.dataset.i18n;
      const value = translations[lang][key];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.dataset.i18nAria;
      const value = translations[lang][key];
      if (value !== undefined) el.setAttribute('aria-label', value);
    });
    langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
    langToggle.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
  }

  let storedLang = null;
  try {
    storedLang = localStorage.getItem('lang');
  } catch (e) {}
  applyLang(storedLang === 'en' ? 'en' : 'es');

  langToggle.addEventListener('click', function () {
    const next = root.getAttribute('lang') === 'es' ? 'en' : 'es';
    applyLang(next);
    try {
      localStorage.setItem('lang', next);
    } catch (e) {}
  });
})();

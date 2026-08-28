(function () {
  const root = document.documentElement;
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');

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

  let stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (e) {}
  applyTheme(stored);

  toggle.addEventListener('click', function () {
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
})();

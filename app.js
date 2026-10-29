(function () {
  var C = window.COURS;
  var SINGLE = !!window.SINGLE;
  var K = ['python', 'html', 'css', 'javascript', 'php', 'pythonweb', 'projet'].filter(function (key) { return C[key]; });
  var WEB = ['html', 'css', 'javascript', 'php', 'projet'];
  var PY = ['python', 'pythonweb'].filter(function (key) { return C[key]; });
  var COLORS = { html: '#e86a3a', css: '#3478e5', javascript: '#d49b00', php: '#7567bd', projet: '#168342', python: '#2b8a9e', pythonweb: '#c2417a' };
  var ICONS = { html: '</>', css: '{}', javascript: 'JS', php: '<?', projet: '✦', python: '>>>', pythonweb: '{%' };
  function short(key) { return C[key].short || C[key].name; }
  var route = SINGLE ? (location.hash.slice(1) || 'index') : window.PAGE;
  var current = {};
  var done = {};
  try { done = JSON.parse(localStorage.getItem('atelier2') || '{}'); } catch (error) { done = {}; }

  function save() { try { localStorage.setItem('atelier2', JSON.stringify(done)); } catch (error) {} }
  function el(tag, className, text) { var node = document.createElement(tag); if (className) node.className = className; if (text !== undefined && text !== null) node.textContent = text; return node; }
  function count(domain) { return C[domain].L.filter(function (_, index) { return done[domain + index]; }).length; }
  function link(page, text, className) {
    var anchor = el('a', className || '', text);
    anchor.href = SINGLE ? '#' + page : page + '.html';
    if (SINGLE) anchor.onclick = function (event) { event.preventDefault(); go(page); };
    return anchor;
  }
  function sectionLink(id, text, className) {
    var anchor = el('a', className || '', text);
    anchor.href = (window.PAGE === 'index' || SINGLE) ? '#' + id : 'index.html#' + id;
    if (SINGLE) anchor.onclick = function (event) { event.preventDefault(); if (route !== 'index') go('index'); setTimeout(function () { var target = document.getElementById(id); if (target) target.scrollIntoView({ behavior: 'smooth' }); }, 0); };
    return anchor;
  }
  function go(page) { route = page; if (SINGLE) { try { location.hash = page; } catch (error) {} } render(); window.scrollTo(0, 0); }
  window.addEventListener('hashchange', function () { if (!SINGLE) return; var page = location.hash.slice(1) || 'index'; if (page !== route) { route = page; render(); } });

  var MOTION = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var heroTimer = null, revealObserver = null;
  if (MOTION) document.documentElement.classList.add('motion');
  window.addEventListener('scroll', function () { document.documentElement.classList.toggle('is-scrolled', window.scrollY > 8); }, { passive: true });

  var ICON_PATHS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    book: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>'
  };
  function icon(name, className) {
    var span = el('span', 'icon' + (className ? ' ' + className : '')); span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICON_PATHS[name] + '</svg>';
    return span;
  }
  function cap(text) { return text.charAt(0).toUpperCase() + text.slice(1); }

  function top(page, home) {
    var bar = el('header', 'topbar' + (home ? ' topbar-home' : ' topbar-course'));
    var skip = el('a', 'skip-link', 'Aller au contenu'); skip.href = '#contenu'; bar.appendChild(skip);
    var brand = link('index', '', 'brand'); brand.setAttribute('aria-label', 'Atelier Web, accueil');
    var mark = el('span', 'brand-mark'), logo = el('img', 'brand-logo'); logo.src = 'logo.svg'; logo.alt = ''; mark.appendChild(logo);
    var brandText = el('span', 'brand-text'); brandText.appendChild(el('strong', '', 'Atelier Web')); brandText.appendChild(el('small', '', 'Apprendre le numérique'));
    brand.appendChild(mark); brand.appendChild(brandText); bar.appendChild(brand);
    var menu = el('button', 'menu-toggle'); menu.type = 'button'; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-controls', 'site-links'); menu.setAttribute('aria-label', 'Ouvrir le menu'); menu.appendChild(el('span', 'menu-lines')); bar.appendChild(menu);
    var links = el('nav', 'top-links'); links.id = 'site-links'; links.setAttribute('aria-label', 'Navigation principale');
    K.forEach(function (key) { var anchor = link(key, short(key)); if (key === page) anchor.setAttribute('aria-current', 'page'); links.appendChild(anchor); });
    links.appendChild(sectionLink('about', 'À propos'));
    links.appendChild(sectionLink('contact', 'Contact'));
    if (home) links.appendChild(link(K[0], 'Commencer', 'nav-cta'));
    bar.appendChild(links);
    function setOpen(open) { links.classList.toggle('is-open', open); bar.classList.toggle('menu-open', open); menu.setAttribute('aria-expanded', open ? 'true' : 'false'); menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu'); }
    menu.onclick = function () { setOpen(!links.classList.contains('is-open')); };
    links.addEventListener('click', function (event) { if (event.target.closest('a')) setOpen(false); });
    bar.addEventListener('keydown', function (event) { if (event.key === 'Escape' && links.classList.contains('is-open')) { setOpen(false); menu.focus(); } });
    return bar;
  }

  function sectionTitle(kicker, title, intro, center) {
    var wrap = el('div', 'section-heading' + (center ? ' is-center' : '')); if (kicker) wrap.appendChild(el('span', 'eyebrow', kicker)); wrap.appendChild(el('h2', '', title)); if (intro) wrap.appendChild(el('p', '', intro)); return wrap;
  }
  function progress(domain) { return Math.round((count(domain) / C[domain].L.length) * 100); }

  var SNIPPETS = {
    html: [[['k', '<section'], ['a', ' class'], ['p', '='], ['s', '"carte"'], ['k', '>']], [['', '  '], ['k', '<h2>'], ['', 'Mon premier site'], ['k', '</h2>']], [['', '  '], ['k', '<p>'], ['', 'Créé avec Atelier Web'], ['k', '</p>']], [['', '  '], ['k', '<a'], ['a', ' href'], ['p', '='], ['s', '"#"'], ['k', '>'], ['', 'Découvrir'], ['k', '</a>']], [['k', '</section>']]],
    css: [[['k', '.carte'], ['p', ' {']], [['', '  '], ['a', 'padding'], ['p', ': '], ['s', '1.5rem'], ['p', ';']], [['', '  '], ['a', 'border-radius'], ['p', ': '], ['s', '1rem'], ['p', ';']], [['', '  '], ['a', 'background'], ['p', ': '], ['s', '#e9f8dc'], ['p', ';']], [['p', '}']]],
    javascript: [[['k', 'const'], ['', ' lien '], ['p', '= '], ['a', 'document']], [['p', '  .'], ['a', 'querySelector'], ['p', '('], ['s', "'a'"], ['p', ');']], [['a', 'lien'], ['p', '.'], ['a', 'onclick'], ['p', ' = () '], ['k', '=>'], ['p', ' {']], [['', '  '], ['a', 'alert'], ['p', '('], ['s', "'Bienvenue !'"], ['p', ');']], [['p', '};']]],
    php: [[['k', '<?php']], [['a', '$prenom'], ['p', ' = '], ['s', "'Awa'"], ['p', ';']], [['k', 'echo'], ['', ' '], ['s', '"Bonjour $prenom !"'], ['p', ';']], [['k', '?>']]]
  };

  function codeLines(pre, lang) {
    pre.textContent = '';
    SNIPPETS[lang].forEach(function (line, index) {
      var row = el('span', 'code-line'); row.style.setProperty('--i', index);
      line.forEach(function (token) { row.appendChild(token[0] ? el('span', 'tk-' + token[0], token[1]) : document.createTextNode(token[1])); });
      if (index === SNIPPETS[lang].length - 1) row.appendChild(el('span', 'caret'));
      pre.appendChild(row);
    });
  }

  function heroVisual(totals) {
    var langs = ['html', 'css', 'javascript', 'php'], files = { html: 'index.html', css: 'style.css', javascript: 'app.js', php: 'index.php' };
    var visual = el('div', 'hero-visual'); visual.setAttribute('aria-hidden', 'true');
    var win = el('div', 'editor-window'), chrome = el('div', 'editor-chrome'), dots = el('span', 'chrome-dots'), tabs = el('div', 'editor-tabs');
    dots.appendChild(el('i')); dots.appendChild(el('i')); dots.appendChild(el('i')); chrome.appendChild(dots);
    langs.forEach(function (lang) { var tab = el('span', 'editor-tab', files[lang]); tab.style.setProperty('--tab-accent', COLORS[lang]); tabs.appendChild(tab); });
    chrome.appendChild(tabs); win.appendChild(chrome);
    var pre = el('pre', 'editor-code'); win.appendChild(pre); visual.appendChild(win);
    var preview = el('div', 'preview-card'), site = el('div', 'preview-site'), toast = el('span', 'preview-toast');
    preview.appendChild(el('span', 'preview-label', 'APERÇU EN DIRECT'));
    site.appendChild(el('strong', '', 'Mon premier site')); site.appendChild(el('small', '', 'Créé avec Atelier Web')); site.appendChild(el('span', 'fake-button', 'Découvrir'));
    preview.appendChild(site); preview.appendChild(toast); visual.appendChild(preview);
    var badge = el('div', 'float-badge'), badgeText = el('span'); badge.appendChild(icon('check', 'badge-check'));
    badgeText.appendChild(el('strong', '', 'Leçon validée')); badgeText.appendChild(el('small', '', '+1 compétence acquise')); badge.appendChild(badgeText); visual.appendChild(badge);
    var pct = totals.lessons ? Math.round(totals.done / totals.lessons * 100) : 0, meter = el('div', 'float-progress'), ring = el('span', 'ring'), meterText = el('span');
    ring.style.setProperty('--p', pct); ring.appendChild(el('b', '', pct + '%')); meter.appendChild(ring);
    meterText.appendChild(el('strong', '', 'Votre progression')); meterText.appendChild(el('small', '', totals.done + ' / ' + totals.lessons + ' leçons')); meter.appendChild(meterText); visual.appendChild(meter);
    var step = 0, paused = false;
    function show(index) {
      var lang = langs[index]; visual.setAttribute('data-lang', lang);
      Array.prototype.forEach.call(tabs.children, function (tab, tabIndex) { tab.classList.toggle('is-active', tabIndex === index); });
      codeLines(pre, lang); toast.textContent = lang === 'javascript' ? 'Bienvenue !' : lang === 'php' ? 'Bonjour Awa !' : '';
    }
    show(0);
    if (MOTION) {
      visual.onmouseenter = function () { paused = true; }; visual.onmouseleave = function () { paused = false; };
      heroTimer = setInterval(function () { if (paused || document.hidden) return; step = (step + 1) % langs.length; show(step); }, 4200);
    }
    return visual;
  }

  function countUp(node) {
    var target = +node.getAttribute('data-count'), start = null; if (!target) return;
    function frame(time) { if (start === null) start = time; var t = Math.min((time - start) / 900, 1); node.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))); if (t < 1) requestAnimationFrame(frame); }
    node.textContent = '0'; requestAnimationFrame(frame);
  }
  function reveal(root) {
    var nodes = root.querySelectorAll('.reveal');
    if (!MOTION || !('IntersectionObserver' in window)) { Array.prototype.forEach.call(nodes, function (node) { node.classList.remove('reveal'); }); return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return; var node = entry.target; observer.unobserve(node); node.classList.add('is-visible');
        Array.prototype.forEach.call(node.querySelectorAll('[data-count]'), countUp);
        setTimeout(function () { node.classList.remove('reveal', 'is-visible'); }, 1100);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    Array.prototype.forEach.call(nodes, function (node) { observer.observe(node); });
    revealObserver = observer;
  }

  function home(app) {
    app.className = 'site home-page';
    app.appendChild(top('index', true));
    var main = el('main', 'home-main'); main.id = 'contenu'; main.tabIndex = -1; app.appendChild(main);
    var totals = { lessons: 0, projects: 0, done: 0 };
    K.forEach(function (key) { totals.lessons += C[key].L.length; totals.projects += (C[key].projects || []).length; totals.done += count(key); });
    var started = totals.done > 0 && totals.done < totals.lessons;
    var resumeKey = started ? (K.filter(function (key) { var n = count(key); return n > 0 && n < C[key].L.length; })[0] || K.filter(function (key) { return count(key) < C[key].L.length; })[0]) : K[0];
    var ctaText = started ? 'Reprendre ' + short(resumeKey) : totals.done ? 'Revoir les parcours' : 'Commencer avec ' + short(K[0]);

    var hero = el('section', 'hero'), heroBg = el('div', 'hero-bg'), heroInner = el('div', 'hero-inner'), heroCopy = el('div', 'hero-copy');
    hero.setAttribute('aria-labelledby', 'hero-title'); heroBg.setAttribute('aria-hidden', 'true'); hero.appendChild(heroBg);
    var badge = el('span', 'hero-badge'); badge.appendChild(el('span', 'badge-dot')); badge.appendChild(el('span', '', 'Formation web en français · à votre rythme')); heroCopy.appendChild(badge);
    var h1 = el('h1'); h1.id = 'hero-title'; h1.innerHTML = 'Apprenez à créer <em>le web qui vous ressemble.</em>'; heroCopy.appendChild(h1);
    heroCopy.appendChild(el('p', 'hero-lead', 'Un parcours clair et concret pour comprendre les technologies web, coder directement dans le navigateur et construire des projets dont vous serez fier.'));
    var actions = el('div', 'hero-actions'), start = link(resumeKey, ctaText, 'button button-primary button-lg'); start.appendChild(icon('arrow'));
    actions.appendChild(start); actions.appendChild(sectionLink('parcours', 'Voir les parcours', 'button button-secondary button-lg')); heroCopy.appendChild(actions);
    var stack = el('div', 'hero-stack'); stack.appendChild(el('span', 'hero-stack-label', 'Au programme'));
    K.forEach(function (key) { var chip = el('span', 'tech-chip', short(key)); chip.style.setProperty('--accent', COLORS[key]); stack.appendChild(chip); }); heroCopy.appendChild(stack);
    heroInner.appendChild(heroCopy); heroInner.appendChild(heroVisual(totals)); hero.appendChild(heroInner); main.appendChild(hero);

    var stats = el('section', 'stats-band'), statGrid = el('div', 'stats-grid reveal'); stats.setAttribute('aria-label', 'Chiffres clés');
    [[K.length, 'parcours complets'], [totals.lessons, 'leçons guidées'], [totals.projects, 'projets pratiques'], [0, 'installation requise']].forEach(function (item) {
      var stat = el('div', 'stat'), value = el('strong', '', String(item[0])); value.setAttribute('data-count', item[0]); stat.appendChild(value); stat.appendChild(el('span', '', item[1])); statGrid.appendChild(stat);
    });
    stats.appendChild(statGrid); main.appendChild(stats);

    if (PY.length) {
      var pySection = el('section', 'home-section python-section'), pyGrid = el('div', 'py-grid'); pySection.id = 'python';
      pySection.appendChild(sectionTitle('NOUVEAU · PYTHON', 'Programmer avec Python, de la logique au Web', 'Deux parcours complémentaires : apprenez d’abord à raisonner comme un programmeur, puis construisez de vraies applications Web avec Django.'));
      PY.forEach(function (key, index) {
        var domain = C[key], finished = count(key), pct = progress(key), card = el('article', 'py-card reveal'), title = el('h3', '', domain.name);
        card.style.setProperty('--accent', COLORS[key]); card.style.setProperty('--d', index * 90 + 'ms'); title.id = 'py-title-' + key; card.setAttribute('aria-labelledby', title.id);
        var head = el('div', 'card-top'), mark = el('span', 'domain-icon', ICONS[key]); mark.setAttribute('aria-hidden', 'true');
        head.appendChild(mark); head.appendChild(el('span', 'py-badge' + (domain.badgeStrong ? ' is-strong' : ''), domain.badge)); card.appendChild(head);
        card.appendChild(title); card.appendChild(el('p', 'py-desc', domain.desc));
        var meta = el('div', 'card-meta'); [domain.L.length + ' leçons', domain.level, (domain.projects || []).length + ' projets'].forEach(function (text) { meta.appendChild(el('span', 'chip', text)); }); card.appendChild(meta);
        var prereq = el('p', 'py-prereq'); prereq.appendChild(el('strong', '', 'Prérequis : ')); prereq.appendChild(document.createTextNode(domain.prereq)); card.appendChild(prereq);
        var programme = el('details', 'py-program'), lessons = el('ol'); programme.appendChild(el('summary', '', 'Programme des ' + domain.L.length + ' leçons'));
        domain.L.forEach(function (lesson, lessonIndex) { lessons.appendChild(el('li', done[key + lessonIndex] ? 'is-done' : '', lesson.t)); }); programme.appendChild(lessons); card.appendChild(programme);
        var foot = el('div', 'card-foot'), bar = el('span', 'card-progress'), fill = el('i'); fill.style.width = pct + '%'; bar.setAttribute('aria-hidden', 'true'); bar.appendChild(fill);
        foot.appendChild(bar); foot.appendChild(el('span', 'py-progress-label', finished ? pct + ' % terminé' : 'Pas encore commencé')); card.appendChild(foot);
        var cardActions = el('div', 'py-actions'), begin = link(key, finished ? 'Continuer la formation' : 'Commencer la formation', 'button button-primary'), program = el('a', 'button button-secondary', 'Voir le programme');
        begin.appendChild(icon('arrow')); program.href = SINGLE ? '#' + key : key + '.html#programme'; if (SINGLE) program.onclick = function (event) { event.preventDefault(); go(key); };
        cardActions.appendChild(begin); cardActions.appendChild(program); card.appendChild(cardActions); pyGrid.appendChild(card);
      });
      pySection.appendChild(pyGrid); main.appendChild(pySection);
    }

    var formations = el('section', 'home-section'); formations.id = 'parcours';
    formations.appendChild(sectionTitle('LES PARCOURS WEB', 'Du premier tag au projet final', 'Chaque domaine part des fondamentaux et vous emmène vers une réalisation concrète. Votre progression est sauvegardée dans ce navigateur.'));
    var grid = el('div', 'course-grid');
    WEB.forEach(function (key, index) {
      var domain = C[key], finished = count(key), pct = progress(key), feature = key === 'projet';
      var card = el('article', 'course-card reveal' + (index > 2 ? ' is-wide' : '') + (feature ? ' is-feature' : ''));
      card.style.setProperty('--accent', feature ? '#a4df39' : COLORS[key]); card.style.setProperty('--d', (index % 3) * 80 + 'ms');
      var head = el('div', 'card-top'), mark = el('span', 'domain-icon', ICONS[key]); mark.setAttribute('aria-hidden', 'true');
      head.appendChild(mark); head.appendChild(el('span', 'card-step', 'ÉTAPE ' + String(index + 1).padStart(2, '0'))); card.appendChild(head);
      var title = el('h3'); title.appendChild(link(key, domain.name, 'card-link')); card.appendChild(title);
      card.appendChild(el('p', 'card-tag', cap(domain.tag) + '.'));
      var lessons = el('ul', 'card-lessons'); domain.L.slice(0, 3).forEach(function (lesson) { lessons.appendChild(el('li', '', lesson.t)); });
      if (domain.L.length > 3) lessons.appendChild(el('li', 'more', '+ ' + (domain.L.length - 3) + ' autres leçons')); card.appendChild(lessons);
      var meta = el('div', 'card-meta'); [domain.L.length + ' leçons', (domain.projects || []).length + ' projets', index === 0 ? 'Débutant' : feature ? 'Synthèse' : 'Progressif'].forEach(function (text) { meta.appendChild(el('span', 'chip', text)); }); card.appendChild(meta);
      var foot = el('div', 'card-foot'), bar = el('span', 'card-progress'), fill = el('i'); fill.style.width = pct + '%'; bar.setAttribute('aria-hidden', 'true'); bar.appendChild(fill); foot.appendChild(bar);
      var cta = el('span', 'card-cta', pct === 100 ? 'Terminé' : finished ? pct + ' % · Continuer' : 'Commencer'); cta.appendChild(icon(pct === 100 ? 'check' : 'arrow')); foot.appendChild(cta); card.appendChild(foot);
      grid.appendChild(card);
    });
    formations.appendChild(grid); main.appendChild(formations);

    var method = el('section', 'home-section is-band method-section');
    method.appendChild(sectionTitle('LA MÉTHODE', 'Apprendre en faisant, pas en regardant passer', 'Chaque notion suit le même cycle : vous comprenez, vous essayez, puis vous construisez quelque chose de réel.', true));
    var steps = el('ol', 'method-grid');
    [['book', 'Comprendre', 'Des définitions claires, des concepts illustrés et des exemples tirés de situations professionnelles.'], ['code', 'Pratiquer', 'Modifiez le code directement dans la leçon et observez le résultat en direct, sans rien installer.'], ['rocket', 'Construire', 'Validez vos acquis avec un quiz, puis réalisez des projets guidés à présenter dans votre portfolio.']].forEach(function (item, index) {
      var stepNode = el('li', 'step reveal'); stepNode.style.setProperty('--d', index * 100 + 'ms');
      stepNode.appendChild(icon(item[0], 'step-icon')); stepNode.appendChild(el('span', 'step-num', '0' + (index + 1))); stepNode.appendChild(el('h3', '', item[1])); stepNode.appendChild(el('p', '', item[2])); steps.appendChild(stepNode);
    });
    method.appendChild(steps);
    var features = el('div', 'feature-strip reveal'), featureList = el('ul'); features.appendChild(el('strong', '', 'Dans les leçons'));
    ['Niveau et durée estimée', 'Code expliqué pas à pas', 'Éditeur avec aperçu en direct', 'Quiz avec correction', 'Progression sauvegardée'].forEach(function (text) { var item = el('li'); item.appendChild(icon('check')); item.appendChild(document.createTextNode(text)); featureList.appendChild(item); });
    features.appendChild(featureList); method.appendChild(features); main.appendChild(method);

    var projects = el('section', 'home-section projects-section');
    projects.appendChild(sectionTitle('PASSER À L’ACTION', 'Des projets pour donner forme à vos idées', 'Chaque parcours se termine par des briefs progressifs, avec cahier des charges, étapes, livrables et grille d’évaluation.'));
    var projectGrid = el('div', 'project-grid');
    ['html', 'javascript', 'projet'].forEach(function (key, index) {
      var item = C[key].projects[0], tile = el('article', 'project-tile reveal'); tile.style.setProperty('--accent', COLORS[key]); tile.style.setProperty('--d', index * 90 + 'ms');
      var head = el('div', 'project-tile-head'); head.appendChild(el('span', 'project-domain', C[key].name)); head.appendChild(el('span', 'chip', item.level)); tile.appendChild(head);
      var title = el('h3'); title.appendChild(link(key, item.title, 'card-link')); tile.appendChild(title);
      tile.appendChild(el('p', '', item.presentation));
      if (Array.isArray(item.skills)) { var skills = el('ul', 'skill-list'); item.skills.slice(0, 3).forEach(function (skill) { skills.appendChild(el('li', '', skill)); }); tile.appendChild(skills); }
      var more = el('span', 'card-cta', 'Découvrir le parcours'); more.appendChild(icon('arrow')); tile.appendChild(more); projectGrid.appendChild(tile);
    });
    projects.appendChild(projectGrid); main.appendChild(projects);

    var about = el('section', 'home-section is-band about-section'); about.id = 'about';
    var aboutGrid = el('div', 'about-grid'), aboutCopy = el('div', 'about-copy');
    aboutCopy.appendChild(sectionTitle('À PROPOS', 'Une plateforme pour apprendre en construisant'));
    aboutCopy.appendChild(el('p', '', 'L’objectif est simple : rendre le développement web plus clair, plus pratique et plus accessible, avec une progression qui relie chaque notion à une réalisation.'));
    aboutCopy.appendChild(el('p', '', 'Atelier Web s’adresse aux personnes qui veulent apprendre, pratiquer et donner une forme professionnelle à leurs idées numériques, directement dans le navigateur.'));
    var values = el('ul', 'values');
    [['Clair', 'une notion à la fois, avec un objectif explicite.'], ['Pratique', 'du code à modifier et à tester dans les leçons.'], ['Accessible', 'en français, sans compte ni inscription.']].forEach(function (item) {
      var row = el('li'), text = el('span'); row.appendChild(icon('check', 'value-icon')); text.appendChild(el('strong', '', item[0])); text.appendChild(document.createTextNode(' — ' + item[1])); row.appendChild(text); values.appendChild(row);
    });
    aboutCopy.appendChild(values); aboutGrid.appendChild(aboutCopy);
    var aboutCard = el('aside', 'about-card reveal'), chip = el('span', 'logo-chip'), aboutLogo = el('img'); aboutLogo.src = 'logo.svg'; aboutLogo.alt = 'BoyDiop Technologie'; chip.appendChild(aboutLogo); aboutCard.appendChild(chip);
    aboutCard.appendChild(el('strong', '', 'Comprendre → pratiquer → construire'));
    aboutCard.appendChild(el('p', '', 'Une plateforme portée par BoyDiop Technologie. Chaque leçon vous invite à modifier, tester et expliquer ce que vous venez de découvrir.'));
    var flow = el('div', 'flow'); K.forEach(function (key) { flow.appendChild(el('span', '', short(key))); }); aboutCard.appendChild(flow);
    aboutGrid.appendChild(aboutCard); about.appendChild(aboutGrid); main.appendChild(about);

    var contact = el('section', 'home-section contact-section'); contact.id = 'contact';
    var contactLayout = el('div', 'contact-layout'), contactGrid = el('div', 'contact-grid');
    contactLayout.appendChild(sectionTitle('CONTACT', 'Une question sur le parcours ?', 'Écrivez ou appelez directement pour une question sur les formations, le contenu pédagogique ou le fonctionnement de la plateforme.'));
    [{ icon: 'phone', label: 'Téléphone', value: '77 970 87 82', href: 'tel:+221779708782', hint: 'Appeler directement' }, { icon: 'mail', label: 'E-mail', value: 'samba.diop3@univ-thies.sn', href: 'mailto:samba.diop3@univ-thies.sn', hint: 'Envoyer un message', copy: true }].forEach(function (item, index) {
      var card = el('div', 'contact-card reveal'), body = el('div', 'contact-body'), anchor = el('a', 'contact-link', item.value); card.style.setProperty('--d', index * 90 + 'ms');
      card.appendChild(icon(item.icon, 'contact-icon')); anchor.href = item.href;
      body.appendChild(el('span', 'contact-label', item.label)); body.appendChild(anchor); body.appendChild(el('span', 'contact-hint', item.hint)); card.appendChild(body);
      if (item.copy && navigator.clipboard) {
        var copy = el('button', 'copy-button'), copyText = el('span', '', 'Copier'), status = el('span', 'sr-only'); copy.type = 'button'; copy.setAttribute('aria-label', 'Copier l’adresse e-mail'); status.setAttribute('role', 'status');
        copy.appendChild(icon('copy')); copy.appendChild(copyText);
        copy.onclick = function () {
          navigator.clipboard.writeText(item.value).then(function () {
            copy.classList.add('is-copied'); copyText.textContent = 'Copié'; status.textContent = 'Adresse e-mail copiée';
            setTimeout(function () { copy.classList.remove('is-copied'); copyText.textContent = 'Copier'; status.textContent = ''; }, 2000);
          }, function () { copyText.textContent = 'Échec'; });
        };
        card.appendChild(copy); card.appendChild(status);
      }
      contactGrid.appendChild(card);
    });
    contactLayout.appendChild(contactGrid); contact.appendChild(contactLayout); main.appendChild(contact);

    var ctaWrap = el('section', 'final-cta-wrap'), finalCta = el('div', 'final-cta reveal'), ctaActions = el('div', 'cta-actions');
    finalCta.appendChild(el('span', 'eyebrow', 'PRÊT À COMMENCER ?'));
    finalCta.appendChild(el('h2', '', 'Votre prochaine compétence commence par une première leçon.'));
    finalCta.appendChild(el('p', '', 'Choisissez un domaine et avancez à votre rythme, une notion après l’autre.'));
    var ctaStart = link(resumeKey, ctaText, 'button button-light button-lg'); ctaStart.appendChild(icon('arrow')); ctaActions.appendChild(ctaStart);
    ctaActions.appendChild(link('projet', 'Explorer le projet final', 'button button-outline-light button-lg'));
    finalCta.appendChild(ctaActions); ctaWrap.appendChild(finalCta); main.appendChild(ctaWrap);

    var footer = el('footer', 'site-footer'), footerInner = el('div', 'footer-inner'), footerBrand = el('div', 'footer-brand'), footerChip = el('span', 'logo-chip'), footerLogo = el('img');
    footerLogo.src = 'logo.svg'; footerLogo.alt = 'BoyDiop Technologie'; footerChip.appendChild(footerLogo); footerBrand.appendChild(footerChip);
    footerBrand.appendChild(el('strong', '', 'Atelier Web')); footerBrand.appendChild(el('p', '', 'Un parcours BoyDiop Technologie pour apprendre, pratiquer et construire le web.')); footerInner.appendChild(footerBrand);
    function column(title, items) { var col = el('nav', 'footer-col'); col.setAttribute('aria-label', title); col.appendChild(el('strong', 'footer-title', title)); items.forEach(function (item) { col.appendChild(item); }); return col; }
    var footerPhone = el('a', '', '77 970 87 82'), footerMail = el('a', '', 'samba.diop3@univ-thies.sn'); footerPhone.href = 'tel:+221779708782'; footerMail.href = 'mailto:samba.diop3@univ-thies.sn';
    footerInner.appendChild(column('Parcours', K.map(function (key) { return link(key, short(key)); })));
    footerInner.appendChild(column('Plateforme', [sectionLink('parcours', 'Tous les parcours'), sectionLink('about', 'À propos'), sectionLink('contact', 'Contact')]));
    footerInner.appendChild(column('Contact', [footerPhone, footerMail]));
    var footerBottom = el('div', 'footer-bottom'), toTop = el('button', 'to-top', 'Retour en haut'); toTop.type = 'button'; toTop.appendChild(icon('up'));
    toTop.onclick = function () { window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' }); };
    footerBottom.appendChild(el('small', '', '© ' + new Date().getFullYear() + ' BoyDiop Technologie. Tous droits réservés.')); footerBottom.appendChild(toTop);
    footer.appendChild(footerInner); footer.appendChild(footerBottom); app.appendChild(footer);
    reveal(app);
  }

  var LANGS = { python: 'Python', bash: 'Terminal', html: 'Template HTML', css: 'CSS', json: 'JSON', csv: 'CSV', http: 'HTTP', text: 'Texte' };
  function rich(node, text) { String(text).split('`').forEach(function (part, index) { node.appendChild(index % 2 ? el('code', 'inline-code', part) : document.createTextNode(part)); }); return node; }
  function paragraphs(node, text) { (text || '').split('\n').forEach(function (line) { if (line.trim()) node.appendChild(rich(el('p'), line)); }); }
  function itemList(items, ordered) {
    var list = el(ordered ? 'ol' : 'ul', 'section-list');
    items.forEach(function (item) {
      var row = el('li');
      if (Array.isArray(item) && /^(https?:\/\/|[\w-]+\.html)/.test(item[1])) { var anchor = el('a', '', item[0]); anchor.href = item[1]; if (/^https?:/.test(item[1])) { anchor.target = '_blank'; anchor.rel = 'noopener'; } row.appendChild(anchor); if (item[2]) rich(row, ' — ' + item[2]); }
      else if (Array.isArray(item)) { row.appendChild(rich(el('strong'), item[0])); rich(row, ' : ' + item[1]); }
      else rich(row, item);
      list.appendChild(row);
    });
    return list;
  }
  function codeBlock(container, code, lang, output, file) {
    var figure = el('figure', 'code-figure'), head = el('figcaption', 'code-head');
    head.appendChild(el('span', 'code-lang', file || LANGS[lang || 'python'] || lang));
    if (navigator.clipboard) { var copy = el('button', 'code-copy', 'Copier'); copy.type = 'button'; copy.onclick = function () { navigator.clipboard.writeText(code).then(function () { copy.textContent = 'Copié ✓'; setTimeout(function () { copy.textContent = 'Copier'; }, 1600); }); }; head.appendChild(copy); }
    figure.appendChild(head); figure.appendChild(el('pre', 'code-block is-compact', code));
    if (output !== undefined) { var result = el('div', 'code-output'); result.appendChild(el('span', 'code-output-label', 'Résultat affiché')); result.appendChild(el('pre', '', output)); figure.appendChild(result); }
    container.appendChild(figure);
  }
  function sectionBody(node, part) {
    paragraphs(node, part.text);
    if (part.items) node.appendChild(itemList(part.items, part.ordered));
    if (part.code) codeBlock(node, part.code, part.lang, part.output, part.file);
    paragraphs(node, part.after);
    (part.blocks || []).forEach(function (block) { sectionBody(node, block); });
  }
  function lessonSection(container, section, index) {
    var box = el('section', 'lesson-section ' + (section.type || 'concept')); box.id = 'section-' + index; box.appendChild(el('h3', '', section.title));
    sectionBody(box, section);
    if (section.solution) { var details = el('details', 'solution'), body = el('div', 'solution-body'); details.appendChild(el('summary', '', section.solutionLabel || 'Voir la correction')); sectionBody(body, section.solution); details.appendChild(body); box.appendChild(details); }
    container.appendChild(box);
  }
  function lessonMeta(container, lesson) { var meta = el('div', 'lesson-meta'); meta.appendChild(el('span', 'meta-pill', 'Niveau : ' + (lesson.level || 'Débutant'))); meta.appendChild(el('span', 'meta-pill', 'Durée : ' + (lesson.duration || '45 min'))); if (lesson.next) meta.appendChild(el('span', 'meta-next', 'Ensuite : ' + lesson.next)); container.appendChild(meta); if (lesson.sections && lesson.sections.length) { var toc = el('nav', 'lesson-toc'); toc.setAttribute('aria-label', 'Sommaire de la leçon'); toc.appendChild(el('strong', '', 'Dans cette leçon')); lesson.sections.forEach(function (section, index) { var anchor = el('a', '', section.title); anchor.href = '#section-' + index; toc.appendChild(anchor); }); container.appendChild(toc); } }
  function projectsBlock(app, domain) { if (!domain.projects || !domain.projects.length) return; var section = el('section', 'course-projects'); section.appendChild(sectionTitle('POUR ALLER PLUS LOIN', 'Projets pratiques et projets finaux', 'Des briefs progressifs pour mobiliser les notions et construire un portfolio.')); var list = el('div', 'projects'); domain.projects.forEach(function (project) { var details = el('details', 'project-card'); var summary = el('summary'); summary.appendChild(el('strong', '', project.title)); summary.appendChild(el('span', 'project-level', project.level)); details.appendChild(summary); function block(title, value) { if (value === undefined || value === null) return; var blockNode = el('div', 'project-block'); blockNode.appendChild(el('h4', '', title)); if (Array.isArray(value)) { var ul = el('ul'); value.forEach(function (item) { ul.appendChild(Array.isArray(item) ? el('li', '', item[0] + ' — ' + item[1] + ' %') : rich(el('li'), item)); }); blockNode.appendChild(ul); } else if (typeof value === 'object') sectionBody(blockNode, value); else blockNode.appendChild(rich(el('p'), value)); details.appendChild(blockNode); } block('Présentation', project.presentation); block('Contexte / problème', project.context); block('Objectifs', project.objectives); block('Compétences mobilisées', project.skills); block('Prérequis', project.prerequisites); block('Matériel et outils', project.tools); block('Cahier des charges', project.brief); block('Fonctionnalités attendues', project.features); block('Étapes de réalisation', project.steps); block('Livrables attendus', project.deliverables); block('Critères de réussite', project.success); block('Grille d’évaluation', project.rubric); block('Erreurs à éviter', project.errors); block('Améliorations possibles', project.extensions); block('Solution de référence', project.reference); list.appendChild(details); }); section.appendChild(list); app.appendChild(section); }

  function track(app, page) {
    var domain = C[page], index = K.indexOf(page), nextPage = K[index + 1] || 'index'; if (current[page] === undefined) { current[page] = domain.L.findIndex(function (_, lessonIndex) { return !done[page + lessonIndex]; }); if (current[page] < 0) current[page] = 0; }
    app.className = 'site course-page'; app.appendChild(top(page, false));
    var courseHead = el('header', 'course-header'); courseHead.id = 'contenu'; courseHead.tabIndex = -1; var breadcrumb = el('div', 'breadcrumb'); breadcrumb.appendChild(link('index', 'Accueil')); breadcrumb.appendChild(el('span', '', '/')); breadcrumb.appendChild(el('span', '', domain.name)); courseHead.appendChild(breadcrumb); courseHead.appendChild(el('span', 'eyebrow', 'PARCOURS DE FORMATION')); courseHead.appendChild(el('h1', '', domain.name)); courseHead.appendChild(el('p', 'course-tagline', domain.tag.charAt(0).toUpperCase() + domain.tag.slice(1) + '.')); domain.intro.forEach(function (text) { courseHead.appendChild(el('p', 'course-intro', text)); }); courseHead.appendChild(el('p', 'course-goal', domain.goal)); if (domain.facts) { var facts = el('dl', 'course-facts'); domain.facts.forEach(function (fact) { var item = el('div'); item.appendChild(el('dt', '', fact[0])); item.appendChild(el('dd', '', fact[1])); facts.appendChild(item); }); courseHead.appendChild(facts); } if (domain.notice) courseHead.appendChild(rich(el('p', 'course-notice'), domain.notice)); var trackBar = el('div', 'course-progress'); var trackLine = el('div', 'progress-line'); var progressFill = el('i'); trackLine.appendChild(progressFill); trackBar.appendChild(trackLine); trackBar.appendChild(el('span', 'progress-label')); courseHead.appendChild(trackBar); app.appendChild(courseHead);
    var layout = el('div', 'lesson-layout'); layout.id = 'programme'; var aside = el('aside', 'lesson-sidebar'); aside.appendChild(el('p', 'sidebar-label', 'Votre parcours')); var lessonNav = el('nav', 'lesson-nav'); lessonNav.setAttribute('aria-label', 'Leçons du parcours'); aside.appendChild(lessonNav); var main = el('main', 'lesson-content'); layout.appendChild(aside); layout.appendChild(main); app.appendChild(layout);
    function draw() {
      var lessonIndex = current[page], lesson = domain.L[lessonIndex], id = page + lessonIndex, completed = count(page); progressFill.style.width = (completed / domain.L.length * 100) + '%'; courseHead.querySelector('.progress-label').textContent = completed + ' / ' + domain.L.length + ' leçons terminées'; lessonNav.textContent = '';
      domain.L.forEach(function (item, itemIndex) { var button = el('button', done[page + itemIndex] ? 'is-done' : ''); button.type = 'button'; button.setAttribute('aria-current', itemIndex === lessonIndex ? 'true' : 'false'); button.appendChild(el('span', 'lesson-number', String(itemIndex + 1).padStart(2, '0'))); button.appendChild(el('span', '', item.t)); button.onclick = function () { current[page] = itemIndex; draw(); main.scrollIntoView({ behavior: 'smooth', block: 'start' }); }; lessonNav.appendChild(button); });
      main.textContent = ''; main.appendChild(el('span', 'lesson-kicker', 'LEÇON ' + String(lessonIndex + 1).padStart(2, '0') + ' / ' + domain.L.length)); main.appendChild(el('h2', '', lesson.t)); main.appendChild(el('p', 'lesson-intro', lesson.p)); lessonMeta(main, lesson); if (lesson.sections) lesson.sections.forEach(function (section, sectionIndex) { if (!section.end) lessonSection(main, section, sectionIndex); }); if (lesson.a) main.appendChild(rich(el('p', 'exercise-prompt'), 'À vous de jouer : ' + lesson.a));
      if (lesson.o !== undefined) { main.appendChild(el('div', 'content-label', domain.runLabel || 'CODE PHP À TESTER LOCALEMENT')); main.appendChild(el('pre', 'code-block', lesson.c)); main.appendChild(el('div', 'content-label', 'RÉSULTAT ATTENDU')); main.appendChild(el('div', 'expected-output', lesson.o)); } else { var codeHeader = el('div', 'content-label code-label'); codeHeader.appendChild(el('span', '', 'ÉDITEUR ET APERÇU')); var reset = el('button', 'reset-button', 'Réinitialiser'); reset.type = 'button'; codeHeader.appendChild(reset); main.appendChild(codeHeader); var split = el('div', 'code-split'), textarea = el('textarea', 'code-editor'), frame = el('iframe', 'code-preview'); textarea.value = lesson.c; textarea.spellcheck = false; textarea.setAttribute('aria-label', 'Code à modifier'); frame.title = 'Aperçu du résultat'; frame.setAttribute('sandbox', 'allow-scripts'); split.appendChild(textarea); split.appendChild(frame); main.appendChild(split); var timer; function run() { frame.srcdoc = textarea.value; } textarea.oninput = function () { clearTimeout(timer); timer = setTimeout(run, 350); }; reset.onclick = function () { textarea.value = lesson.c; run(); }; run(); }
      if (lesson.x) { var explanation = el('section', 'code-explanation'); explanation.appendChild(el('h3', '', 'Le code expliqué, pas à pas')); lesson.x.forEach(function (row) { var line = el('div', 'explanation-row'); line.appendChild(el('code', '', row[0])); line.appendChild(el('p', '', row[1])); explanation.appendChild(line); }); main.appendChild(explanation); }
      var complete = el('button', 'complete-button', done[id] ? 'Leçon terminée ✓' : 'Marquer la leçon comme terminée'); complete.type = 'button'; complete.disabled = !!done[id]; complete.onclick = function () { done[id] = 1; save(); draw(); }; main.appendChild(complete);
      if (lesson.z) {
        var questions = Array.isArray(lesson.z) ? lesson.z : [lesson.z], solved = 0, quiz = el('section', 'quiz-box');
        quiz.appendChild(el('span', 'eyebrow', 'VALIDATION')); quiz.appendChild(el('h3', '', 'Vérifiez que vous avez compris'));
        if (questions.length > 1) quiz.appendChild(el('p', 'quiz-intro', 'Répondez correctement aux ' + questions.length + ' questions pour valider la leçon. Chaque bonne réponse affiche sa correction expliquée.'));
        questions.forEach(function (question, questionIndex) {
          var block = el('div', 'quiz-question'), status = el('p', 'quiz-status'), buttons = [];
          block.appendChild(rich(el('p', 'quiz-q'), (questions.length > 1 ? (questionIndex + 1) + '. ' : '') + question.q));
          question.o.forEach(function (answer, answerIndex) {
            var answerButton = el('button', 'quiz-answer', answer); answerButton.type = 'button'; buttons.push(answerButton);
            if (done[id]) { answerButton.disabled = true; if (answerIndex === question.a) answerButton.classList.add('is-correct'); }
            else answerButton.onclick = function () {
              if (answerIndex === question.a) {
                buttons.forEach(function (button) { button.disabled = true; }); answerButton.classList.add('is-correct'); status.textContent = 'Exact ! ' + question.e;
                solved += 1; if (solved === questions.length) { done[id] = 1; save(); draw(); }
              } else { status.textContent = 'Pas tout à fait. Relisez la section concernée, puis réessayez.'; answerButton.disabled = true; answerButton.classList.add('is-wrong'); }
            };
            block.appendChild(answerButton);
          });
          if (done[id]) status.textContent = 'Correction : ' + question.e;
          block.appendChild(status); quiz.appendChild(block);
        });
        main.appendChild(quiz);
      }
      if (lesson.sections) lesson.sections.forEach(function (section, sectionIndex) { if (section.end) lessonSection(main, section, sectionIndex); });
      var navigation = el('div', 'lesson-navigation'), previous = el('button', 'button button-secondary', '← Leçon précédente'), next = el('button', 'button button-primary', lessonIndex === domain.L.length - 1 ? 'Terminer le parcours →' : 'Leçon suivante →'); previous.type = next.type = 'button'; previous.disabled = lessonIndex === 0; next.disabled = !done[id]; previous.onclick = function () { current[page] = lessonIndex - 1; draw(); }; next.onclick = function () { if (lessonIndex === domain.L.length - 1) { if (SINGLE) go(nextPage); else location.href = nextPage + '.html'; } else { current[page] = lessonIndex + 1; draw(); } }; navigation.appendChild(previous); navigation.appendChild(next); main.appendChild(navigation);
    }
    draw(); projectsBlock(app, domain);
    if (location.hash === '#programme') setTimeout(function () { layout.scrollIntoView(); }, 0);
  }
  function render() { clearInterval(heroTimer); if (revealObserver) revealObserver.disconnect(); var page = route; if (page !== 'index' && !C[page]) page = 'index'; var app = document.getElementById('app'); app.textContent = ''; if (page === 'index') home(app); else track(app, page); }
  render();
})();

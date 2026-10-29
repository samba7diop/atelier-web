#!/usr/bin/env node
/*
 * Vérifie les parcours Python d'Atelier Web.
 * Usage : node tests/verifier-exemples-python.js
 *
 * 1. Structure : 10 leçons et au moins 5 projets par parcours, quiz valides,
 *    grilles d'évaluation totalisant 100 %.
 * 2. Exemples : chaque bloc Python est compilé ; ceux qui affichent un résultat
 *    sont exécutés et leur sortie est comparée au texte du cours.
 *    Les saisies `stdin` sont simulées et réaffichées comme dans un terminal.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DOMAINS = ['python', 'pythonweb'];
const PYTHON = process.env.PYTHON || (process.platform === 'win32' ? 'python' : 'python3');

const context = { window: {} };
vm.createContext(context);
['data.js', 'extended-data.js', 'python-algo.js', 'python-web.js'].forEach(function (file) {
  if (!fs.existsSync(path.join(ROOT, file))) return;
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), 'utf8'), context, { filename: file });
});
const C = context.window.COURS;

const RUNNER = [
  'import builtins, runpy, sys',
  'sys.path.insert(0, ".")',
  'answers = iter(sys.argv[1:])',
  'def fake_input(prompt=""):',
  '    value = next(answers)',
  '    print(prompt + value)',
  '    return value',
  'builtins.input = fake_input',
  'runpy.run_path("snippet.py", run_name="__main__")'
].join('\n');

let failures = 0;
let checks = 0;
function fail(where, message) { failures += 1; console.log('✗ ' + where + '\n  ' + message.split('\n').join('\n  ')); }
function normalize(text) { return String(text).replace(/\r/g, '').split('\n').map(function (line) { return line.replace(/\s+$/, ''); }).join('\n').trim(); }

function snippets(part, where, list) {
  if (!part || typeof part !== 'object') return list;
  if (part.code) list.push({ where: where, part: part });
  (part.blocks || []).forEach(function (block, index) { snippets(block, where + ' › bloc ' + (index + 1), list); });
  if (part.solution) snippets(part.solution, where + ' › correction', list);
  return list;
}

function runSnippet(item) {
  const part = item.part;
  const lang = part.lang || 'python';
  if (lang !== 'python') return;
  checks += 1;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'atelier-py-'));
  try {
    Object.keys(part.deps || {}).forEach(function (name) {
      const target = path.join(dir, name);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, part.deps[name], 'utf8');
    });
    fs.writeFileSync(path.join(dir, 'snippet.py'), part.code, 'utf8');
    const env = Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' });
    if (part.norun || part.dj) {
      const result = spawnSync(PYTHON, ['-c', 'import ast; ast.parse(open("snippet.py", encoding="utf-8").read())'], { cwd: dir, env: env, encoding: 'utf8' });
      if (result.status !== 0) fail(item.where, 'Syntaxe invalide :\n' + result.stderr.trim());
      return;
    }
    fs.writeFileSync(path.join(dir, 'runner.py'), RUNNER, 'utf8');
    const result = spawnSync(PYTHON, ['runner.py'].concat(part.stdin || []), { cwd: dir, env: env, encoding: 'utf8', timeout: 20000 });
    if (result.status !== 0) { fail(item.where, 'Exécution en échec :\n' + (result.stderr || result.error || '').toString().trim().split('\n').slice(-6).join('\n')); return; }
    if (part.output !== undefined && !part.nocheck && normalize(result.stdout) !== normalize(part.output)) {
      fail(item.where, 'Sortie différente.\n--- attendu ---\n' + normalize(part.output) + '\n--- obtenu ---\n' + normalize(result.stdout));
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

DOMAINS.forEach(function (key) {
  const domain = C[key];
  if (!domain) { fail(key, 'Parcours absent de window.COURS.'); return; }
  if (domain.L.length !== 10) fail(key, domain.L.length + ' leçons au lieu de 10.');
  if (!domain.projects || domain.projects.length < 5) fail(key, 'Moins de 5 projets.');
  domain.L.forEach(function (lesson, index) {
    const where = key + ' › leçon ' + (index + 1);
    (Array.isArray(lesson.z) ? lesson.z : [lesson.z]).forEach(function (question, qIndex) {
      if (!question || !question.o || question.a < 0 || question.a >= question.o.length || !question.e) fail(where, 'Quiz ' + (qIndex + 1) + ' invalide.');
    });
    const types = lesson.sections.map(function (section) { return section.type; });
    ['objectives', 'prerequisites', 'definition', 'exercise', 'practice', 'summary', 'errors', 'resources', 'next'].forEach(function (type) {
      if (types.indexOf(type) < 0) fail(where, 'Section manquante : ' + type);
    });
    if (lesson.c) runSnippet({ where: where + ' › programme de synthèse', part: { code: lesson.c, output: lesson.o, stdin: lesson.stdin, lang: lesson.lang, norun: lesson.norun, nocheck: lesson.nocheck, deps: lesson.deps } });
    lesson.sections.forEach(function (section) { snippets(section, where + ' › ' + section.title, []).forEach(runSnippet); });
  });
  domain.projects.forEach(function (project, index) {
    const where = key + ' › projet ' + (index + 1);
    const total = (project.rubric || []).reduce(function (sum, row) { return sum + row[1]; }, 0);
    if (total !== 100) fail(where, 'Grille d’évaluation totalisant ' + total + ' %.');
    ['presentation', 'context', 'objectives', 'skills', 'prerequisites', 'tools', 'brief', 'features', 'steps', 'deliverables', 'success', 'rubric', 'errors', 'extensions'].forEach(function (field) {
      if (!project[field]) fail(where, 'Champ manquant : ' + field);
    });
    snippets(project.reference, where + ' › solution', []).forEach(runSnippet);
  });
});

console.log((failures ? '\n' : '') + checks + ' exemples Python vérifiés, ' + failures + ' problème(s).');
process.exit(failures ? 1 : 0);

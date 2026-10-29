# Atelier Web

Atelier Web est une plateforme de formation web en français, portée par l’identité BoyDiop Technologie. Elle accompagne un débutant dans l’apprentissage de HTML, CSS, JavaScript et PHP, puis l’aide à transformer ses acquis en projets concrets.

Le site est volontairement léger : il fonctionne comme une application statique sans framework, sans base de données et sans compte utilisateur.

## Expérience proposée

La plateforme comprend cinq parcours :

- **HTML** — structurer le contenu, les liens, les médias, les formulaires et l’accessibilité ;
- **CSS** — styliser, mettre en page, créer des composants et adapter l’interface aux écrans ;
- **JavaScript** — rendre une page interactive avec le DOM, les événements, les données et les requêtes ;
- **PHP** — comprendre le serveur, les formulaires, les sessions, PDO et la sécurité des entrées ;
- **Projet final** — cadrer, concevoir, développer, tester et présenter un produit web.

Chaque domaine contient 10 leçons et 5 projets pratiques, soit 50 leçons et 25 projets au total.

## Fonctionnalités

- Accueil orienté découverte avec hero, statistiques, formations, méthode, projets et appel à l’action.
- Pages de cours distinctes de l’accueil, pensées pour la lecture et la concentration.
- Navigation principale et menu mobile accessible.
- Fil d’Ariane, navigation latérale des leçons et progression du parcours.
- Niveau et durée estimée pour chaque leçon.
- Sommaire interne avec accès aux sections pédagogiques.
- Définitions, concepts, exemples, applications professionnelles, travaux pratiques, résumés et points clés.
- Éditeur HTML/CSS/JavaScript avec aperçu en direct dans une iframe isolée.
- Exemples PHP avec code et résultat attendu, car PHP nécessite un serveur.
- Quiz, correction détaillée et bouton de validation de la leçon.
- Progression enregistrée localement dans le navigateur.
- 5 projets par domaine avec cahier des charges, étapes, livrables, critères, grille d’évaluation et extensions.
- Responsive design pour ordinateur, tablette et mobile.
- Mode sombre automatique selon la préférence du système.
- Focus visibles, navigation ARIA, boutons compréhensibles et respect de `prefers-reduced-motion`.

## Prérequis

Un navigateur moderne suffit pour consulter les cours et tester les exemples HTML, CSS et JavaScript : Chrome, Firefox, Edge ou Safari récent.

Aucune dépendance npm ou installation de framework n’est requise.

Pour exécuter les exemples PHP, PHP ou XAMPP est nécessaire.

## Démarrage

### Ouverture directe

Ouvrez [index.html](./index.html) dans un navigateur.

Cette méthode permet de consulter les parcours et les aperçus frontend.

### Serveur local recommandé

Depuis le dossier du projet :

```bash
python -m http.server 8000
```

Puis ouvrez <http://localhost:8000/>.

Avec PHP installé, vous pouvez utiliser :

```bash
php -S localhost:8000
```

## Tester PHP

1. Installez PHP ou XAMPP.
2. Ouvrez un terminal dans le dossier du projet.
3. Lancez `php -S localhost:8000`.
4. Copiez le code d’une leçon PHP dans un fichier `.php`.
5. Ouvrez ce fichier depuis <http://localhost:8000/>.

Les pages pédagogiques restent statiques ; elles expliquent PHP sans exécuter directement le code PHP dans le navigateur.

## Structure du projet

```text
atelier-web/
├── index.html          # Accueil
├── html.html           # Parcours HTML
├── css.html            # Parcours CSS
├── javascript.html     # Parcours JavaScript
├── php.html            # Parcours PHP
├── projet.html         # Parcours de synthèse
├── app.js              # Rendu, navigation, accueil, cours, quiz et progression
├── data.js             # Contenus pédagogiques initiaux
├── extended-data.js    # Leçons structurées et projets complémentaires
├── style.css           # Système de design et responsive design
├── logo.svg            # Logo BoyDiop Technologie intégré à la navigation
└── README.md           # Documentation du projet
```

## Architecture technique

Chaque page HTML possède un conteneur `<div id="app"></div>`, déclare `window.PAGE`, puis charge dans cet ordre :

1. `data.js` ;
2. `extended-data.js` ;
3. `app.js`.

`app.js` construit ensuite l’interface selon la page courante. La page d’accueil utilise une composition visuelle dédiée ; les parcours utilisent une mise en page de lecture avec navigation et progression.

### Données pédagogiques

Les données sont centralisées dans `window.COURS`.

Un domaine contient notamment :

- `name` — nom affiché ;
- `tag` — description courte ;
- `intro` — introduction ;
- `goal` — objectif pédagogique ;
- `L` — tableau des leçons ;
- `projects` — projets pratiques.

Une leçon peut contenir :

- `t` — titre ;
- `p` — présentation ;
- `level` — niveau ;
- `duration` — durée estimée ;
- `sections` — sections pédagogiques ;
- `a` — exercice proposé ;
- `c` — code de démonstration ;
- `z` — quiz et correction ;
- `x` — explication ligne par ligne ;
- `o` — résultat attendu PHP ;
- `next` — transition vers la suite.

Les contenus complémentaires sont dans [extended-data.js](./extended-data.js) afin de préserver les données historiques de [data.js](./data.js).

## Direction artistique

Les coordonnées de contact affichées sur l’accueil et dans le pied de page sont :

- Téléphone : `77 970 87 82` — lien `tel:+221779708782` ;
- E-mail : `samba.diop3@univ-thies.sn` — lien `mailto:samba.diop3@univ-thies.sn`.

Aucun formulaire de contact fictif n’est présenté : la plateforme utilise directement les liens d’appel et de messagerie.

L’identité visuelle s’inspire du logo BoyDiop Technologie :

- vert profond pour la confiance et la structure ;
- vert vif et lime pour l’énergie et les actions ;
- surfaces claires pour la lecture ;
- orange, bleu et violet utilisés comme repères pédagogiques ponctuels.

La typographie est organisée ainsi :

- **Plus Jakarta Sans** pour les titres ;
- **Inter** pour les textes et contrôles ;
- **JetBrains Mono** pour le code et les informations techniques.

Les polices sont chargées depuis Google Fonts, avec des polices système de remplacement prévues dans [style.css](./style.css).

## Progression et stockage local

Les leçons terminées sont enregistrées dans le `localStorage` sous la clé `atelier2`.

Pour réinitialiser la progression depuis la console du navigateur :

```js
localStorage.removeItem('atelier2');
location.reload();
```

La progression reste locale au navigateur et n’est pas synchronisée entre appareils.

## Aperçu du code

Les exemples HTML, CSS et JavaScript sont injectés dans `srcdoc` d’une iframe avec `sandbox="allow-scripts"`. Cela sépare l’aperçu du reste de l’application.

Cette solution convient à des exemples pédagogiques contrôlés. Pour du code fourni par des utilisateurs réels, il faudrait renforcer la politique de sécurité et le filtrage.

## Personnalisation

Les variables de couleur, de typographie, d’espacement, de rayon et d’ombre sont regroupées au début de [style.css](./style.css).

Pour modifier le contenu d’une leçon, éditez [data.js](./data.js) ou [extended-data.js](./extended-data.js). Pour ajouter un domaine, il faut aussi :

1. ajouter ses données dans `window.COURS` ;
2. ajouter son identifiant dans `K` dans [app.js](./app.js) ;
3. ajouter sa couleur et son icône dans `COLORS` et `ICONS` ;
4. créer sa page HTML avec `window.PAGE` ;
5. vérifier la navigation et les compteurs.

## Vérifications réalisées

Les liens téléphonique et e-mail de la section Contact ont également été vérifiés dans le navigateur.

Le projet a été vérifié dans un navigateur local :

- accueil affiché avec le nouveau hero et les formations ;
- navigation desktop visible ;
- menu mobile ouvert avec `aria-expanded` ;
- page HTML affichée avec 10 leçons ;
- navigation latérale et sommaire de leçon fonctionnels ;
- éditeur, aperçu et quiz présents ;
- projets affichés dans des fiches dépliables ;
- 10 leçons et 5 projets confirmés dans chacun des 5 domaines ;
- aucun débordement horizontal détecté à une largeur mobile testée ;
- aucun problème signalé sur `app.js`, `extended-data.js`, `style.css`, `index.html` et `html.html`.

## Limites connues

- PHP nécessite un serveur local ou un hébergement compatible PHP.
- La progression ne possède pas encore de compte ni de synchronisation distante.
- Les polices Google Fonts nécessitent une connexion pour être chargées ; les fallbacks système prennent le relais hors ligne.
- Il n’y a pas encore de tests automatisés ni de pipeline CI/CD.
- Le projet n’utilise pas de backend, de base de données ou de système d’authentification.

## Déploiement

Les pages HTML, JavaScript, CSS et le SVG peuvent être publiés sur GitHub Pages, Netlify,render, Vercel ou un serveur web statique.

Pour exécuter PHP en production, choisissez un hébergement compatible PHP et configurez le serveur correspondant.

## Licence

Aucune licence n’est actuellement définie. Ajoutez un fichier `LICENSE` si vous souhaitez préciser les conditions de réutilisation et de distribution.

## Mise à jour — parcours Python

La plateforme inclut désormais deux parcours supplémentaires :

- **Algorithmique et programmation avec Python** : parcours recommandé aux débutants, consacré à la logique algorithmique, aux variables, conditions, boucles, collections, fonctions, recherche, tri, fichiers, exceptions, programmation orientée objet et tests.
- **Python pour le développement Web** : parcours Django consacré au Web, aux environnements virtuels, URLs, vues, templates, formulaires, ORM, bases de données, authentification, sécurité, API REST, tests et préparation au déploiement.

Chaque parcours contient exactement 10 leçons et 5 projets pratiques. Les leçons incluent objectifs, prérequis, explications, définitions, exemples commentés, exercices guidés et autonomes, corrections, quiz, résumé, erreurs fréquentes, ressources et transition.

Les projets Python sont décrits dans [python-data.js](./python-data.js) et couvrent : calculatrice scientifique, gestionnaire de notes, gestion de stock, jeu de logique, bibliothèque, site vitrine Django, blog, gestionnaire de tâches, gestion de produits et API REST.

Nouveaux fichiers : [python.html](./python.html), [pythonweb.html](./pythonweb.html) et [python-data.js](./python-data.js). Les pages existantes chargent également `python-data.js` pour conserver une navigation et des compteurs cohérents.

Le serveur Django `runserver` est documenté comme un outil de développement local uniquement. Les exemples Python/Django nécessitent un environnement Python séparé et ne sont pas exécutés directement dans le navigateur.

### Vérifications de cette mise à jour

- Accueil et deux pages Python ouverts dans le navigateur ;
- 10 leçons et 5 projets confirmés pour chaque parcours ;
- grilles des 10 projets vérifiées à 100 % chacune ;
- liens internes vers `python.html` et `pythonweb.html` vérifiés ;
- aucun problème VS Code signalé sur les nouveaux fichiers ;
- aucun message d’erreur JavaScript bloquant lors du rechargement de l’accueil.

## Audit du projet — améliorations recommandées

L’audit du dépôt montre que le site est utilisable, mais quelques points méritent d’être traités pour fiabiliser la maintenance et les futures évolutions.

### Priorité haute — synchroniser les sources Python et le vérificateur

Le navigateur charge actuellement `python-data.js` pour alimenter `python.html`, `pythonweb.html` et l’accueil. Le fichier [tests/verifier-exemples-python.js](./tests/verifier-exemples-python.js) charge toutefois `python-algo.js` et `python-web.js`, alors que `python-web.js` n’existe pas dans le projet et que `python-algo.js` n’est pas chargé par les pages.

Il faut choisir une seule source de vérité :

1. soit adapter le vérificateur pour charger `python-data.js` et les types de sections réellement utilisés ;
2. soit intégrer les fichiers `python-algo.js` et `python-web.js` dans les pages et supprimer la duplication avec `python-data.js`.

Cette correction est la plus importante, car elle évite qu’un contenu différent soit affiché dans le site et contrôlé par les tests.

### Priorité haute — automatiser la validation

Ajouter un `package.json` avec une commande de test, puis exécuter le vérificateur à chaque modification et dans une intégration continue. Les contrôles utiles sont :

- 10 leçons et au moins 5 projets par parcours ;
- quiz valides et grilles totalisant 100 % ;
- syntaxe des exemples Python ;
- liens internes existants ;
- absence d’erreur JavaScript au chargement.

### Priorité moyenne — clarifier l’aperçu des exemples Python

L’éditeur existant affiche les exemples Python dans une iframe prévue principalement pour HTML, CSS et JavaScript. Python ne peut pas être exécuté directement dans cette iframe. Il serait préférable de distinguer les leçons Python : afficher un bloc de code avec commande d’exécution, sortie attendue et bouton de copie, puis réserver l’aperçu live aux langages du navigateur.

### Priorité moyenne — renforcer l’accessibilité et la qualité des liens

Ajouter une vérification automatique des titres, attributs `alt`, ordre de tabulation, état du focus, liens internes et navigation au clavier. Les URLs des ressources externes doivent rester documentées et être vérifiées périodiquement.

### Priorité moyenne — sécurité des aperçus

L’aperçu utilise une iframe `sandbox`, ce qui est adapté aux exemples contrôlés. Si du code fourni par des utilisateurs est ajouté plus tard, il faudra conserver l’absence de `allow-same-origin`, ajouter une politique CSP et éviter d’injecter des données non fiables avec `innerHTML`.

### Améliorations optionnelles

- bouton pour réinitialiser la progression depuis l’interface ;
- recherche ou filtre des parcours et des leçons ;
- export/import de la progression locale ;
- page de ressources générales Python/Django ;
- tests end-to-end dans un navigateur ;
- optimisation des gros fichiers de données si le nombre de parcours augmente.

Ces éléments ne bloquent pas l’utilisation actuelle du site. La synchronisation du vérificateur et l’automatisation des tests sont en revanche recommandées avant une publication importante.

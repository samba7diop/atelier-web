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

Les pages HTML, JavaScript, CSS et le SVG peuvent être publiés sur GitHub Pages, Netlify, Vercel ou un serveur web statique.

Pour exécuter PHP en production, choisissez un hébergement compatible PHP et configurez le serveur correspondant.

## Licence

Aucune licence n’est actuellement définie. Ajoutez un fichier `LICENSE` si vous souhaitez préciser les conditions de réutilisation et de distribution.

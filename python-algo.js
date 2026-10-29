/*
 * Parcours « Algorithmique et programmation avec Python ».
 * Chaque exemple Python accompagné d’un résultat (`output`) est exécuté et comparé
 * automatiquement par tests/verifier-exemples-python.js.
 * Champs de test non affichés : `stdin` (saisies simulées), `deps` (fichiers requis),
 * `norun` (vérification de syntaxe uniquement), `nocheck` (exécution sans comparer la sortie).
 */
(function () {
  var C = window.COURS;
  var py = String.raw;

  function lesson(o) {
    function end(section) { section.end = true; return section; }
    return {
      t: o.title, level: o.level, duration: o.duration, p: o.intro,
      sections: [
        { title: 'Objectifs d’apprentissage', type: 'objectives', items: o.objectives },
        { title: 'Prérequis', type: 'prerequisites', items: o.prerequisites },
        { title: 'Définitions à connaître', type: 'definition', items: o.definitions }
      ].concat(o.body, [
        o.guided,
        o.autonomous,
        end({ title: 'Résumé', type: 'summary', items: o.summary }),
        end({ title: 'Erreurs fréquentes à éviter', type: 'errors', items: o.errors }),
        end({ title: 'Pour aller plus loin', type: 'resources', items: o.resources }),
        end({ title: 'Et ensuite ?', type: 'next', text: o.next })
      ]),
      c: o.code, o: o.output, x: o.explain, z: o.quiz, deps: o.codeDeps
    };
  }

  var L = [];

  /* ---------------------------------------------------------------- Leçon 1 */
  L.push(lesson({
    title: 'Introduction à l’algorithmique et à Python',
    level: 'Débutant',
    duration: '1 h 30',
    intro: 'Avant d’écrire du code, un programmeur réfléchit à la manière de résoudre un problème. Cette leçon vous apprend à décrire une solution étape par étape, puis à installer Python et à exécuter votre tout premier programme.',
    objectives: [
      'Définir ce qu’est un algorithme et reconnaître ses qualités.',
      'Décomposer un problème en entrées, traitement et sorties.',
      'Écrire un algorithme simple en pseudocode et le représenter par un organigramme.',
      'Situer Python parmi les langages et connaître ses principaux domaines d’utilisation.',
      'Installer Python, choisir un éditeur et exécuter un script contenant `print()`.'
    ],
    prerequisites: [
      'Savoir utiliser un ordinateur : créer un dossier, enregistrer un fichier, ouvrir une application.',
      'Aucune connaissance en programmation n’est nécessaire.'
    ],
    definitions: [
      ['Algorithme', 'suite finie et ordonnée d’instructions précises qui permet de résoudre un problème ou d’accomplir une tâche.'],
      ['Programme', 'traduction d’un algorithme dans un langage compréhensible par un ordinateur, comme Python.'],
      ['Pseudocode', 'description d’un algorithme en langage proche du français, indépendante de tout langage de programmation.'],
      ['Organigramme', 'représentation graphique d’un algorithme à l’aide de formes normalisées reliées par des flèches.'],
      ['Interpréteur', 'logiciel qui lit un programme Python et exécute ses instructions une par une.'],
      ['Script', 'fichier texte portant l’extension `.py` qui contient un programme Python.'],
      ['Instruction', 'ordre élémentaire donné à l’ordinateur, par exemple afficher un texte.']
    ],
    body: [
      {
        title: 'Qu’est-ce qu’un algorithme ?', type: 'concept',
        text: 'Vous utilisez des algorithmes tous les jours sans le savoir. Une recette de cuisine, un itinéraire indiqué par un GPS ou la procédure pour retirer de l’argent à un distributeur sont des algorithmes : ce sont des suites d’étapes qui, suivies dans l’ordre, mènent à un résultat.\nEn informatique, un bon algorithme possède quatre qualités : il est fini (il se termine toujours), précis (chaque étape n’a qu’une seule interprétation), il reçoit éventuellement des données en entrée et il produit au moins un résultat en sortie.\nPrenons un exemple concret : « préparer un thé ». Une formulation vague comme « faites du thé » ne suffit pas à un ordinateur. Il faut détailler : remplir la bouilloire, la mettre en marche, attendre l’ébullition, verser l’eau sur le thé, laisser infuser trois minutes, retirer le sachet. Programmer, c’est apprendre à atteindre ce niveau de précision.'
      },
      {
        title: 'Entrée, traitement, sortie', type: 'concept',
        text: 'Presque tous les programmes suivent le même schéma en trois temps :',
        items: [
          ['Entrée', 'les données dont le programme a besoin : une saisie au clavier, un fichier, une mesure.'],
          ['Traitement', 'les calculs et décisions appliqués aux données.'],
          ['Sortie', 'le résultat communiqué à l’utilisateur : un affichage, un fichier, un message.']
        ],
        after: 'Exemple : pour calculer le prix toutes taxes comprises (TTC) d’un article, l’entrée est le prix hors taxe (HT), le traitement consiste à ajouter 18 % de TVA et la sortie est le prix TTC affiché. Identifier ces trois éléments est toujours la première étape de l’analyse d’un problème.'
      },
      {
        title: 'Écrire un algorithme en pseudocode', type: 'example',
        text: 'Le pseudocode permet de réfléchir à la logique sans se soucier de la syntaxe d’un langage. On y utilise des mots-clés en majuscules (`LIRE`, `ÉCRIRE`, `SI`, `TANT QUE`) et la flèche `←` pour l’affectation, c’est-à-dire le fait de ranger une valeur dans une variable.',
        lang: 'text', file: 'Pseudocode',
        code: py`ALGORITHME PrixTTC
VARIABLES
    prix_ht, prix_ttc : réels
DÉBUT
    ÉCRIRE "Quel est le prix hors taxe ?"
    LIRE prix_ht
    prix_ttc ← prix_ht × 1,18
    ÉCRIRE "Prix TTC : ", prix_ttc
FIN`,
        after: 'Lecture ligne par ligne : on annonce les variables utilisées, on demande le prix HT à l’utilisateur (entrée), on calcule le prix TTC (traitement), puis on affiche le résultat (sortie). Ce pseudocode pourrait être traduit en Python, en JavaScript ou en PHP : la logique reste la même.'
      },
      {
        title: 'Représenter un algorithme par un organigramme', type: 'concept',
        text: 'L’organigramme montre visuellement l’enchaînement des étapes. Quatre formes suffisent pour commencer :',
        items: [
          ['Ovale', 'début ou fin de l’algorithme.'],
          ['Parallélogramme', 'entrée ou sortie de données (LIRE, ÉCRIRE).'],
          ['Rectangle', 'traitement ou calcul.'],
          ['Losange', 'décision : une question dont la réponse est oui ou non, avec deux sorties possibles.']
        ],
        blocks: [{
          text: 'Voici l’organigramme de l’algorithme PrixTTC, dessiné en texte :',
          lang: 'text', file: 'Organigramme',
          code: py`        ( Début )
            |
   / Lire prix_ht /
            |
 [ prix_ttc ← prix_ht × 1,18 ]
            |
  / Écrire prix_ttc /
            |
         ( Fin )`
        }],
        after: 'Les organigrammes deviennent très utiles dès qu’un algorithme contient des décisions ou des répétitions : on visualise immédiatement les différents chemins possibles.'
      },
      {
        title: 'Python : présentation et domaines d’utilisation', type: 'concept',
        text: 'Python est un langage de programmation créé par Guido van Rossum et publié en 1991. Il est apprécié pour sa syntaxe lisible, proche de l’anglais, et pour l’indentation obligatoire qui oblige à écrire un code bien structuré.\nPython est un langage interprété : vous n’avez pas besoin de compiler votre programme, l’interpréteur l’exécute directement. Il est gratuit, open source et disponible sur Windows, macOS et Linux.',
        items: [
          ['Développement Web', 'Django et Flask permettent de créer des sites et des API (c’est l’objet du parcours « Python pour le développement Web »).'],
          ['Données et intelligence artificielle', 'pandas, NumPy, scikit-learn ou PyTorch sont des références mondiales.'],
          ['Automatisation', 'renommer des fichiers, traiter des tableaux, envoyer des rapports.'],
          ['Enseignement et recherche', 'Python est l’un des langages les plus enseignés pour apprendre à programmer.']
        ]
      },
      {
        title: 'Installer Python et choisir un éditeur', type: 'concept',
        text: 'Installez une version récente de Python 3 (3.10 ou plus). Les étapes dépendent de votre système :',
        ordered: true,
        items: [
          'Windows : téléchargez l’installateur sur python.org, puis cochez impérativement la case « Add python.exe to PATH » avant de cliquer sur « Install Now ».',
          'macOS : utilisez l’installateur officiel de python.org ; la commande s’appelle ensuite généralement `python3`.',
          'Linux : Python 3 est souvent déjà présent ; sinon, installez le paquet `python3` avec le gestionnaire de votre distribution.',
          'Vérifiez l’installation en ouvrant un terminal (Invite de commandes ou PowerShell sous Windows) et en tapant la commande ci-dessous.'
        ],
        blocks: [{
          lang: 'bash',
          code: py`python --version`,
          after: 'Le terminal doit répondre par un numéro de version, par exemple `Python 3.12.4`. Sous macOS et Linux, tapez `python3 --version` ; sous Windows, `py --version` fonctionne aussi.'
        }, {
          text: 'Pour écrire vos programmes, choisissez un éditeur :',
          items: [
            ['Thonny', 'très simple, pensé pour les débutants, avec un débogueur visuel. Idéal pour ce parcours.'],
            ['Visual Studio Code', 'éditeur professionnel gratuit ; installez l’extension « Python » de Microsoft.'],
            ['IDLE', 'fourni avec Python, suffisant pour de petits essais.']
          ]
        }]
      },
      {
        title: 'Votre premier programme avec print()', type: 'example',
        text: 'La fonction `print()` affiche à l’écran ce qu’on lui donne entre parenthèses. Un texte doit être placé entre guillemets : on l’appelle une chaîne de caractères.',
        code: py`print("Bonjour, le monde !")
print("Je découvre Python.")
print("2 + 3 =", 2 + 3)`,
        output: py`Bonjour, le monde !
Je découvre Python.
2 + 3 = 5`,
        after: 'La première ligne affiche un texte tel quel. La troisième montre deux éléments séparés par une virgule : `print()` les affiche côte à côte, séparés par une espace. Le texte `"2 + 3 ="` est affiché tel quel, alors que l’expression `2 + 3`, sans guillemets, est d’abord calculée par Python.'
      },
      {
        title: 'Exécuter un script Python', type: 'concept',
        text: 'Il existe deux façons d’utiliser Python. Le mode interactif s’ouvre en tapant `python` dans un terminal : l’invite `>>>` apparaît et chaque instruction est exécutée immédiatement. C’est pratique pour tester une idée ; tapez `exit()` pour en sortir.\nPour un vrai programme, on écrit un script : un fichier `.py` enregistré sur le disque. Dans Thonny ou VS Code, un bouton « Exécuter » suffit. Depuis un terminal, placez-vous dans le dossier du fichier, puis lancez-le :',
        lang: 'bash',
        code: py`cd Documents/atelier-python
python bonjour.py`,
        after: 'Le symbole `#` introduit un commentaire : tout ce qui le suit sur la ligne est ignoré par Python. Les commentaires servent à expliquer le code aux humains qui le liront, y compris vous-même dans quelques semaines.'
      }
    ],
    guided: {
      title: 'Exercice guidé — Une fiche de présentation', type: 'exercise',
      text: 'Créez un script qui affiche une courte présentation de vous. Suivez les étapes avant d’ouvrir la correction.',
      ordered: true,
      items: [
        'Créez un dossier `atelier-python`, puis un fichier `presentation.py` dans ce dossier.',
        'Ajoutez en première ligne un commentaire qui décrit le rôle du script.',
        'Affichez votre prénom avec `print()`.',
        'Affichez votre ville sur une deuxième ligne.',
        'Affichez votre âge dans cinq ans en laissant Python faire le calcul (par exemple `20 + 5`).',
        'Enregistrez, exécutez et vérifiez le résultat.'
      ],
      solution: {
        code: py`# presentation.py : affiche une courte fiche de présentation
print("Je m'appelle Awa.")
print("J'habite à Thiès.")
print("Dans 5 ans, j'aurai", 20 + 5, "ans.")`,
        output: py`Je m'appelle Awa.
J'habite à Thiès.
Dans 5 ans, j'aurai 25 ans.`,
        after: 'Le texte contient une apostrophe (`m\'appelle`) : on l’entoure donc de guillemets doubles pour que Python ne confonde pas l’apostrophe avec la fin de la chaîne. Le calcul `20 + 5` n’est pas entre guillemets, il est donc évalué.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      text: 'Cherchez seul chaque exercice, puis comparez avec la correction.',
      ordered: true,
      items: [
        'Écrivez en pseudocode l’algorithme qui calcule et affiche l’aire d’un rectangle à partir de sa longueur et de sa largeur.',
        'Dessinez l’organigramme de l’algorithme « Faut-il prendre un parapluie ? » : on lit la météo, et s’il pleut, on affiche « Prenez un parapluie », sinon « Bonne journée ».',
        'Écrivez un programme qui affiche le résultat de 7 × 8 puis de 100 ÷ 4, chacun précédé d’un texte explicatif.'
      ],
      solution: {
        text: 'Exercice 1 — pseudocode :',
        lang: 'text', file: 'Pseudocode',
        code: py`ALGORITHME AireRectangle
VARIABLES
    longueur, largeur, aire : réels
DÉBUT
    LIRE longueur
    LIRE largeur
    aire ← longueur × largeur
    ÉCRIRE "Aire : ", aire
FIN`,
        blocks: [{
          text: 'Exercice 2 — l’organigramme contient un losange de décision avec deux branches :',
          lang: 'text', file: 'Organigramme',
          code: py`          ( Début )
              |
       / Lire météo /
              |
        < Il pleut ? >
         oui /    \ non
            /      \
/ Écrire "Prenez un  /   / Écrire "Bonne  /
/  parapluie"       /   /  journée"      /
            \      /
             ( Fin )`
        }, {
          text: 'Exercice 3 :',
          code: py`print("7 x 8 =", 7 * 8)
print("100 / 4 =", 100 / 4)`,
          output: py`7 x 8 = 56
100 / 4 = 25.0`,
          after: 'En Python, la multiplication s’écrit `*` et la division `/`. La division renvoie toujours un nombre décimal (`25.0`) : nous verrons pourquoi dans la leçon suivante.'
        }]
      }
    },
    code: py`# Fichier : prix_ttc.py
# Entrée : le prix hors taxe est écrit directement dans le programme
# Traitement : on applique une TVA de 18 %
# Sortie : on affiche le détail du calcul

print("Calcul du prix TTC")
print("Prix HT : 5000 FCFA")
print("TVA (18 %) :", 5000 * 18 / 100, "FCFA")
print("Prix TTC :", 5000 + 5000 * 18 / 100, "FCFA")`,
    output: py`Calcul du prix TTC
Prix HT : 5000 FCFA
TVA (18 %) : 900.0 FCFA
Prix TTC : 5900.0 FCFA`,
    explain: [
      ['# Fichier : prix_ttc.py', 'Les lignes qui commencent par # sont des commentaires : elles documentent l’entrée, le traitement et la sortie sans être exécutées.'],
      ['print("Calcul du prix TTC")', 'Affiche un titre. Le texte entre guillemets est reproduit tel quel.'],
      ['5000 * 18 / 100', 'Python calcule 18 % de 5000. L’étoile signifie « multiplier » et la barre oblique « diviser ».'],
      ['900.0', 'Le résultat d’une division est un nombre décimal, d’où le « .0 ». Les types de nombres sont étudiés en leçon 2.'],
      ['5000 + 5000 * 18 / 100', 'La multiplication et la division sont effectuées avant l’addition, comme en mathématiques.']
    ],
    quiz: [
      { q: 'Qu’est-ce qu’un algorithme ?', o: ['Un langage de programmation', 'Une suite finie d’instructions précises qui résout un problème', 'Un logiciel à installer'], a: 1, e: 'Un algorithme est une méthode de résolution ; un langage comme Python sert ensuite à le traduire en programme.' },
      { q: 'Dans un organigramme, quelle forme représente une décision ?', o: ['Le rectangle', 'Le losange', 'L’ovale'], a: 1, e: 'Le losange pose une question à deux issues (oui / non). Le rectangle sert aux traitements et l’ovale au début et à la fin.' },
      { q: 'Qu’affiche `print("3 + 4 =", 3 + 4)` ?', o: ['3 + 4 = 3 + 4', '3 + 4 = 7', '7'], a: 1, e: 'Le texte entre guillemets est affiché tel quel, tandis que l’expression sans guillemets est calculée.' },
      { q: 'Quelle commande exécute le script `bonjour.py` depuis un terminal ?', o: ['python bonjour.py', 'run bonjour', 'print bonjour.py'], a: 0, e: 'On appelle l’interpréteur `python` suivi du nom du fichier, en étant placé dans le dossier qui le contient.' }
    ],
    summary: [
      'Un algorithme est une suite finie et précise d’étapes ; un programme en est la traduction dans un langage.',
      'Tout problème se décompose en entrées, traitement et sorties.',
      'Le pseudocode et l’organigramme permettent de concevoir la logique avant de coder.',
      'Python est un langage interprété, lisible et polyvalent (Web, données, automatisation).',
      '`print()` affiche du texte ou le résultat d’un calcul ; `#` introduit un commentaire.'
    ],
    errors: [
      'Oublier les guillemets autour d’un texte : `print(Bonjour)` provoque une erreur `NameError`.',
      'Écrire `Print` avec une majuscule : Python distingue majuscules et minuscules.',
      'Mélanger les guillemets : `print("Bonjour\')` n’est pas valide, ouvrez et fermez avec le même symbole.',
      'Taper du code Python directement dans le terminal système au lieu de l’enregistrer dans un fichier `.py` ou de l’écrire après l’invite `>>>`.',
      'Sous Windows, oublier de cocher « Add python.exe to PATH » : la commande `python` devient introuvable.'
    ],
    resources: [
      ['Tutoriel officiel Python (en français)', 'https://docs.python.org/fr/3/tutorial/index.html', 'la référence pour approfondir chaque notion.'],
      ['Télécharger Python', 'https://www.python.org/downloads/', 'installateurs officiels pour tous les systèmes.'],
      ['Thonny', 'https://thonny.org/', 'éditeur conçu pour les débutants.'],
      ['Python dans Visual Studio Code', 'https://code.visualstudio.com/docs/python/python-tutorial', 'guide d’installation pas à pas.'],
      ['France-IOI', 'https://www.france-ioi.org/', 'exercices progressifs d’algorithmique en français.']
    ],
    next: 'Votre programme sait afficher des messages, mais les valeurs sont écrites « en dur ». Dans la leçon 2, vous apprendrez à mémoriser des informations dans des variables, à manipuler différents types de données et à interagir avec l’utilisateur grâce à `input()`.'
  }));

  /* ---------------------------------------------------------------- Leçon 2 */
  L.push(lesson({
    title: 'Variables, types de données et opérateurs',
    level: 'Débutant',
    duration: '2 h',
    intro: 'Un programme utile manipule des données : un prix, un nom, une note, une réponse oui ou non. Cette leçon vous montre comment les ranger dans des variables, reconnaître leur type, les convertir et les combiner avec des opérateurs.',
    objectives: [
      'Créer des variables, leur affecter des valeurs et les mettre à jour.',
      'Distinguer les types `int`, `float`, `str` et `bool`, et les vérifier avec `type()`.',
      'Convertir une donnée d’un type à un autre avec `int()`, `float()` et `str()`.',
      'Utiliser les opérateurs arithmétiques, de comparaison et logiques en respectant leur priorité.',
      'Lire une saisie clavier avec `input()` et afficher un résultat formaté avec une f-string.'
    ],
    prerequisites: [
      'Leçon 1 : savoir écrire et exécuter un script contenant `print()`.'
    ],
    definitions: [
      ['Variable', 'nom qui désigne une valeur stockée en mémoire ; on peut la lire et la modifier.'],
      ['Affectation', 'opération qui associe une valeur à une variable, écrite avec le signe `=`.'],
      ['Type', 'nature d’une donnée, qui détermine les opérations possibles : nombre entier, décimal, texte, booléen.'],
      ['Chaîne de caractères (str)', 'texte délimité par des guillemets simples ou doubles.'],
      ['Booléen (bool)', 'valeur logique qui vaut `True` (vrai) ou `False` (faux).'],
      ['Opérateur', 'symbole qui effectue une opération sur des valeurs : `+`, `*`, `==`, `and`…'],
      ['Expression', 'combinaison de valeurs, de variables et d’opérateurs que Python évalue pour produire une valeur.']
    ],
    body: [
      {
        title: 'Variables et affectation', type: 'concept',
        text: 'Une variable est comme une étiquette collée sur une boîte qui contient une valeur. L’instruction `age = 19` crée la variable `age` et y range la valeur 19. Attention : en programmation, `=` ne signifie pas « est égal à » mais « reçoit la valeur ».\nUne variable peut changer de valeur au cours du programme. L’instruction `age = age + 1` se lit de droite à gauche : Python calcule d’abord `age + 1`, puis range le résultat dans `age`.',
        code: py`prenom = "Awa"
age = 19
print(prenom, "a", age, "ans.")
age = age + 1
print("L'année prochaine,", prenom, "aura", age, "ans.")`,
        output: py`Awa a 19 ans.
L'année prochaine, Awa aura 20 ans.`,
        after: 'Règles de nommage : un nom de variable contient des lettres, des chiffres et le caractère `_`, ne commence pas par un chiffre et ne contient pas d’espace. Python distingue `Age` et `age`. Par convention, on écrit les noms en minuscules séparées par des tirets bas (`prix_unitaire`) et on choisit des noms explicites plutôt que `x` ou `a1`.'
      },
      {
        title: 'Les types de données de base', type: 'concept',
        text: 'Python déduit automatiquement le type d’une valeur. La fonction `type()` permet de le vérifier.',
        items: [
          ['int', 'nombres entiers : `42`, `-7`, `0`.'],
          ['float', 'nombres décimaux, écrits avec un point : `3.5`, `0.18`.'],
          ['str', 'textes : `"Dakar"`, `\'Bonjour\'`.'],
          ['bool', 'valeurs logiques : `True` ou `False` (avec une majuscule).']
        ],
        blocks: [{
          code: py`print(type(42))
print(type(3.5))
print(type("Dakar"))
print(type(True))`,
          output: py`<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>`
        }]
      },
      {
        title: 'Convertir un type en un autre', type: 'concept',
        text: 'Le type change le comportement des opérateurs. Avec deux textes, `+` les colle bout à bout (concaténation) ; avec deux nombres, il les additionne. Pour passer d’un type à l’autre, on utilise les fonctions de conversion `int()`, `float()`, `str()` et `bool()`.',
        code: py`texte = "12"
nombre = int(texte)
print(texte + texte)
print(nombre + nombre)
print(float("2.5") * 2)
print("Score : " + str(18))`,
        output: py`1212
24
5.0
Score : 18`,
        after: 'Une conversion impossible provoque une erreur : `int("douze")` ou `int("3.5")` déclenchent une `ValueError`. Nous apprendrons à gérer proprement ces erreurs en leçon 8 ; pour l’instant, retenez qu’il faut vérifier les données avant de les convertir.'
      },
      {
        title: 'Les opérateurs arithmétiques', type: 'concept',
        items: [
          ['+ - *', 'addition, soustraction, multiplication.'],
          ['/', 'division décimale : le résultat est toujours un `float`.'],
          ['//', 'division entière : le quotient sans la partie décimale.'],
          ['%', 'modulo : le reste de la division entière.'],
          ['**', 'puissance : `2 ** 3` vaut 8.']
        ],
        blocks: [{
          code: py`a = 17
b = 5
print(a + b, a - b, a * b)
print(a / b)
print(a // b, a % b)
print(2 ** 10)`,
          output: py`22 12 85
3.4
3 2
1024`,
          after: '17 divisé par 5 donne un quotient de 3 et un reste de 2 : c’est exactement ce que renvoient `//` et `%`. Le modulo est très utilisé en algorithmique, par exemple pour savoir si un nombre est pair (`n % 2 == 0`).'
        }]
      },
      {
        title: 'Opérateurs de comparaison et opérateurs logiques', type: 'concept',
        text: 'Une comparaison produit toujours un booléen. Les opérateurs sont `==` (égal), `!=` (différent), `<`, `>`, `<=` et `>=`. Les opérateurs logiques combinent des booléens : `and` est vrai si les deux conditions sont vraies, `or` si au moins une l’est, et `not` inverse une valeur.',
        code: py`age = 20
print(age >= 18)
print(age == 18)
print(age > 18 and age < 30)
print(not age > 18)`,
        output: py`True
False
True
False`
      },
      {
        title: 'La priorité des opérations', type: 'concept',
        text: 'Quand une expression contient plusieurs opérateurs, Python suit un ordre précis : d’abord les parenthèses, puis `**`, puis `*`, `/`, `//`, `%`, puis `+` et `-`, ensuite les comparaisons, et enfin `not`, `and` puis `or`. À priorité égale, le calcul se fait de gauche à droite (sauf pour `**`).',
        code: py`print(2 + 3 * 4)
print((2 + 3) * 4)
print(-2 ** 2)
print(10 - 4 - 3)`,
        output: py`14
20
-4
3`,
        after: 'Le troisième résultat surprend souvent : `-2 ** 2` est calculé comme `-(2 ** 2)`, car la puissance est prioritaire sur le signe moins. En cas de doute, ajoutez des parenthèses : elles rendent aussi le code plus lisible.'
      },
      {
        title: 'Lire une saisie avec input()', type: 'concept',
        text: 'La fonction `input()` affiche un message, attend que l’utilisateur tape une réponse puis appuie sur Entrée, et renvoie ce qui a été tapé. Point essentiel : `input()` renvoie toujours une chaîne de caractères, même si l’utilisateur tape un nombre. Il faut donc convertir la saisie avant de calculer.',
        code: py`prenom = input("Votre prénom : ")
annee = int(input("Votre année de naissance : "))
age = 2026 - annee
print("Bonjour", prenom + ", vous aurez", age, "ans en 2026.")`,
        stdin: ['Moussa', '2004'],
        output: py`Votre prénom : Moussa
Votre année de naissance : 2004
Bonjour Moussa, vous aurez 22 ans en 2026.`,
        after: 'Dans le résultat, « Moussa » et « 2004 » sont les réponses tapées par l’utilisateur. La deuxième ligne imbrique deux fonctions : `input()` récupère le texte, puis `int()` le convertit en entier.'
      },
      {
        title: 'Afficher proprement avec les f-strings', type: 'concept',
        text: 'Une f-string est une chaîne précédée de la lettre `f`. Les variables ou expressions placées entre accolades sont remplacées par leur valeur. On peut aussi préciser un format : `:.2f` affiche un nombre avec deux décimales. La fonction `round()` arrondit un nombre.',
        code: py`produit = "Cahier"
prix = 750
quantite = 3
total = prix * quantite
print(f"{quantite} x {produit} = {total} FCFA")
moyenne = 14.6666
print(f"Moyenne : {moyenne:.2f}")
print(round(moyenne, 1))`,
        output: py`3 x Cahier = 2250 FCFA
Moyenne : 14.67
14.7`
      },
      {
        title: 'Exemple commenté : rendre la monnaie', type: 'example',
        text: 'Problème : décomposer un montant en billets de 1000 FCFA et en pièces de 100 FCFA. La division entière et le modulo font tout le travail.',
        code: py`# Rendre la monnaie avec des billets de 1000 et des pièces de 100 FCFA
montant = 3700
billets = montant // 1000      # nombre de billets de 1000
reste = montant % 1000         # ce qui reste après les billets
pieces = reste // 100          # nombre de pièces de 100
print(montant, "FCFA =", billets, "billets de 1000 et", pieces, "pièces de 100")`,
        output: py`3700 FCFA = 3 billets de 1000 et 7 pièces de 100`,
        after: '`3700 // 1000` vaut 3 (trois billets). `3700 % 1000` vaut 700 : c’est le reste à rendre en pièces. `700 // 100` vaut 7. Cet enchaînement « quotient puis reste » se retrouve dans de nombreux algorithmes : conversion de durées, de distances, de bases numériques.'
      }
    ],
    guided: {
      title: 'Exercice guidé — Convertisseur de températures', type: 'exercise',
      text: 'Écrivez un programme qui demande une température en degrés Celsius et affiche son équivalent en degrés Fahrenheit, selon la formule F = C × 9 / 5 + 32.',
      ordered: true,
      items: [
        'Identifiez l’entrée (la température en °C), le traitement (la formule) et la sortie (la température en °F).',
        'Lisez la saisie avec `input()` et convertissez-la avec `float()` pour accepter les décimales.',
        'Appliquez la formule et rangez le résultat dans une variable `fahrenheit`.',
        'Affichez le résultat avec une f-string.',
        'Testez avec 25 °C : vous devez obtenir 77 °F.'
      ],
      solution: {
        code: py`celsius = float(input("Température en °C : "))
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} °C = {fahrenheit} °F")`,
        stdin: ['25'],
        output: py`Température en °C : 25
25.0 °C = 77.0 °F`,
        after: '`float()` est préférable à `int()` ici, car une température peut être décimale (par exemple 36.6). Le calcul respecte les priorités : multiplication et division d’abord, addition ensuite.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Demandez la longueur et la largeur d’un rectangle, puis affichez son aire et son périmètre.',
        'Convertissez une durée de 3725 secondes en heures, minutes et secondes.',
        'Calculez la moyenne des notes 12, 15.5 et 9, puis affichez-la avec deux décimales.',
        'Sans exécuter le code, prédisez la valeur de : `7 // 2`, `7 % 2`, `2 + 2 * 3 ** 2` et `True and not False`. Vérifiez ensuite dans Python.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`longueur = float(input("Longueur : "))
largeur = float(input("Largeur : "))
print("Aire :", longueur * largeur)
print("Périmètre :", 2 * (longueur + largeur))`,
        stdin: ['8', '5'],
        output: py`Longueur : 8
Largeur : 5
Aire : 40.0
Périmètre : 26.0`,
        blocks: [{
          text: 'Exercice 2 : on enchaîne quotient et reste.',
          code: py`total = 3725
heures = total // 3600
minutes = (total % 3600) // 60
secondes = total % 60
print(f"{total} s = {heures} h {minutes} min {secondes} s")`,
          output: py`3725 s = 1 h 2 min 5 s`
        }, {
          text: 'Exercice 3 :',
          code: py`moyenne = (12 + 15.5 + 9) / 3
print(f"Moyenne : {moyenne:.2f}")`,
          output: py`Moyenne : 12.17`,
          after: 'Les parenthèses sont indispensables : sans elles, seule la note 9 serait divisée par 3.\nExercice 4 : `7 // 2` vaut 3, `7 % 2` vaut 1, `2 + 2 * 3 ** 2` vaut 20 (puissance, puis multiplication, puis addition) et `True and not False` vaut `True`.'
        }]
      }
    },
    code: py`# Facture simple : quantité, prix unitaire, remise et TVA
article = "Clé USB"
prix_unitaire = 4500        # en FCFA
quantite = 4
remise = 0.10               # 10 % de remise

sous_total = prix_unitaire * quantite
montant_remise = sous_total * remise
total_ht = sous_total - montant_remise
tva = total_ht * 0.18
total_ttc = total_ht + tva

print(f"Article       : {article} x {quantite}")
print(f"Sous-total    : {sous_total} FCFA")
print(f"Remise (10 %) : -{montant_remise:.0f} FCFA")
print(f"Total HT      : {total_ht:.0f} FCFA")
print(f"TVA (18 %)    : {tva:.0f} FCFA")
print(f"Total TTC     : {total_ttc:.0f} FCFA")`,
    output: py`Article       : Clé USB x 4
Sous-total    : 18000 FCFA
Remise (10 %) : -1800 FCFA
Total HT      : 16200 FCFA
TVA (18 %)    : 2916 FCFA
Total TTC     : 19116 FCFA`,
    explain: [
      ['prix_unitaire = 4500', 'Chaque donnée de la facture est rangée dans une variable au nom explicite. Le commentaire précise l’unité.'],
      ['remise = 0.10', 'Un pourcentage est stocké sous forme décimale : 10 % = 0.10.'],
      ['sous_total = prix_unitaire * quantite', 'Le traitement est découpé en petites étapes intermédiaires, plus faciles à vérifier qu’une seule longue formule.'],
      ['tva = total_ht * 0.18', 'La TVA s’applique après la remise, sur le total hors taxe.'],
      ['{montant_remise:.0f}', 'Le format `.0f` affiche un nombre décimal sans chiffre après la virgule : 1800.0 devient 1800.']
    ],
    quiz: [
      { q: 'Quel est le type de la valeur renvoyée par `input()` ?', o: ['int', 'str', 'Cela dépend de ce que tape l’utilisateur'], a: 1, e: '`input()` renvoie toujours une chaîne de caractères ; il faut la convertir avec `int()` ou `float()` pour calculer.' },
      { q: 'Que vaut `17 % 5` ?', o: ['3', '3.4', '2'], a: 2, e: '17 = 3 × 5 + 2 : le modulo renvoie le reste de la division entière, soit 2.' },
      { q: 'Que vaut `2 + 3 * 2 ** 2` ?', o: ['14', '100', '20'], a: 0, e: 'La puissance est calculée d’abord (2 ** 2 = 4), puis la multiplication (3 × 4 = 12), puis l’addition (2 + 12 = 14).' },
      { q: 'Quel est le type de `10 / 2` ?', o: ['int', 'float', 'str'], a: 1, e: 'L’opérateur `/` renvoie toujours un nombre décimal : `10 / 2` vaut `5.0`. Utilisez `//` pour obtenir un entier.' }
    ],
    summary: [
      'Une variable associe un nom à une valeur ; `=` signifie « reçoit la valeur ».',
      'Les types de base sont `int`, `float`, `str` et `bool` ; `type()` les révèle.',
      '`int()`, `float()` et `str()` convertissent les données, notamment les saisies de `input()`.',
      '`//` et `%` donnent le quotient et le reste d’une division entière.',
      'Les comparaisons produisent des booléens, combinables avec `and`, `or` et `not`.',
      'Les f-strings (`f"{variable}"`) produisent des affichages lisibles et formatés.'
    ],
    errors: [
      'Additionner un texte et un nombre : `"Âge : " + 20` provoque une `TypeError`. Utilisez une f-string ou `str(20)`.',
      'Oublier de convertir une saisie : `input("Âge : ") + 1` échoue, car la saisie est un texte.',
      'Confondre `=` (affectation) et `==` (comparaison).',
      'Commencer un nom de variable par un chiffre ou y mettre une espace : `2eme note` est invalide.',
      'S’étonner que `0.1 + 0.2` affiche `0.30000000000000004` : les décimaux sont stockés de façon approchée. Arrondissez à l’affichage avec `round()` ou `:.2f`.'
    ],
    resources: [
      ['Introduction informelle à Python', 'https://docs.python.org/fr/3/tutorial/introduction.html', 'nombres, textes et premières opérations.'],
      ['Types natifs', 'https://docs.python.org/fr/3/library/stdtypes.html', 'référence complète des types et opérateurs.'],
      ['Entrées et sorties', 'https://docs.python.org/fr/3/tutorial/inputoutput.html', 'f-strings et formatage de l’affichage.'],
      ['Python Tutor', 'https://pythontutor.com/', 'visualiser pas à pas l’évolution des variables en mémoire.']
    ],
    next: 'Vos programmes calculent, mais ils exécutent toujours les mêmes instructions dans le même ordre. La leçon 3 vous apprend à prendre des décisions : afficher un message différent selon une note, refuser une saisie invalide, appliquer un tarif selon l’âge.'
  }));

  /* ---------------------------------------------------------------- Leçon 3 */
  L.push(lesson({
    title: 'Conditions et logique décisionnelle',
    level: 'Débutant',
    duration: '2 h',
    intro: 'Un programme devient intelligent lorsqu’il adapte son comportement aux données. Avec `if`, `elif` et `else`, vous allez apprendre à exprimer des décisions, à combiner plusieurs critères et à vérifier qu’une saisie est valide.',
    objectives: [
      'Écrire des expressions booléennes correctes.',
      'Utiliser `if`, `elif` et `else` en respectant l’indentation.',
      'Imbriquer des conditions et choisir entre imbrication et combinaison logique.',
      'Combiner des critères avec `and`, `or` et `not`.',
      'Valider une saisie utilisateur avant de l’utiliser.'
    ],
    prerequisites: [
      'Leçon 2 : variables, types, opérateurs de comparaison et `input()`.'
    ],
    definitions: [
      ['Condition', 'expression booléenne évaluée par Python pour décider quel bloc exécuter.'],
      ['Bloc', 'ensemble d’instructions indentées du même nombre d’espaces, qui s’exécutent ensemble.'],
      ['Indentation', 'décalage du début de ligne (4 espaces par convention) qui délimite les blocs en Python.'],
      ['Branche', 'chacun des chemins possibles d’une structure conditionnelle.'],
      ['Validation', 'vérification qu’une donnée respecte les règles attendues avant de l’utiliser.']
    ],
    body: [
      {
        title: 'La structure if / elif / else', type: 'concept',
        text: 'Le mot-clé `if` (« si ») est suivi d’une condition et de deux-points. Les instructions du bloc, décalées de quatre espaces, ne s’exécutent que si la condition est vraie. `elif` (« sinon si ») teste une autre condition lorsque les précédentes sont fausses, et `else` (« sinon ») traite tous les cas restants.\nPython évalue les conditions de haut en bas et n’exécute que le premier bloc dont la condition est vraie : l’ordre des tests est donc important.',
        code: py`note = 13.5
if note >= 16:
    print("Très bien")
elif note >= 14:
    print("Bien")
elif note >= 12:
    print("Assez bien")
elif note >= 10:
    print("Passable")
else:
    print("Non admis")`,
        output: py`Assez bien`,
        after: 'Avec 13.5, les deux premiers tests sont faux, le troisième est vrai : Python affiche « Assez bien » et ignore la suite. Si l’on avait testé `note >= 10` en premier, toutes les notes supérieures à 10 auraient affiché « Passable » : on teste donc du plus exigeant au moins exigeant.'
      },
      {
        title: 'Conditions imbriquées', type: 'concept',
        text: 'Un bloc peut contenir lui-même une structure conditionnelle. On parle de conditions imbriquées. Chaque niveau ajoute quatre espaces d’indentation.',
        code: py`age = 17
autorisation_parentale = True
if age >= 18:
    print("Inscription acceptée.")
else:
    if autorisation_parentale:
        print("Inscription acceptée avec autorisation parentale.")
    else:
        print("Inscription refusée.")`,
        output: py`Inscription acceptée avec autorisation parentale.`,
        after: 'Notez `if autorisation_parentale:` : une variable booléenne peut servir directement de condition, inutile d’écrire `== True`. Au-delà de deux ou trois niveaux, l’imbrication devient difficile à lire ; on préfère alors combiner les conditions avec les opérateurs logiques.'
      },
      {
        title: 'Combiner des critères avec and, or et not', type: 'concept',
        text: 'Règle des années bissextiles : une année est bissextile si elle est divisible par 4 mais pas par 100, ou si elle est divisible par 400. Cette phrase se traduit presque mot pour mot en Python.',
        code: py`annee = 2024
bissextile = (annee % 4 == 0 and annee % 100 != 0) or annee % 400 == 0
if bissextile:
    print(annee, "est bissextile.")
else:
    print(annee, "n'est pas bissextile.")`,
        output: py`2024 est bissextile.`,
        after: 'Le résultat de la condition est stocké dans une variable booléenne au nom parlant, ce qui rend le `if` très lisible. Les parenthèses explicitent le regroupement : sans elles, `and` serait de toute façon évalué avant `or`, mais le lecteur devrait s’en souvenir.\nPython permet aussi d’enchaîner les comparaisons : `0 <= note <= 20` signifie « note comprise entre 0 et 20 ».'
      },
      {
        title: 'Valider les données saisies', type: 'concept',
        text: 'Un utilisateur peut taper n’importe quoi. Avant de convertir une saisie, on vérifie qu’elle a la bonne forme ; après conversion, on vérifie qu’elle est dans les limites acceptables. La méthode `isdigit()` renvoie `True` si une chaîne ne contient que des chiffres.',
        code: py`saisie = input("Note sur 20 : ")
if not saisie.isdigit():
    print("Erreur : veuillez saisir un nombre entier.")
else:
    note = int(saisie)
    if 0 <= note <= 20:
        print("Note enregistrée :", note)
    else:
        print("Erreur : la note doit être comprise entre 0 et 20.")`,
        stdin: ['25'],
        output: py`Note sur 20 : 25
Erreur : la note doit être comprise entre 0 et 20.`,
        after: 'Deux niveaux de contrôle : la forme (« est-ce un nombre ? ») puis la plage (« est-il entre 0 et 20 ? »). Avec la saisie « 25 », le premier test passe, le second échoue. `isdigit()` refuse les nombres négatifs et décimaux ; en leçon 8, `try` / `except` offrira une validation plus souple.'
      },
      {
        title: 'Exemple commenté : un tarif à plusieurs conditions', type: 'example',
        text: 'Une compagnie de transport facture 25 FCFA par kilomètre. Les enfants de moins de 12 ans paient moitié prix ; les étudiants et les personnes de 65 ans ou plus bénéficient de 30 % de réduction. Une distance négative ou nulle est invalide.',
        code: py`age = 22
etudiant = True
distance_km = 120

if distance_km <= 0:
    print("Distance invalide.")
else:
    prix = distance_km * 25          # 25 FCFA par kilomètre
    if age < 12:
        prix = prix * 0.5            # enfants : -50 %
    elif etudiant or age >= 65:
        prix = prix * 0.7            # étudiants et seniors : -30 %
    print(f"Prix du billet : {prix:.0f} FCFA")`,
        output: py`Prix du billet : 2100 FCFA`,
        after: 'On commence par écarter le cas invalide, ce qui évite de calculer un prix absurde. Ensuite, le prix de base est calculé une seule fois puis ajusté. L’enfant est testé avant l’étudiant : un enfant étudiant (cas rare mais possible) obtient ainsi la réduction la plus avantageuse. Pensez toujours aux cas limites : que se passe-t-il pour 12 ans exactement ? pour 65 ans ?'
      }
    ],
    guided: {
      title: 'Exercice guidé — Calculateur d’IMC', type: 'exercise',
      text: 'L’indice de masse corporelle se calcule par IMC = poids ÷ taille², avec le poids en kilogrammes et la taille en mètres. Affichez l’IMC arrondi à une décimale et la catégorie correspondante : moins de 18,5 « Insuffisance pondérale », moins de 25 « Corpulence normale », moins de 30 « Surpoids », sinon « Obésité ». (Exercice de programmation : seul un professionnel de santé peut interpréter un IMC.)',
      ordered: true,
      items: [
        'Lisez le poids et la taille avec `float(input(...))`.',
        'Calculez l’IMC avec l’opérateur `**`.',
        'Choisissez la catégorie avec `if` / `elif` / `else`, en testant les seuils dans l’ordre croissant.',
        'Affichez le résultat sur une ligne avec une f-string et le format `:.1f`.',
        'Testez avec 70 kg et 1,75 m (saisissez `1.75` avec un point).'
      ],
      solution: {
        code: py`poids = float(input("Poids (kg) : "))
taille = float(input("Taille (m) : "))
imc = poids / taille ** 2

if imc < 18.5:
    categorie = "Insuffisance pondérale"
elif imc < 25:
    categorie = "Corpulence normale"
elif imc < 30:
    categorie = "Surpoids"
else:
    categorie = "Obésité"

print(f"IMC : {imc:.1f} — {categorie}")`,
        stdin: ['70', '1.75'],
        output: py`Poids (kg) : 70
Taille (m) : 1.75
IMC : 22.9 — Corpulence normale`,
        after: 'Chaque branche range la catégorie dans une variable, puis un seul `print()` affiche le résultat : on évite ainsi de répéter quatre fois l’affichage. Comme les seuils sont testés dans l’ordre croissant, `elif imc < 25` signifie implicitement « entre 18,5 et 25 ».'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Demandez un nombre entier et affichez s’il est pair ou impair.',
        'Trouvez le plus grand de trois nombres sans utiliser la fonction `max()`.',
        'Un mot de passe est accepté s’il contient au moins 8 caractères et s’il est différent de « motdepasse ». La fonction `len()` donne la longueur d’une chaîne. Affichez « Accepté » ou « Refusé ».',
        'Résolvez l’équation du second degré ax² + bx + c = 0 avec a = 1, b = -3 et c = 2 en calculant le discriminant Δ = b² − 4ac.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`nombre = int(input("Nombre : "))
if nombre % 2 == 0:
    print(nombre, "est pair.")
else:
    print(nombre, "est impair.")`,
        stdin: ['7'],
        output: py`Nombre : 7
7 est impair.`,
        blocks: [{
          text: 'Exercice 2 : on suppose que le premier nombre est le plus grand, puis on corrige si nécessaire.',
          code: py`a = 12
b = 45
c = 7
plus_grand = a
if b > plus_grand:
    plus_grand = b
if c > plus_grand:
    plus_grand = c
print("Le plus grand est", plus_grand)`,
          output: py`Le plus grand est 45`,
          after: 'Ici on utilise deux `if` indépendants, et non `elif` : chaque nombre doit être comparé au maximum provisoire.'
        }, {
          text: 'Exercice 3 :',
          code: py`mot_de_passe = "soleil2026"
if len(mot_de_passe) >= 8 and mot_de_passe != "motdepasse":
    print("Accepté")
else:
    print("Refusé")`,
          output: py`Accepté`
        }, {
          text: 'Exercice 4 : la racine carrée s’obtient avec `** 0.5`.',
          code: py`a = 1
b = -3
c = 2
delta = b ** 2 - 4 * a * c
if delta > 0:
    x1 = (-b - delta ** 0.5) / (2 * a)
    x2 = (-b + delta ** 0.5) / (2 * a)
    print("Deux solutions :", x1, "et", x2)
elif delta == 0:
    print("Une solution :", -b / (2 * a))
else:
    print("Aucune solution réelle.")`,
          output: py`Deux solutions : 1.0 et 2.0`
        }]
      }
    },
    code: py`# Décider si un étudiant peut passer l'examen final
assiduite = 82        # pourcentage de présence
moyenne_cc = 9.5      # moyenne du contrôle continu
frais_payes = True

if not frais_payes:
    decision = "Refusé : frais d'inscription non réglés"
elif assiduite < 75:
    decision = "Refusé : assiduité insuffisante"
elif moyenne_cc >= 10:
    decision = "Admis à l'examen"
elif moyenne_cc >= 8:
    decision = "Admis sous réserve : devoir de rattrapage obligatoire"
else:
    decision = "Refusé : moyenne de contrôle continu trop faible"

print(f"Assiduité : {assiduite} % | Moyenne CC : {moyenne_cc}")
print("Décision :", decision)`,
    output: py`Assiduité : 82 % | Moyenne CC : 9.5
Décision : Admis sous réserve : devoir de rattrapage obligatoire`,
    explain: [
      ['frais_payes = True', 'Un booléen représente une information oui / non. Il sera utilisé directement comme condition.'],
      ['if not frais_payes:', 'Les conditions bloquantes sont testées en premier : inutile d’examiner les notes si l’inscription n’est pas réglée.'],
      ['elif assiduite < 75:', 'Deuxième condition éliminatoire. Elle n’est évaluée que si la première est fausse.'],
      ['elif moyenne_cc >= 10:', 'Les seuils de moyenne sont testés du plus élevé au plus bas pour que chaque note tombe dans la bonne catégorie.'],
      ['decision = ...', 'Chaque branche range sa conclusion dans la même variable, affichée une seule fois à la fin.']
    ],
    quiz: [
      { q: 'Combien de blocs au maximum sont exécutés dans une structure `if` / `elif` / `else` ?', o: ['Tous ceux dont la condition est vraie', 'Un seul', 'Aucun si `else` est présent'], a: 1, e: 'Python exécute uniquement le premier bloc dont la condition est vraie, puis sort de la structure.' },
      { q: 'Que vaut `True or False and False` ?', o: ['True', 'False', 'Une erreur'], a: 0, e: '`and` est prioritaire : `False and False` vaut `False`, puis `True or False` vaut `True`.' },
      { q: 'Quelle erreur provoque l’oubli des deux-points après `if note > 10` ?', o: ['NameError', 'SyntaxError', 'Aucune, ils sont facultatifs'], a: 1, e: 'Les deux-points sont obligatoires : ils annoncent le début du bloc. Leur absence provoque une `SyntaxError`.' },
      { q: 'Comment tester qu’un nombre `x` est compris entre 1 et 100 inclus ?', o: ['if 1 <= x <= 100:', 'if x == 1 or 100:', 'if x > 1 and < 100:'], a: 0, e: 'Python accepte les comparaisons enchaînées. `x == 1 or 100` est toujours vrai car `100` seul est considéré comme vrai, et la troisième forme est invalide.' }
    ],
    summary: [
      '`if` exécute un bloc si une condition est vraie ; `elif` et `else` traitent les autres cas.',
      'Seul le premier bloc dont la condition est vraie est exécuté : l’ordre des tests compte.',
      'L’indentation de 4 espaces délimite les blocs ; les deux-points sont obligatoires.',
      '`and`, `or` et `not` combinent des critères ; `0 <= x <= 20` teste un intervalle.',
      'On valide une saisie en deux temps : sa forme, puis sa plage de valeurs.'
    ],
    errors: [
      'Oublier les deux-points ou mal indenter un bloc : `SyntaxError` ou `IndentationError`.',
      'Écrire `if note = 10:` au lieu de `if note == 10:`.',
      'Écrire `if choix == "a" or "b":` : la condition est toujours vraie. Il faut `choix == "a" or choix == "b"`.',
      'Tester les seuils dans le mauvais ordre, ce qui rend certaines branches inaccessibles.',
      'Comparer un texte et un nombre : `input("Âge : ") > 18` provoque une `TypeError`.'
    ],
    resources: [
      ['Structures de contrôle', 'https://docs.python.org/fr/3/tutorial/controlflow.html', 'documentation officielle de `if`, `for`, `while`.'],
      ['Valeurs de vérité', 'https://docs.python.org/fr/3/library/stdtypes.html#truth-value-testing', 'quelles valeurs Python considère comme vraies ou fausses.'],
      ['PEP 8, guide de style', 'https://peps.python.org/pep-0008/', 'conventions d’écriture du code Python (indentation, nommage).']
    ],
    next: 'Vous savez choisir entre plusieurs chemins. Mais comment répéter une action cent fois sans écrire cent lignes ? La leçon 4 présente les boucles `for` et `while`, qui permettent de compter, d’accumuler et de redemander une saisie tant qu’elle est incorrecte.'
  }));

  /* ---------------------------------------------------------------- Leçon 4 */
  L.push(lesson({
    title: 'Boucles et répétitions',
    level: 'Débutant',
    duration: '2 h 30',
    intro: 'Répéter une action est l’une des tâches que l’ordinateur accomplit le mieux. Avec les boucles `for` et `while`, vous allez traiter des séries de données, compter, cumuler des totaux et redemander une saisie tant qu’elle est incorrecte, sans jamais tomber dans une boucle infinie.',
    objectives: [
      'Parcourir une séquence et une plage de nombres avec `for` et `range()`.',
      'Répéter des instructions tant qu’une condition est vraie avec `while`.',
      'Contrôler une boucle avec `break` et `continue`.',
      'Utiliser des compteurs et des accumulateurs.',
      'Écrire des boucles imbriquées et prévenir les boucles infinies.'
    ],
    prerequisites: [
      'Leçon 3 : conditions `if` / `elif` / `else` et indentation des blocs.'
    ],
    definitions: [
      ['Boucle', 'structure qui répète un bloc d’instructions.'],
      ['Itération', 'un passage dans la boucle ; une boucle de 10 tours effectue 10 itérations.'],
      ['Compteur', 'variable qui augmente de 1 à chaque fois qu’un événement se produit.'],
      ['Accumulateur', 'variable qui cumule des valeurs successives, par exemple une somme.'],
      ['range()', 'fonction qui produit une suite de nombres entiers, très utilisée avec `for`.'],
      ['Condition d’arrêt', 'condition qui, lorsqu’elle devient fausse, met fin à une boucle `while`.'],
      ['Boucle infinie', 'boucle dont la condition d’arrêt n’est jamais atteinte : le programme ne se termine pas.']
    ],
    body: [
      {
        title: 'La boucle for', type: 'concept',
        text: 'La boucle `for` parcourt les éléments d’une séquence, un par un. À chaque itération, la variable de boucle prend la valeur de l’élément suivant. On l’utilise lorsqu’on connaît à l’avance l’ensemble des éléments à traiter.',
        code: py`for lettre in "Python":
    print(lettre, end=" ")
print()

for i in range(5):
    print("Tour", i)`,
        output: py`P y t h o n
Tour 0
Tour 1
Tour 2
Tour 3
Tour 4`,
        after: 'Le paramètre `end=" "` remplace le retour à la ligne habituel de `print()` par une espace : les lettres s’affichent donc sur une seule ligne. Le `print()` vide qui suit termine cette ligne. Remarquez que `range(5)` produit 0, 1, 2, 3, 4 : cinq valeurs, en commençant à 0.'
      },
      {
        title: 'Comprendre range()', type: 'concept',
        text: '`range()` accepte un, deux ou trois arguments : `range(fin)`, `range(début, fin)` et `range(début, fin, pas)`. La valeur de fin n’est jamais incluse. Pour visualiser les nombres produits, on peut les convertir en liste avec `list()` (les listes sont détaillées en leçon 5).',
        code: py`print(list(range(5)))
print(list(range(2, 8)))
print(list(range(0, 20, 5)))
print(list(range(10, 0, -3)))`,
        output: py`[0, 1, 2, 3, 4]
[2, 3, 4, 5, 6, 7]
[0, 5, 10, 15]
[10, 7, 4, 1]`,
        after: 'Un pas négatif permet de compter à rebours. Pour parcourir les nombres de 1 à 10 inclus, on écrit donc `range(1, 11)`.'
      },
      {
        title: 'La boucle while', type: 'concept',
        text: 'La boucle `while` (« tant que ») répète son bloc tant que sa condition est vraie. On l’utilise lorsque le nombre de répétitions n’est pas connu à l’avance : attendre une saisie correcte, simuler une épargne jusqu’à un objectif, jouer jusqu’à la victoire.',
        code: py`compte = 3
while compte > 0:
    print(compte, "...")
    compte -= 1
print("Décollage !")`,
        output: py`3 ...
2 ...
1 ...
Décollage !`,
        after: '`compte -= 1` est un raccourci de `compte = compte - 1`. Il existe aussi `+=`, `*=` et `/=`. La ligne qui modifie `compte` est vitale : sans elle, la condition `compte > 0` resterait vraie pour toujours.'
      },
      {
        title: 'Compteurs et accumulateurs', type: 'concept',
        text: 'Deux schémas reviennent sans cesse. Un accumulateur est initialisé avant la boucle (souvent à 0) puis enrichi à chaque tour. Un compteur augmente de 1 chaque fois qu’une condition est remplie.',
        code: py`somme = 0
multiples_de_7 = 0
for n in range(1, 101):
    somme += n
    if n % 7 == 0:
        multiples_de_7 += 1
print("Somme de 1 à 100 :", somme)
print("Multiples de 7 :", multiples_de_7)`,
        output: py`Somme de 1 à 100 : 5050
Multiples de 7 : 14`,
        after: 'L’initialisation se fait avant la boucle : si l’on écrivait `somme = 0` à l’intérieur, la somme serait remise à zéro à chaque tour.'
      },
      {
        title: 'Contrôler une boucle : break et continue', type: 'concept',
        text: '`continue` passe immédiatement à l’itération suivante, sans exécuter la fin du bloc. `break` interrompt complètement la boucle.',
        code: py`for n in range(1, 11):
    if n % 3 == 0:
        continue          # on saute les multiples de 3
    if n > 8:
        break             # on arrête tout après 8
    print(n, end=" ")
print()`,
        output: py`1 2 4 5 7 8`,
        after: '3 et 6 sont sautés par `continue`. 9 est aussi sauté (multiple de 3), puis 10 déclenche `break`. Utilisez ces instructions avec modération : une condition de boucle claire est souvent plus lisible.'
      },
      {
        title: 'Redemander une saisie tant qu’elle est invalide', type: 'concept',
        text: 'La boucle `while` est l’outil naturel de la validation : on redemande tant que la réponse ne convient pas.',
        code: py`note = -1
while note < 0 or note > 20:
    note = int(input("Note (0 à 20) : "))
    if note < 0 or note > 20:
        print("Valeur hors limites, recommencez.")
print("Note acceptée :", note)`,
        stdin: ['25', '-3', '14'],
        output: py`Note (0 à 20) : 25
Valeur hors limites, recommencez.
Note (0 à 20) : -3
Valeur hors limites, recommencez.
Note (0 à 20) : 14
Note acceptée : 14`,
        after: 'La variable `note` reçoit volontairement une valeur invalide (-1) avant la boucle, pour que la condition soit vraie au premier passage. Une autre écriture fréquente utilise `while True:` et sort avec `break` dès que la saisie est correcte.'
      },
      {
        title: 'Les boucles imbriquées', type: 'concept',
        text: 'Une boucle peut en contenir une autre. Pour chaque tour de la boucle extérieure, la boucle intérieure s’exécute entièrement. C’est le principe d’un tableau : les lignes à l’extérieur, les colonnes à l’intérieur.',
        code: py`for ligne in range(1, 4):
    for colonne in range(1, 6):
        print(f"{ligne * colonne:3}", end="")
    print()`,
        output: py`  1  2  3  4  5
  2  4  6  8 10
  3  6  9 12 15`,
        after: 'Le format `:3` réserve trois caractères à chaque nombre, ce qui aligne les colonnes. La boucle intérieure effectue 5 tours pour chacun des 3 tours de la boucle extérieure : 15 multiplications au total.'
      },
      {
        title: 'Éviter les boucles infinies', type: 'concept',
        text: 'Le programme ci-dessous ne s’arrête jamais, car la variable testée n’est jamais modifiée. Si cela vous arrive, interrompez l’exécution avec Ctrl + C dans le terminal (ou le bouton « Stop » de votre éditeur).',
        code: py`# ATTENTION : ce programme ne s'arrête jamais !
i = 0
while i < 5:
    print(i)
    # oubli de : i += 1`,
        norun: true,
        after: 'Avant d’écrire une boucle `while`, posez-vous trois questions : quelle variable contrôle la condition ? Est-elle modifiée dans la boucle ? Sa modification rapproche-t-elle de la condition d’arrêt ? Pour les boucles qui dépendent de l’utilisateur, ajoutez un garde-fou, par exemple un nombre maximal de tentatives.'
      },
      {
        title: 'Exemple commenté : deviner un nombre', type: 'example',
        text: 'Le joueur dispose de cinq essais pour trouver un nombre secret. La boucle combine deux conditions d’arrêt : la victoire ou l’épuisement des essais.',
        code: py`secret = 42
essais = 0
trouve = False

while not trouve and essais < 5:
    proposition = int(input("Votre proposition : "))
    essais += 1
    if proposition < secret:
        print("C'est plus !")
    elif proposition > secret:
        print("C'est moins !")
    else:
        trouve = True

if trouve:
    print(f"Bravo, trouvé en {essais} essai(s) !")
else:
    print("Perdu, le nombre était", secret)`,
        stdin: ['50', '30', '42'],
        output: py`Votre proposition : 50
C'est moins !
Votre proposition : 30
C'est plus !
Votre proposition : 42
Bravo, trouvé en 3 essai(s) !`,
        after: 'La variable booléenne `trouve` sert de drapeau : elle passe à `True` quand le joueur gagne, ce qui arrête la boucle. Le compteur `essais` garantit la fin du jeu même en cas d’échec. Après la boucle, on teste le drapeau pour savoir pourquoi elle s’est arrêtée. En leçon 6, le nombre secret sera tiré au hasard grâce au module `random`.'
      }
    ],
    guided: {
      title: 'Exercice guidé — Statistiques d’une série de notes', type: 'exercise',
      text: 'Demandez combien de notes l’utilisateur souhaite saisir, lisez-les une par une, puis affichez la moyenne, la note la plus basse et la plus haute.',
      ordered: true,
      items: [
        'Lisez le nombre de notes avec `int(input(...))`.',
        'Initialisez un accumulateur `somme` à 0, `plus_haute` à 0 et `plus_basse` à 20 (les bornes possibles).',
        'Avec une boucle `for` et `range(1, nombre + 1)`, lisez chaque note en affichant son numéro.',
        'Dans la boucle, ajoutez la note à la somme et mettez à jour le minimum et le maximum.',
        'Après la boucle, calculez et affichez la moyenne avec deux décimales.',
        'Testez avec les notes 12, 15, 8 et 17.'
      ],
      solution: {
        code: py`nombre = int(input("Combien de notes ? "))
somme = 0
plus_haute = 0
plus_basse = 20

for i in range(1, nombre + 1):
    note = float(input(f"Note {i} : "))
    somme += note
    if note > plus_haute:
        plus_haute = note
    if note < plus_basse:
        plus_basse = note

moyenne = somme / nombre
print(f"Moyenne : {moyenne:.2f} | Min : {plus_basse} | Max : {plus_haute}")`,
        stdin: ['4', '12', '15', '8', '17'],
        output: py`Combien de notes ? 4
Note 1 : 12
Note 2 : 15
Note 3 : 8
Note 4 : 17
Moyenne : 13.00 | Min : 8.0 | Max : 17.0`,
        after: 'Initialiser le maximum à 0 et le minimum à 20 garantit que la première note remplacera ces valeurs. La moyenne est calculée une seule fois, après la boucle : la calculer à chaque tour serait inutile.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Affichez la table de multiplication de 7, de 7 × 1 à 7 × 10.',
        'Calculez la factorielle de 6 (6 × 5 × 4 × 3 × 2 × 1) avec une boucle `while`.',
        'Comptez le nombre de voyelles du mot « programmation ».',
        'Affichez un triangle d’étoiles de hauteur 4 (une étoile sur la première ligne, quatre sur la dernière).',
        'Suite de Syracuse : partant de 6, divisez par 2 si le nombre est pair, sinon multipliez par 3 et ajoutez 1. Affichez la suite jusqu’à atteindre 1 et comptez les étapes.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`for i in range(1, 11):
    print(f"7 x {i} = {7 * i}")`,
        output: py`7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70`,
        blocks: [{
          text: 'Exercice 2 : l’accumulateur d’un produit commence à 1, et non à 0.',
          code: py`n = 6
resultat = 1
while n > 1:
    resultat *= n
    n -= 1
print("6! =", resultat)`,
          output: py`6! = 720`
        }, {
          text: 'Exercice 3 : l’opérateur `in` teste si une lettre appartient à la chaîne des voyelles.',
          code: py`voyelles = 0
for lettre in "programmation":
    if lettre in "aeiouy":
        voyelles += 1
print("Voyelles :", voyelles)`,
          output: py`Voyelles : 5`
        }, {
          text: 'Exercice 4 : multiplier une chaîne par un entier la répète.',
          code: py`for i in range(1, 5):
    print("*" * i)`,
          output: py`*
**
***
****`
        }, {
          text: 'Exercice 5 :',
          code: py`n = 6
etapes = 0
print(n, end=" ")
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    etapes += 1
    print(n, end=" ")
print()
print("Étapes :", etapes)`,
          output: py`6 3 10 5 16 8 4 2 1
Étapes : 8`,
          after: 'On utilise `//` pour que `n` reste un entier. Personne n’a encore démontré que cette suite atteint 1 pour tout nombre de départ : c’est la célèbre conjecture de Syracuse.'
        }]
      }
    },
    code: py`# Combien d'années pour doubler une épargne placée à 5 % par an ?
capital_initial = 100000      # en FCFA
taux = 0.05
capital = capital_initial
annees = 0

while capital < 2 * capital_initial:
    capital = capital * (1 + taux)
    annees += 1
    affichage = f"{capital:,.0f}".replace(",", " ")
    print(f"Année {annees:2} : {affichage} FCFA")

print(f"Capital doublé en {annees} ans.")`,
    output: py`Année  1 : 105 000 FCFA
Année  2 : 110 250 FCFA
Année  3 : 115 762 FCFA
Année  4 : 121 551 FCFA
Année  5 : 127 628 FCFA
Année  6 : 134 010 FCFA
Année  7 : 140 710 FCFA
Année  8 : 147 746 FCFA
Année  9 : 155 133 FCFA
Année 10 : 162 889 FCFA
Année 11 : 171 034 FCFA
Année 12 : 179 586 FCFA
Année 13 : 188 565 FCFA
Année 14 : 197 993 FCFA
Année 15 : 207 893 FCFA
Capital doublé en 15 ans.`,
    explain: [
      ['while capital < 2 * capital_initial:', 'On ne sait pas combien d’années seront nécessaires : `while` est donc plus adapté que `for`. La boucle s’arrête dès que l’objectif est atteint.'],
      ['capital = capital * (1 + taux)', 'Les intérêts sont composés : chaque année, le capital est multiplié par 1,05.'],
      ['annees += 1', 'Compteur d’années. C’est aussi lui qui garantit que l’on progresse vers la fin de la boucle, puisque le capital augmente à chaque tour.'],
      ['f"{capital:,.0f}".replace(",", " ")', 'Le format `,` sépare les milliers par des virgules ; on les remplace par des espaces, à la française.'],
      ['{annees:2}', 'Réserve deux caractères pour l’année afin d’aligner l’affichage.']
    ],
    quiz: [
      { q: 'Quels nombres produit `range(2, 10, 3)` ?', o: ['2, 5, 8', '2, 5, 8, 11', '3, 6, 9'], a: 0, e: 'On part de 2 et on avance de 3 tant que l’on reste strictement sous 10 : 2, 5, 8.' },
      { q: 'Quelle boucle choisir pour redemander une saisie jusqu’à ce qu’elle soit valide ?', o: ['for', 'while', 'Aucune, il faut un if'], a: 1, e: 'Le nombre de tentatives n’est pas connu à l’avance : la boucle `while` répète tant que la saisie est invalide.' },
      { q: 'Que fait l’instruction `continue` ?', o: ['Elle arrête la boucle', 'Elle passe directement à l’itération suivante', 'Elle recommence la boucle depuis le début'], a: 1, e: '`continue` ignore la fin du bloc pour le tour en cours ; `break` arrête complètement la boucle.' },
      { q: 'Pourquoi le programme `i = 0` / `while i < 5: print(i)` ne s’arrête-t-il jamais ?', o: ['Parce que `print` bloque la boucle', 'Parce que `i` n’est jamais modifié', 'Parce que 5 est trop grand'], a: 1, e: 'La condition `i < 5` reste toujours vraie, car `i` vaut toujours 0. Il manque `i += 1` dans la boucle.' }
    ],
    summary: [
      '`for` parcourt une séquence ou une plage de nombres connue à l’avance.',
      '`range(début, fin, pas)` produit des entiers ; la fin est exclue.',
      '`while` répète tant qu’une condition est vraie ; la condition doit finir par devenir fausse.',
      'Compteurs et accumulateurs s’initialisent avant la boucle et se mettent à jour dedans.',
      '`break` sort de la boucle, `continue` passe au tour suivant.'
    ],
    errors: [
      'Oublier de mettre à jour la variable de la condition d’un `while` : boucle infinie.',
      'Croire que `range(1, 10)` inclut 10.',
      'Initialiser un accumulateur à l’intérieur de la boucle : il est remis à zéro à chaque tour.',
      'Initialiser un produit à 0 : le résultat sera toujours 0.',
      'Modifier une liste pendant qu’on la parcourt avec `for` : des éléments peuvent être sautés.'
    ],
    resources: [
      ['Instructions for et range()', 'https://docs.python.org/fr/3/tutorial/controlflow.html#for-statements', 'documentation officielle.'],
      ['break, continue et else des boucles', 'https://docs.python.org/fr/3/tutorial/controlflow.html#break-and-continue-statements', 'cas d’usage avancés.'],
      ['Python Tutor', 'https://pythontutor.com/', 'visualiser chaque tour de boucle pas à pas.']
    ],
    next: 'Les boucles prennent toute leur puissance avec des collections de données : une liste de notes, un dictionnaire de produits, un ensemble d’inscrits. La leçon 5 vous apprend à les créer, les parcourir, les trier et les filtrer.'
  }));

  /* ---------------------------------------------------------------- Leçon 5 */
  L.push(lesson({
    title: 'Chaînes de caractères et collections',
    level: 'Débutant à intermédiaire',
    duration: '3 h',
    intro: 'Les programmes réels manipulent rarement une seule valeur. Cette leçon présente les outils qui permettent de travailler sur des textes et sur des ensembles de données : listes, tuples, dictionnaires et ensembles. Vous apprendrez à choisir la bonne structure et à y rechercher, trier et filtrer l’information.',
    objectives: [
      'Extraire, transformer et découper des chaînes de caractères.',
      'Créer et modifier des listes, et utiliser leurs méthodes principales.',
      'Utiliser des tuples pour des données fixes et le déballage de valeurs.',
      'Associer des clés à des valeurs avec des dictionnaires.',
      'Éliminer les doublons et comparer des groupes avec des ensembles.',
      'Parcourir, rechercher, trier et filtrer des collections.'
    ],
    prerequisites: [
      'Leçon 4 : boucles `for`, accumulateurs et compteurs.'
    ],
    definitions: [
      ['Indice', 'position d’un élément dans une séquence ; le premier élément a l’indice 0, le dernier l’indice -1.'],
      ['Tranche (slice)', 'portion d’une séquence obtenue avec la notation `[début:fin]`, fin exclue.'],
      ['Méthode', 'fonction attachée à un type de donnée, appelée avec un point : `texte.upper()`.'],
      ['Liste', 'séquence ordonnée et modifiable, écrite entre crochets : `[1, 2, 3]`.'],
      ['Tuple', 'séquence ordonnée non modifiable, écrite entre parenthèses : `(14.69, -17.44)`.'],
      ['Dictionnaire', 'collection de paires clé → valeur, écrite entre accolades : `{"nom": "Ba"}`.'],
      ['Ensemble (set)', 'collection non ordonnée d’éléments uniques.'],
      ['Mutable / immuable', 'une donnée mutable peut être modifiée après sa création (liste, dictionnaire) ; une donnée immuable ne le peut pas (chaîne, tuple).']
    ],
    body: [
      {
        title: 'Manipuler les chaînes de caractères', type: 'concept',
        text: 'Une chaîne est une séquence de caractères. On accède à un caractère par son indice, à une portion par une tranche, et l’on dispose de nombreuses méthodes de transformation. Une chaîne est immuable : les méthodes renvoient une nouvelle chaîne sans modifier l’originale.',
        code: py`mot = "Programmation"
print(len(mot))
print(mot[0], mot[-1])
print(mot[0:7])
print(mot.upper())
print(mot.lower().count("m"))
phrase = "  apprendre python  "
print(phrase.strip().title())
print("Python" in "J'apprends Python")`,
        output: py`13
P n
Program
PROGRAMMATION
2
Apprendre Python
True`,
        after: '`len()` donne la longueur. `mot[-1]` désigne le dernier caractère. `mot[0:7]` prend les caractères d’indice 0 à 6. `strip()` supprime les espaces au début et à la fin, `title()` met une majuscule à chaque mot, et `in` teste la présence d’un texte.'
      },
      {
        title: 'Découper et assembler du texte', type: 'concept',
        text: '`split()` découpe une chaîne en liste selon un séparateur ; `join()` fait l’inverse. C’est la base du traitement de fichiers de données comme le CSV.',
        code: py`ligne = "Awa;Diop;Thiès;19"
morceaux = ligne.split(";")
print(morceaux)
print(morceaux[2])
print(" - ".join(morceaux))`,
        output: py`['Awa', 'Diop', 'Thiès', '19']
Thiès
Awa - Diop - Thiès - 19`,
        after: 'Sans argument, `split()` découpe sur les espaces et ignore les espaces multiples : c’est le moyen le plus simple d’obtenir les mots d’une phrase.'
      },
      {
        title: 'Les listes', type: 'concept',
        text: 'Une liste stocke plusieurs valeurs dans un ordre précis. Elle est modifiable : on peut changer un élément, en ajouter ou en retirer.',
        items: [
          ['append(x)', 'ajoute x à la fin.'],
          ['insert(i, x)', 'insère x à la position i.'],
          ['remove(x)', 'supprime la première occurrence de x.'],
          ['pop()', 'retire et renvoie le dernier élément (ou celui d’indice donné).'],
          ['len(liste)', 'nombre d’éléments.']
        ],
        blocks: [{
          code: py`fruits = ["mangue", "banane", "orange"]
fruits.append("papaye")
fruits.insert(1, "goyave")
fruits[0] = "ananas"
fruits.remove("banane")
dernier = fruits.pop()
print(fruits)
print("Retiré :", dernier)
print(len(fruits), "fruits ; le premier est", fruits[0])`,
          output: py`['ananas', 'goyave', 'orange']
Retiré : papaye
3 fruits ; le premier est ananas`,
          after: 'Suivez l’évolution : après `append`, la liste contient 4 fruits ; `insert` place « goyave » en deuxième position ; l’affectation `fruits[0] = ...` remplace « mangue » ; `remove` retire « banane » ; enfin `pop` retire « papaye » et le renvoie.'
        }]
      },
      {
        title: 'Les tuples', type: 'concept',
        text: 'Un tuple ressemble à une liste mais ne peut pas être modifié. On l’utilise pour des données qui forment un tout fixe : des coordonnées, une date, les jours de la semaine. Le déballage permet de répartir ses valeurs dans plusieurs variables en une seule instruction.',
        code: py`point = (14.69, -17.44)          # latitude, longitude de Dakar
latitude, longitude = point
print("Latitude :", latitude)
print("Longitude :", longitude)
jours = ("lun", "mar", "mer", "jeu", "ven")
print(jours[1:3], len(jours))`,
        output: py`Latitude : 14.69
Longitude : -17.44
('mar', 'mer') 5`,
        after: 'Tenter `point[0] = 15` provoque une `TypeError` : c’est voulu, le tuple protège les données contre une modification accidentelle.'
      },
      {
        title: 'Les dictionnaires', type: 'concept',
        text: 'Un dictionnaire associe des clés à des valeurs, comme un vrai dictionnaire associe des mots à leurs définitions. On n’accède pas aux éléments par position mais par clé, ce qui est très rapide et très lisible.',
        code: py`etudiant = {"nom": "Ndiaye", "prenom": "Fatou", "note": 15}
print(etudiant["prenom"])
etudiant["note"] = 16
etudiant["filiere"] = "Informatique"
print(etudiant.get("age", "non renseigné"))
for cle, valeur in etudiant.items():
    print(cle, "→", valeur)`,
        output: py`Fatou
non renseigné
nom → Ndiaye
prenom → Fatou
note → 16
filiere → Informatique`,
        after: 'Affecter une valeur à une clé existante la remplace ; à une clé nouvelle, l’ajoute. `etudiant["age"]` provoquerait une `KeyError`, alors que `get()` renvoie une valeur par défaut. `items()` fournit les paires clé / valeur, `keys()` les clés et `values()` les valeurs. Les dictionnaires conservent l’ordre d’insertion.'
      },
      {
        title: 'Les ensembles', type: 'concept',
        text: 'Un ensemble ne contient jamais deux fois le même élément. Il permet d’éliminer des doublons et d’effectuer des opérations mathématiques : intersection `&`, union `|` et différence `-`.',
        code: py`inscrits_python = {"Awa", "Moussa", "Fatou", "Ibrahima"}
inscrits_web = {"Fatou", "Lamine", "Awa"}
print(sorted(inscrits_python & inscrits_web))
print(sorted(inscrits_python | inscrits_web))
print(sorted(inscrits_python - inscrits_web))
villes = ["Dakar", "Thiès", "Dakar", "Saint-Louis", "Thiès"]
print(len(set(villes)), "villes différentes")`,
        output: py`['Awa', 'Fatou']
['Awa', 'Fatou', 'Ibrahima', 'Lamine', 'Moussa']
['Ibrahima', 'Moussa']
3 villes différentes`,
        after: 'Un ensemble n’a pas d’ordre : Python peut afficher ses éléments dans n’importe quel ordre. On utilise ici `sorted()`, qui renvoie une liste triée, pour obtenir un affichage stable. Attention, `{}` crée un dictionnaire vide ; un ensemble vide s’écrit `set()`.'
      },
      {
        title: 'Parcourir et rechercher', type: 'concept',
        text: '`enumerate()` fournit à la fois la position et la valeur de chaque élément. L’opérateur `in` teste la présence d’une valeur, et `index()` renvoie sa position.',
        code: py`notes = [12, 8, 15, 19, 10]
for rang, note in enumerate(notes, start=1):
    print(f"Étudiant {rang} : {note}")
print("19 présente ?", 19 in notes)
print("Position de 15 :", notes.index(15))`,
        output: py`Étudiant 1 : 12
Étudiant 2 : 8
Étudiant 3 : 15
Étudiant 4 : 19
Étudiant 5 : 10
19 présente ? True
Position de 15 : 2`
      },
      {
        title: 'Trier, filtrer et transformer', type: 'concept',
        text: '`sorted()` renvoie une nouvelle liste triée ; la méthode `sort()` trie la liste elle-même. Une liste en compréhension construit une nouvelle liste en une ligne : `[expression for élément in séquence if condition]`. Enfin, `sum()`, `min()` et `max()` calculent directement des statistiques.',
        code: py`notes = [12, 8, 15, 19, 10, 6]
print(sorted(notes))
print(sorted(notes, reverse=True))
admis = [n for n in notes if n >= 10]
print("Admis :", admis)
bonus = [n + 1 for n in notes]
print("Avec bonus :", bonus)
print("Moyenne :", round(sum(notes) / len(notes), 2))`,
        output: py`[6, 8, 10, 12, 15, 19]
[19, 15, 12, 10, 8, 6]
Admis : [12, 15, 19, 10]
Avec bonus : [13, 9, 16, 20, 11, 7]
Moyenne : 11.67`,
        blocks: [{
          text: 'Pour trier des éléments complexes, le paramètre `key` indique sur quoi trier. Une fonction `lambda` est une petite fonction anonyme écrite en une ligne : `lambda e: e["note"]` signifie « à partir de e, renvoie sa note ».',
          code: py`eleves = [{"nom": "Sow", "note": 14}, {"nom": "Ba", "note": 17}, {"nom": "Fall", "note": 11}]
classement = sorted(eleves, key=lambda e: e["note"], reverse=True)
for e in classement:
    print(e["nom"], e["note"])`,
          output: py`Ba 17
Sow 14
Fall 11`
        }]
      },
      {
        title: 'Exemple commenté : compter les mots d’un texte', type: 'example',
        text: 'Problème classique : compter combien de fois chaque mot apparaît. Le dictionnaire est la structure idéale, avec le mot comme clé et le nombre d’apparitions comme valeur.',
        code: py`texte = "le code est clair et le code est testé"
compteur = {}
for mot in texte.split():
    compteur[mot] = compteur.get(mot, 0) + 1

for mot, nombre in sorted(compteur.items(), key=lambda paire: paire[1], reverse=True):
    print(mot, nombre)`,
        output: py`le 2
code 2
est 2
clair 1
et 1
testé 1`,
        after: '`compteur.get(mot, 0)` renvoie le nombre actuel, ou 0 si le mot n’a jamais été vu : une seule ligne gère donc les deux cas. Pour l’affichage, on trie les paires par leur deuxième élément (le nombre). Le tri de Python est stable : à égalité, les mots gardent leur ordre d’apparition.'
      }
    ],
    guided: {
      title: 'Exercice guidé — Un carnet de contacts', type: 'exercise',
      text: 'Construisez un carnet qui associe des noms à des numéros de téléphone, puis permettez à l’utilisateur de rechercher un contact.',
      ordered: true,
      items: [
        'Créez un dictionnaire vide `contacts`, puis ajoutez trois contacts.',
        'Lisez le nom recherché et nettoyez-le avec `strip()` et `title()` pour tolérer les espaces et les minuscules.',
        'Testez sa présence avec `in` et affichez le numéro, ou un message s’il est absent.',
        'Affichez enfin la liste triée des noms, séparés par des virgules, avec `join()`.'
      ],
      solution: {
        code: py`contacts = {}
contacts["Awa"] = "77 123 45 67"
contacts["Moussa"] = "76 987 65 43"
contacts["Fatou"] = "78 555 12 12"

nom = input("Nom à rechercher : ").strip().title()
if nom in contacts:
    print(f"{nom} : {contacts[nom]}")
else:
    print(f"{nom} n'est pas dans le carnet.")
print("Contacts enregistrés :", ", ".join(sorted(contacts)))`,
        stdin: ['moussa'],
        output: py`Nom à rechercher : moussa
Moussa : 76 987 65 43
Contacts enregistrés : Awa, Fatou, Moussa`,
        after: 'Les numéros sont stockés comme des chaînes : on ne fait pas de calcul dessus et les espaces doivent être conservés. Parcourir un dictionnaire, ou le passer à `sorted()`, porte sur ses clés.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Vérifiez si un mot est un palindrome (il se lit de la même façon dans les deux sens), par exemple « kayak ». Indice : `mot[::-1]` renverse une chaîne.',
        'À partir des températures `[31, 28, 35, 33, 26, 30, 36]`, affichez le minimum, le maximum, la moyenne et le nombre de jours au-dessus de 30 °C.',
        'Supprimez les doublons de `[3, 1, 3, 2, 1, 4]` en conservant l’ordre d’apparition.',
        'Un stock est représenté par `{"stylo": (150, 25), "cahier": (750, 40), "règle": (300, 15)}` où chaque tuple contient le prix et la quantité. Calculez la valeur totale du stock.',
        'Construisez le sigle d’une expression : « Organisation des Nations Unies » donne « ONU ». Seuls les mots qui commencent par une majuscule comptent.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`mot = "kayak"
if mot == mot[::-1]:
    print(mot, "est un palindrome")
else:
    print(mot, "n'est pas un palindrome")`,
        output: py`kayak est un palindrome`,
        blocks: [{
          text: 'Exercice 2 : une compréhension produit la liste des jours chauds, dont on prend la longueur.',
          code: py`temperatures = [31, 28, 35, 33, 26, 30, 36]
print("Min :", min(temperatures), "| Max :", max(temperatures))
print(f"Moyenne : {sum(temperatures) / len(temperatures):.1f}")
print("Jours > 30 °C :", len([t for t in temperatures if t > 30]))`,
          output: py`Min : 26 | Max : 36
Moyenne : 31.3
Jours > 30 °C : 4`
        }, {
          text: 'Exercice 3 : un ensemble mémorise ce qui a déjà été vu, la liste conserve l’ordre.',
          code: py`valeurs = [3, 1, 3, 2, 1, 4]
deja_vus = set()
uniques = []
for v in valeurs:
    if v not in deja_vus:
        deja_vus.add(v)
        uniques.append(v)
print(uniques)`,
          output: py`[3, 1, 2, 4]`
        }, {
          text: 'Exercice 4 : on déballe chaque tuple dans la boucle.',
          code: py`stock = {"stylo": (150, 25), "cahier": (750, 40), "règle": (300, 15)}
total = 0
for article, (prix, quantite) in stock.items():
    total += prix * quantite
print("Valeur du stock :", total, "FCFA")`,
          output: py`Valeur du stock : 38250 FCFA`
        }, {
          text: 'Exercice 5 :',
          code: py`expression = "Organisation des Nations Unies"
sigle = "".join(mot[0] for mot in expression.split() if mot[0].isupper())
print(sigle)`,
          output: py`ONU`,
          after: '`isupper()` teste si la première lettre est une majuscule, ce qui écarte « des ». Une règle fondée sur la longueur (« ignorer les mots de moins de 3 lettres ») aurait conservé « des » et produit « ODNU » : tester son code sur un exemple concret révèle ce genre d’erreur de raisonnement.'
        }]
      }
    },
    code: py`# Analyse des ventes de la semaine d'une boutique
ventes = {
    "lundi": 125000,
    "mardi": 98000,
    "mercredi": 143500,
    "jeudi": 87000,
    "vendredi": 176000,
}

total = sum(ventes.values())
moyenne = total / len(ventes)
meilleur_jour = max(ventes, key=ventes.get)
jours_faibles = [jour for jour, montant in ventes.items() if montant < moyenne]

print(f"Total de la semaine : {total} FCFA")
print(f"Moyenne journalière : {moyenne:.0f} FCFA")
print(f"Meilleur jour       : {meilleur_jour} ({ventes[meilleur_jour]} FCFA)")
print("Sous la moyenne     :", ", ".join(jours_faibles))`,
    output: py`Total de la semaine : 629500 FCFA
Moyenne journalière : 125900 FCFA
Meilleur jour       : vendredi (176000 FCFA)
Sous la moyenne     : lundi, mardi, jeudi`,
    explain: [
      ['ventes = {...}', 'Un dictionnaire associe chaque jour à son chiffre d’affaires : la clé décrit la donnée, la valeur la mesure.'],
      ['sum(ventes.values())', '`values()` fournit les montants ; `sum()` les additionne sans boucle explicite.'],
      ['max(ventes, key=ventes.get)', 'On cherche la clé dont la valeur est la plus grande : `key=ventes.get` indique à `max()` de comparer les montants et non les noms des jours.'],
      ['[jour for jour, montant in ventes.items() if montant < moyenne]', 'Liste en compréhension : on garde le nom des jours dont le montant est inférieur à la moyenne.'],
      ['", ".join(jours_faibles)', 'Assemble les noms en une seule chaîne lisible.']
    ],
    quiz: [
      { q: 'Que vaut `"Thiès"[1:3]` ?', o: ['"hi"', '"Thi"', '"hiè"'], a: 0, e: 'La tranche prend les indices 1 et 2 (la fin est exclue) : « h » et « i ».' },
      { q: 'Quelle structure choisir pour associer un code produit à son prix ?', o: ['Une liste', 'Un dictionnaire', 'Un ensemble'], a: 1, e: 'Un dictionnaire associe une clé (le code) à une valeur (le prix) et permet un accès direct par la clé.' },
      { q: 'Que produit `[n * 2 for n in range(4) if n != 2]` ?', o: ['[0, 2, 6]', '[0, 2, 4, 6]', '[2, 6]'], a: 0, e: 'n prend 0, 1, 2, 3 ; on exclut 2 ; on double les autres : 0, 2, 6.' },
      { q: 'Pourquoi `point = (1, 2)` puis `point[0] = 5` provoque-t-il une erreur ?', o: ['Les tuples sont immuables', 'L’indice 0 n’existe pas', 'Il faut écrire point(0)'], a: 0, e: 'Un tuple ne peut pas être modifié après sa création ; utilisez une liste si les valeurs doivent changer.' }
    ],
    summary: [
      'Les chaînes s’indexent, se découpent en tranches et se transforment avec des méthodes (`upper`, `strip`, `split`, `join`).',
      'Liste : ordonnée et modifiable. Tuple : ordonné et fixe. Dictionnaire : clés → valeurs. Ensemble : éléments uniques.',
      '`enumerate()`, `in` et `index()` facilitent le parcours et la recherche.',
      '`sorted()`, le paramètre `key` et les listes en compréhension permettent de trier et filtrer en peu de lignes.',
      'Choisir la bonne structure simplifie l’algorithme.'
    ],
    errors: [
      'Accéder à un indice inexistant : `liste[10]` sur une liste de 5 éléments provoque une `IndexError`.',
      'Accéder à une clé absente avec `dico["cle"]` : `KeyError`. Utilisez `in` ou `get()`.',
      'Croire qu’une méthode de chaîne modifie la chaîne : `nom.upper()` seul ne change pas `nom`, il faut écrire `nom = nom.upper()`.',
      'Écrire `liste = liste.sort()` : `sort()` renvoie `None`, la liste est perdue. Utilisez `liste.sort()` seul ou `sorted(liste)`.',
      'Créer un ensemble vide avec `{}` : c’est un dictionnaire. Écrivez `set()`.'
    ],
    resources: [
      ['Structures de données', 'https://docs.python.org/fr/3/tutorial/datastructures.html', 'listes, tuples, ensembles et dictionnaires en détail.'],
      ['Méthodes des chaînes', 'https://docs.python.org/fr/3/library/stdtypes.html#string-methods', 'référence complète.'],
      ['Guide du tri', 'https://docs.python.org/fr/3/howto/sorting.html', 'tris personnalisés avec `key`.']
    ],
    next: 'Vos programmes s’allongent et certaines portions se répètent. La leçon 6 vous apprend à les regrouper en fonctions réutilisables, à les organiser en modules et à décomposer un gros problème en sous-problèmes simples.'
  }));

  /* ---------------------------------------------------------------- Leçon 6 */
  var outilsMath = py`# outils_math.py
def moyenne(valeurs):
    """Renvoie la moyenne d'une liste de nombres."""
    return sum(valeurs) / len(valeurs)


def est_pair(n):
    """Renvoie True si n est pair."""
    return n % 2 == 0`;

  L.push(lesson({
    title: 'Fonctions et programmation modulaire',
    level: 'Débutant à intermédiaire',
    duration: '2 h 30',
    intro: 'Une fonction est un sous-programme nommé que l’on peut appeler autant de fois que nécessaire. Les fonctions évitent les répétitions, rendent le code lisible et permettent de découper un problème complexe en petites tâches simples, testables séparément.',
    objectives: [
      'Définir une fonction avec `def` et l’appeler.',
      'Distinguer paramètres et arguments, utiliser des valeurs par défaut et des arguments nommés.',
      'Renvoyer un ou plusieurs résultats avec `return`.',
      'Comprendre la portée locale et globale des variables.',
      'Utiliser les fonctions intégrées et les modules de la bibliothèque standard, et créer son propre module.',
      'Documenter une fonction et décomposer un problème en sous-problèmes.'
    ],
    prerequisites: [
      'Leçons 2 à 5 : variables, conditions, boucles et collections.'
    ],
    definitions: [
      ['Fonction', 'bloc d’instructions nommé, qui reçoit éventuellement des données et peut renvoyer un résultat.'],
      ['Paramètre', 'variable déclarée entre les parenthèses de `def`, qui recevra une valeur lors de l’appel.'],
      ['Argument', 'valeur transmise à la fonction au moment de l’appel.'],
      ['Valeur de retour', 'résultat renvoyé par `return` à l’endroit où la fonction a été appelée.'],
      ['Portée', 'zone du programme où une variable est accessible : locale (dans la fonction) ou globale.'],
      ['Module', 'fichier `.py` contenant des fonctions réutilisables, que l’on charge avec `import`.'],
      ['Docstring', 'chaîne placée en première ligne d’une fonction pour documenter son rôle.']
    ],
    body: [
      {
        title: 'Définir et appeler une fonction', type: 'concept',
        text: 'Le mot-clé `def` est suivi du nom de la fonction, de parenthèses contenant les paramètres et de deux-points. Le corps de la fonction est indenté. Définir une fonction ne l’exécute pas : il faut l’appeler en écrivant son nom suivi de parenthèses.',
        code: py`def saluer(prenom):
    print(f"Bonjour {prenom}, bienvenue dans l'atelier !")


saluer("Awa")
saluer("Moussa")`,
        output: py`Bonjour Awa, bienvenue dans l'atelier !
Bonjour Moussa, bienvenue dans l'atelier !`,
        after: 'Lors du premier appel, le paramètre `prenom` reçoit l’argument `"Awa"` ; lors du second, `"Moussa"`. Une fonction se nomme comme une variable, de préférence avec un verbe qui décrit son action.'
      },
      {
        title: 'Paramètres, valeurs par défaut et arguments nommés', type: 'concept',
        text: 'Un paramètre peut avoir une valeur par défaut, utilisée si l’argument est omis. Lors de l’appel, on peut nommer les arguments : leur ordre n’a alors plus d’importance, et l’appel devient plus lisible.',
        code: py`def prix_ttc(prix_ht, taux_tva=0.18):
    return round(prix_ht * (1 + taux_tva))


print(prix_ttc(10000))
print(prix_ttc(10000, 0.10))
print(prix_ttc(taux_tva=0, prix_ht=10000))`,
        output: py`11800
11000
10000`,
        after: 'Les paramètres avec valeur par défaut doivent être placés après ceux qui n’en ont pas. Le dernier appel montre l’intérêt des arguments nommés : on comprend immédiatement que la TVA est nulle.'
      },
      {
        title: 'Renvoyer un résultat avec return', type: 'concept',
        text: '`print()` affiche une valeur à l’écran, alors que `return` la renvoie au programme, qui peut la stocker, la comparer ou la réutiliser. Une fonction peut renvoyer plusieurs valeurs sous forme de tuple. `return` met aussi fin immédiatement à l’exécution de la fonction. Une fonction sans `return` renvoie `None`.',
        code: py`def statistiques(valeurs):
    return min(valeurs), max(valeurs), sum(valeurs) / len(valeurs)


minimum, maximum, moyenne = statistiques([12, 18, 9, 15])
print(minimum, maximum, moyenne)`,
        output: py`9 18 13.5`,
        after: 'Le tuple renvoyé est déballé dans trois variables. Préférez les fonctions qui renvoient un résultat plutôt que celles qui l’affichent : elles sont réutilisables dans plus de situations et beaucoup plus faciles à tester.'
      },
      {
        title: 'La portée des variables', type: 'concept',
        text: 'Une variable créée dans une fonction est locale : elle n’existe que pendant l’exécution de la fonction. Une fonction peut lire une variable globale (définie hors de toute fonction), mais il est préférable de lui transmettre ce dont elle a besoin par ses paramètres.',
        code: py`taux = 0.18          # variable globale


def calculer_tva(montant):
    tva = montant * taux      # tva est locale à la fonction
    return tva


print(calculer_tva(5000))
print(taux)
# print(tva)  -> NameError : tva n'existe qu'à l'intérieur de la fonction`,
        output: py`900.0
0.18`,
        after: 'Modifier une variable globale depuis une fonction exige le mot-clé `global`, mais cette pratique rend le code difficile à suivre : une fonction qui ne dépend que de ses paramètres et de son `return` est prévisible et testable.'
      },
      {
        title: 'Les fonctions intégrées', type: 'concept',
        text: 'Python fournit de nombreuses fonctions prêtes à l’emploi. Vous en connaissez déjà plusieurs : `print`, `input`, `len`, `type`, `int`, `float`, `str`, `range`, `sum`, `min`, `max`, `sorted`, `enumerate`, `round`. En voici deux autres très utiles : `abs()` (valeur absolue) et `zip()`, qui parcourt plusieurs séquences en parallèle.',
        code: py`noms = ["Awa", "Moussa", "Fatou"]
notes = [15, 12, 17]
for nom, note in zip(noms, notes):
    print(nom, note)
print(abs(-7), round(3.14159, 2), max(notes))`,
        output: py`Awa 15
Moussa 12
Fatou 17
7 3.14 17`
      },
      {
        title: 'Modules et importations', type: 'concept',
        text: 'La bibliothèque standard de Python contient des centaines de modules : `math` pour les mathématiques, `random` pour le hasard, `datetime` pour les dates, `json` et `csv` pour les fichiers… On les charge avec `import`.',
        code: py`import math
from random import randint, seed

print(math.sqrt(144))
print(math.pi)
seed(1)                 # rend le tirage reproductible
print(randint(1, 6))`,
        output: py`12.0
3.141592653589793
2`,
        after: '`import math` charge tout le module : on préfixe alors les fonctions (`math.sqrt`). `from random import randint` importe une fonction précise, utilisable sans préfixe. `seed(1)` fixe le point de départ du générateur aléatoire pour obtenir toujours le même tirage, ce qui est pratique pour tester ; supprimez-le pour un vrai jeu.',
        blocks: [{
          text: 'Vous pouvez aussi créer vos propres modules. Enregistrez d’abord ce fichier :',
          file: 'outils_math.py',
          code: outilsMath,
          norun: true
        }, {
          text: 'Puis, dans le même dossier, un programme principal qui l’importe :',
          file: 'main.py',
          code: py`import outils_math

print(outils_math.moyenne([10, 14, 18]))
print(outils_math.est_pair(7))`,
          deps: { 'outils_math.py': outilsMath },
          output: py`14.0
False`,
          after: 'Le nom du module est le nom du fichier sans `.py`. Dans un module, on place souvent le code de test sous la condition `if __name__ == "__main__":` : il ne s’exécute que si le fichier est lancé directement, et pas lorsqu’il est importé.'
        }]
      },
      {
        title: 'Documenter ses fonctions', type: 'concept',
        text: 'Une docstring, placée juste sous la ligne `def`, explique ce que fait la fonction, ses paramètres et son résultat. Les éditeurs l’affichent au survol et `help(fonction)` la restitue. On peut aussi indiquer les types attendus avec des annotations : elles n’imposent rien à Python, mais documentent le code.',
        code: py`def convertir_minutes(minutes: int) -> str:
    """Convertit une durée en minutes en texte « X h Y min ».

    Exemple : convertir_minutes(135) renvoie "2 h 15 min".
    """
    return f"{minutes // 60} h {minutes % 60} min"


print(convertir_minutes(135))
print(convertir_minutes.__doc__.splitlines()[0])`,
        output: py`2 h 15 min
Convertit une durée en minutes en texte « X h Y min ».`
      },
      {
        title: 'Exemple commenté : décomposer un problème', type: 'example',
        text: 'Problème : produire le bulletin d’une classe (moyenne et mention de chaque élève). Plutôt qu’un long bloc, on identifie trois sous-problèmes, chacun confié à une fonction : calculer une moyenne, déterminer une mention, afficher une ligne de bulletin.',
        code: py`def moyenne(notes):
    return sum(notes) / len(notes)


def mention(note):
    if note >= 16:
        return "Très bien"
    elif note >= 14:
        return "Bien"
    elif note >= 12:
        return "Assez bien"
    elif note >= 10:
        return "Passable"
    return "Insuffisant"


def afficher_bulletin(nom, notes):
    m = moyenne(notes)
    print(f"{nom:<8} moyenne {m:5.2f}  {mention(m)}")


classe = {"Awa": [15, 17, 14], "Moussa": [9, 11, 10.5], "Fatou": [12, 13, 11]}
for nom, notes in classe.items():
    afficher_bulletin(nom, notes)`,
        output: py`Awa      moyenne 15.33  Bien
Moussa   moyenne 10.17  Passable
Fatou    moyenne 12.00  Assez bien`,
        after: 'Chaque fonction a une seule responsabilité et peut être testée isolément : `mention(15)` doit renvoyer « Bien ». Dans `mention`, chaque `return` met fin à la fonction, si bien que le dernier `return` n’est atteint que si aucune condition n’est vraie. Le format `:<8` aligne les noms à gauche sur 8 caractères.'
      }
    ],
    guided: {
      title: 'Exercice guidé — Valider un numéro de téléphone', type: 'exercise',
      text: 'Écrivez une fonction qui indique si un numéro de téléphone mobile sénégalais est valide : après suppression des espaces et des tirets, il doit compter 9 chiffres et commencer par 7.',
      ordered: true,
      items: [
        'Écrivez une fonction `nettoyer(numero)` qui renvoie le numéro sans espaces ni tirets (méthode `replace`).',
        'Écrivez `est_numero_valide(numero)` qui appelle `nettoyer`, puis renvoie le résultat d’une condition combinant la longueur, `isdigit()` et le premier caractère.',
        'Documentez chaque fonction avec une docstring.',
        'Testez la fonction sur plusieurs numéros, valides et invalides, avec une boucle.'
      ],
      solution: {
        code: py`def nettoyer(numero):
    """Supprime les espaces et les tirets d'un numéro."""
    return numero.replace(" ", "").replace("-", "")


def est_numero_valide(numero):
    """Un numéro mobile sénégalais compte 9 chiffres et commence par 7."""
    numero = nettoyer(numero)
    return len(numero) == 9 and numero.isdigit() and numero[0] == "7"


for essai in ["77 123 45 67", "76-123-45", "33 821 00 00", "70 12a 34 56"]:
    print(f"{essai:<14} -> {est_numero_valide(essai)}")`,
        output: py`77 123 45 67   -> True
76-123-45      -> False
33 821 00 00   -> False
70 12a 34 56   -> False`,
        after: 'La fonction renvoie directement le résultat de la condition, qui est déjà un booléen : inutile d’écrire `if ...: return True else: return False`. Le jeu de tests couvre un cas valide et trois raisons d’échec différentes (longueur, préfixe, caractère non numérique).'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Écrivez `aire_cercle(rayon)` qui renvoie l’aire d’un cercle arrondie à deux décimales (utilisez `math.pi`).',
        'Écrivez `est_premier(n)` qui renvoie `True` si n est un nombre premier, puis affichez les nombres premiers inférieurs à 30.',
        'Écrivez `pgcd(a, b)` selon l’algorithme d’Euclide : tant que b n’est pas nul, remplacer (a, b) par (b, a % b).',
        'Écrivez `compter_voyelles(texte)` qui renvoie le nombre de voyelles d’un texte, majuscules comprises.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`import math


def aire_cercle(rayon):
    return round(math.pi * rayon ** 2, 2)


print(aire_cercle(3))`,
        output: py`28.27`,
        blocks: [{
          text: 'Exercice 2 : on cherche un diviseur entre 2 et la racine carrée de n. Dès qu’on en trouve un, `return False` arrête la fonction.',
          code: py`def est_premier(n):
    if n < 2:
        return False
    for diviseur in range(2, int(n ** 0.5) + 1):
        if n % diviseur == 0:
            return False
    return True


print([n for n in range(30) if est_premier(n)])`,
          output: py`[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`
        }, {
          text: 'Exercice 3 : l’affectation multiple échange les valeurs en une seule ligne.',
          code: py`def pgcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a


print(pgcd(84, 36))`,
          output: py`12`
        }, {
          text: 'Exercice 4 :',
          code: py`def compter_voyelles(texte):
    return sum(1 for lettre in texte.lower() if lettre in "aeiouyàâéèêëîïôùû")


print(compter_voyelles("Élève à l'Université"))`,
          output: py`9`
        }]
      }
    },
    code: py`# Mini-calculatrice construite avec des fonctions
def additionner(a, b):
    return a + b


def soustraire(a, b):
    return a - b


def multiplier(a, b):
    return a * b


def diviser(a, b):
    """Renvoie a / b, ou None si la division est impossible."""
    if b == 0:
        return None
    return a / b


OPERATIONS = {"+": additionner, "-": soustraire, "*": multiplier, "/": diviser}


def calculer(a, operateur, b):
    fonction = OPERATIONS.get(operateur)
    if fonction is None:
        return "opérateur inconnu"
    resultat = fonction(a, b)
    return "division par zéro impossible" if resultat is None else resultat


for a, op, b in [(12, "+", 30), (7, "*", 6), (10, "/", 4), (5, "/", 0), (2, "^", 3)]:
    print(f"{a} {op} {b} = {calculer(a, op, b)}")`,
    output: py`12 + 30 = 42
7 * 6 = 42
10 / 4 = 2.5
5 / 0 = division par zéro impossible
2 ^ 3 = opérateur inconnu`,
    explain: [
      ['def diviser(a, b):', 'Chaque opération est une petite fonction. `diviser` gère le cas particulier de la division par zéro en renvoyant `None`.'],
      ['OPERATIONS = {"+": additionner, ...}', 'En Python, une fonction est une valeur comme une autre : on peut la ranger dans un dictionnaire. Le symbole sert de clé.'],
      ['fonction = OPERATIONS.get(operateur)', 'On récupère la fonction correspondant au symbole, ou `None` s’il est inconnu.'],
      ['resultat = fonction(a, b)', 'On appelle la fonction récupérée. Ajouter une opération ne demande qu’une fonction et une ligne dans le dictionnaire.'],
      ['"..." if resultat is None else resultat', 'Expression conditionnelle : une version compacte de `if` / `else` qui produit une valeur.']
    ],
    quiz: [
      { q: 'Quelle est la différence entre `print()` et `return` dans une fonction ?', o: ['Aucune', '`print` affiche une valeur, `return` la renvoie au programme appelant', '`return` affiche en couleur'], a: 1, e: 'Seul `return` permet de récupérer le résultat dans une variable pour le réutiliser.' },
      { q: 'Que renvoie une fonction qui ne contient pas d’instruction `return` ?', o: ['0', 'None', 'Une erreur'], a: 1, e: 'Sans `return`, une fonction renvoie la valeur spéciale `None`.' },
      { q: 'Avec `def f(a, b=2): return a * b`, que vaut `f(5)` ?', o: ['5', '10', 'Une erreur'], a: 1, e: 'b prend sa valeur par défaut 2 : 5 × 2 = 10.' },
      { q: 'Une variable créée à l’intérieur d’une fonction est-elle accessible après l’appel ?', o: ['Oui, toujours', 'Non, elle est locale à la fonction', 'Seulement si elle est en majuscules'], a: 1, e: 'Les variables locales disparaissent à la fin de l’exécution de la fonction. Renvoyez la valeur avec `return` si vous en avez besoin.' }
    ],
    summary: [
      '`def nom(paramètres):` définit une fonction ; on l’exécute en l’appelant `nom(arguments)`.',
      'Les valeurs par défaut et les arguments nommés rendent les appels souples et lisibles.',
      '`return` renvoie un résultat (éventuellement plusieurs sous forme de tuple) et termine la fonction.',
      'Les variables d’une fonction sont locales ; passez les données par les paramètres.',
      '`import` donne accès aux modules de la bibliothèque standard et à vos propres fichiers.',
      'Une fonction = une responsabilité, documentée par une docstring.'
    ],
    errors: [
      'Oublier les parenthèses à l’appel : `saluer` ne fait rien, il faut `saluer("Awa")`.',
      'Utiliser `print()` dans la fonction au lieu de `return`, puis s’étonner d’obtenir `None`.',
      'Appeler une fonction avant de l’avoir définie dans le fichier : `NameError`.',
      'Utiliser une liste comme valeur par défaut (`def f(l=[])`) : elle est partagée entre les appels. Utilisez `None` puis créez la liste dans la fonction.',
      'Nommer un fichier `random.py` ou `math.py` : il masque le module standard du même nom.'
    ],
    resources: [
      ['Définir des fonctions', 'https://docs.python.org/fr/3/tutorial/controlflow.html#defining-functions', 'tutoriel officiel.'],
      ['Modules', 'https://docs.python.org/fr/3/tutorial/modules.html', 'créer et importer des modules.'],
      ['Fonctions natives', 'https://docs.python.org/fr/3/library/functions.html', 'liste complète des fonctions intégrées.'],
      ['Bibliothèque standard', 'https://docs.python.org/fr/3/library/index.html', 'tour d’horizon des modules disponibles.']
    ],
    next: 'Vous disposez maintenant de toutes les briques de base. La leçon 7 les assemble pour résoudre des problèmes classiques d’algorithmique : rechercher une valeur, trier des données et comparer l’efficacité de différentes méthodes.'
  }));

  /* ---------------------------------------------------------------- Leçon 7 */
  L.push(lesson({
    title: 'Algorithmes de recherche, de tri et de résolution',
    level: 'Intermédiaire',
    duration: '3 h',
    intro: 'Rechercher une information et trier des données sont les opérations les plus fréquentes en informatique. En programmant vous-même les algorithmes classiques, vous comprendrez pourquoi certaines méthodes sont des milliers de fois plus rapides que d’autres, et comment choisir la bonne selon le problème.',
    objectives: [
      'Programmer la recherche linéaire et la recherche dichotomique.',
      'Programmer le tri par sélection et le tri par insertion, et suivre leur déroulement.',
      'Compter les opérations d’un algorithme pour comparer des méthodes.',
      'Comprendre intuitivement la notion de complexité (constante, logarithmique, linéaire, quadratique).',
      'Appliquer une méthode de conception pour résoudre un problème nouveau.'
    ],
    prerequisites: [
      'Leçons 4 à 6 : boucles, listes, fonctions.'
    ],
    definitions: [
      ['Recherche linéaire', 'parcours des éléments un par un jusqu’à trouver la valeur cherchée.'],
      ['Recherche dichotomique', 'recherche dans une liste triée qui divise l’intervalle de recherche par deux à chaque étape.'],
      ['Tri par sélection', 'tri qui sélectionne à chaque étape le plus petit élément restant et le place à sa position définitive.'],
      ['Tri par insertion', 'tri qui insère chaque nouvel élément à sa place dans la partie déjà triée.'],
      ['Complexité', 'mesure de la quantité d’opérations (ou de mémoire) nécessaire en fonction de la taille n des données.'],
      ['Pire cas', 'situation des données qui demande le plus d’opérations à un algorithme.'],
      ['Algorithme glouton', 'méthode qui fait à chaque étape le choix qui semble le meilleur sur le moment.']
    ],
    body: [
      {
        title: 'La recherche linéaire', type: 'concept',
        text: 'C’est la méthode la plus simple : on examine chaque élément jusqu’à trouver la cible. Elle fonctionne sur n’importe quelle liste, triée ou non. Dans le pire cas (élément absent ou en dernière position), elle effectue autant de comparaisons qu’il y a d’éléments.',
        code: py`def recherche_lineaire(liste, cible):
    """Renvoie l'indice de cible dans liste, ou -1 si elle est absente."""
    for i in range(len(liste)):
        if liste[i] == cible:
            return i
    return -1


prix = [1200, 450, 3000, 780, 950]
print(recherche_lineaire(prix, 780))
print(recherche_lineaire(prix, 100))`,
        output: py`3
-1`,
        after: 'Le `return i` interrompt la fonction dès que la valeur est trouvée. Le `return -1` final n’est atteint que si la boucle s’est terminée sans succès. Renvoyer -1 est une convention courante pour signaler « non trouvé ».'
      },
      {
        title: 'La recherche dichotomique', type: 'concept',
        text: 'Pour chercher un mot dans un dictionnaire papier, vous ne lisez pas toutes les pages : vous l’ouvrez au milieu, puis vous continuez dans la moitié qui convient. C’est la recherche dichotomique. Elle exige une liste triée, mais elle est spectaculairement rapide : chaque comparaison élimine la moitié des candidats restants.',
        code: py`def recherche_dichotomique(liste_triee, cible):
    gauche, droite = 0, len(liste_triee) - 1
    etapes = 0
    while gauche <= droite:
        etapes += 1
        milieu = (gauche + droite) // 2
        if liste_triee[milieu] == cible:
            return milieu, etapes
        elif liste_triee[milieu] < cible:
            gauche = milieu + 1
        else:
            droite = milieu - 1
    return -1, etapes


nombres = list(range(0, 1000, 2))     # 500 nombres pairs triés
print(recherche_dichotomique(nombres, 734))
print(recherche_dichotomique(nombres, 735))`,
        output: py`(367, 9)
(-1, 9)`,
        after: '`gauche` et `droite` délimitent la zone où la cible peut encore se trouver. Si l’élément du milieu est trop petit, la cible est forcément à droite : on déplace `gauche`. Sinon on déplace `droite`. Quand `gauche` dépasse `droite`, la zone est vide : la cible est absente. Pour 500 éléments, 9 étapes suffisent, contre 500 comparaisons au pire pour la recherche linéaire.'
      },
      {
        title: 'Le tri par sélection', type: 'concept',
        text: 'Principe : on cherche le plus petit élément et on l’échange avec le premier ; puis on cherche le plus petit parmi les suivants et on l’échange avec le deuxième ; et ainsi de suite. Après l’étape i, les i premiers éléments sont définitivement triés.',
        code: py`def tri_selection(liste):
    valeurs = liste[:]                 # copie : on ne modifie pas l'original
    n = len(valeurs)
    for i in range(n - 1):
        indice_min = i
        for j in range(i + 1, n):
            if valeurs[j] < valeurs[indice_min]:
                indice_min = j
        valeurs[i], valeurs[indice_min] = valeurs[indice_min], valeurs[i]
        print(f"Étape {i + 1} : {valeurs}")
    return valeurs


tri_selection([29, 10, 14, 37, 13])`,
        output: py`Étape 1 : [10, 29, 14, 37, 13]
Étape 2 : [10, 13, 14, 37, 29]
Étape 3 : [10, 13, 14, 37, 29]
Étape 4 : [10, 13, 14, 29, 37]`,
        after: 'La boucle intérieure cherche la position du minimum dans la partie non triée ; la ligne d’échange utilise l’affectation multiple. Pour n éléments, le tri par sélection effectue toujours n × (n − 1) / 2 comparaisons, même si la liste est déjà triée.'
      },
      {
        title: 'Le tri par insertion', type: 'concept',
        text: 'C’est la méthode qu’utilisent la plupart des joueurs pour ranger leurs cartes : on prend chaque nouvelle carte et on la glisse à sa place parmi celles déjà rangées, en décalant les plus grandes vers la droite.',
        code: py`def tri_insertion(liste):
    valeurs = liste[:]
    for i in range(1, len(valeurs)):
        cle = valeurs[i]
        j = i - 1
        while j >= 0 and valeurs[j] > cle:
            valeurs[j + 1] = valeurs[j]   # on décale vers la droite
            j -= 1
        valeurs[j + 1] = cle
        print(f"Insertion de {cle:2} : {valeurs}")
    return valeurs


tri_insertion([29, 10, 14, 37, 13])`,
        output: py`Insertion de 10 : [10, 29, 14, 37, 13]
Insertion de 14 : [10, 14, 29, 37, 13]
Insertion de 37 : [10, 14, 29, 37, 13]
Insertion de 13 : [10, 13, 14, 29, 37]`,
        after: 'Contrairement au tri par sélection, le tri par insertion s’adapte aux données : sur une liste presque triée, la boucle `while` s’arrête immédiatement et le tri est très rapide. Insérer 37 n’a demandé qu’une comparaison.'
      },
      {
        title: 'Une notion intuitive de complexité', type: 'concept',
        text: 'Pour comparer des algorithmes, on ne mesure pas des secondes (elles dépendent de l’ordinateur) mais l’évolution du nombre d’opérations quand la taille n des données augmente. On note cette tendance avec la notation O (« grand O ») :',
        items: [
          ['O(1), constante', 'le temps ne dépend pas de n : accéder à `liste[3]`, tester `cle in dictionnaire`.'],
          ['O(log n), logarithmique', 'n est divisé par deux à chaque étape : recherche dichotomique. Doubler les données n’ajoute qu’une étape.'],
          ['O(n), linéaire', 'chaque élément est examiné une fois : recherche linéaire, somme d’une liste.'],
          ['O(n log n)', 'les meilleurs tris généraux, dont celui de `sorted()` en Python.'],
          ['O(n²), quadratique', 'deux boucles imbriquées sur les données : tris par sélection et par insertion. Doubler n multiplie le travail par 4.']
        ],
        blocks: [{
          text: 'Le tableau suivant compte les comparaisons dans le pire cas pour différentes tailles :',
          code: py`for n in [10, 100, 1000, 10000]:
    dichotomie = n.bit_length()          # nombre de divisions par 2
    selection = n * (n - 1) // 2
    print(f"n = {n:>5} | linéaire {n:>5} | dichotomique {dichotomie:>2} | tri sélection {selection:>10}")`,
          output: py`n =    10 | linéaire    10 | dichotomique  4 | tri sélection         45
n =   100 | linéaire   100 | dichotomique  7 | tri sélection       4950
n =  1000 | linéaire  1000 | dichotomique 10 | tri sélection     499500
n = 10000 | linéaire 10000 | dichotomique 14 | tri sélection   49995000`,
          after: 'Pour 10 000 éléments, une recherche dichotomique fait 14 comparaisons au lieu de 10 000, et un tri par sélection près de 50 millions. C’est pourquoi, en pratique, on utilise `sorted()` ou `list.sort()`, implémentés en O(n log n), et que l’on programme les tris simples surtout pour comprendre les principes.'
        }]
      },
      {
        title: 'Choisir un algorithme selon le problème', type: 'concept',
        text: 'Il n’existe pas d’algorithme universellement meilleur. Posez-vous ces questions :',
        items: [
          'Quelle est la taille des données ? Pour 20 éléments, la méthode la plus simple suffit.',
          'Les données sont-elles déjà triées ? Si oui, la dichotomie devient possible.',
          'Combien de fois va-t-on chercher ? Pour des milliers de recherches, trier une fois puis chercher par dichotomie, ou utiliser un ensemble ou un dictionnaire (recherche en temps quasi constant), devient rentable.',
          'Les données arrivent-elles au fil de l’eau ? Le tri par insertion gère bien l’ajout d’éléments dans une liste déjà triée.',
          'La lisibilité compte : un code simple et correct vaut mieux qu’un code rapide mais faux.'
        ]
      },
      {
        title: 'Exemple commenté : rendre la monnaie avec un algorithme glouton', type: 'example',
        text: 'Problème : rendre une somme avec le moins de billets et de pièces possible. Stratégie gloutonne : prendre à chaque étape la plus grande valeur qui ne dépasse pas le montant restant.',
        code: py`def rendre_monnaie(montant, valeurs=(5000, 2000, 1000, 500, 200, 100, 50, 25, 10, 5)):
    """Algorithme glouton : on prend toujours la plus grande valeur possible."""
    rendu = {}
    for valeur in valeurs:
        if montant >= valeur:
            rendu[valeur] = montant // valeur
            montant = montant % valeur
    return rendu


for valeur, nombre in rendre_monnaie(8735).items():
    print(f"{nombre} x {valeur} FCFA")`,
        output: py`1 x 5000 FCFA
1 x 2000 FCFA
1 x 1000 FCFA
1 x 500 FCFA
1 x 200 FCFA
1 x 25 FCFA
1 x 10 FCFA`,
        after: 'Les valeurs sont parcourues de la plus grande à la plus petite ; pour chacune, la division entière donne le nombre d’unités et le modulo le montant restant. Avec les coupures du franc CFA, la méthode gloutonne donne toujours la solution optimale. Mais ce n’est pas une règle générale : avec des pièces de 1, 3 et 4 pour rendre 6, l’algorithme glouton propose 4 + 1 + 1 (trois pièces) alors que 3 + 3 (deux pièces) est meilleur. Il faut toujours vérifier qu’une stratégie est correcte sur des contre-exemples.'
      },
      {
        title: 'Une méthode de conception algorithmique', type: 'concept',
        text: 'Face à un problème nouveau, suivez ces étapes :',
        ordered: true,
        items: [
          'Reformuler le problème avec vos mots : quelles sont les entrées, quelle est la sortie attendue ?',
          'Résoudre à la main deux ou trois petits exemples, en notant chaque étape.',
          'Lister les cas limites : liste vide, un seul élément, valeurs égales, valeur absente.',
          'Écrire l’algorithme en pseudocode.',
          'Le traduire en Python, en fonctions courtes.',
          'Tester sur les exemples et les cas limites.',
          'Estimer sa complexité et chercher une amélioration si nécessaire.'
        ]
      }
    ],
    guided: {
      title: 'Exercice guidé — Deux articles pour un budget exact', type: 'exercise',
      text: 'Un client veut acheter exactement deux articles pour dépenser précisément son budget. Écrivez une fonction qui trouve une telle paire dans une liste de prix, d’abord de manière naïve, puis de manière efficace.',
      ordered: true,
      items: [
        'Version naïve : avec deux boucles imbriquées (j commence à i + 1), testez toutes les paires. Quelle est la complexité ?',
        'Version efficace : parcourez la liste une seule fois. Pour chaque prix, calculez le complément (budget − prix) et vérifiez s’il fait partie des prix déjà vus, stockés dans un ensemble.',
        'Renvoyez `None` si aucune paire ne convient.',
        'Testez avec les prix `[3500, 1200, 8000, 4300, 2700, 6100]` et un budget de 7000, puis de 100.'
      ],
      solution: {
        code: py`def paire_naive(prix, budget):
    for i in range(len(prix)):
        for j in range(i + 1, len(prix)):
            if prix[i] + prix[j] == budget:
                return prix[i], prix[j]
    return None


def paire_rapide(prix, budget):
    vus = set()
    for p in prix:
        complement = budget - p
        if complement in vus:
            return complement, p
        vus.add(p)
    return None


articles = [3500, 1200, 8000, 4300, 2700, 6100]
print(paire_naive(articles, 7000))
print(paire_rapide(articles, 7000))
print(paire_rapide(articles, 100))`,
        output: py`(4300, 2700)
(4300, 2700)
None`,
        after: 'La version naïve est en O(n²) : pour 10 000 articles, près de 50 millions de paires. La version rapide est en O(n), car tester l’appartenance à un ensemble prend un temps quasi constant. On échange un peu de mémoire (l’ensemble `vus`) contre beaucoup de temps : c’est un compromis très fréquent en algorithmique.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Modifiez la recherche linéaire pour qu’elle renvoie la liste de toutes les positions de la cible.',
        'Programmez le tri à bulles : parcourez la liste en échangeant deux voisins mal ordonnés, et recommencez tant qu’au moins un échange a eu lieu.',
        'Trouvez le deuxième plus grand élément d’une liste en un seul parcours, sans la trier.',
        'Écrivez une fonction `est_triee(liste)` qui renvoie `True` si la liste est triée par ordre croissant.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`def toutes_les_positions(liste, cible):
    return [i for i, valeur in enumerate(liste) if valeur == cible]


print(toutes_les_positions([4, 7, 4, 1, 4], 4))`,
        output: py`[0, 2, 4]`,
        blocks: [{
          text: 'Exercice 2 : le drapeau `echange` permet d’arrêter dès que la liste est triée.',
          code: py`def tri_bulles(liste):
    valeurs = liste[:]
    echange = True
    while echange:
        echange = False
        for i in range(len(valeurs) - 1):
            if valeurs[i] > valeurs[i + 1]:
                valeurs[i], valeurs[i + 1] = valeurs[i + 1], valeurs[i]
                echange = True
    return valeurs


print(tri_bulles([5, 1, 4, 2, 8]))`,
          output: py`[1, 2, 4, 5, 8]`
        }, {
          text: 'Exercice 3 : on maintient deux variables, le maximum et le deuxième maximum.',
          code: py`def deuxieme_plus_grand(liste):
    premier = second = None
    for valeur in liste:
        if premier is None or valeur > premier:
            premier, second = valeur, premier
        elif valeur != premier and (second is None or valeur > second):
            second = valeur
    return second


print(deuxieme_plus_grand([12, 45, 7, 45, 30]))`,
          output: py`30`,
          after: 'Le cas des doublons (45 apparaît deux fois) est un cas limite : la condition `valeur != premier` évite de renvoyer 45.'
        }, {
          text: 'Exercice 4 : `all()` renvoie `True` si toutes les conditions sont vraies.',
          code: py`def est_triee(liste):
    return all(liste[i] <= liste[i + 1] for i in range(len(liste) - 1))


print(est_triee([1, 3, 3, 8]), est_triee([2, 9, 4]), est_triee([]))`,
          output: py`True False True`
        }]
      }
    },
    code: py`# Expérience : compter les comparaisons de deux méthodes de recherche
def lineaire(liste, cible):
    comparaisons = 0
    for valeur in liste:
        comparaisons += 1
        if valeur == cible:
            break
    return comparaisons


def dichotomique(liste, cible):
    gauche, droite, comparaisons = 0, len(liste) - 1, 0
    while gauche <= droite:
        milieu = (gauche + droite) // 2
        comparaisons += 1
        if liste[milieu] == cible:
            break
        if liste[milieu] < cible:
            gauche = milieu + 1
        else:
            droite = milieu - 1
    return comparaisons


for taille in [100, 10_000, 1_000_000]:
    donnees = list(range(taille))
    cible = taille - 1               # pire cas pour la recherche linéaire
    print(f"{taille:>9} éléments : linéaire {lineaire(donnees, cible):>9} | dichotomique {dichotomique(donnees, cible):>2}")`,
    output: py`      100 éléments : linéaire       100 | dichotomique  7
    10000 éléments : linéaire     10000 | dichotomique 14
  1000000 éléments : linéaire   1000000 | dichotomique 20`,
    explain: [
      ['comparaisons += 1', 'Au lieu de chronométrer, on compte les comparaisons : le résultat est identique sur tous les ordinateurs.'],
      ['cible = taille - 1', 'On cherche le dernier élément, ce qui représente le pire cas de la recherche linéaire.'],
      ['10_000', 'Python autorise le tiret bas dans les nombres pour les rendre lisibles : 10_000 vaut 10000.'],
      ['dichotomique ... 20', 'Un million d’éléments ne demande que 20 comparaisons, car 2 puissance 20 dépasse un million.']
    ],
    quiz: [
      { q: 'Quelle condition est indispensable pour utiliser la recherche dichotomique ?', o: ['La liste doit contenir des nombres', 'La liste doit être triée', 'La liste doit avoir une taille paire'], a: 1, e: 'La dichotomie décide de quel côté continuer en comparant au milieu : cela n’a de sens que si les éléments sont ordonnés.' },
      { q: 'Combien de comparaisons faut-il au maximum pour une recherche dichotomique dans 1000 éléments ?', o: ['Environ 10', 'Environ 500', '1000'], a: 0, e: 'Chaque étape divise la zone par deux : 1000 → 500 → 250 → … → 1 en une dizaine d’étapes, car 2¹⁰ = 1024.' },
      { q: 'Si l’on double la taille des données, comment évolue le travail d’un algorithme en O(n²) ?', o: ['Il double', 'Il est multiplié par 4', 'Il ne change pas'], a: 1, e: '(2n)² = 4n² : le travail est multiplié par quatre.' },
      { q: 'Quel tri est le plus rapide sur une liste déjà presque triée ?', o: ['Le tri par sélection', 'Le tri par insertion', 'Ils sont identiques'], a: 1, e: 'Le tri par insertion ne décale presque rien sur une liste presque triée, alors que le tri par sélection fait toujours le même nombre de comparaisons.' }
    ],
    summary: [
      'La recherche linéaire fonctionne partout mais coûte jusqu’à n comparaisons.',
      'La recherche dichotomique exige une liste triée et ne coûte qu’environ log₂(n) comparaisons.',
      'Les tris par sélection et par insertion sont en O(n²) ; `sorted()` est en O(n log n).',
      'La complexité décrit comment le travail augmente avec la taille des données.',
      'Un algorithme glouton est simple mais doit être validé sur des contre-exemples.',
      'Concevoir un algorithme : reformuler, résoudre à la main, prévoir les cas limites, coder, tester, analyser.'
    ],
    errors: [
      'Appliquer la dichotomie sur une liste non triée : les résultats sont faux sans aucun message d’erreur.',
      'Écrire `while gauche < droite` au lieu de `<=` : le dernier candidat n’est jamais examiné.',
      'Trier la liste d’origine alors que l’appelant en avait encore besoin : travaillez sur une copie (`liste[:]`).',
      'Oublier les cas limites : liste vide, un seul élément, doublons.',
      'Optimiser trop tôt : commencez par une solution correcte et lisible, puis mesurez.'
    ],
    resources: [
      ['Module bisect', 'https://docs.python.org/fr/3/library/bisect.html', 'la recherche dichotomique fournie par la bibliothèque standard.'],
      ['Guide du tri en Python', 'https://docs.python.org/fr/3/howto/sorting.html', 'utiliser efficacement `sorted()`.'],
      ['VisuAlgo', 'https://visualgo.net/fr/sorting', 'animations des algorithmes de tri.'],
      ['Complexité des opérations Python', 'https://wiki.python.org/moin/TimeComplexity', 'coût des opérations sur listes, dictionnaires et ensembles (en anglais).']
    ],
    next: 'Vos algorithmes fonctionnent avec des données écrites dans le code ; dès que le programme s’arrête, tout est perdu. La leçon 8 vous apprend à lire et écrire des fichiers (texte, CSV, JSON) et à rendre vos programmes robustes face aux erreurs.'
  }));

  /* ---------------------------------------------------------------- Leçon 8 */
  var stockageNotes = py`# stockage.py — lecture et écriture des données
import json

FICHIER = "donnees.json"


def charger():
    try:
        with open(FICHIER, encoding="utf-8") as fichier:
            return json.load(fichier)
    except FileNotFoundError:
        return {}


def sauvegarder(donnees):
    with open(FICHIER, "w", encoding="utf-8") as fichier:
        json.dump(donnees, fichier, ensure_ascii=False, indent=2)`;

  L.push(lesson({
    title: 'Fichiers, exceptions et programmation robuste',
    level: 'Intermédiaire',
    duration: '3 h',
    intro: 'Un vrai programme conserve ses données entre deux exécutions et ne plante pas à la première saisie inattendue. Cette leçon vous apprend à lire et écrire des fichiers texte, CSV et JSON, à intercepter les erreurs avec `try` / `except`, à déboguer méthodiquement et à répartir un programme sur plusieurs fichiers.',
    objectives: [
      'Lire et écrire des fichiers texte avec `open()` et le bloc `with`.',
      'Manipuler des données tabulaires au format CSV avec le module `csv`.',
      'Sauvegarder et recharger des structures Python au format JSON.',
      'Intercepter les exceptions avec `try`, `except`, `else` et `finally`, et en déclencher avec `raise`.',
      'Valider les entrées de façon robuste et lire un message d’erreur pour déboguer.',
      'Organiser un petit programme en plusieurs modules.'
    ],
    prerequisites: [
      'Leçon 5 : listes et dictionnaires.',
      'Leçon 6 : fonctions et modules.'
    ],
    definitions: [
      ['Fichier texte', 'fichier dont le contenu est une suite de caractères lisible par un humain.'],
      ['Encodage', 'règle de conversion des caractères en octets ; on utilise `utf-8` pour gérer les accents.'],
      ['CSV', 'format de tableau en texte : une ligne par enregistrement, des valeurs séparées par des virgules ou des points-virgules.'],
      ['JSON', 'format texte qui représente des objets, des listes, des nombres et des chaînes ; il est très utilisé sur le Web.'],
      ['Exception', 'événement qui signale une erreur pendant l’exécution et interrompt le programme s’il n’est pas intercepté.'],
      ['Traceback', 'message affiché par Python lors d’une erreur, qui retrace la suite d’appels jusqu’à la ligne fautive.'],
      ['Gestionnaire de contexte', 'bloc `with` qui garantit qu’une ressource, comme un fichier, est correctement fermée.']
    ],
    body: [
      {
        title: 'Lire et écrire un fichier texte', type: 'concept',
        text: 'La fonction `open(chemin, mode, encoding=...)` ouvre un fichier. Le mode `"r"` (par défaut) lit, `"w"` écrit en écrasant le contenu, `"a"` ajoute à la fin. Le bloc `with` ferme automatiquement le fichier, même en cas d’erreur. Indiquez toujours `encoding="utf-8"` pour que les accents soient correctement enregistrés sur tous les systèmes.',
        code: py`with open("journal.txt", "w", encoding="utf-8") as fichier:
    fichier.write("Séance 1 : variables\n")
    fichier.write("Séance 2 : conditions\n")

with open("journal.txt", "a", encoding="utf-8") as fichier:
    fichier.write("Séance 3 : boucles\n")

with open("journal.txt", encoding="utf-8") as fichier:
    for numero, ligne in enumerate(fichier, start=1):
        print(numero, ligne.strip())`,
        output: py`1 Séance 1 : variables
2 Séance 2 : conditions
3 Séance 3 : boucles`,
        after: '`write()` n’ajoute pas de retour à la ligne : le `\\n` marque la fin de chaque ligne. Parcourir un fichier avec `for` le lit ligne par ligne, chaque ligne conservant son `\\n` final, que `strip()` supprime. `fichier.read()` lirait tout le contenu d’un coup en une seule chaîne.'
      },
      {
        title: 'Le format CSV', type: 'concept',
        text: 'Le CSV est le format d’échange des tableurs (Excel, LibreOffice). Le module `csv` gère les détails délicats (virgules dans les valeurs, guillemets). `DictWriter` écrit des dictionnaires et `DictReader` relit chaque ligne sous forme de dictionnaire dont les clés sont les en-têtes.',
        code: py`import csv

etudiants = [
    {"nom": "Ba", "prenom": "Awa", "note": 15},
    {"nom": "Sarr", "prenom": "Moussa", "note": 11},
]
with open("notes.csv", "w", newline="", encoding="utf-8") as fichier:
    ecrivain = csv.DictWriter(fichier, fieldnames=["nom", "prenom", "note"])
    ecrivain.writeheader()
    ecrivain.writerows(etudiants)

with open("notes.csv", newline="", encoding="utf-8") as fichier:
    for ligne in csv.DictReader(fichier):
        print(ligne["prenom"], ligne["nom"], int(ligne["note"]) + 1)`,
        output: py`Awa Ba 16
Moussa Sarr 12`,
        after: 'Point important : tout ce qui est lu depuis un CSV est du texte. La note doit être convertie avec `int()` avant tout calcul. Le paramètre `newline=""` est recommandé par la documentation pour éviter des lignes vides parasites sous Windows.'
      },
      {
        title: 'Le format JSON', type: 'concept',
        text: 'JSON représente fidèlement les dictionnaires et les listes de Python, y compris imbriqués. `json.dump()` écrit une structure dans un fichier et `json.load()` la relit ; `json.dumps()` et `json.loads()` font de même avec des chaînes.',
        code: py`import json

stock = {"boutique": "Atelier", "produits": [{"nom": "Clé USB", "prix": 4500}, {"nom": "Souris", "prix": 6000}]}
with open("stock.json", "w", encoding="utf-8") as fichier:
    json.dump(stock, fichier, ensure_ascii=False, indent=2)

with open("stock.json", encoding="utf-8") as fichier:
    donnees = json.load(fichier)
print(donnees["produits"][1]["nom"])
print(json.dumps(donnees["produits"][0], ensure_ascii=False))`,
        output: py`Souris
{"nom": "Clé USB", "prix": 4500}`,
        after: '`indent=2` rend le fichier lisible par un humain et `ensure_ascii=False` conserve les accents tels quels. Contrairement au CSV, les nombres restent des nombres. JSON ne connaît que les chaînes, nombres, booléens, `null`, listes et objets : les tuples deviennent des listes et les ensembles ne sont pas acceptés.'
      },
      {
        title: 'Intercepter les erreurs avec try / except', type: 'concept',
        text: 'Lorsqu’une instruction échoue, Python déclenche une exception. Placée dans un bloc `try`, elle peut être interceptée par un bloc `except` qui indique quoi faire, au lieu d’arrêter brutalement le programme.',
        code: py`def convertir_en_entier(texte):
    try:
        return int(texte)
    except ValueError:
        print(f"« {texte} » n'est pas un nombre entier.")
        return None


print(convertir_en_entier("42"))
print(convertir_en_entier("quarante-deux"))`,
        output: py`42
« quarante-deux » n'est pas un nombre entier.
None`,
        blocks: [{
          text: 'Une structure complète peut traiter plusieurs types d’erreurs. Le bloc `else` s’exécute s’il n’y a pas eu d’erreur ; `finally` s’exécute dans tous les cas (fermeture de ressource, message de fin).',
          code: py`def diviser(a, b):
    try:
        resultat = a / b
    except ZeroDivisionError:
        print("Erreur : division par zéro.")
    except TypeError:
        print("Erreur : il faut deux nombres.")
    else:
        print("Résultat :", resultat)
    finally:
        print("Opération terminée.")


diviser(10, 4)
diviser(10, 0)
diviser(10, "2")`,
          output: py`Résultat : 2.5
Opération terminée.
Erreur : division par zéro.
Opération terminée.
Erreur : il faut deux nombres.
Opération terminée.`,
          after: 'Interceptez toujours des exceptions précises. Un `except:` sans type attrape tout, y compris des erreurs de programmation qu’il faudrait corriger, et rend le débogage très difficile.'
        }]
      },
      {
        title: 'Les exceptions courantes et raise', type: 'concept',
        items: [
          ['ValueError', 'valeur inadaptée : `int("abc")`.'],
          ['TypeError', 'opération entre types incompatibles : `"a" + 1`.'],
          ['ZeroDivisionError', 'division par zéro.'],
          ['IndexError', 'indice hors de la liste.'],
          ['KeyError', 'clé absente d’un dictionnaire.'],
          ['FileNotFoundError', 'fichier introuvable.'],
          ['NameError', 'variable ou fonction inconnue (souvent une faute de frappe).']
        ],
        blocks: [{
          text: 'Vos propres fonctions peuvent signaler un problème avec `raise`. C’est préférable à un `print()` : l’appelant décide comment réagir.',
          code: py`def retirer(solde, montant):
    if montant <= 0:
        raise ValueError("Le montant doit être positif.")
    if montant > solde:
        raise ValueError("Solde insuffisant.")
    return solde - montant


try:
    print(retirer(10000, 2500))
    print(retirer(10000, 20000))
except ValueError as erreur:
    print("Opération refusée :", erreur)`,
          output: py`7500
Opération refusée : Solde insuffisant.`,
          after: '`as erreur` donne accès à l’objet exception ; l’afficher montre le message fourni à `raise`. Le deuxième `print` n’est jamais exécuté : dès que l’exception est levée, Python saute au bloc `except`.'
        }]
      },
      {
        title: 'Valider les entrées de façon robuste', type: 'concept',
        text: 'En combinant `while True`, `try` et `except`, on obtient une fonction de saisie qui ne plante jamais et que l’on peut réutiliser dans tous ses programmes.',
        code: py`def demander_entier(message, minimum, maximum):
    while True:
        saisie = input(message)
        try:
            valeur = int(saisie)
        except ValueError:
            print("Veuillez saisir un nombre entier.")
            continue
        if minimum <= valeur <= maximum:
            return valeur
        print(f"La valeur doit être entre {minimum} et {maximum}.")


age = demander_entier("Votre âge : ", 1, 120)
print("Âge enregistré :", age)`,
        stdin: ['vingt', '150', '20'],
        output: py`Votre âge : vingt
Veuillez saisir un nombre entier.
Votre âge : 150
La valeur doit être entre 1 et 120.
Votre âge : 20
Âge enregistré : 20`,
        after: 'Contrairement à `isdigit()`, cette version accepte les nombres négatifs et laisse les bornes paramétrables. Le `return` sort à la fois de la boucle et de la fonction.'
      },
      {
        title: 'Déboguer méthodiquement', type: 'concept',
        text: 'Un traceback se lit de bas en haut : la dernière ligne donne le type et le message de l’erreur, les lignes au-dessus indiquent le fichier, le numéro de ligne et la suite d’appels qui y a mené.',
        lang: 'text', file: 'Message d’erreur',
        code: py`Traceback (most recent call last):
  File "notes.py", line 8, in <module>
    print(moyenne([]))
  File "notes.py", line 2, in moyenne
    return sum(notes) / len(notes)
ZeroDivisionError: division by zero`,
        after: 'Ici, la fonction `moyenne` (ligne 2) a divisé par zéro, parce qu’elle a été appelée à la ligne 8 avec une liste vide. La correction consiste à traiter ce cas limite, par exemple en levant une exception explicite ou en renvoyant `None`.',
        blocks: [{
          text: 'Les techniques de débogage, de la plus simple à la plus puissante :',
          items: [
            'Relire le message d’erreur en entier et aller à la ligne indiquée.',
            'Afficher les valeurs intermédiaires avec `print()` (en pensant à retirer ces affichages ensuite).',
            'Reproduire le problème avec le plus petit exemple possible.',
            'Utiliser le débogueur de Thonny ou de VS Code : placer un point d’arrêt, exécuter pas à pas et observer les variables.',
            'Ajouter des assertions (`assert moyenne([10, 20]) == 15`) qui vérifient vos hypothèses.'
          ]
        }]
      },
      {
        title: 'Organiser un programme en plusieurs fichiers', type: 'example',
        text: 'Dès qu’un programme dépasse une centaine de lignes, on le découpe en modules ayant chacun une responsabilité. Voici une organisation typique :',
        lang: 'text', file: 'Arborescence',
        code: py`gestion_notes/
├── main.py          # point d'entrée : interactions avec l'utilisateur
├── stockage.py      # lecture et écriture du fichier JSON
├── calculs.py       # moyennes, classements
└── donnees.json     # créé automatiquement au premier lancement`,
        blocks: [{
          text: 'Le module de stockage isole tout ce qui concerne le fichier :',
          file: 'stockage.py',
          code: stockageNotes,
          norun: true
        }, {
          text: 'Le programme principal ne connaît pas le format du fichier, il utilise seulement les fonctions du module :',
          file: 'main.py',
          code: py`import stockage

notes = stockage.charger()
notes["Awa"] = [15, 17]
notes["Moussa"] = [11, 9]
stockage.sauvegarder(notes)
print("Élèves enregistrés :", ", ".join(stockage.charger()))`,
          deps: { 'stockage.py': stockageNotes },
          output: py`Élèves enregistrés : Awa, Moussa`,
          after: 'Au premier lancement, le fichier n’existe pas : `charger()` intercepte `FileNotFoundError` et renvoie un dictionnaire vide. Si l’on décide un jour de passer du JSON à une base de données, seul `stockage.py` devra changer.'
        }]
      }
    ],
    guided: {
      title: 'Exercice guidé — Un journal de dépenses en CSV', type: 'exercise',
      text: 'Créez deux fonctions : l’une ajoute une dépense (libellé et montant) dans un fichier CSV, l’autre calcule le total en ignorant les lignes invalides.',
      ordered: true,
      items: [
        'Importez `csv` et `os`. La fonction `os.path.exists(chemin)` indique si un fichier existe.',
        'Dans `ajouter_depense`, ouvrez le fichier en mode `"a"` et écrivez la ligne d’en-tête seulement si le fichier n’existait pas.',
        'Dans `total_depenses`, lisez le fichier avec `csv.DictReader` et convertissez chaque montant avec `float()` dans un `try` : une ligne invalide est signalée puis ignorée.',
        'Gérez le cas où le fichier n’existe pas encore.',
        'Testez avec deux dépenses valides et une dépense dont le montant est écrit en lettres.'
      ],
      solution: {
        code: py`import csv
import os

FICHIER = "depenses.csv"


def ajouter_depense(libelle, montant):
    nouveau = not os.path.exists(FICHIER)
    with open(FICHIER, "a", newline="", encoding="utf-8") as fichier:
        ecrivain = csv.writer(fichier)
        if nouveau:
            ecrivain.writerow(["libelle", "montant"])
        ecrivain.writerow([libelle, montant])


def total_depenses():
    total = 0
    try:
        with open(FICHIER, newline="", encoding="utf-8") as fichier:
            for ligne in csv.DictReader(fichier):
                try:
                    total += float(ligne["montant"])
                except ValueError:
                    print("Ligne ignorée :", ligne)
    except FileNotFoundError:
        print("Aucune dépense enregistrée.")
    return total


ajouter_depense("Transport", 1500)
ajouter_depense("Repas", 2500)
ajouter_depense("Photocopies", "deux cents")
print("Total :", total_depenses(), "FCFA")`,
        output: py`Ligne ignorée : {'libelle': 'Photocopies', 'montant': 'deux cents'}
Total : 4000.0 FCFA`,
        after: 'Deux niveaux de `try` : l’extérieur gère l’absence du fichier, l’intérieur gère une ligne défectueuse sans abandonner les autres. C’est le principe de la programmation robuste : une donnée invalide ne doit pas faire perdre tout le travail.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Écrivez un fichier contenant trois lignes de texte, puis relisez-le pour afficher son nombre de lignes, de mots et de caractères.',
        'Écrivez `lire_nombres(chemin)` qui lit un fichier contenant un nombre par ligne et renvoie leur somme, en ignorant les lignes vides ou invalides.',
        'Écrivez deux fonctions `sauver_taches(taches)` et `charger_taches()` qui enregistrent et relisent une liste de tâches au format JSON.',
        'Expliquez l’erreur suivante et proposez une correction : `KeyError: \'prix\'` levée par la ligne `total += produit["prix"]`.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`with open("texte.txt", "w", encoding="utf-8") as f:
    f.write("Python est lisible.\nIl est polyvalent.\nOn l'apprend vite.\n")

with open("texte.txt", encoding="utf-8") as f:
    contenu = f.read()
print("Lignes :", len(contenu.splitlines()))
print("Mots :", len(contenu.split()))
print("Caractères :", len(contenu))`,
        output: py`Lignes : 3
Mots : 9
Caractères : 58`,
        blocks: [{
          text: 'Exercice 2 :',
          code: py`with open("nombres.txt", "w", encoding="utf-8") as f:
    f.write("12\n\n7.5\nabc\n-3\n")


def lire_nombres(chemin):
    somme = 0
    with open(chemin, encoding="utf-8") as fichier:
        for ligne in fichier:
            try:
                somme += float(ligne)
            except ValueError:
                pass            # ligne vide ou invalide : on l'ignore
    return somme


print(lire_nombres("nombres.txt"))`,
          output: py`16.5`,
          after: '`pass` est une instruction qui ne fait rien : elle est nécessaire car un bloc ne peut pas être vide. `float()` accepte les espaces et le retour à la ligne autour du nombre.'
        }, {
          text: 'Exercice 3 :',
          code: py`import json


def sauver_taches(taches, chemin="taches.json"):
    with open(chemin, "w", encoding="utf-8") as f:
        json.dump(taches, f, ensure_ascii=False, indent=2)


def charger_taches(chemin="taches.json"):
    try:
        with open(chemin, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []


print(charger_taches())
sauver_taches(["Réviser les boucles", "Faire l'exercice 2"])
print(charger_taches())`,
          output: py`[]
['Réviser les boucles', "Faire l'exercice 2"]`
        }, {
          text: 'Exercice 4 : la `KeyError` signifie qu’un des dictionnaires `produit` ne contient pas de clé `"prix"`. Selon le besoin, on utilise `produit.get("prix", 0)` pour compter 0, ou l’on intercepte l’erreur pour signaler le produit incomplet.',
          code: py`produits = [{"nom": "Stylo", "prix": 150}, {"nom": "Gomme"}]
total = 0
for produit in produits:
    if "prix" not in produit:
        print("Prix manquant pour", produit["nom"])
        continue
    total += produit["prix"]
print("Total :", total)`,
          output: py`Prix manquant pour Gomme
Total : 150`
        }]
      }
    },
    code: py`# Carnet de notes persistant et robuste
import json

FICHIER = "carnet.json"


def charger(chemin):
    try:
        with open(chemin, encoding="utf-8") as fichier:
            return json.load(fichier)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def sauvegarder(chemin, carnet):
    with open(chemin, "w", encoding="utf-8") as fichier:
        json.dump(carnet, fichier, ensure_ascii=False, indent=2)


def ajouter_note(carnet, eleve, note):
    if not 0 <= note <= 20:
        raise ValueError(f"note invalide : {note}")
    carnet.setdefault(eleve, []).append(note)


carnet = charger(FICHIER)
for eleve, note in [("Awa", 15), ("Moussa", 12), ("Awa", 18), ("Fatou", 25)]:
    try:
        ajouter_note(carnet, eleve, note)
    except ValueError as erreur:
        print("Ignoré :", erreur)
sauvegarder(FICHIER, carnet)

for eleve, notes in charger(FICHIER).items():
    print(f"{eleve} : {notes} (moyenne {sum(notes) / len(notes):.1f})")`,
    output: py`Ignoré : note invalide : 25
Awa : [15, 18] (moyenne 16.5)
Moussa : [12] (moyenne 12.0)`,
    explain: [
      ['except (FileNotFoundError, json.JSONDecodeError):', 'Un seul `except` peut intercepter plusieurs types d’erreurs, regroupés dans un tuple : fichier absent ou contenu illisible donnent un carnet vide.'],
      ['raise ValueError(f"note invalide : {note}")', 'La fonction métier refuse une donnée incorrecte en levant une exception plutôt qu’en affichant un message.'],
      ['carnet.setdefault(eleve, []).append(note)', '`setdefault` renvoie la liste de l’élève, en la créant vide si besoin : une seule ligne pour ajouter une note.'],
      ['try: ajouter_note(...) except ValueError', 'La boucle principale décide de la réaction : la note invalide est signalée et ignorée, les autres sont enregistrées.'],
      ['charger(FICHIER).items()', 'On relit le fichier pour vérifier que la sauvegarde a bien fonctionné.']
    ],
    quiz: [
      { q: 'Quel mode d’ouverture ajoute du texte à la fin d’un fichier sans effacer son contenu ?', o: ['"r"', '"w"', '"a"'], a: 2, e: '`"a"` (append) ajoute à la fin ; `"w"` écrase le contenu existant et `"r"` ne permet que la lecture.' },
      { q: 'Quel est l’avantage principal du bloc `with open(...) as f:` ?', o: ['Il lit le fichier plus vite', 'Il ferme automatiquement le fichier, même en cas d’erreur', 'Il crée une copie de sauvegarde'], a: 1, e: 'Le gestionnaire de contexte garantit la fermeture du fichier à la sortie du bloc.' },
      { q: 'Quand s’exécute le bloc `else` d’un `try` ?', o: ['Quand une exception a été interceptée', 'Quand aucune exception n’a été levée', 'Toujours'], a: 1, e: '`else` s’exécute seulement si le bloc `try` s’est déroulé sans erreur ; c’est `finally` qui s’exécute toujours.' },
      { q: 'Quel est le type des valeurs lues par `csv.DictReader` ?', o: ['Elles gardent leur type d’origine', 'Ce sont toujours des chaînes', 'Ce sont des nombres si possible'], a: 1, e: 'Le CSV est un format purement textuel : il faut convertir les nombres avec `int()` ou `float()`.' }
    ],
    summary: [
      '`with open(chemin, mode, encoding="utf-8")` ouvre un fichier et le referme automatiquement.',
      'Le module `csv` gère les tableaux ; toutes les valeurs lues sont des chaînes.',
      'Le module `json` sauvegarde et recharge des dictionnaires et des listes en conservant les types.',
      '`try` / `except` intercepte des exceptions précises ; `else` et `finally` complètent la structure ; `raise` en déclenche.',
      'Un traceback se lit de bas en haut ; le débogueur permet d’exécuter pas à pas.',
      'Découper un programme en modules isole les responsabilités et facilite les évolutions.'
    ],
    errors: [
      'Oublier `encoding="utf-8"` : les accents deviennent illisibles sur certains systèmes.',
      'Ouvrir en mode `"w"` un fichier que l’on voulait compléter : son contenu est effacé.',
      'Écrire `except:` ou `except Exception:` partout : les vraies erreurs de programmation sont masquées.',
      'Placer trop de code dans le `try` : on ne sait plus quelle instruction a échoué. Gardez le bloc court.',
      'Utiliser un chemin relatif sans savoir depuis quel dossier le programme est lancé : `FileNotFoundError`.'
    ],
    resources: [
      ['Lecture et écriture de fichiers', 'https://docs.python.org/fr/3/tutorial/inputoutput.html#reading-and-writing-files', 'tutoriel officiel.'],
      ['Erreurs et exceptions', 'https://docs.python.org/fr/3/tutorial/errors.html', 'try, except, raise en détail.'],
      ['Module csv', 'https://docs.python.org/fr/3/library/csv.html', 'référence complète.'],
      ['Module json', 'https://docs.python.org/fr/3/library/json.html', 'référence complète.'],
      ['Déboguer avec VS Code', 'https://code.visualstudio.com/docs/python/debugging', 'points d’arrêt et exécution pas à pas.']
    ],
    next: 'Vos programmes manipulent maintenant des données durables. La leçon 9 introduit la programmation orientée objet, qui regroupe données et comportements dans des classes, ainsi que les tests automatisés qui vérifient que votre code fonctionne et continue de fonctionner.'
  }));

  /* ---------------------------------------------------------------- Leçon 9 */
  var panierPy = py`# panier.py
class Panier:
    def __init__(self):
        self.articles = {}

    def ajouter(self, nom, prix, quantite=1):
        if prix < 0 or quantite <= 0:
            raise ValueError("Prix ou quantité invalide.")
        _, deja = self.articles.get(nom, (prix, 0))
        self.articles[nom] = (prix, deja + quantite)

    def total(self):
        return sum(prix * quantite for prix, quantite in self.articles.values())`;

  L.push(lesson({
    title: 'Programmation orientée objet et tests',
    level: 'Intermédiaire',
    duration: '3 h 30',
    intro: 'La programmation orientée objet (POO) regroupe dans une même structure les données et les actions qui les concernent : un compte bancaire possède un solde et sait effectuer un retrait. Associée aux tests automatisés, elle permet de construire des programmes plus grands, mieux organisés et fiables.',
    objectives: [
      'Définir une classe, créer des objets et utiliser le constructeur `__init__`.',
      'Distinguer attributs d’instance, attributs de classe et méthodes.',
      'Protéger les données d’un objet (encapsulation) avec des conventions et des propriétés.',
      'Réutiliser du code par héritage et redéfinir des méthodes.',
      'Écrire et exécuter des tests automatisés avec `unittest`, et découvrir `pytest`.',
      'Appliquer les bonnes pratiques d’organisation du code.'
    ],
    prerequisites: [
      'Leçon 6 : fonctions et modules.',
      'Leçon 8 : exceptions et `raise`.'
    ],
    definitions: [
      ['Classe', 'modèle qui décrit les données (attributs) et les comportements (méthodes) d’un type d’objet.'],
      ['Objet (instance)', 'élément concret créé à partir d’une classe, avec ses propres valeurs d’attributs.'],
      ['Attribut', 'variable rattachée à un objet (`compte.solde`) ou à une classe.'],
      ['Méthode', 'fonction définie dans une classe, qui agit sur l’objet via le paramètre `self`.'],
      ['Constructeur', 'méthode spéciale `__init__`, appelée automatiquement à la création d’un objet pour l’initialiser.'],
      ['Encapsulation', 'principe qui consiste à contrôler l’accès aux données internes d’un objet.'],
      ['Héritage', 'mécanisme par lequel une classe enfant reprend les attributs et méthodes d’une classe parente.'],
      ['Test unitaire', 'petit programme qui vérifie automatiquement qu’une fonction ou une méthode produit le résultat attendu.']
    ],
    body: [
      {
        title: 'Classes et objets', type: 'concept',
        text: 'Une classe est un plan de construction ; les objets sont les maisons construites à partir de ce plan. Chaque objet possède ses propres valeurs. Par convention, le nom d’une classe commence par une majuscule (`CompteBancaire`).',
        code: py`class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, montant):
        self.solde += montant

    def afficher(self):
        print(f"{self.titulaire} : {self.solde} FCFA")


compte_awa = CompteBancaire("Awa", 5000)
compte_moussa = CompteBancaire("Moussa")
compte_awa.deposer(2500)
compte_awa.afficher()
compte_moussa.afficher()`,
        output: py`Awa : 7500 FCFA
Moussa : 0 FCFA`,
        after: '`CompteBancaire("Awa", 5000)` crée un objet et appelle automatiquement `__init__`. Le paramètre `self` désigne l’objet en cours : `self.solde = solde` crée l’attribut `solde` de cet objet. Lors de l’appel `compte_awa.deposer(2500)`, Python transmet `compte_awa` comme `self`. Le dépôt sur le compte d’Awa ne change rien à celui de Moussa : chaque objet a ses propres données.'
      },
      {
        title: 'Attributs d’instance, attributs de classe et méthodes spéciales', type: 'concept',
        text: 'Un attribut d’instance est propre à chaque objet ; un attribut de classe est partagé par tous. Les méthodes spéciales, entourées de doubles tirets bas, personnalisent le comportement des objets : `__str__` définit par exemple le texte affiché par `print()`.',
        code: py`class Produit:
    taux_tva = 0.18                     # attribut de classe, partagé

    def __init__(self, nom, prix_ht):
        self.nom = nom                  # attributs d'instance
        self.prix_ht = prix_ht

    def prix_ttc(self):
        return round(self.prix_ht * (1 + Produit.taux_tva))

    def __str__(self):
        return f"{self.nom} — {self.prix_ttc()} FCFA TTC"


cle = Produit("Clé USB", 4500)
print(cle)
print(cle.prix_ht, Produit.taux_tva)`,
        output: py`Clé USB — 5310 FCFA TTC
4500 0.18`,
        after: 'Sans `__str__`, `print(cle)` afficherait un texte technique du type `<__main__.Produit object at 0x...>`. Une méthode peut appeler une autre méthode du même objet avec `self.` : c’est ce que fait `__str__` avec `self.prix_ttc()`.'
      },
      {
        title: 'L’encapsulation', type: 'concept',
        text: 'Un objet doit garantir la cohérence de ses données : un solde ne devrait pas pouvoir devenir négatif par une simple affectation. Python repose sur des conventions : un nom commençant par `_` signale un attribut interne, à ne pas modifier de l’extérieur. Le décorateur `@property` expose une valeur en lecture seule, et les méthodes contrôlent les modifications.',
        code: py`class Compte:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self._solde = solde             # attribut interne, par convention

    @property
    def solde(self):
        return self._solde

    def retirer(self, montant):
        if montant <= 0:
            raise ValueError("Montant invalide.")
        if montant > self._solde:
            raise ValueError("Solde insuffisant.")
        self._solde -= montant


compte = Compte("Fatou", 10000)
compte.retirer(3000)
print(compte.solde)
try:
    compte.retirer(50000)
except ValueError as erreur:
    print("Refusé :", erreur)`,
        output: py`7000
Refusé : Solde insuffisant.`,
        after: '`compte.solde` se lit comme un attribut, mais `compte.solde = 0` provoquerait une `AttributeError`, car la propriété n’a pas de méthode de modification. Le seul moyen de changer le solde passe par `retirer`, qui vérifie les règles métier.'
      },
      {
        title: 'L’héritage', type: 'concept',
        text: 'Une classe enfant hérite de tout ce que définit sa classe parente et peut ajouter ou redéfinir des éléments. `super()` permet d’appeler la version de la classe parente.',
        code: py`class Personne:
    def __init__(self, nom):
        self.nom = nom

    def presenter(self):
        return f"Je suis {self.nom}."


class Etudiant(Personne):
    def __init__(self, nom, filiere):
        super().__init__(nom)
        self.filiere = filiere

    def presenter(self):
        return super().presenter() + f" J'étudie en {self.filiere}."


class Formateur(Personne):
    def presenter(self):
        return f"Je suis {self.nom}, formateur."


for personne in [Etudiant("Awa", "informatique"), Formateur("M. Diop")]:
    print(personne.presenter())`,
        output: py`Je suis Awa. J'étudie en informatique.
Je suis M. Diop, formateur.`,
        after: 'La boucle appelle `presenter()` sans se soucier du type exact de chaque objet : chacun répond à sa manière. C’est le polymorphisme. Utilisez l’héritage uniquement pour une vraie relation « est un » (un étudiant est une personne). Dans les autres cas, préférez la composition : un objet en contient un autre comme attribut (une bibliothèque contient des livres).'
      },
      {
        title: 'Tester son code avec unittest', type: 'concept',
        text: 'Un test automatisé appelle votre code avec des données connues et vérifie le résultat. Une fois écrits, les tests se relancent en une seconde après chaque modification : ils détectent immédiatement une régression. Le module `unittest` est inclus dans Python. Voici une classe à tester :',
        file: 'panier.py',
        code: panierPy,
        norun: true,
        blocks: [{
          text: 'Dans le même dossier, un fichier de tests. Chaque méthode dont le nom commence par `test_` est un test :',
          file: 'test_panier.py',
          code: py`import unittest
from panier import Panier


class TestPanier(unittest.TestCase):
    def test_panier_vide(self):
        self.assertEqual(Panier().total(), 0)

    def test_ajout_cumule_les_quantites(self):
        panier = Panier()
        panier.ajouter("Stylo", 150, 2)
        panier.ajouter("Stylo", 150, 3)
        self.assertEqual(panier.total(), 750)

    def test_prix_negatif_refuse(self):
        with self.assertRaises(ValueError):
            Panier().ajouter("Erreur", -100)


if __name__ == "__main__":
    unittest.main()`,
          deps: { 'panier.py': panierPy },
          nocheck: true,
          output: py`...
----------------------------------------------------------------------
Ran 3 tests in 0.001s

OK`,
          after: 'Lancez les tests avec `python test_panier.py` ou `python -m unittest`. Chaque point représente un test réussi ; un échec affiche `F` et le détail de la différence. Les méthodes `assertEqual`, `assertTrue`, `assertFalse` et `assertRaises` couvrent la plupart des besoins. Testez les cas normaux, les cas limites (panier vide) et les cas d’erreur.'
        }, {
          text: 'L’outil `pytest`, très répandu, permet d’écrire les mêmes tests sous forme de simples fonctions avec `assert`. Installez-le avec `pip install pytest`, puis lancez la commande `pytest` dans le dossier :',
          file: 'test_panier_pytest.py',
          code: py`import pytest
from panier import Panier


def test_ajout_cumule_les_quantites():
    panier = Panier()
    panier.ajouter("Stylo", 150, 2)
    panier.ajouter("Stylo", 150, 3)
    assert panier.total() == 750


def test_prix_negatif_refuse():
    with pytest.raises(ValueError):
        Panier().ajouter("Erreur", -100)`,
          norun: true
        }]
      },
      {
        title: 'Organiser son code : les bonnes pratiques', type: 'concept',
        items: [
          ['Lisibilité', 'respectez la PEP 8 (indentation de 4 espaces, `snake_case` pour les fonctions, `PascalCase` pour les classes) et choisissez des noms explicites.'],
          ['Une responsabilité par élément', 'une fonction fait une chose, une classe représente un concept, un module regroupe un domaine.'],
          ['Pas de duplication', 'si vous copiez-collez du code, créez une fonction.'],
          ['Documentation', 'une docstring pour chaque classe et fonction publique, un fichier README pour le projet.'],
          ['Tests', 'écrivez un test pour chaque règle métier et chaque bogue corrigé.'],
          ['Point d’entrée', 'placez le code de lancement sous `if __name__ == "__main__":`.'],
          ['Gestion de versions', 'suivez l’évolution du projet avec Git et faites des commits réguliers.']
        ]
      }
    ],
    guided: {
      title: 'Exercice guidé — Une classe Rectangle testée', type: 'exercise',
      text: 'Créez une classe `Rectangle` et les tests qui garantissent son bon fonctionnement.',
      ordered: true,
      items: [
        'Écrivez le constructeur qui reçoit la largeur et la hauteur, et lève une `ValueError` si l’une d’elles est négative ou nulle.',
        'Ajoutez les méthodes `aire()`, `perimetre()` et `est_carre()`.',
        'Écrivez une classe de test avec trois tests : aire et périmètre, détection d’un carré, refus d’une dimension invalide.',
        'Exécutez les tests, puis introduisez volontairement une erreur dans `perimetre()` pour voir un test échouer.'
      ],
      solution: {
        code: py`import unittest


class Rectangle:
    def __init__(self, largeur, hauteur):
        if largeur <= 0 or hauteur <= 0:
            raise ValueError("Les dimensions doivent être positives.")
        self.largeur = largeur
        self.hauteur = hauteur

    def aire(self):
        return self.largeur * self.hauteur

    def perimetre(self):
        return 2 * (self.largeur + self.hauteur)

    def est_carre(self):
        return self.largeur == self.hauteur


class TestRectangle(unittest.TestCase):
    def test_aire_et_perimetre(self):
        r = Rectangle(4, 3)
        self.assertEqual(r.aire(), 12)
        self.assertEqual(r.perimetre(), 14)

    def test_carre(self):
        self.assertTrue(Rectangle(5, 5).est_carre())
        self.assertFalse(Rectangle(5, 2).est_carre())

    def test_dimension_invalide(self):
        with self.assertRaises(ValueError):
            Rectangle(0, 3)


if __name__ == "__main__":
    unittest.main()`,
        nocheck: true,
        output: py`...
----------------------------------------------------------------------
Ran 3 tests in 0.001s

OK`,
        after: 'Le test `test_dimension_invalide` vérifie qu’une erreur est bien levée : tester les refus est aussi important que tester les cas normaux. Pour un projet réel, on sépare la classe (`rectangle.py`) et ses tests (`test_rectangle.py`).'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      ordered: true,
      items: [
        'Créez une classe `Etudiant` avec un nom, une liste de notes, une méthode `ajouter_note` (qui refuse les notes hors de 0 à 20) et une méthode `moyenne`.',
        'Créez une classe `Thermometre` dont la propriété `celsius` refuse les valeurs inférieures à −273,15 et qui fournit une propriété `fahrenheit`.',
        'Créez une classe `Vehicule` et deux classes enfants `Voiture` et `Moto` qui précisent leur nombre de roues.',
        'Écrivez trois tests `unittest` pour la fonction `est_premier` de la leçon 6.'
      ],
      solution: {
        text: 'Exercice 1 :',
        code: py`class Etudiant:
    def __init__(self, nom):
        self.nom = nom
        self.notes = []

    def ajouter_note(self, note):
        if not 0 <= note <= 20:
            raise ValueError("Note hors limites")
        self.notes.append(note)

    def moyenne(self):
        return sum(self.notes) / len(self.notes) if self.notes else None


awa = Etudiant("Awa")
for n in (14, 17, 12):
    awa.ajouter_note(n)
print(awa.nom, round(awa.moyenne(), 2))`,
        output: py`Awa 14.33`,
        blocks: [{
          text: 'Exercice 2 : la propriété possède ici une méthode de modification (`setter`) qui valide la valeur.',
          code: py`class Thermometre:
    def __init__(self, celsius=0):
        self.celsius = celsius          # passe par le setter, donc validé

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, valeur):
        if valeur < -273.15:
            raise ValueError("Température impossible")
        self._celsius = valeur

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32


t = Thermometre(25)
print(t.fahrenheit)
try:
    t.celsius = -300
except ValueError as e:
    print("Refusé :", e)`,
          output: py`77.0
Refusé : Température impossible`
        }, {
          text: 'Exercice 3 : un attribut de classe suffit à spécialiser chaque enfant.',
          code: py`class Vehicule:
    roues = 0

    def __init__(self, marque):
        self.marque = marque

    def decrire(self):
        return f"{self.marque} ({self.roues} roues)"


class Voiture(Vehicule):
    roues = 4


class Moto(Vehicule):
    roues = 2


for v in [Voiture("Toyota"), Moto("Yamaha")]:
    print(v.decrire())`,
          output: py`Toyota (4 roues)
Yamaha (2 roues)`
        }, {
          text: 'Exercice 4 :',
          code: py`import unittest


def est_premier(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True


class TestEstPremier(unittest.TestCase):
    def test_nombres_premiers(self):
        for n in (2, 3, 13, 97):
            self.assertTrue(est_premier(n))

    def test_nombres_composes(self):
        for n in (4, 9, 21, 100):
            self.assertFalse(est_premier(n))

    def test_cas_limites(self):
        self.assertFalse(est_premier(0))
        self.assertFalse(est_premier(1))


if __name__ == "__main__":
    unittest.main()`,
          nocheck: true,
          output: py`...
----------------------------------------------------------------------
Ran 3 tests in 0.001s

OK`
        }]
      }
    },
    code: py`# Gestion d'inventaire orientée objet
class Article:
    def __init__(self, reference, nom, prix, quantite=0):
        self.reference = reference
        self.nom = nom
        self.prix = prix
        self.quantite = quantite

    def valeur(self):
        return self.prix * self.quantite

    def __str__(self):
        return f"[{self.reference}] {self.nom:<8} {self.quantite:>3} x {self.prix:>4} FCFA"


class Inventaire:
    def __init__(self):
        self._articles = {}

    def ajouter(self, article):
        if article.reference in self._articles:
            raise ValueError(f"Référence déjà utilisée : {article.reference}")
        self._articles[article.reference] = article

    def sortir(self, reference, quantite):
        article = self._articles[reference]
        if quantite > article.quantite:
            raise ValueError(f"Stock insuffisant pour {article.nom}")
        article.quantite -= quantite

    def valeur_totale(self):
        return sum(a.valeur() for a in self._articles.values())

    def alertes(self, seuil=5):
        return [a.nom for a in self._articles.values() if a.quantite < seuil]

    def afficher(self):
        for article in self._articles.values():
            print(article)


stock = Inventaire()
stock.ajouter(Article("A1", "Cahier", 750, 40))
stock.ajouter(Article("A2", "Stylo", 150, 8))
stock.ajouter(Article("A3", "Règle", 300, 3))
stock.sortir("A2", 5)
try:
    stock.sortir("A3", 10)
except ValueError as erreur:
    print("Erreur :", erreur)
stock.afficher()
print("Valeur totale :", stock.valeur_totale(), "FCFA")
print("À réapprovisionner :", ", ".join(stock.alertes()))`,
    output: py`Erreur : Stock insuffisant pour Règle
[A1] Cahier    40 x  750 FCFA
[A2] Stylo      3 x  150 FCFA
[A3] Règle      3 x  300 FCFA
Valeur totale : 31350 FCFA
À réapprovisionner : Stylo, Règle`,
    explain: [
      ['class Article:', 'Un article regroupe ses données (référence, nom, prix, quantité) et un calcul qui le concerne (`valeur`).'],
      ['self._articles = {}', 'L’inventaire contient des articles (composition), rangés dans un dictionnaire indexé par référence pour un accès direct.'],
      ['raise ValueError(...)', 'Les règles métier (référence unique, stock suffisant) sont vérifiées dans les méthodes : impossible de mettre l’inventaire dans un état incohérent.'],
      ['sum(a.valeur() for a in ...)', 'L’inventaire délègue le calcul à chaque article : chaque classe garde sa responsabilité.'],
      ['def __str__(self):', 'Définit l’affichage d’un article ; les formats `:<8` et `:>3` alignent les colonnes.']
    ],
    quiz: [
      { q: 'Que représente `self` dans une méthode ?', o: ['La classe elle-même', 'L’objet sur lequel la méthode est appelée', 'Une variable globale'], a: 1, e: 'Lors de l’appel `compte.deposer(100)`, Python transmet automatiquement `compte` comme premier argument, nommé `self`.' },
      { q: 'Quand la méthode `__init__` est-elle exécutée ?', o: ['À la création de chaque objet', 'Au lancement du programme', 'Quand on appelle print()'], a: 0, e: '`__init__` est le constructeur : il initialise les attributs de chaque nouvel objet.' },
      { q: 'Dans `class Etudiant(Personne):`, que signifie `Personne` ?', o: ['Un attribut', 'La classe parente dont Etudiant hérite', 'Un paramètre du constructeur'], a: 1, e: 'La classe entre parenthèses est la classe parente ; Etudiant hérite de ses attributs et méthodes.' },
      { q: 'Pourquoi tester qu’une fonction lève bien une erreur sur une donnée invalide ?', o: ['C’est inutile', 'Pour garantir que les règles de validation ne disparaissent pas lors d’une modification', 'Pour rendre le programme plus rapide'], a: 1, e: 'Les tests de refus protègent les règles métier : si quelqu’un supprime une vérification par erreur, le test échoue immédiatement.' }
    ],
    summary: [
      'Une classe définit des attributs et des méthodes ; un objet est une instance de la classe.',
      '`__init__` initialise l’objet ; `self` désigne l’objet courant ; `__str__` définit son affichage.',
      'L’encapsulation protège la cohérence des données : attributs internes `_nom`, propriétés, méthodes de validation.',
      'L’héritage réutilise une classe parente ; `super()` appelle ses méthodes ; la composition est souvent préférable.',
      '`unittest` (ou `pytest`) automatise la vérification du code : cas normaux, cas limites et cas d’erreur.'
    ],
    errors: [
      'Oublier `self` comme premier paramètre d’une méthode : `TypeError` à l’appel.',
      'Écrire `nom = nom` au lieu de `self.nom = nom` dans `__init__` : l’attribut n’est jamais créé.',
      'Utiliser une liste comme attribut de classe alors qu’elle devrait être propre à chaque objet : tous les objets la partagent.',
      'Créer des hiérarchies d’héritage profondes et artificielles : préférez des classes simples et la composition.',
      'Écrire des tests qui dépendent les uns des autres ou de l’ordre d’exécution.'
    ],
    resources: [
      ['Les classes en Python', 'https://docs.python.org/fr/3/tutorial/classes.html', 'tutoriel officiel.'],
      ['Module unittest', 'https://docs.python.org/fr/3/library/unittest.html', 'référence complète.'],
      ['Documentation de pytest', 'https://docs.pytest.org/', 'démarrage rapide et bonnes pratiques (en anglais).'],
      ['PEP 8', 'https://peps.python.org/pep-0008/', 'conventions de style.']
    ],
    next: 'Vous maîtrisez maintenant l’ensemble des outils du parcours. La leçon 10 les mobilise tous pour concevoir et développer une application complète, de l’analyse du cahier des charges jusqu’aux tests et à la documentation.'
  }));

  /* --------------------------------------------------------------- Leçon 10 */
  var modelePy = py`# modele.py — les données et les règles de l'application
class Tache:
    def __init__(self, identifiant, titre, terminee=False):
        if not titre.strip():
            raise ValueError("le titre ne peut pas être vide")
        self.identifiant = identifiant
        self.titre = titre.strip()
        self.terminee = terminee

    def vers_dict(self):
        return {"id": self.identifiant, "titre": self.titre, "terminee": self.terminee}

    @classmethod
    def depuis_dict(cls, donnees):
        return cls(donnees["id"], donnees["titre"], donnees["terminee"])

    def __str__(self):
        case = "x" if self.terminee else " "
        return f"[{case}] {self.identifiant:>2}. {self.titre}"


class GestionnaireTaches:
    def __init__(self, taches=None):
        self.taches = taches or []

    def _prochain_id(self):
        return max((t.identifiant for t in self.taches), default=0) + 1

    def ajouter(self, titre):
        tache = Tache(self._prochain_id(), titre)
        self.taches.append(tache)
        return tache

    def trouver(self, identifiant):
        for tache in self.taches:
            if tache.identifiant == identifiant:
                return tache
        raise ValueError(f"Aucune tâche n°{identifiant}")

    def terminer(self, identifiant):
        self.trouver(identifiant).terminee = True

    def supprimer(self, identifiant):
        self.taches.remove(self.trouver(identifiant))

    def filtrer(self, terminees=None):
        if terminees is None:
            return list(self.taches)
        return [t for t in self.taches if t.terminee == terminees]

    def statistiques(self):
        total = len(self.taches)
        faites = len(self.filtrer(terminees=True))
        pourcentage = round(faites / total * 100) if total else 0
        return total, faites, pourcentage`;

  var stockageTaches = py`# stockage.py — persistance au format JSON
import json
from modele import GestionnaireTaches, Tache


def charger(chemin):
    try:
        with open(chemin, encoding="utf-8") as fichier:
            donnees = json.load(fichier)
    except FileNotFoundError:
        return GestionnaireTaches()
    return GestionnaireTaches([Tache.depuis_dict(d) for d in donnees])


def sauvegarder(chemin, gestionnaire):
    with open(chemin, "w", encoding="utf-8") as fichier:
        json.dump([t.vers_dict() for t in gestionnaire.taches], fichier, ensure_ascii=False, indent=2)`;

  L.push(lesson({
    title: 'Synthèse et réalisation d’une application',
    level: 'Intermédiaire',
    duration: '4 h',
    intro: 'Cette leçon de synthèse vous fait vivre la réalisation complète d’une application en ligne de commande : un gestionnaire de tâches qui sauvegarde ses données. Vous suivrez la démarche d’un développeur professionnel, de l’analyse du besoin jusqu’aux tests et à la documentation, en réutilisant chaque notion du parcours.',
    objectives: [
      'Réviser et relier les notions des leçons 1 à 9.',
      'Analyser un cahier des charges et en extraire les fonctionnalités et les contraintes.',
      'Décomposer une application en modules : modèle, stockage, interface.',
      'Concevoir les algorithmes principaux avant de coder.',
      'Développer, tester, corriger et documenter une application complète.',
      'S’auto-évaluer à l’aide d’une grille de critères.'
    ],
    prerequisites: [
      'Leçons 1 à 9 du parcours, en particulier les fichiers JSON (leçon 8) et les classes (leçon 9).'
    ],
    definitions: [
      ['Cahier des charges', 'document qui décrit ce que l’application doit faire (exigences fonctionnelles) et dans quelles conditions (exigences non fonctionnelles).'],
      ['Modèle', 'partie du programme qui représente les données et applique les règles métier.'],
      ['Interface en ligne de commande (CLI)', 'application utilisée en tapant des commandes ou des choix au clavier dans un terminal.'],
      ['Persistance', 'capacité de conserver les données après l’arrêt du programme, ici dans un fichier JSON.'],
      ['Régression', 'bogue qui réapparaît ou fonctionnalité qui cesse de marcher après une modification.'],
      ['README', 'fichier de documentation placé à la racine d’un projet, qui explique son but, son installation et son utilisation.']
    ],
    body: [
      {
        title: 'Révision des concepts fondamentaux', type: 'concept',
        text: 'L’application que vous allez construire mobilise tout le parcours :',
        items: [
          ['Algorithmique (leçon 1)', 'analyse entrée / traitement / sortie et conception en pseudocode.'],
          ['Variables et types (leçon 2)', 'identifiants entiers, titres textuels, statuts booléens.'],
          ['Conditions (leçon 3)', 'aiguillage des choix du menu, validation des saisies.'],
          ['Boucles (leçon 4)', 'boucle principale du menu, parcours des tâches.'],
          ['Collections (leçon 5)', 'liste de tâches, dictionnaires pour la sauvegarde.'],
          ['Fonctions et modules (leçon 6)', 'découpage en fichiers `modele.py`, `stockage.py`, `app.py`.'],
          ['Recherche (leçon 7)', 'recherche d’une tâche par son identifiant.'],
          ['Fichiers et exceptions (leçon 8)', 'sauvegarde JSON, gestion des erreurs de saisie.'],
          ['Objets et tests (leçon 9)', 'classes `Tache` et `GestionnaireTaches`, tests unitaires.']
        ]
      },
      {
        title: 'Analyser le cahier des charges', type: 'concept',
        text: 'Le client, une association étudiante, souhaite un outil simple pour suivre ses tâches. Voici ses demandes, reformulées en exigences vérifiables :',
        items: [
          ['F1', 'ajouter une tâche avec un titre non vide ; elle reçoit un numéro unique.'],
          ['F2', 'lister les tâches avec leur statut (à faire ou terminée).'],
          ['F3', 'marquer une tâche comme terminée à partir de son numéro.'],
          ['F4', 'supprimer une tâche.'],
          ['F5', 'afficher des statistiques : nombre de tâches, tâches terminées, pourcentage d’avancement.'],
          ['NF1', 'les tâches sont conservées entre deux lancements (fichier JSON).'],
          ['NF2', 'une saisie incorrecte affiche un message clair et ne fait jamais planter le programme.'],
          ['NF3', 'le code est découpé en modules, documenté et couvert par des tests.']
        ],
        after: 'Les exigences fonctionnelles (F) décrivent ce que fait l’application ; les non fonctionnelles (NF) décrivent sa qualité. Numéroter les exigences permet de vérifier, à la fin, que chacune est satisfaite.'
      },
      {
        title: 'Décomposer le problème', type: 'concept',
        text: 'On sépare l’application en trois couches indépendantes. Cette séparation permet de tester les règles métier sans clavier ni fichier, et de remplacer plus tard l’interface (par une page Web, par exemple) sans toucher au reste.',
        lang: 'text', file: 'Architecture',
        code: py`gestionnaire_taches/
├── modele.py        # classes Tache et GestionnaireTaches : données et règles
├── stockage.py      # charger() et sauvegarder() au format JSON
├── app.py           # menu interactif : saisies et affichages
├── test_modele.py   # tests unitaires du modèle
└── README.md        # documentation`
      },
      {
        title: 'Concevoir les algorithmes', type: 'concept',
        text: 'Avant de coder, on écrit le pseudocode des deux algorithmes centraux : la boucle du menu et la recherche d’une tâche.',
        lang: 'text', file: 'Pseudocode',
        code: py`ALGORITHME Menu
DÉBUT
    gestionnaire ← charger(fichier)
    RÉPÉTER
        LIRE choix
        SELON choix
            "1" : LIRE titre ; ajouter(titre)
            "2" : POUR chaque tâche : ÉCRIRE tâche
            "3" : LIRE numéro ; terminer(numéro)
            "4" : LIRE numéro ; supprimer(numéro)
            "5" : ÉCRIRE statistiques
            "0" : quitter ← VRAI
        SI une erreur survient ALORS ÉCRIRE message
        sauvegarder(fichier, gestionnaire)
    JUSQU'À quitter
FIN

FONCTION trouver(numéro)
    POUR chaque tâche DE la liste
        SI tâche.identifiant = numéro ALORS RENVOYER tâche
    LEVER ERREUR "Aucune tâche"`,
        after: 'Le nombre de tâches reste faible : une recherche linéaire suffit largement (leçon 7). Pour l’identifiant, on prend le plus grand numéro existant plus un, ce qui garantit l’unicité même après des suppressions.'
      },
      {
        title: 'Développer : le modèle', type: 'example',
        text: 'Le modèle contient les règles métier. Il ne fait aucun `print()` ni `input()` : il lève des exceptions, que l’interface traduira en messages.',
        file: 'modele.py',
        code: modelePy,
        norun: true,
        after: '`vers_dict()` et `depuis_dict()` convertissent une tâche en dictionnaire et inversement, pour la sauvegarde JSON. Le décorateur `@classmethod` crée une méthode appelée sur la classe (`Tache.depuis_dict(...)`), pratique pour fabriquer un objet à partir de données. `max(..., default=0)` gère le cas d’une liste vide.'
      },
      {
        title: 'Développer : le stockage et l’interface', type: 'example',
        file: 'stockage.py',
        code: stockageTaches,
        deps: { 'modele.py': modelePy },
        norun: true,
        blocks: [{
          text: 'L’interface lit les choix de l’utilisateur, appelle le modèle et affiche les résultats. Toutes les erreurs métier sont interceptées au même endroit.',
          file: 'app.py',
          code: py`# app.py — interface en ligne de commande
import stockage

FICHIER = "taches.json"
MENU = "1. Ajouter | 2. Lister | 3. Terminer | 4. Supprimer | 5. Statistiques | 0. Quitter"


def demander_numero():
    saisie = input("Numéro de la tâche : ")
    if not saisie.isdigit():
        raise ValueError("numéro invalide")
    return int(saisie)


def main():
    gestionnaire = stockage.charger(FICHIER)
    print(MENU)
    while True:
        choix = input("Votre choix : ").strip()
        try:
            if choix == "1":
                tache = gestionnaire.ajouter(input("Titre : "))
                print("Ajoutée :", tache)
            elif choix == "2":
                if not gestionnaire.taches:
                    print("Aucune tâche.")
                for tache in gestionnaire.taches:
                    print(tache)
            elif choix == "3":
                gestionnaire.terminer(demander_numero())
                print("Bravo, tâche terminée !")
            elif choix == "4":
                gestionnaire.supprimer(demander_numero())
                print("Tâche supprimée.")
            elif choix == "5":
                total, faites, pourcentage = gestionnaire.statistiques()
                print(f"{faites}/{total} tâches terminées ({pourcentage} %)")
            elif choix == "0":
                print("À bientôt !")
                break
            else:
                print("Choix inconnu, tapez un chiffre de 0 à 5.")
        except ValueError as erreur:
            print("Erreur :", erreur)
        stockage.sauvegarder(FICHIER, gestionnaire)


if __name__ == "__main__":
    main()`,
          deps: { 'modele.py': modelePy, 'stockage.py': stockageTaches },
          stdin: ['1', 'Réviser les boucles', '1', 'Préparer le projet', '3', '1', '3', '9', '2', '5', '0'],
          output: py`1. Ajouter | 2. Lister | 3. Terminer | 4. Supprimer | 5. Statistiques | 0. Quitter
Votre choix : 1
Titre : Réviser les boucles
Ajoutée : [ ]  1. Réviser les boucles
Votre choix : 1
Titre : Préparer le projet
Ajoutée : [ ]  2. Préparer le projet
Votre choix : 3
Numéro de la tâche : 1
Bravo, tâche terminée !
Votre choix : 3
Numéro de la tâche : 9
Erreur : Aucune tâche n°9
Votre choix : 2
[x]  1. Réviser les boucles
[ ]  2. Préparer le projet
Votre choix : 5
1/2 tâches terminées (50 %)
Votre choix : 0
À bientôt !`,
          after: 'Placez les trois fichiers dans le même dossier et lancez `python app.py`. Le fichier `taches.json` est créé automatiquement. Relancez le programme : vos tâches sont toujours là. La saisie du numéro 9 montre l’exigence NF2 en action : l’erreur est expliquée, le programme continue.'
        }]
      },
      {
        title: 'Tester, corriger et documenter', type: 'example',
        text: 'Les tests portent sur le modèle, qui contient toute la logique. Ils s’exécutent sans clavier ni fichier.',
        file: 'test_modele.py',
        code: py`import unittest
from modele import GestionnaireTaches


class TestGestionnaire(unittest.TestCase):
    def setUp(self):
        self.gestion = GestionnaireTaches()
        self.gestion.ajouter("Première")
        self.gestion.ajouter("Deuxième")

    def test_identifiants_uniques_apres_suppression(self):
        self.gestion.supprimer(1)
        nouvelle = self.gestion.ajouter("Troisième")
        self.assertEqual(nouvelle.identifiant, 3)

    def test_statistiques(self):
        self.gestion.terminer(2)
        self.assertEqual(self.gestion.statistiques(), (2, 1, 50))

    def test_titre_vide_refuse(self):
        with self.assertRaises(ValueError):
            self.gestion.ajouter("   ")

    def test_numero_inconnu(self):
        with self.assertRaises(ValueError):
            self.gestion.terminer(99)


if __name__ == "__main__":
    unittest.main()`,
        deps: { 'modele.py': modelePy },
        nocheck: true,
        output: py`....
----------------------------------------------------------------------
Ran 4 tests in 0.001s

OK`,
        after: '`setUp()` s’exécute avant chaque test et prépare un gestionnaire neuf : les tests restent indépendants. Le premier test vérifie un cas subtil, l’unicité des numéros après une suppression. Chaque bogue trouvé pendant le développement doit donner lieu à un nouveau test.',
        blocks: [{
          text: 'Enfin, un README permet à n’importe qui d’installer et d’utiliser votre projet :',
          lang: 'text', file: 'README.md',
          code: py`# Gestionnaire de tâches

Application en ligne de commande pour suivre des tâches, écrite en Python 3.

## Lancer l'application
    python app.py

## Lancer les tests
    python -m unittest

## Fonctionnalités
- ajouter, lister, terminer et supprimer des tâches ;
- statistiques d'avancement ;
- sauvegarde automatique dans taches.json.

## Organisation
- modele.py : classes Tache et GestionnaireTaches
- stockage.py : lecture et écriture JSON
- app.py : menu interactif`
        }]
      },
      {
        title: 'Évaluation finale : grille d’auto-évaluation', type: 'application',
        text: 'Évaluez votre application avec la grille utilisée pour les projets du parcours :',
        items: [
          ['Fonctionnalités (35 %)', 'les exigences F1 à F5 fonctionnent sur des scénarios réels.'],
          ['Robustesse (20 %)', 'aucune saisie ne fait planter le programme ; les données survivent à un redémarrage.'],
          ['Qualité du code (20 %)', 'modules séparés, fonctions courtes, noms explicites, pas de duplication.'],
          ['Tests (15 %)', 'les règles du modèle sont couvertes, y compris les cas limites et les erreurs.'],
          ['Documentation (10 %)', 'README clair, docstrings sur les éléments principaux.']
        ]
      }
    ],
    guided: {
      title: 'Exercice guidé — Ajouter des priorités', type: 'exercise',
      text: 'Le client souhaite pouvoir indiquer une priorité (1 = haute, 2 = normale, 3 = basse) et lister les tâches de la plus urgente à la moins urgente. Faites évoluer le modèle sans casser l’existant.',
      ordered: true,
      items: [
        'Ajoutez un paramètre `priorite=2` au constructeur de `Tache` et validez qu’il vaut 1, 2 ou 3.',
        'Mettez à jour `vers_dict()` et `depuis_dict()` ; utilisez `donnees.get("priorite", 2)` pour relire les anciens fichiers qui n’ont pas ce champ.',
        'Ajoutez une méthode `par_priorite()` au gestionnaire, qui renvoie les tâches triées par priorité puis par numéro.',
        'Écrivez un test pour le tri, relancez tous les tests et vérifiez qu’ils passent.'
      ],
      solution: {
        text: 'Les modifications essentielles, présentées dans une version autonome pour pouvoir les essayer directement :',
        code: py`class Tache:
    def __init__(self, identifiant, titre, terminee=False, priorite=2):
        if priorite not in (1, 2, 3):
            raise ValueError("la priorité doit valoir 1, 2 ou 3")
        self.identifiant = identifiant
        self.titre = titre
        self.terminee = terminee
        self.priorite = priorite

    def vers_dict(self):
        return {"id": self.identifiant, "titre": self.titre,
                "terminee": self.terminee, "priorite": self.priorite}

    @classmethod
    def depuis_dict(cls, donnees):
        return cls(donnees["id"], donnees["titre"], donnees["terminee"],
                   donnees.get("priorite", 2))   # compatible avec les anciens fichiers


def par_priorite(taches):
    return sorted(taches, key=lambda t: (t.priorite, t.identifiant))


taches = [Tache(1, "Ranger le local", priorite=3),
          Tache(2, "Payer la salle", priorite=1),
          Tache.depuis_dict({"id": 3, "titre": "Envoyer le compte rendu", "terminee": False})]
for t in par_priorite(taches):
    print(t.priorite, t.titre)`,
        output: py`1 Payer la salle
2 Envoyer le compte rendu
3 Ranger le local`,
        after: 'Trier avec une clé tuple `(priorité, identifiant)` classe d’abord par priorité, puis départage par numéro. La valeur par défaut dans `depuis_dict()` assure la compatibilité ascendante : les fichiers créés avant cette évolution restent lisibles. C’est une préoccupation essentielle dans les projets réels.'
      }
    },
    autonomous: {
      title: 'Exercices autonomes', type: 'practice',
      text: 'Ces améliorations sont à réaliser sur votre propre copie de l’application. Elles constituent un bon entraînement avant les projets finaux.',
      ordered: true,
      items: [
        'Ajoutez une date d’échéance avec le module `datetime` et une option qui liste les tâches en retard.',
        'Ajoutez une recherche par mot-clé, insensible aux majuscules.',
        'Ajoutez l’export des tâches au format CSV.',
        'Ajoutez au moins trois tests couvrant vos nouvelles fonctionnalités.'
      ],
      solution: {
        text: 'Pistes de correction pour la recherche et l’échéance. La comparaison de dates fonctionne directement avec les opérateurs habituels :',
        code: py`from datetime import date


def rechercher(taches, mot_cle):
    mot_cle = mot_cle.lower()
    return [t for t in taches if mot_cle in t["titre"].lower()]


def en_retard(taches, aujourd_hui):
    return [t for t in taches if not t["terminee"] and t["echeance"] < aujourd_hui]


taches = [
    {"titre": "Réviser les BOUCLES", "terminee": False, "echeance": date(2026, 3, 1)},
    {"titre": "Rendre le projet", "terminee": False, "echeance": date(2026, 6, 15)},
    {"titre": "Lire le cours sur les boucles", "terminee": True, "echeance": date(2026, 2, 1)},
]
print([t["titre"] for t in rechercher(taches, "boucles")])
print([t["titre"] for t in en_retard(taches, date(2026, 4, 1))])`,
        output: py`['Réviser les BOUCLES', 'Lire le cours sur les boucles']
['Réviser les BOUCLES']`,
        after: 'Pour enregistrer une date en JSON, convertissez-la en texte avec `echeance.isoformat()` (« 2026-03-01 ») et relisez-la avec `date.fromisoformat(texte)`. Pour l’export CSV, reprenez `csv.DictWriter` de la leçon 8.'
      }
    },
    code: py`# demo.py — scénario de démonstration du modèle (modele.py dans le même dossier)
from modele import GestionnaireTaches

gestion = GestionnaireTaches()
for titre in ["Analyser le cahier des charges", "Écrire les tests", "Coder le menu"]:
    gestion.ajouter(titre)
gestion.terminer(1)
gestion.terminer(2)
gestion.supprimer(3)
gestion.ajouter("Rédiger le README")

for tache in gestion.taches:
    print(tache)
total, faites, pourcentage = gestion.statistiques()
print(f"Avancement : {faites}/{total} ({pourcentage} %)")
try:
    gestion.terminer(42)
except ValueError as erreur:
    print("Erreur :", erreur)`,
    codeDeps: { 'modele.py': modelePy },
    output: py`[x]  1. Analyser le cahier des charges
[x]  2. Écrire les tests
[ ]  3. Rédiger le README
Avancement : 2/3 (67 %)
Erreur : Aucune tâche n°42`,
    explain: [
      ['from modele import GestionnaireTaches', 'Le scénario n’utilise que le modèle : il peut être exécuté sans interface ni fichier, ce qui en fait aussi un excellent outil de vérification.'],
      ['gestion.supprimer(3)', 'La tâche n°3 est supprimée ; la tâche ajoutée ensuite reçoit le numéro 3, car le plus grand numéro restant est 2.'],
      ['gestion.statistiques()', 'Renvoie un tuple (total, terminées, pourcentage) que l’on déballe en trois variables.'],
      ['except ValueError as erreur:', 'Le modèle signale le numéro inconnu par une exception ; c’est l’appelant qui choisit le message à afficher.']
    ],
    quiz: [
      { q: 'Pourquoi le modèle ne contient-il ni `print()` ni `input()` ?', o: ['Pour aller plus vite', 'Pour pouvoir le tester et le réutiliser avec une autre interface', 'Parce que les classes ne peuvent pas afficher de texte'], a: 1, e: 'Séparer la logique de l’interface permet de tester les règles automatiquement et de remplacer le terminal par une interface Web sans réécrire le modèle.' },
      { q: 'Quelle exigence est non fonctionnelle ?', o: ['Ajouter une tâche', 'Afficher les statistiques', 'Ne jamais planter sur une saisie incorrecte'], a: 2, e: 'La robustesse décrit une qualité du logiciel et non une fonctionnalité visible.' },
      { q: 'Pourquoi calculer le nouvel identifiant avec le maximum existant plus un, plutôt qu’avec le nombre de tâches plus un ?', o: ['C’est plus rapide', 'Pour éviter de réutiliser un numéro après une suppression', 'Pour trier les tâches'], a: 1, e: 'Avec deux tâches n°1 et n°2, supprimer la n°1 puis ajouter une tâche donnerait « nombre + 1 = 2 », un numéro déjà utilisé.' },
      { q: 'À quoi sert `setUp()` dans une classe de tests ?', o: ['À préparer un état neuf avant chaque test', 'À lancer les tests dans l’ordre', 'À installer unittest'], a: 0, e: '`setUp()` est appelée avant chaque méthode de test, ce qui garantit des tests indépendants.' }
    ],
    summary: [
      'Un projet commence par l’analyse du besoin : exigences numérotées, fonctionnelles et non fonctionnelles.',
      'On décompose l’application en couches : modèle, stockage, interface.',
      'Le pseudocode des algorithmes principaux précède le code.',
      'Le modèle lève des exceptions ; l’interface les transforme en messages.',
      'Les tests et le README font partie du livrable, au même titre que le code.'
    ],
    errors: [
      'Commencer à coder sans avoir listé les exigences : des fonctionnalités sont oubliées.',
      'Mélanger affichage et logique dans les mêmes fonctions : le code devient impossible à tester.',
      'Ne tester qu’à la main, en fin de projet : les régressions passent inaperçues.',
      'Modifier le format du fichier de sauvegarde sans prévoir la lecture des anciens fichiers.',
      'Livrer sans README : personne ne sait comment lancer le projet.'
    ],
    resources: [
      ['Module datetime', 'https://docs.python.org/fr/3/library/datetime.html', 'manipuler des dates et des durées.'],
      ['Module argparse', 'https://docs.python.org/fr/3/library/argparse.html', 'créer de vraies commandes avec options.'],
      ['Guide Git (Pro Git, en français)', 'https://git-scm.com/book/fr/v2', 'versionner vos projets.'],
      ['Écrire un bon README', 'https://www.makeareadme.com/', 'modèle et conseils (en anglais).']
    ],
    next: 'Félicitations, vous avez terminé les dix leçons ! Choisissez maintenant un projet pratique ci-dessous pour consolider vos acquis. Pour aller plus loin, le parcours « Python pour le développement Web » vous apprendra à transformer ce type d’application en site Web avec Django.'
  }));

  /* ------------------------------------------------------------ Projets finaux */
  var projects = [
    {
      title: 'Projet 1 — Calculatrice scientifique simplifiée',
      level: 'Débutant',
      presentation: 'Développer une calculatrice en ligne de commande qui réalise les opérations arithmétiques et quelques fonctions scientifiques, tout en résistant aux saisies incorrectes.',
      context: 'Des élèves de terminale révisent leurs examens sur des ordinateurs de salle informatique sans calculatrice scientifique installée. Ils ont besoin d’un outil simple, fiable et qui explique clairement leurs erreurs de saisie.',
      objectives: ['Organiser un programme en fonctions courtes et réutilisables.', 'Utiliser le module `math`.', 'Valider toutes les saisies et gérer les erreurs mathématiques.', 'Concevoir un menu interactif en boucle.'],
      skills: ['Variables et opérateurs (leçon 2)', 'Conditions (leçon 3)', 'Boucles (leçon 4)', 'Fonctions et modules (leçon 6)', 'Exceptions (leçon 8)'],
      prerequisites: ['Leçons 1 à 6 et la partie « exceptions » de la leçon 8.'],
      tools: ['Python 3.10 ou plus récent', 'Thonny ou VS Code', 'Un terminal', 'Module standard `math`'],
      brief: ['Le programme fonctionne entièrement au clavier, dans un terminal.', 'Il ne doit jamais s’arrêter brutalement, quelle que soit la saisie.', 'Les nombres décimaux peuvent être saisis avec un point ou une virgule.', 'Chaque opération est implémentée dans sa propre fonction.', 'Le code est commenté et accompagné d’un README.'],
      features: ['Les quatre opérations, la division entière, le modulo et la puissance.', 'Racine carrée, valeur absolue, factorielle d’un entier positif.', 'Sinus, cosinus et tangente d’un angle en degrés.', 'Logarithme décimal et népérien.', 'Historique des dix derniers calculs, consultable depuis le menu.', 'Messages d’erreur explicites : division par zéro, racine d’un nombre négatif, saisie non numérique.', 'Option « Quitter ».'],
      steps: ['Lister les opérations et, pour chacune, ses cas d’erreur.', 'Écrire la fonction `lire_nombre` qui convertit et valide une saisie.', 'Écrire une fonction par opération, puis les tester une à une dans le mode interactif.', 'Ranger les opérations dans un dictionnaire et écrire la fonction `calculer`.', 'Construire la boucle du menu avec `try` / `except`.', 'Ajouter l’historique avec une liste limitée à dix éléments.', 'Écrire des tests `unittest` pour les fonctions de calcul.', 'Rédiger le README et relire le code.'],
      deliverables: ['`calculatrice.py` : le programme.', '`test_calculatrice.py` : au moins huit tests.', '`README.md` : installation, utilisation, exemples.', 'Une capture d’écran ou un enregistrement d’une session d’utilisation.'],
      success: ['Toutes les fonctionnalités donnent des résultats exacts.', 'Aucune saisie ne provoque de traceback.', 'Chaque fonction a une seule responsabilité et une docstring.', 'Les tests passent.'],
      rubric: [['Fonctionnalités de calcul', 35], ['Validation des entrées et gestion des erreurs', 25], ['Organisation en fonctions et lisibilité', 20], ['Tests automatisés', 10], ['Documentation (README, docstrings)', 10]],
      errors: ['Utiliser `eval()` sur la saisie : c’est dangereux, car l’utilisateur pourrait exécuter n’importe quel code Python.', 'Oublier que `math.sin` attend des radians : convertissez avec `math.radians()`.', 'Comparer des décimaux avec `==` : préférez `round()` ou `math.isclose()`.', 'Écrire tout le programme dans la boucle du menu.'],
      extensions: ['Évaluer des expressions complètes comme « 2 + 3 * 4 » avec un algorithme d’analyse (pile, notation polonaise inverse).', 'Sauvegarder l’historique dans un fichier.', 'Ajouter des conversions d’unités.', 'Créer une interface graphique avec `tkinter`.'],
      reference: {
        text: 'Solution de référence partielle : le cœur du calcul, sans le menu interactif ni l’historique, que vous devez écrire vous-même.',
        code: py`import math


def lire_nombre(texte):
    """Convertit un texte en nombre ; accepte la virgule comme séparateur décimal."""
    try:
        return float(texte.replace(",", "."))
    except ValueError:
        raise ValueError(f"« {texte} » n'est pas un nombre")


def racine(x):
    if x < 0:
        raise ValueError("racine d'un nombre négatif impossible")
    return math.sqrt(x)


def logarithme(x):
    if x <= 0:
        raise ValueError("logarithme défini seulement pour x > 0")
    return math.log10(x)


def sinus_degres(angle):
    return round(math.sin(math.radians(angle)), 10)


OPERATIONS = {"racine": racine, "log": logarithme, "sin": sinus_degres}


def calculer(nom, valeur):
    if nom not in OPERATIONS:
        raise ValueError(f"opération inconnue : {nom}")
    return OPERATIONS[nom](lire_nombre(valeur))


for nom, valeur in [("racine", "144"), ("log", "1000"), ("sin", "30"), ("racine", "-4"), ("log", "abc")]:
    try:
        print(f"{nom}({valeur}) = {calculer(nom, valeur)}")
    except ValueError as erreur:
        print(f"{nom}({valeur}) : erreur, {erreur}")`,
        output: py`racine(144) = 12.0
log(1000) = 3.0
sin(30) = 0.5
racine(-4) : erreur, racine d'un nombre négatif impossible
log(abc) : erreur, « abc » n'est pas un nombre`,
        after: 'L’arrondi à 10 décimales du sinus évite d’afficher 0.49999999999999994 pour sin(30°). Étape suivante : une boucle `while True` qui affiche le menu, lit le choix et appelle `calculer` dans un bloc `try`.'
      }
    },
    {
      title: 'Projet 2 — Gestionnaire de notes d’étudiants',
      level: 'Débutant à intermédiaire',
      presentation: 'Créer un programme qui enregistre les notes d’une classe, calcule les moyennes, produit un classement et des statistiques, et permet de rechercher un étudiant.',
      context: 'Un enseignant gère les notes de ses classes dans des cahiers et passe des heures à calculer les moyennes et les rangs à chaque fin de trimestre. Il souhaite automatiser ces calculs et éviter les erreurs.',
      objectives: ['Choisir des structures de données adaptées (dictionnaires imbriqués).', 'Implémenter des calculs statistiques.', 'Trier des données selon un critère.', 'Rechercher des informations de façon tolérante.'],
      skills: ['Collections (leçon 5)', 'Fonctions (leçon 6)', 'Tri et recherche (leçon 7)', 'Fichiers CSV ou JSON (leçon 8)'],
      prerequisites: ['Leçons 1 à 7 ; la leçon 8 pour la sauvegarde.'],
      tools: ['Python 3.10+', 'Éditeur de code', 'Un tableur pour ouvrir l’export CSV (facultatif)'],
      brief: ['Chaque étudiant a un nom et des notes par matière.', 'Les notes sont comprises entre 0 et 20 ; toute autre valeur est refusée.', 'Les calculs sont réalisés par des fonctions indépendantes de l’affichage.', 'Les données sont sauvegardées entre deux lancements.'],
      features: ['Ajouter un étudiant et saisir ses notes.', 'Calculer la moyenne de chaque étudiant et la moyenne générale de la classe.', 'Afficher le classement par moyenne décroissante, avec le rang.', 'Afficher les statistiques : note minimale, maximale, taux de réussite (moyenne ≥ 10).', 'Attribuer une mention selon la moyenne.', 'Rechercher un étudiant par une partie de son nom, sans tenir compte des majuscules.', 'Exporter les résultats en CSV.'],
      steps: ['Modéliser les données : un dictionnaire dont les clés sont les noms et les valeurs des dictionnaires matière → note.', 'Écrire les fonctions de calcul et les tester sur un jeu de données fixe.', 'Écrire le classement avec `sorted()` et une clé.', 'Ajouter la recherche et les mentions.', 'Ajouter la saisie validée et le menu.', 'Ajouter la sauvegarde JSON et l’export CSV.', 'Écrire les tests et le README.'],
      deliverables: ['`notes.py` (ou plusieurs modules)', '`test_notes.py`', '`README.md`', 'Un exemple de fichier exporté `resultats.csv`'],
      success: ['Les moyennes et les rangs sont exacts, y compris en cas d’égalité.', 'Une note invalide est refusée avec un message clair.', 'La recherche trouve « Fall » en tapant « fa ».', 'Les données sont retrouvées après redémarrage.'],
      rubric: [['Exactitude des calculs et du classement', 30], ['Structures de données et organisation du code', 20], ['Validation des saisies', 15], ['Recherche et statistiques', 15], ['Persistance et export', 10], ['Tests et documentation', 10]],
      errors: ['Diviser par le nombre de notes sans vérifier qu’il n’est pas nul.', 'Stocker les notes sous forme de texte, puis oublier de les convertir.', 'Recalculer les moyennes à de nombreux endroits au lieu d’une fonction unique.', 'Arrondir les moyennes avant de classer : des égalités artificielles apparaissent.'],
      extensions: ['Gérer des coefficients par matière.', 'Gérer plusieurs classes et plusieurs trimestres.', 'Produire un bulletin individuel dans un fichier texte.', 'Tracer un histogramme des moyennes avec `matplotlib`.'],
      reference: {
        text: 'Solution de référence partielle : calculs, classement et recherche sur un jeu de données fixe. La saisie, la sauvegarde et l’export restent à réaliser.',
        code: py`classe = {
    "Awa Ndiaye": {"Maths": 15, "Python": 17, "Anglais": 13},
    "Moussa Fall": {"Maths": 9, "Python": 12, "Anglais": 8},
    "Fatou Sarr": {"Maths": 12, "Python": 14, "Anglais": 16},
    "Ibrahima Ba": {"Maths": 7, "Python": 10, "Anglais": 9},
}


def moyenne(notes):
    return sum(notes) / len(notes) if notes else 0


def moyennes_generales(classe):
    return {nom: moyenne(list(notes.values())) for nom, notes in classe.items()}


def classement(classe):
    return sorted(moyennes_generales(classe).items(), key=lambda paire: paire[1], reverse=True)


def rechercher(classe, texte):
    texte = texte.lower()
    return [nom for nom in classe if texte in nom.lower()]


for rang, (nom, moy) in enumerate(classement(classe), start=1):
    print(f"{rang}. {nom:<12} {moy:5.2f}")

valeurs = list(moyennes_generales(classe).values())
admis = len([m for m in valeurs if m >= 10])
print(f"Moyenne de la classe : {moyenne(valeurs):.2f} | Réussite : {admis / len(valeurs):.0%}")
print("Recherche « fa » :", rechercher(classe, "fa"))`,
        output: py`1. Awa Ndiaye   15.00
2. Fatou Sarr    14.00
3. Moussa Fall    9.67
4. Ibrahima Ba    8.67
Moyenne de la classe : 11.83 | Réussite : 50%
Recherche « fa » : ['Moussa Fall', 'Fatou Sarr']`,
        after: '`{nom: ... for nom, notes in classe.items()}` est un dictionnaire en compréhension, sur le modèle des listes en compréhension. Le format `:.0%` multiplie par 100 et ajoute le signe %.'
      }
    },
    {
      title: 'Projet 3 — Gestion de stock en ligne de commande',
      level: 'Intermédiaire',
      presentation: 'Développer une application de gestion de stock pour une petite boutique : catalogue de produits, entrées et sorties de marchandises, recherche, filtres et alertes, avec sauvegarde dans un fichier.',
      context: 'Une boutique de fournitures scolaires note ses stocks sur papier. Elle tombe régulièrement en rupture sur les articles les plus vendus et ne connaît pas la valeur de son stock.',
      objectives: ['Mettre en œuvre les opérations CRUD (créer, lire, modifier, supprimer).', 'Assurer la persistance des données en JSON ou CSV.', 'Garantir la cohérence des données (pas de stock négatif, références uniques).', 'Proposer recherche, filtres et indicateurs.'],
      skills: ['Dictionnaires (leçon 5)', 'Fonctions et modules (leçon 6)', 'Recherche et tri (leçon 7)', 'Fichiers et exceptions (leçon 8)', 'Classes, en option (leçon 9)'],
      prerequisites: ['Leçons 1 à 8.'],
      tools: ['Python 3.10+', 'Modules `json` et `csv`', 'Éditeur de code', 'Git (recommandé)'],
      brief: ['Chaque produit possède une référence unique, un nom, une catégorie, un prix unitaire et une quantité.', 'Toutes les modifications sont sauvegardées automatiquement.', 'Une quantité ne peut jamais devenir négative.', 'Le code est réparti en au moins deux modules (logique et stockage).'],
      features: ['Ajouter, modifier et supprimer un produit.', 'Enregistrer une entrée (livraison) ou une sortie (vente) de stock.', 'Lister les produits triés par nom, prix ou quantité.', 'Rechercher par mot-clé dans le nom.', 'Filtrer par catégorie et afficher les produits sous un seuil d’alerte.', 'Afficher la valeur totale du stock.', 'Exporter l’inventaire en CSV.'],
      steps: ['Définir le format des données et écrire un fichier JSON d’exemple à la main.', 'Écrire `charger()` et `sauvegarder()` en gérant le fichier absent.', 'Écrire les fonctions CRUD avec leurs vérifications et leurs exceptions.', 'Écrire la recherche, les filtres et les indicateurs.', 'Construire le menu interactif.', 'Ajouter l’export CSV.', 'Tester, documenter, présenter.'],
      deliverables: ['Code source en modules (`stock.py`, `stockage.py`, `app.py`)', 'Un fichier `stock.json` d’exemple', 'Tests unitaires de la logique', '`README.md`'],
      success: ['Les opérations CRUD fonctionnent et sont persistées.', 'Les règles de cohérence sont respectées dans tous les cas.', 'La recherche et les filtres renvoient des résultats exacts.', 'Le fichier de données reste lisible et valide.'],
      rubric: [['Opérations CRUD et entrées / sorties', 30], ['Persistance des données', 20], ['Cohérence et gestion des erreurs', 20], ['Recherche, filtres et indicateurs', 15], ['Organisation du code, tests et documentation', 15]],
      errors: ['Sauvegarder uniquement en quittant : un arrêt brutal fait perdre les modifications.', 'Utiliser le nom du produit comme identifiant : deux produits peuvent porter le même nom.', 'Ne pas gérer un fichier JSON vide ou corrompu.', 'Mélanger saisie, calcul et affichage dans les mêmes fonctions.'],
      extensions: ['Historique daté des mouvements de stock.', 'Gestion des fournisseurs et des commandes de réapprovisionnement.', 'Base de données SQLite avec le module `sqlite3`.', 'Version Web avec Django (parcours « Python pour le développement Web », projet 4).'],
      reference: {
        text: 'Solution de référence partielle : stockage, ajout, mouvements et filtres. Le menu, la suppression, le tri et l’export sont à compléter.',
        code: py`import json

FICHIER = "stock.json"


def charger():
    try:
        with open(FICHIER, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}


def sauvegarder(stock):
    with open(FICHIER, "w", encoding="utf-8") as f:
        json.dump(stock, f, ensure_ascii=False, indent=2)


def ajouter(stock, reference, nom, prix, quantite, categorie):
    if reference in stock:
        raise ValueError(f"la référence {reference} existe déjà")
    if prix < 0 or quantite < 0:
        raise ValueError("prix et quantité doivent être positifs")
    stock[reference] = {"nom": nom, "prix": prix, "quantite": quantite, "categorie": categorie}


def modifier_quantite(stock, reference, variation):
    produit = stock[reference]
    if produit["quantite"] + variation < 0:
        raise ValueError(f"stock insuffisant pour {produit['nom']}")
    produit["quantite"] += variation


def filtrer(stock, categorie=None, seuil_max=None):
    resultat = {}
    for ref, p in stock.items():
        if categorie and p["categorie"] != categorie:
            continue
        if seuil_max is not None and p["quantite"] > seuil_max:
            continue
        resultat[ref] = p
    return resultat


stock = charger()
ajouter(stock, "P01", "Cahier 200 pages", 750, 40, "papeterie")
ajouter(stock, "P02", "Clé USB 32 Go", 4500, 6, "informatique")
ajouter(stock, "P03", "Stylo bleu", 150, 3, "papeterie")
modifier_quantite(stock, "P02", -4)
try:
    modifier_quantite(stock, "P03", -10)
except ValueError as erreur:
    print("Erreur :", erreur)
sauvegarder(stock)

for ref, p in filtrer(charger(), seuil_max=5).items():
    print(f"Alerte stock bas : {ref} {p['nom']} ({p['quantite']})")`,
        output: py`Erreur : stock insuffisant pour Stylo bleu
Alerte stock bas : P02 Clé USB 32 Go (2)
Alerte stock bas : P03 Stylo bleu (3)`,
        after: 'La sortie de 10 stylos est refusée avant toute modification : la donnée reste cohérente. Le filtrage relit le fichier pour vérifier que la sauvegarde a bien fonctionné.'
      }
    },
    {
      title: 'Projet 4 — Jeu de logique et de devinettes',
      level: 'Débutant à intermédiaire',
      presentation: 'Créer un jeu en ligne de commande dans lequel le joueur doit deviner un nombre secret en un nombre limité d’essais, avec plusieurs niveaux de difficulté et un système de score.',
      context: 'Un club de programmation veut un petit jeu pour faire découvrir la logique algorithmique aux nouveaux membres. Le jeu doit être amusant, juste et rejouable.',
      objectives: ['Concevoir une boucle de jeu et ses conditions de fin.', 'Utiliser le hasard avec le module `random`.', 'Calculer et mémoriser des scores.', 'Découvrir la stratégie optimale (dichotomie) par le jeu.'],
      skills: ['Conditions (leçon 3)', 'Boucles (leçon 4)', 'Fonctions et module random (leçon 6)', 'Recherche dichotomique (leçon 7)', 'Fichiers (leçon 8)'],
      prerequisites: ['Leçons 1 à 6 ; leçons 7 et 8 pour les fonctionnalités avancées.'],
      tools: ['Python 3.10+', 'Module `random`', 'Éditeur de code'],
      brief: ['Le nombre secret est tiré au hasard à chaque partie.', 'Le joueur choisit un niveau : facile (1 à 50, 10 essais), moyen (1 à 100, 7 essais), difficile (1 à 1000, 10 essais).', 'Une saisie invalide affiche un message et compte comme un essai perdu.', 'Le score récompense les victoires rapides.'],
      features: ['Menu : jouer, choisir le niveau, voir les meilleurs scores, quitter.', 'Indices « plus grand » / « plus petit » après chaque essai.', 'Compteur d’essais restants.', 'Calcul du score selon les essais restants et le niveau.', 'Tableau des cinq meilleurs scores, sauvegardé dans un fichier.', 'Mode « ordinateur » : l’ordinateur devine un nombre choisi par le joueur en utilisant la dichotomie.'],
      steps: ['Écrire une partie simple avec un nombre secret fixe.', 'Ajouter le tirage aléatoire et la limite d’essais.', 'Paramétrer les niveaux avec un dictionnaire.', 'Ajouter le calcul du score et le menu.', 'Sauvegarder les meilleurs scores en JSON.', 'Programmer le mode « ordinateur » par dichotomie.', 'Tester les fonctions de score et le mode ordinateur.'],
      deliverables: ['`jeu.py`', '`scores.json` généré par le jeu', 'Tests de `calculer_score` et du mode ordinateur', '`README.md` avec les règles du jeu'],
      success: ['Le jeu ne plante jamais.', 'Les indices et le décompte des essais sont exacts.', 'Le mode ordinateur trouve toujours le nombre en au plus ⌈log₂(n)⌉ essais.', 'Les meilleurs scores persistent entre les parties.'],
      rubric: [['Logique de jeu et conditions de fin', 30], ['Niveaux et score', 20], ['Robustesse des saisies', 15], ['Mode ordinateur (dichotomie)', 15], ['Sauvegarde des scores', 10], ['Lisibilité et documentation', 10]],
      errors: ['Tirer un nouveau nombre secret à chaque essai.', 'Oublier de convertir la saisie en entier avant de comparer.', 'Une boucle `while` sans limite d’essais : le jeu ne se termine jamais en cas d’abandon.', 'Laisser `random.seed()` avec une valeur fixe dans la version finale : le nombre est toujours le même.'],
      extensions: ['Jeu du Mastermind avec des couleurs.', 'Mode deux joueurs.', 'Statistiques : nombre moyen d’essais par niveau.', 'Interface graphique avec `tkinter`.'],
      reference: {
        text: 'Solution de référence partielle : une partie complète. Le paramètre `secret` permet de tester le jeu avec un nombre connu.',
        code: py`import random


def calculer_score(essais_utilises, essais_max):
    return max(0, (essais_max - essais_utilises + 1) * 10)


def jouer_partie(borne_max=100, essais_max=7, secret=None):
    secret = secret if secret is not None else random.randint(1, borne_max)
    for essai in range(1, essais_max + 1):
        saisie = input(f"Essai {essai}/{essais_max} : ")
        if not saisie.isdigit():
            print("Entrez un nombre entier positif.")
            continue
        proposition = int(saisie)
        if proposition < secret:
            print("Plus grand !")
        elif proposition > secret:
            print("Plus petit !")
        else:
            score = calculer_score(essai, essais_max)
            print(f"Gagné en {essai} essai(s) ! Score : {score} points")
            return score
    print(f"Perdu ! Le nombre était {secret}.")
    return 0


jouer_partie(secret=37)`,
        stdin: ['50', 'abc', '25', '37'],
        output: py`Essai 1/7 : 50
Plus petit !
Essai 2/7 : abc
Entrez un nombre entier positif.
Essai 3/7 : 25
Plus grand !
Essai 4/7 : 37
Gagné en 4 essai(s) ! Score : 40 points`,
        after: 'La boucle `for` limite naturellement le nombre d’essais ; `return` termine la partie dès la victoire. Pour le mode ordinateur, réutilisez la logique `gauche` / `droite` de la recherche dichotomique de la leçon 7.'
      }
    },
    {
      title: 'Projet 5 — Application de gestion de bibliothèque',
      level: 'Intermédiaire',
      presentation: 'Concevoir en programmation orientée objet une application qui gère les livres, les adhérents, les emprunts et les retours d’une bibliothèque, avec persistance des données et tests automatisés.',
      context: 'La bibliothèque d’un lycée enregistre ses prêts sur un registre papier. Il est difficile de savoir quels livres sont disponibles, qui a emprunté quoi et quels retours sont en retard.',
      objectives: ['Modéliser un domaine réel avec plusieurs classes qui collaborent.', 'Faire respecter des règles métier par les objets.', 'Sauvegarder et recharger un modèle objet.', 'Couvrir les règles par des tests automatisés.'],
      skills: ['Classes, encapsulation, composition (leçon 9)', 'Tests unitaires (leçon 9)', 'JSON et exceptions (leçon 8)', 'Recherche (leçon 7)', 'Dates avec `datetime`'],
      prerequisites: ['Ensemble du parcours, en particulier les leçons 8 et 9.'],
      tools: ['Python 3.10+', 'Modules `datetime`, `json`, `unittest`', 'Éditeur de code', 'Git'],
      brief: ['Classes minimales : `Livre`, `Adherent`, `Bibliotheque`.', 'Un adhérent emprunte au plus 3 livres ; un prêt dure 14 jours.', 'Un livre emprunté ne peut pas être emprunté à nouveau avant son retour.', 'Toutes les données sont sauvegardées en JSON.', 'Les règles métier sont couvertes par au moins dix tests.'],
      features: ['Ajouter des livres (ISBN, titre, auteur) et inscrire des adhérents.', 'Emprunter et rendre un livre.', 'Rechercher un livre par titre ou par auteur.', 'Lister les livres disponibles et les livres empruntés avec leur date de retour.', 'Lister les prêts en retard à une date donnée.', 'Afficher l’historique des emprunts d’un adhérent.', 'Sauvegarde et chargement automatiques.'],
      steps: ['Dessiner les classes, leurs attributs et leurs méthodes sur papier.', 'Programmer `Livre` et `Adherent`, puis `Bibliotheque` et ses règles.', 'Écrire les tests des règles (limite d’emprunts, livre déjà emprunté, retards).', 'Ajouter la recherche et les listes.', 'Ajouter la conversion en dictionnaires et la sauvegarde JSON.', 'Construire l’interface en ligne de commande.', 'Documenter et présenter le projet.'],
      deliverables: ['Modules `modele.py`, `stockage.py`, `app.py`', '`test_bibliotheque.py` (au moins 10 tests)', 'Diagramme des classes (image ou texte)', '`README.md`'],
      success: ['Les règles d’emprunt sont toujours respectées.', 'Les retards sont correctement calculés.', 'Les données sont restaurées à l’identique après redémarrage.', 'Tous les tests passent.'],
      rubric: [['Modélisation objet et encapsulation', 25], ['Règles métier (emprunts, retours, retards)', 25], ['Tests automatisés', 20], ['Persistance des données', 15], ['Recherche, interface et documentation', 15]],
      errors: ['Dupliquer les informations (le livre connaît son emprunteur et l’adhérent sa liste) sans les mettre à jour ensemble.', 'Sauvegarder des objets directement en JSON : il faut d’abord les convertir en dictionnaires.', 'Utiliser `date.today()` dans les règles : les tests dépendent alors du jour d’exécution. Passez la date en paramètre.', 'Tester uniquement les cas qui fonctionnent.'],
      extensions: ['Réservations de livres déjà empruntés.', 'Pénalités de retard.', 'Base de données SQLite.', 'Version Web avec Django.'],
      reference: {
        text: 'Solution de référence partielle : le modèle et ses règles métier. La persistance, l’interface et les tests sont à réaliser.',
        code: py`from datetime import date, timedelta


class Livre:
    def __init__(self, isbn, titre, auteur):
        self.isbn = isbn
        self.titre = titre
        self.auteur = auteur
        self.emprunteur = None
        self.date_retour = None

    @property
    def disponible(self):
        return self.emprunteur is None

    def __str__(self):
        etat = "disponible" if self.disponible else f"emprunté par {self.emprunteur.nom}"
        return f"{self.titre} ({self.auteur}) — {etat}"


class Adherent:
    LIMITE = 3

    def __init__(self, numero, nom):
        self.numero = numero
        self.nom = nom
        self.livres = []


class Bibliotheque:
    DUREE_PRET = timedelta(days=14)

    def __init__(self):
        self.livres = {}
        self.adherents = {}

    def ajouter_livre(self, livre):
        self.livres[livre.isbn] = livre

    def inscrire(self, adherent):
        self.adherents[adherent.numero] = adherent

    def emprunter(self, isbn, numero, jour):
        livre, adherent = self.livres[isbn], self.adherents[numero]
        if not livre.disponible:
            raise ValueError(f"« {livre.titre} » est déjà emprunté")
        if len(adherent.livres) >= Adherent.LIMITE:
            raise ValueError(f"{adherent.nom} a atteint la limite de {Adherent.LIMITE} livres")
        livre.emprunteur, livre.date_retour = adherent, jour + self.DUREE_PRET
        adherent.livres.append(livre)

    def rendre(self, isbn):
        livre = self.livres[isbn]
        livre.emprunteur.livres.remove(livre)
        livre.emprunteur, livre.date_retour = None, None

    def rechercher(self, texte):
        texte = texte.lower()
        return [livre for livre in self.livres.values()
                if texte in livre.titre.lower() or texte in livre.auteur.lower()]

    def retards(self, jour):
        return [livre for livre in self.livres.values() if livre.date_retour and livre.date_retour < jour]


biblio = Bibliotheque()
biblio.ajouter_livre(Livre("978-1", "L'Aventure ambiguë", "Cheikh Hamidou Kane"))
biblio.ajouter_livre(Livre("978-2", "Une si longue lettre", "Mariama Bâ"))
biblio.ajouter_livre(Livre("978-3", "Les Bouts de bois de Dieu", "Ousmane Sembène"))
biblio.inscrire(Adherent(1, "Awa"))
biblio.inscrire(Adherent(2, "Moussa"))

biblio.emprunter("978-1", 1, date(2026, 3, 2))
biblio.emprunter("978-2", 2, date(2026, 3, 10))
try:
    biblio.emprunter("978-1", 2, date(2026, 3, 11))
except ValueError as erreur:
    print("Refusé :", erreur)
biblio.rendre("978-2")

for livre in biblio.rechercher("Lettre") + biblio.rechercher("kane"):
    print(livre)
print("En retard au 20 mars :", [livre.titre for livre in biblio.retards(date(2026, 3, 20))])`,
        output: py`Refusé : « L'Aventure ambiguë » est déjà emprunté
Une si longue lettre (Mariama Bâ) — disponible
L'Aventure ambiguë (Cheikh Hamidou Kane) — emprunté par Awa
En retard au 20 mars : ["L'Aventure ambiguë"]`,
        after: 'La date du jour est toujours passée en paramètre : les règles de retard deviennent ainsi faciles à tester. Pour la sauvegarde, ajoutez à chaque classe une méthode `vers_dict()` et enregistrez l’ISBN des livres empruntés plutôt que les objets eux-mêmes.'
      }
    }
  ];

  C.python = {
    name: 'Algorithmique et programmation avec Python',
    short: 'Python',
    tag: 'raisonner comme un programmeur et coder en Python',
    desc: 'Apprenez à raisonner comme un programmeur, à concevoir des algorithmes et à développer des programmes Python efficaces. Ce parcours vous accompagne des bases de la logique algorithmique jusqu’à la réalisation d’applications pratiques.',
    badge: 'Idéal pour débuter',
    badgeStrong: true,
    level: 'Débutant à intermédiaire',
    prereq: 'aucune connaissance en programmation.',
    intro: [
      'Programmer, c’est d’abord apprendre à décomposer un problème en étapes simples et précises. Ce parcours commence donc par l’algorithmique, avant de traduire chaque idée en Python, un langage lisible et utilisé aussi bien pour le Web que pour la science des données ou l’automatisation.',
      'Chaque leçon suit la même progression : objectifs, définitions, explications illustrées par du code testé, exemples commentés, exercice guidé, exercices autonomes avec corrections, quiz, résumé, erreurs fréquentes et ressources.',
      'Python s’exécute sur votre ordinateur : installez-le dès la leçon 1, puis copiez chaque exemple (bouton « Copier ») dans votre éditeur pour l’exécuter et le modifier. Le résultat attendu est indiqué sous chaque programme.'
    ],
    goal: 'Objectif : concevoir des algorithmes et développer des programmes Python structurés, robustes et testés, jusqu’à une application complète.',
    facts: [['Niveau', 'Débutant à intermédiaire'], ['Prérequis', 'Aucun en programmation'], ['Durée estimée', 'environ 27 h, hors projets'], ['Outils', 'Python 3.10+ et Thonny ou VS Code']],
    runLabel: 'PROGRAMME DE SYNTHÈSE À EXÉCUTER SUR VOTRE ORDINATEUR',
    L: L,
    projects: projects
  };
})();

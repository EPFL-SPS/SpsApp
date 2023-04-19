# SPS App

> Découvrir le site sur  [go.epfl.ch/spsapp](https://go.epfl.ch/spsapp)

Site internet qui présente les activités du Service de promotion des sciences (SPS) de l'EPFL.

Le site est accessible en deux langues (français/allemand) et présente les activités scolaires, extra-scolaires et grand public du SPS.

![Screenshot](doc/results_screenshot.png)

## Utilisation
Au démarrage, l'utilisateur est invité à répondre à des questions.

En fonction de s'il s'agit d'un parent ou d'un.e enseignant.e les informations demandées varient. 

![Formulaire](doc/form.png)

Une fois sur la page finale, l'utilisateur découvre les activités qui correspondent à ses réponses. On lui présente également des activités grand public.

Pour éviter de repasser sut toutes les questions, le bouton `Filtres` (en bas à droite) permet de modifier les critères de recherche directement depuis la page des résultats.

![Filters](doc/filtersMenu.png)

Un bouton `Retour` (en bas à gauche) permet de revenir en arrière.

A noter que sur la première page, l'utilisateur peut changer de langue (en haut à droite).

## Configuration des IPads pour un événement
Deux IPads sont dédiés et préconfigurés pour l’utilisation de l’app pendant les événements : **IPAD14** et **IPAD15**

Activer l’accès guidé pour empêcher l’utilisateur de quitter l’application:
-	Déverrouiller l’IPad
-	Lancer l’application « Firefox Klar » (et non pas Safari), un icone existe sur la page d’accueil
-	Ouvrir « EPFL SPS App » qui apparaît dans les raccourcis ou aller sur https://go.epfl.ch/spsapp
-	Une fois sur le site, appuyez trois fois sur le bouton principal de l’IPad. Une notification « Accès guidé activé » apparaît.
-	La barre au sommet du navigateur est légèrement grisé et l’utilisateur ne peut plus cliquer dessus, l’IPad peut être utilisé pour les démos

Pour sortir du mode « Accès guidé »,  
-	Rappuyer trois fois sur le bouton principal de l’IPad et saisir le code qui a été choisi dans les paramètres du mode. Une interface s’ouvre, cliquer sur « Fin » au sommet à gauche. 
-	C’est également dans ce menu qu’il est possible de redéfinir la zone tactile qui doit être bloquée ou de modifier les options pour mettre le verrouillage de l’IPad par exemple

Si pour une raison, la manipulation ne fonctionne pas, vérifier dans les paramètres la configuration de l’accès Guidé :
```
Paramètres > Accessibilité > Accès Guidé : Activer, régler le code et définir la limite de verrouillage de l’écran sur « Jamais »
```

## Modifier la liste des activités
> Google Sheets - Liste des activités (accessible par toutes les personnes de l'organisation SPS) [go.epfl.ch/spsapp_sheets](https://go.epfl.ch/spsapp_sheets)

Les activités sont répertoriées sur un Google Sheet.

Pour les activités extra-scolaires, la logique est la suivante :
- Les activités extra-scolaires sont répertoriées dans une feuille `Extra-scolaire - Activités`. Chacune d'entre elle a un nom, une description, une image d'illustration et un format. Les activités sont identifiées par un public cible (âge minimum et maximum, genre et langue) qui servira pour les filtres.
- **Pour qu'une activité extra-scolaire apparaisse dans les résultats de recherche, il doit exister une édition qui corresponde.** Pour ce faire, la feuille `Extra-scolaire - Éditions` liste les éditions de chaque activité dans les différents cantons. En plus des informations propres à son activité mère, une édition contient une information sur la période à laquelle elle a lieu. A noter que seules les éditions indiquées comme `Disponible` seront affichées.
- La colonne `Remarque`, autant pour les activités que les éditions, permet d'ajouter une information complémentaire qui sera affichée dans une pop-up au clic sur un résultat de recherche.

En plus des activités extra-scolaires, une feuille `Scolaire - Activités` liste les activités scolaires. Son fonctionnement est similaire aux activités extra-scolaires hormis que le public cible est défini par le niveau scolaire et la langue de l'activité. 

De même, une feuille `Grand public - Activités` liste les évènements grand public qui sont quant à eux uniquement filtrés en fonction de la langue de l'utilisateur. 

## Fonctionnement technique

La site internet a été pensé comme un site statique qui ne nécessite pas de serveur. Il peut simplement être lancé en local en ouvrant le fichier [index.html](/index.html) dans un navigateur.

Pour récupérer la liste des activités et leurs images, l'ordinateur/tablette sur lequel le site est lancé doit cependant être connecté à internet.

> A noter que le site est également hébergé en ligne pour faciliter son utilisation, se référer aux chapitres ci-dessous pour plus de détails. 

### Architecture générale

> Les explications détaillées pour chaque bloc sont présentées plus bas

![Architecture](doc/architecture.png)

### SPS App API

Pour faire le lien entre le Google Sheets et le site, une API a été développée. Concrètement, elle permet au site de faire une requête en Javascript pour récupérer les différentes listes d'activités. Cette API a été faite avec [Google Apps Script](https://developers.google.com/apps-script?hl=fr), il s'agit d'un outil intégré à Google Sheets qui permet de développer du code pour parcourir les données d'un classeur. Ce code utilise l'[API de Google Sheets](https://developers.google.com/sheets/api/guides/concepts?hl=fr).

Le code développée pour l'API est dans le dossier [/backend/AppsScript/api.gs](/backend/AppsScript/api.gs). Une fois déployée, Apps Script met à disposition une URL (spécifiée dans [db.js](./js/db.js)) qui permet d'appeler l'API développée. 

### Hébergement du site en ligne
Le code du site est stocké sur le GitHub du SPS.

> Repository SPS App sur GitHub [go.epfl.ch/spsapp_github](https://go.epfl.ch/spsapp_github)

Pour héberger le site, il a été choisi d'utiliser GitHub Pages. Il s'agit d'un service proposé par GitHub qui permet de publier un site web statique à partir d'un repository. Il va simplement prendre la dernière version du code et la publier en ligne.

Le lien court [go.epfl.ch/spsapp](https://go.epfl.ch/spsapp) pointe vers celui mise à disposition par GitHub pages [epfl-sps.github.io/SpsApp](https://epfl-sps.github.io/SpsApp) et permet ainsi d'accéder au site depuis n'importe quel ordinateur connecté à internet.

### Architecture du code

Le site a été développé en HTML/CSS. Le fichier [index.html](/index.html) est le seul fichier HTML, il contient les différentes pages du site. Le framework CSS [Bootstrap](https://getbootstrap.com/) est utilisé pour simplifier la mise en page et un fichier [style.css](/style.css) contient les quelques configurations CSS spécifiques au site.

#### Code Javascript
La librairie [JQuery](https://jquery.com/) est utilisée pour simplifier l'utilisation de Javascript.

Le code Javascript est divisé en plusieurs fichiers. Le script principal est à la racine du site et les autres fichiers sont dans le dossier [/js](/js):
- [script.js](./script.js) Script principal exécuté au chargement du site, gère la logique des pages et l'affichage des résultats
- [db.js](./js/db.js) Contient le code pour récupérer les listes d'activités grâce à l'API
- [display.js](./js/display.js) Contient les fonctions liées à l'affichage des pages du site, des résultats et des différents éléments graphiques (menus des langues/filtres, boutons, ...)
- [events.js](./js/events.js) Contient les codes des évènements liés aux interactions de l'utilisateur pendant qu'il remplit le questionnaire
- [filter.js](./js/filter.js) Contient les fonctions de filtrage des résultats en fonction des réponses de l'utilisateur
- [filtersMenu.js](./js/filtersMenu.js) Contient le code relatif au menu des filtres accessible sur la page des résultats
- [language.js](./js/language.js) Contient le code qui gère la logique de changement de langue sur le site et la traduction des éléments 
- [templates.js](./js/templates.js) Contient les différents templates HTML et les fonctions pour les remplir avec des données
- [utils.js](./js/utils.js) Contient des fonctions utilitaires utilisées globalement

### Développements futurs
- [ ] Dans la version actuelle si des activités sont ajoutées dans un nouveau canton, il faut ajouter manuellement un bouton sur la page 2 et dans le menu des filtres. Il faudrait implémenter une solution qui génère les boutons automatiquement en fonction des cantons où le SPS propose des activités (surtout pour les cantons suisses-allemands).
- [ ] Lorsque les filtres sont désactivés (aucun canton/age/genre sélectionné), il faudrait ajouter une pop-up sur chaque résultats d'activité avec les détails de ses différents éditions.
- [ ] Si sur le Google Sheet des remarques sont ajoutées pour l'activité et pour l'édition, seulement la remarque de l'édition est affichée. Il faudrait afficher les deux remarques dans la pop-up.
- [ ] Ajouter un bouton QR code sur chaque résultat pour permettre aux utilisateurs de scanner le code et d'obtenir les informations de l'activité sur le site du SPS.
- [ ] Ajouter un bouton QR code pour permettre aux utilisateurs de s'abonner à la newsletter.
- [ ] Traduire le site en italien.
- [ ] Il y a un bug lorsqu'un.e enseignant.e revient en arrière dans le questionnaire, cliquer sur le logo EPFL pour recommencer à zéro dans ce cas.

## Contact

* **Jonathan Michel** - [jonathanmichel](https://github.com/jonathanmichel) 
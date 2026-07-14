# 🕵️ Protocole Décristallisation — Escape Game TMS

Escape game d'entreprise sur la prévention des Troubles Musculosquelettiques (TMS).
Thème espionnage / science-fiction : l'équipe doit neutraliser le **Professeur Raideur**
en réalisant 4 postures d'étirement devant un scanner biométrique.

## ⚙️ Fonctionnalités

- **Vérification des postures par IA** (TensorFlow.js MoveNet MultiPose, jusqu'à 6 personnes)
  avec squelettes néon affichés en direct sur la vidéo
- **Détection de mouvement** par analyse d'images (le moindre geste pendant le scan = alarme)
- 4 postures : Le Grand Sphinx, Le Cactus au Soleil, L'Oiseau Impérial, L'Archer Agile
- Hologrammes SVG animés de démonstration + consignes pas-à-pas
- Sons 100 % Web Audio API (bips sonar, buzzer, mélodies) — aucun fichier externe
- Fragments de code révélés à chaque réussite → code final **8 2 7 4**
- **Chrono de mission** configurable (5–60 min) : compte à rebours dans la barre
  de statut (orange < 5 min, rouge clignotant < 1 min, buzzer à 00:00 — le maître
  du jeu décide de la suite), temps final affiché sur l'écran de victoire
- **Filtre des spectateurs** : les silhouettes trop petites (personnes loin de la
  caméra / en arrière-plan) sont ignorées par la vérification IA et affichées en
  gris estompé — seuil réglable dans le panneau maître du jeu
- **Mode hors-ligne** : un service worker met en cache la page, les librairies IA
  et le modèle MoveNet — après une première visite en ligne, le jeu fonctionne
  sans internet
- Mode manuel clavier automatique si la caméra est indisponible

## 🎮 Contrôles Maître du Jeu

| Touche | Action |
|---|---|
| `H` | Afficher/masquer le panneau maître du jeu |
| `ESPACE` | Lancer le protocole (mise en position puis scan) |
| `ENTRÉE` | Forcer la validation de la posture |
| `R` ou `BACKSPACE` | Forcer l'échec (flash rouge + buzzer) |
| `M` | Activer/désactiver la détection de mouvement |
| `P` | Activer/désactiver la vérification IA de posture |

Le panneau `H` contient aussi 5 curseurs : sensibilité du mouvement,
durée de mise en position (3–25 s), durée du maintien (3–15 s),
taille minimale d'un agent (% de l'image — en dessous, la silhouette est
considérée comme un spectateur et ignorée) et chrono de mission (5–60 min).

## 🚀 Déploiement

Deux fichiers : `index.html` et `sw.js` (mode hors-ligne). La caméra exige du
**HTTPS** (ou localhost).

### Option A — GitHub Pages (gratuit, suffisant)
1. Pousser ce dépôt sur GitHub
2. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → Branch : `main` / `(root)` → Save**
3. Après ~1 minute, le jeu est en ligne sur `https://<votre-compte>.github.io/escape-game-tms/`

### Option B — Vercel (import GitHub)
1. Sur https://vercel.com/new → **Import Git Repository** → choisir ce dépôt
2. Framework preset : **Other** — aucun réglage à changer (pas de build)
3. **Deploy** → le jeu est en ligne sur `https://escape-game-tms.vercel.app`

### Test local
```bash
npx serve .
# ou
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## 📋 Checklist jour J

- [ ] Ouvrir le jeu une fois **avec internet** avant le jour J : le service worker
  met tout en cache (IA comprise) et le jeu marchera ensuite même sans connexion
- [ ] Régler le chrono de mission (`H`) selon la durée prévue de l'animation
- [ ] Autoriser la caméra au clic sur « Activer le scanner »
- [ ] Plein écran (`F11`), volume audible
- [ ] Tester la sensibilité (`H`) avec l'éclairage réel de la salle
- [ ] Joueurs à 2–4 m de la caméra, bien éclairés de face
- [ ] Clavier (sans fil) à portée du maître du jeu pour les overrides

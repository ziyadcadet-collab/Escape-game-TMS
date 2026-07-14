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

Le panneau `H` contient aussi 3 curseurs : sensibilité du mouvement,
durée de mise en position (3–25 s) et durée du maintien (3–15 s).

## 🚀 Déploiement

Un seul fichier : `index.html`. La caméra exige du **HTTPS** (ou localhost).

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

- [ ] Connexion internet sur le PC (chargement de l'IA au premier lancement)
- [ ] Autoriser la caméra au clic sur « Activer le scanner »
- [ ] Plein écran (`F11`), volume audible
- [ ] Tester la sensibilité (`H`) avec l'éclairage réel de la salle
- [ ] Joueurs à 2–4 m de la caméra, bien éclairés de face
- [ ] Clavier (sans fil) à portée du maître du jeu pour les overrides

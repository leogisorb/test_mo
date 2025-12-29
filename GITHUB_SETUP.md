# GitHub Repository Setup

Repository: https://github.com/leogisorb/test_mo.git

## Code zu GitHub pushen

Führe folgende Befehle aus:

```bash
# 1. Alle Dateien hinzufügen
git add .

# 2. Commit erstellen
git commit -m "Initial commit - Tauchwelt Hurghada Website"

# 3. Branch auf 'main' umbenennen (falls nötig)
git branch -M main

# 4. Zu GitHub pushen
git push -u origin main
```

## GitHub Pages aktivieren

1. Gehe zu: https://github.com/leogisorb/test_mo/settings/pages
2. Unter "Source" wähle: **"GitHub Actions"**
3. Das automatische Deployment startet sofort

## Nach dem ersten Push

- Das GitHub Actions Workflow (`.github/workflows/deploy.yml`) wird automatisch ausgeführt
- Die Website wird gebaut und deployed
- Verfügbar unter: `https://leogisorb.github.io/test_mo/`

## Wichtige Dateien

- ✅ `next.config.js` - Statischer Export aktiviert
- ✅ `.github/workflows/deploy.yml` - Automatisches Deployment
- ✅ `out/` - Build-Verzeichnis (wird automatisch erstellt, ist in .gitignore)

## Lokaler Build

Falls du lokal testen möchtest:

```bash
npm run build
npx serve out
```


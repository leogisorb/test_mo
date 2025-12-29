# Deployment zu GitHub Pages

## Build erfolgreich erstellt ✅

Der statische Build wurde im `out/` Verzeichnis erstellt (22MB).

## GitHub Pages Setup

### Option 1: Automatisches Deployment mit GitHub Actions (Empfohlen)

1. **GitHub Repository erstellen** (falls noch nicht vorhanden)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/DEIN-USERNAME/DEIN-REPO.git
   git push -u origin main
   ```

2. **GitHub Pages aktivieren:**
   - Gehe zu: Repository → Settings → Pages
   - Source: Wähle "GitHub Actions"
   - Das Workflow wird automatisch bei jedem Push ausgeführt

3. **Deployment:**
   - Bei jedem Push auf `main` oder `master` wird automatisch gebaut und deployed
   - Die Website ist verfügbar unter: `https://DEIN-USERNAME.github.io/DEIN-REPO/`

### Option 2: Manuelles Deployment

1. **Build lokal erstellen:**
   ```bash
   npm run build
   ```

2. **`out/` Verzeichnis zu GitHub pushen:**
   - Erstelle einen `gh-pages` Branch
   - Kopiere den Inhalt von `out/` in den Root des Branches
   - Push zu GitHub

### Wichtige Hinweise

- ✅ `output: 'export'` ist in `next.config.js` aktiviert
- ✅ `images.unoptimized: true` für statische Exports
- ✅ `trailingSlash: true` für GitHub Pages Kompatibilität
- ✅ GitHub Actions Workflow ist unter `.github/workflows/deploy.yml` erstellt
- ✅ `out/` ist in `.gitignore` (wird automatisch gebaut)

### Lokal testen

Um den statischen Build lokal zu testen:

```bash
# Einfacher HTTP-Server
npx serve out

# Oder mit Python
python3 -m http.server 8000 --directory out
```

Dann öffne: http://localhost:8000


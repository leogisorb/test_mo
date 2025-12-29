# Server starten - Anleitung

## Problem beheben

Falls der Server nicht startet, führen Sie diese Schritte aus:

### 1. Dependencies prüfen
```bash
cd /Users/leopoldbrosig/Downloads/mosalah
npm install
```

### 2. Server starten
```bash
npm run dev
```

### 3. Browser öffnen
Öffnen Sie: **http://localhost:3000**

## Mögliche Fehler und Lösungen

### Fehler: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Fehler: "Port 3000 already in use"
```bash
# Anderen Prozess beenden
lsof -ti:3000 | xargs kill -9
# Oder anderen Port verwenden
npm run dev -- -p 3001
```

### Fehler: TypeScript Fehler
```bash
# Type-Check ausführen
npm run type-check
```

## Alternative: HTML-Version verwenden

Falls Next.js Probleme macht, können Sie die einfache HTML-Version verwenden:

```bash
# Einfacher HTTP-Server
python3 -m http.server 8000
# Dann öffnen: http://localhost:8000/index.html
```


# Node.js Version Problem - Lösung

## Problem
Sie verwenden Node.js 16.20.2, aber Next.js 14 benötigt Node.js >= 18.17.0.

## Lösung 1: Next.js auf Version 13 downgraden (Schnellste Lösung) ✅

Ich habe bereits `package.json` angepasst. Führen Sie aus:

```bash
npm install
npm run dev
```

## Lösung 2: Node.js aktualisieren (Empfohlen für langfristige Nutzung)

### Mit Homebrew (macOS):
```bash
# Homebrew installieren (falls nicht vorhanden)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js aktualisieren
brew install node@18
# oder für die neueste Version:
brew install node
```

### Mit nvm (Node Version Manager - Empfohlen):
```bash
# nvm installieren
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Terminal neu starten oder:
source ~/.zshrc

# Node.js 18 installieren
nvm install 18
nvm use 18

# Prüfen
node --version  # sollte 18.x.x zeigen
```

### Node.js direkt herunterladen:
Besuchen Sie: https://nodejs.org/ und laden Sie die LTS-Version (18.x oder 20.x) herunter.

## Nach dem Update

```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install

# Server starten
npm run dev
```

## Alternative: HTML-Version verwenden

Falls Sie Node.js nicht aktualisieren möchten, können Sie die einfache HTML-Version verwenden:

```bash
python3 -m http.server 8000
# Dann öffnen: http://localhost:8000/index.html
```


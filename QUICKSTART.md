# 🚀 Quick Start Guide

## Installation in 3 Schritten

### 1. Dependencies installieren

```bash
npm install
```

### 2. Development Server starten

```bash
npm run dev
```

Die Website läuft dann auf: **http://localhost:3000**

### 3. Content anpassen

Öffnen Sie `data/content.json` und passen Sie die Inhalte an:

```json
{
  "site": {
    "name": "Ihr Name hier"
  },
  "prices": {
    "diving": {
      "basePrices": {
        "1": 50  // ← Preise hier ändern
      }
    }
  }
}
```

## 📁 Assets hinzufügen

### Video für Hero-Bereich
```
public/assets/video/diving-hero.mp4
```

### Bilder für Social Grid
```
public/assets/images/dive-1.jpg
public/assets/images/dive-2.jpg
... (bis dive-6.jpg)
```

## 🎨 Was ist anders als HTML?

✅ **Alle Inhalte in JSON** - Keine Code-Änderungen nötig  
✅ **TypeScript** - Type-Safety und Autocomplete  
✅ **React Components** - Modulare, wiederverwendbare Bausteine  
✅ **Tailwind CSS** - Modernes Utility-First CSS  
✅ **Next.js** - Optimierte Performance und SEO  

## 📚 Weitere Infos

Siehe `README-NEXTJS.md` für detaillierte Dokumentation.


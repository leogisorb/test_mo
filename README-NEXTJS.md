# Tauchwelt Hurghada - Next.js Version

Eine moderne, professionelle Website für eine Tauchschule in Hurghada, Ägypten, gebaut mit **Next.js 14**, **TypeScript** und **JSON-basierter Content-Struktur**.

## 🚀 Warum Next.js statt HTML?

### Vorteile der modernen Lösung:

1. **JSON-basierte Content-Struktur** 📄
   - Alle Inhalte in `data/content.json`
   - Einfache Wartung ohne Code-Änderungen
   - Strukturierte Daten für zukünftige CMS-Integration

2. **TypeScript für Type-Safety** 🔒
   - Vollständige Typisierung aller Daten
   - Autocomplete und Fehlererkennung
   - Bessere Entwicklererfahrung

3. **React Components** ⚛️
   - Wiederverwendbare, modulare Komponenten
   - Einfache Erweiterung und Wartung
   - Klare Trennung von Logik und Präsentation

4. **Moderne Build-Tools** 🛠️
   - Optimierte Performance
   - Automatische Code-Splitting
   - Image-Optimierung
   - Production-ready Builds

5. **Tailwind CSS** 🎨
   - Utility-first CSS Framework
   - Konsistentes Design-System
   - Responsive Design out-of-the-box

## 📁 Projektstruktur

```
mosalah/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Globale Styles
├── components/            # React Components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── IntroSection.tsx
│   ├── SocialSection.tsx
│   ├── PricesSection.tsx
│   ├── CoursesSection.tsx
│   ├── Footer.tsx
│   └── LanguageProvider.tsx
├── data/                  # JSON Content
│   └── content.json       # Alle Website-Inhalte
├── lib/                   # Utilities
│   └── content.ts        # Content-Helper
├── types/                 # TypeScript Types
│   └── content.ts        # Type-Definitionen
├── public/                # Statische Assets
│   └── assets/
│       ├── video/
│       └── images/
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## 🛠️ Installation & Setup

### Voraussetzungen
- Node.js 18+ 
- npm oder yarn

### Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Server starten
npm start
```

Die Website läuft dann auf `http://localhost:3000`

## 📝 Content-Verwaltung

### Inhalte bearbeiten

Alle Inhalte befinden sich in `data/content.json`. Hier können Sie:

- **Texte ändern** - Einfach die JSON-Datei bearbeiten
- **Preise anpassen** - In `prices.diving.basePrices` oder `prices.padi.basePrices`
- **Bilder hinzufügen** - Neue Einträge in `social.images`
- **Navigation ändern** - In `navigation.items`
- **Sprachen erweitern** - Neue Übersetzungen hinzufügen

### Beispiel: Preis ändern

```json
{
  "prices": {
    "diving": {
      "basePrices": {
        "1": 50,    // ← Hier ändern
        "2": 95,
        "3": 140
      }
    }
  }
}
```

### Beispiel: Neuen Text hinzufügen

```json
{
  "intro": {
    "title": {
      "de": "Ihr Text auf Deutsch",
      "en": "Your text in English",
      "ar": "نصك بالعربية"
    }
  }
}
```

## 🎨 Styling

Die Website verwendet **Tailwind CSS**. Styles können angepasst werden in:

- `tailwind.config.js` - Design-Tokens (Farben, Spacing, etc.)
- `app/globals.css` - Globale Styles und Utility-Klassen
- Komponenten - Inline Tailwind-Klassen

## 🌍 Mehrsprachigkeit

Die Website unterstützt automatisch:
- 🇩🇪 Deutsch (Standard)
- 🇬🇧 Englisch
- 🇪🇬 Arabisch

Neue Sprachen können einfach in `content.json` hinzugefügt werden.

## 🔧 TypeScript

Alle Komponenten und Daten sind vollständig typisiert. Types befinden sich in `types/content.ts`.

### Beispiel: Neuen Content-Type hinzufügen

```typescript
// types/content.ts
export interface NewSection {
  title: TranslatedText;
  content: TranslatedText;
}

// data/content.json
{
  "newSection": {
    "title": { "de": "...", "en": "...", "ar": "..." }
  }
}
```

## 📦 Deployment

### Vercel (Empfohlen)

```bash
npm install -g vercel
vercel
```

### Andere Plattformen

```bash
npm run build
# Output in .next/ für Production
```

## 🆚 Vergleich: HTML vs Next.js

| Feature | HTML Version | Next.js Version |
|---------|-------------|-----------------|
| Content-Management | In HTML-Dateien | JSON-basiert |
| Type-Safety | ❌ | ✅ TypeScript |
| Komponenten | ❌ | ✅ React |
| Performance | Basis | ✅ Optimiert |
| SEO | Basis | ✅ Verbessert |
| Wartbarkeit | ⚠️ | ✅ Hoch |
| Erweiterbarkeit | ⚠️ | ✅ Sehr gut |
| Build-Tools | ❌ | ✅ Modern |

## 🚀 Nächste Schritte

1. **Content anpassen**: Bearbeiten Sie `data/content.json`
2. **Assets hinzufügen**: 
   - Video: `public/assets/video/diving-hero.mp4`
   - Bilder: `public/assets/images/dive-*.jpg`
3. **Deployment**: Deployen Sie auf Vercel, Netlify oder einem eigenen Server

## 📚 Weitere Ressourcen

- [Next.js Dokumentation](https://nextjs.org/docs)
- [TypeScript Dokumentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)

## 💡 Vorteile dieser Architektur

✅ **Content-first**: Alle Inhalte in JSON, keine Code-Änderungen nötig  
✅ **Type-safe**: TypeScript verhindert Fehler  
✅ **Skalierbar**: Einfach neue Sektionen hinzufügen  
✅ **Wartbar**: Klare Struktur, modulare Komponenten  
✅ **Performance**: Next.js optimiert automatisch  
✅ **Modern**: State-of-the-art Web-Technologie  

---

**Hinweis**: Die alte HTML-Version bleibt erhalten. Sie können zwischen beiden Versionen wählen oder die Next.js-Version als Basis für zukünftige Entwicklungen nutzen.


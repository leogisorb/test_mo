# Tauchwelt Hurghada - Website

Eine professionelle Portfolio- und Pitch-Website für eine Tauchschule in Hurghada, Ägypten.

## 🎯 Projektübersicht

Diese Website dient als:
- Portfolio / Bewerbungswebsite für eine Tauchlehre bzw. Mitarbeit in einer Tauchschule
- Pitch-Website für einen potenziellen Kunden (Tauchschule in Hurghada, Ägypten)
- Darstellung von Professionalität, Vertrauen, Erlebnis und Leidenschaft fürs Tauchen

## 🛠️ Technische Features

### Design & Layout
- **Desktop-first Design** mit vollständiger Responsivität
- **Flexible Layouts** ohne feste Pixelwerte
- **Moderne, hochwertige Optik** mit viel Weißraum
- **Klare visuelle Hierarchie** für optimale Lesbarkeit

### Funktionen
- **Hero-Bereich mit Video-Hintergrund** (automatisch, ohne Ton, Endlosschleife)
- **Dynamische Preiskalkulation** für Tauchtage und PADI-Kurse
- **Automatischer 10% Rabatt** auf alle Preise
- **Mehrsprachigkeit** (Deutsch, Englisch, Arabisch) mit Flaggen-Auswahl
- **Responsive Navigation** mit Mobile-Menü
- **Instagram/Social Proof Grid** für visuelle Darstellung
- **Smooth Scrolling** für bessere Navigation

## 📁 Projektstruktur

```
mosalah/
├── index.html          # Haupt-HTML-Datei
├── css/
│   └── styles.css      # Alle Styles (responsive, flexibel)
├── js/
│   └── main.js         # JavaScript für Interaktivität
├── assets/
│   ├── video/          # Video-Dateien für Hero-Bereich
│   └── images/         # Bilder für Social Grid
└── README.md           # Diese Datei
```

## 🚀 Verwendung

### Lokale Entwicklung

1. Öffnen Sie `index.html` in einem modernen Webbrowser
2. Für die beste Erfahrung verwenden Sie einen lokalen Server:
   ```bash
   # Mit Python 3
   python -m http.server 8000
   
   # Mit Node.js (http-server)
   npx http-server
   ```

### Assets hinzufügen

#### Video für Hero-Bereich
- Platzieren Sie ein Video im Format MP4 oder WebM in `assets/video/`
- Benennen Sie es `diving-hero.mp4` (oder `.webm`)
- Empfohlene Auflösung: 1920x1080 oder höher
- Video sollte automatisch abspielen, stumm sein und in Endlosschleife laufen

#### Bilder für Social Grid
- Platzieren Sie quadratische Bilder in `assets/images/`
- Benennen Sie sie: `dive-1.jpg`, `dive-2.jpg`, etc.
- Empfohlene Größe: mindestens 500x500px
- Format: JPG oder PNG

## 🌍 Mehrsprachigkeit

Die Website unterstützt drei Sprachen:
- 🇩🇪 Deutsch (Standard)
- 🇬🇧 Englisch
- 🇪🇬 Arabisch

Die Sprachauswahl erfolgt über Flaggen-Icons im Header. Die gewählte Sprache wird im LocalStorage gespeichert.

## 💰 Preiskonfiguration

Preise können in `js/main.js` angepasst werden:

```javascript
const priceConfig = {
    diving: {
        basePrices: {
            1: 50,    // 1 Tag
            2: 95,    // 2 Tage
            3: 140,   // 3 Tage
            5: 225,   // 5 Tage
            10: 400   // 10 Tage
        },
        discount: 0.10 // 10% Rabatt
    },
    padi: {
        basePrices: {
            'open-water': 450,
            'advanced': 350,
            'rescue': 400,
            'divemaster': 800
        },
        discount: 0.10 // 10% Rabatt
    }
};
```

## 📱 Responsive Breakpoints

- **Desktop**: > 968px (Desktop-first)
- **Tablet**: 640px - 968px
- **Mobile**: < 640px

## 🔧 Anpassungen

### Navigation anpassen
Bearbeiten Sie die `<ul class="nav-menu">` in `index.html`

### Sektionen hinzufügen
1. Neue Sektion in `index.html` erstellen
2. Styling in `css/styles.css` hinzufügen
3. Navigation-Link hinzufügen

### Übersetzungen erweitern
Bearbeiten Sie das `translations`-Objekt in `js/main.js`

## 🌐 Browser-Kompatibilität

- Chrome (neueste Version)
- Firefox (neueste Version)
- Safari (neueste Version)
- Edge (neueste Version)

## 📝 Hinweise

- Die Website verwendet keine externen Dependencies
- Alle Funktionen sind in Vanilla JavaScript implementiert
- CSS verwendet moderne Flexbox- und Grid-Layouts
- Alle Größenangaben sind relativ und skalieren mit dem Viewport

## 🔮 Zukünftige Erweiterungen

Die Website ist vorbereitet für:
- Weitere Unterseiten
- API-Anbindungen
- Formulare und Buchungssysteme
- Erweiterte Mehrsprachigkeit
- Weitere Sektionen und Inhalte

## 📄 Lizenz

© 2024 Tauchwelt Hurghada. Alle Rechte vorbehalten.


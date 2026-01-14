# SEO Setup & Google Search Console Anleitung

## ✅ Bereits implementiert

- ✅ `robots.txt` - Erstellt in `/public/robots.txt`
- ✅ `sitemap.xml` - Erstellt in `/public/sitemap.xml`
- ✅ Meta-Tags optimiert - In `app/layout.tsx`
- ✅ Strukturierte Daten (JSON-LD) - Schema.org DivingSchool
- ✅ Open Graph Tags für Social Media
- ✅ Twitter Cards
- ✅ Mehrsprachige hreflang Tags
- ✅ Canonical URLs

## 📋 Google Search Console Setup

### Schritt 1: Website bei Google Search Console registrieren

1. Gehe zu: https://search.google.com/search-console
2. Melde dich mit deinem Google-Konto an
3. Klicke auf "Eigentum hinzufügen"
4. Wähle "URL-Präfix" und gib ein: `https://tauchwelthurghada.com`
5. Klicke auf "Weiter"

### Schritt 2: Eigentum verifizieren

Du hast **3 Optionen** zur Verifizierung:

#### Option A: HTML-Datei (Empfohlen)
1. Google stellt eine HTML-Datei zum Download bereit
2. Lade diese Datei in das `/public/` Verzeichnis hoch
3. Stelle sicher, dass die Datei über `https://tauchwelthurghada.com/[dateiname].html` erreichbar ist
4. Klicke auf "Verifizieren"

#### Option B: HTML-Tag (Einfach)
1. Google gibt dir einen Meta-Tag wie:
   ```html
   <meta name="google-site-verification" content="DEIN-CODE-HIER" />
   ```
2. Füge diesen Code in `app/layout.tsx` im `metadata.verification` Objekt hinzu:
   ```typescript
   verification: {
     google: 'DEIN-CODE-HIER',
   },
   ```
3. Baue die Seite neu und deploye
4. Klicke auf "Verifizieren"

#### Option C: Domain-Name-Provider
1. Füge einen TXT-Eintrag zu deinen DNS-Einstellungen hinzu
2. Warte auf DNS-Propagierung (kann einige Stunden dauern)
3. Klicke auf "Verifizieren"

### Schritt 3: Sitemap einreichen

1. Nach erfolgreicher Verifizierung, gehe zu "Sitemaps" im linken Menü
2. Gib ein: `sitemap.xml`
3. Klicke auf "Einreichen"
4. Google wird die Sitemap crawlen (kann einige Tage dauern)

### Schritt 4: URL-Prüfung (Optional)

1. Gehe zu "URL-Prüfung" im linken Menü
2. Gib eine URL ein: `https://tauchwelthurghada.com`
3. Klicke auf "URL zur Indizierung anfordern" (falls noch nicht indiziert)

## 🔍 Weitere SEO-Optimierungen

### 1. Google Analytics (Optional)
- Erstelle ein Google Analytics 4 Property
- Füge den Tracking-Code in `app/layout.tsx` hinzu

### 2. Google My Business (Empfohlen)
- Erstelle ein Google My Business Profil für "Tauchwelt Hurghada"
- Füge Adresse, Öffnungszeiten und Fotos hinzu
- Verlinke zur Website

### 3. Social Media Links
- Füge Facebook, Instagram, etc. Links in `components/StructuredData.tsx` hinzu
- Aktualisiere das `sameAs` Array

### 4. Regelmäßige Updates
- Aktualisiere `sitemap.xml` nach größeren Änderungen
- Überprüfe die Indizierung in Google Search Console
- Überwache die Performance in "Leistung"

## 📊 Wichtige URLs

- **Google Search Console**: https://search.google.com/search-console
- **Google Analytics**: https://analytics.google.com
- **Google My Business**: https://business.google.com
- **PageSpeed Insights**: https://pagespeed.web.dev/

## ⚠️ Wichtige Hinweise

1. **DNS-Propagierung**: Nach dem Setup kann es 24-48 Stunden dauern, bis Google die Website crawlt
2. **Indizierung**: Die vollständige Indizierung kann 1-2 Wochen dauern
3. **Sitemap Updates**: Nach größeren Änderungen sollte die Sitemap aktualisiert werden
4. **Monitoring**: Überprüfe regelmäßig die Google Search Console auf Fehler oder Warnungen

## 🚀 Nächste Schritte

1. ✅ Website bei Google Search Console registrieren
2. ✅ Eigentum verifizieren
3. ✅ Sitemap einreichen
4. ⏳ Warten auf erste Indizierung (1-2 Wochen)
5. ⏳ Performance überwachen und optimieren

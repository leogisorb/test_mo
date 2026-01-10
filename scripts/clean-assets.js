const fs = require('fs');
const path = require('path');

// Liste der tatsächlich verwendeten Assets
const usedAssets = [
  // Videos
  'assets/video/hero-video-compressed.mp4',
  // Bilder
  'assets/images/dive-price-1.jpg',
  'assets/images/dive-price-2.jpg',
  'assets/images/dive-price-3.jpg',
  'assets/images/mohamed-salah.jpg',
  'assets/images/course-1.jpg',
  'assets/images/course-2.jpg',
  'assets/images/course-3.jpg',
  // Favicons/Logos werden automatisch kopiert
];

const outDir = path.join(__dirname, '../out');

// Funktion zum Löschen ungenutzter Assets im out-Verzeichnis
function cleanOutAssets() {
  if (!fs.existsSync(outDir)) {
    console.log('⚠ out/ Verzeichnis existiert nicht');
    return;
  }

  let deletedCount = 0;

  // Prüfe Video-Verzeichnis
  const videoDir = path.join(outDir, 'assets/video');
  if (fs.existsSync(videoDir)) {
    const videoFiles = fs.readdirSync(videoDir);
    videoFiles.forEach(file => {
      const assetPath = `assets/video/${file}`;
      if (!usedAssets.includes(assetPath)) {
        const fullPath = path.join(videoDir, file);
        try {
          fs.unlinkSync(fullPath);
          console.log(`🗑️  Gelöscht: ${assetPath}`);
          deletedCount++;
        } catch (error) {
          console.error(`❌ Fehler beim Löschen von ${assetPath}:`, error.message);
        }
      }
    });
  }

  // Prüfe Image-Verzeichnis
  const imageDir = path.join(outDir, 'assets/images');
  if (fs.existsSync(imageDir)) {
    const imageFiles = fs.readdirSync(imageDir);
    imageFiles.forEach(file => {
      const assetPath = `assets/images/${file}`;
      if (!usedAssets.includes(assetPath)) {
        const fullPath = path.join(imageDir, file);
        try {
          fs.unlinkSync(fullPath);
          console.log(`🗑️  Gelöscht: ${assetPath}`);
          deletedCount++;
        } catch (error) {
          console.error(`❌ Fehler beim Löschen von ${assetPath}:`, error.message);
        }
      }
    });
  }

  if (deletedCount > 0) {
    console.log(`✓ ${deletedCount} ungenutzte Asset(s) entfernt`);
  } else {
    console.log('✓ Keine ungenutzten Assets gefunden');
  }
}

cleanOutAssets();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Für statischen Export (GitHub Pages)
  basePath: '/test_mo', // GitHub Pages Repository-Name
  assetPrefix: '/test_mo', // Für Assets (CSS, JS, Bilder)
  images: {
    unoptimized: true, // Für statische Exports oder wenn keine Image-Optimierung benötigt wird
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true, // Für GitHub Pages kompatibel
}

module.exports = nextConfig


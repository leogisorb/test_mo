/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';
const isExport = process.env.EXPORT === 'true';
const isIONOS = process.env.IONOS === 'true';

const nextConfig = {
  reactStrictMode: true,
  // Nur für Production Builds mit Export
  ...(isExport ? {
    output: 'export',
    // IONOS Build: kein basePath (für Root-Hosting)
    // GitHub Pages Build: mit basePath '/test_mo'
    basePath: isIONOS ? '' : '/test_mo',
    assetPrefix: isIONOS ? '' : '/test_mo',
    trailingSlash: true,
  } : {
    // Für Development: kein basePath
    basePath: '',
    assetPrefix: '',
  }),
  images: {
    unoptimized: true, // Für statische Exports oder wenn keine Image-Optimierung benötigt wird
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isExport ? (isIONOS ? '' : '/test_mo') : '',
  },
}

module.exports = nextConfig


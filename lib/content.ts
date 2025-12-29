import contentData from '@/data/content.json';
import type { SiteContent, Language } from '@/types/content';

export const content: SiteContent = contentData as SiteContent;

export function getText(translated: { [key in Language]: string }, lang: Language): string {
  return translated[lang] || translated.de;
}

export function getContent() {
  return content;
}

// Helper function to add basePath to asset URLs for GitHub Pages
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // Remove leading slash if present, then add basePath
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

// Helper function to add basePath to navigation URLs
export function getNavPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return basePath ? `${basePath}${path}` : path;
}


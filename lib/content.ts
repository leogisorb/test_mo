import contentData from '@/data/content.json';
import type { SiteContent, Language } from '@/types/content';

export const content: SiteContent = contentData as SiteContent;

export function getText(translated: { [key in Language]: string }, lang: Language): string {
  return translated[lang] || translated.de;
}

export function getContent() {
  return content;
}


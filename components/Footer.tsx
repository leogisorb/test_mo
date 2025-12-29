'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText } from '@/lib/content';

export function Footer() {
  const { language } = useLanguage();
  const content = getContent();

  return (
    <footer id="contact" className="bg-text text-white py-16 px-4 md:px-8">
      <div className="w-[85%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {getText(content.footer.contact.title, language)}
            </h3>
            <p className="text-white/80">{content.footer.contact.email}</p>
            <p className="text-white/80">{content.footer.contact.phone}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {getText(content.footer.location.title, language)}
            </h3>
            <p className="text-white/80">{content.footer.location.city}</p>
            <p className="text-white/80">{content.footer.location.region}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {getText(content.footer.social.title, language)}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {content.footer.social.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          </div>

          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              {getText(content.footer.copyright, language)}
            </p>
          </div>
      </div>
    </footer>
  );
}


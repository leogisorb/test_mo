'use client';

import { useLanguage } from './LanguageProvider';
import { getContent, getText, getAssetPath } from '@/lib/content';

export function Footer() {
  const { language } = useLanguage();
  const content = getContent();

  return (
    <footer id="contact" className="bg-maritime-dark text-white py-16 px-4 md:px-8">
        <div className="w-[85%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12 items-start">
            <div className="flex justify-start">
              <a href="/" aria-label="Home">
                <img
                  src={getAssetPath('/logo_v2_white.svg')}
                  alt="Tauchwelt Hurghada Logo - Professionelle Tauchschule für Deutsche | Tauchen Ägypten"
                  className="h-20 md:h-28 lg:h-32 w-auto"
                  width={320}
                  height={320}
                  loading="lazy"
                />
              </a>
            </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
              {getText(content.footer.contact.title, language)}
            </h3>
            <p className="text-white/80">{content.footer.contact.email}</p>
            <p className="text-white/80">{content.footer.contact.phone}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
              {getText(content.footer.location.title, language)}
            </h3>
            {content.footer.location.address && (
              <a
                href="https://www.google.com/maps?q=27.23463,33.84846"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors cursor-pointer underline whitespace-pre-line"
              >
                {content.footer.location.address}
              </a>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
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


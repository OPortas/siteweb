import { useState, useEffect } from 'react';
import { Menu, X, Facebook, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navItems = [
    { href: '#about', labelEN: 'About', labelPT: 'Sobre' },
    { href: '#specialities', labelEN: 'Specialities', labelPT: 'Especialidades' },
    { href: '#reviews', labelEN: 'Reviews', labelPT: 'Avaliações' },
    { href: '#location', labelEN: 'Location', labelPT: 'Localização' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button
              onClick={scrollToTop}
              className="text-2xl font-serif text-[#ccad6b] hover:text-[#b69a5b] transition-colors duration-300 cursor-pointer"
            >
              O PORTAS
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#ccad6b] transition-all duration-300 hover:scale-105"
              >
                {language === 'en' ? item.labelEN : item.labelPT}
              </a>
            ))}
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-[#ccad6b] rounded text-[#ccad6b] hover:bg-[#ccad6b] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>

            <a
              href="https://facebook.com/profile.php?id=100068674700107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#ccad6b] transition-all duration-300 transform hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="tel:+351213460023"
              className="text-gray-700 hover:text-[#ccad6b] transition-all duration-300 group flex items-center"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                +351 21 346 0023
              </span>
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-[#ccad6b] transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-gray-700 hover:text-[#ccad6b] hover:translate-x-2 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'en' ? item.labelEN : item.labelPT}
              </a>
            ))}
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 border border-[#ccad6b] rounded text-[#ccad6b] hover:bg-[#ccad6b] hover:text-white transition-all duration-300"
              >
                {language === 'en' ? 'PT' : 'EN'}
              </button>
              
              <a
                href="https://facebook.com/profile.php?id=100068674700107"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#ccad6b] transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              
              <a
                href="tel:+351213460023"
                className="text-gray-700 hover:text-[#ccad6b] transition-all duration-300 flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                +351 21 346 0023
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
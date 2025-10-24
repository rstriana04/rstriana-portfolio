import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { key: 'home', id: 'hero' },
    { key: 'projects', id: 'projects' },
    { key: 'about', id: 'about' },
    { key: 'resume', id: 'resume' },
    { key: 'contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary-bg bg-opacity-95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold"
          >
            <span className="text-primary-accent">RST</span>
            <span className="text-primary-text">.</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.id)}
                className="text-primary-gray hover:text-primary-text transition-colors duration-300 font-medium"
              >
                {t(`nav.${link.key}`)}
              </button>
            ))}

            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={() => changeLanguage('es')}
                className={`text-sm font-medium transition-all duration-300 ${
                  i18n.language === 'es'
                    ? 'text-primary-accent scale-110'
                    : 'text-primary-gray hover:text-primary-text'
                }`}
              >
                🇪🇸 ES
              </button>
              <span className="text-primary-gray">|</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm font-medium transition-all duration-300 ${
                  i18n.language === 'en'
                    ? 'text-primary-accent scale-110'
                    : 'text-primary-gray hover:text-primary-text'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary-text text-3xl"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-primary-bg bg-opacity-95 backdrop-blur-lg border-t border-white border-opacity-10"
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-primary-gray hover:text-primary-text transition-colors duration-300 font-medium py-2"
              >
                {t(`nav.${link.key}`)}
              </button>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-white border-opacity-10">
              <button
                onClick={() => changeLanguage('es')}
                className={`text-sm font-medium transition-all duration-300 ${
                  i18n.language === 'es'
                    ? 'text-primary-accent'
                    : 'text-primary-gray'
                }`}
              >
                🇪🇸 Español
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm font-medium transition-all duration-300 ${
                  i18n.language === 'en'
                    ? 'text-primary-accent'
                    : 'text-primary-gray'
                }`}
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;



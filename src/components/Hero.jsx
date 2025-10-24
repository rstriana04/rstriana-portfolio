import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiArrowDown } from 'react-icons/hi';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary-gray text-lg md:text-xl mb-4">
              {t('hero.greeting')}
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-primary-text">{t('hero.name')}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl font-semibold mb-6 text-primary-accent glow-text"
          >
            {t('hero.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-primary-gray text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary"
            >
              {t('hero.cta_work')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
            >
              {t('hero.cta_contact')}
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-primary-accent text-3xl cursor-pointer"
          onClick={() => scrollToSection('projects')}
        >
          <HiArrowDown />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;



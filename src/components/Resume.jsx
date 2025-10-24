import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiDownload, HiDocumentText, HiCode, HiBriefcase, HiAcademicCap } from 'react-icons/hi';

const Resume = () => {
  const { t, i18n } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDownload = () => {
    const resumeUrl = `/resume/resume-${i18n.language}.pdf`;
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = `Resume-${t('resume.download_name')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { icon: HiBriefcase, label: t('resume.stats.experience'), value: t('resume.stats.experience_value') },
    { icon: HiCode, label: t('resume.stats.projects'), value: t('resume.stats.projects_value') },
    { icon: HiAcademicCap, label: t('resume.stats.certifications'), value: t('resume.stats.certifications_value') },
  ];

  return (
    <section id="resume" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('resume.title')}</h2>
          <p className="text-primary-gray text-lg mt-4 max-w-2xl mx-auto">
            {t('resume.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center items-center perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <div
              className="relative w-full h-[600px] cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={handleFlip}
            >
              <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              >
                <div
                  className="absolute w-full h-full backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="glass-card h-full flex flex-col justify-between p-8 md:p-12 relative group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-accent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-2xl bg-gradient-to-r from-primary-accent via-transparent to-primary-accent opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300 -z-10"></div>

                    <div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-accent to-primary-dark flex items-center justify-center"
                      >
                        <HiDocumentText className="text-5xl text-white" />
                      </motion.div>

                      <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary-text">
                        {t('resume.card.front.title')}
                      </h3>
                      <p className="text-primary-gray text-center mb-8">
                        {t('resume.card.front.description')}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            className="text-center"
                          >
                            <stat.icon className="text-4xl text-primary-accent mx-auto mb-2" />
                            <p className="text-2xl font-bold text-primary-text">{stat.value}</p>
                            <p className="text-sm text-primary-gray">{stat.label}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-primary-accent text-sm mb-2"
                      >
                        {t('resume.card.front.flip_hint')}
                      </motion.p>
                      <div className="text-primary-gray text-xs">
                        {t('resume.card.front.click_to_view')}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute w-full h-full backface-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="glass-card h-full flex flex-col justify-between p-8 md:p-12 relative group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-accent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-2xl bg-gradient-to-r from-primary-accent via-transparent to-primary-accent opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300 -z-10"></div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="w-full max-w-md bg-white bg-opacity-5 rounded-xl p-8 mb-8 border border-primary-accent border-opacity-30">
                        <HiDocumentText className="text-6xl text-primary-accent mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-center text-primary-text mb-2">
                          {t('resume.card.back.title')}
                        </h3>
                        <p className="text-primary-gray text-center text-sm mb-6">
                          {t('resume.card.back.description')}
                        </p>
                        
                        <div className="space-y-3 text-primary-gray text-sm mb-6">
                          <div className="flex items-center justify-between">
                            <span>{t('resume.card.back.format')}</span>
                            <span className="text-primary-accent font-semibold">PDF</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{t('resume.card.back.language')}</span>
                            <span className="text-primary-accent font-semibold">{i18n.language.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{t('resume.card.back.updated')}</span>
                            <span className="text-primary-accent font-semibold">{t('resume.card.back.updated_date')}</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload();
                          }}
                          className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                          <HiDownload className="text-xl" />
                          {t('resume.card.back.download_button')}
                        </motion.button>
                      </div>

                      <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-primary-accent text-sm"
                      >
                        {t('resume.card.back.flip_back_hint')}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;


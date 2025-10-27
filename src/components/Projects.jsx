import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiExternalLink, HiCode } from 'react-icons/hi';

const Projects = () => {
  const { t } = useTranslation();
  const [imageErrors, setImageErrors] = useState({});

  const projects = t('projects.items', { returnObjects: true });

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="projects" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="text-primary-gray text-lg mt-4">
          {t('projects.subtitle')}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-card group"
          >
            <div className="mb-4 relative overflow-hidden rounded-xl">
              {project.image && !imageErrors[index] ? (
                <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gradient-to-br from-primary-accent to-primary-dark">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={() => handleImageError(index)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-60"></div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-accent to-primary-dark rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="text-6xl text-white opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <HiCode />
                  </div>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-primary-text mb-3">
              {project.title}
            </h3>

            <p className="text-primary-gray mb-4 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 text-sm bg-primary-accent bg-opacity-20 text-blue-300 rounded-lg border border-blue-400 border-opacity-50"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-accent hover:text-primary-text transition-colors duration-300 font-medium"
                >
                  <HiExternalLink className="text-xl" />
                  {t('projects.demo')}
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-accent hover:text-primary-text transition-colors duration-300 font-medium"
                >
                  <HiCode className="text-xl" />
                  {t('projects.code')}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;



import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiExternalLink, HiCode } from 'react-icons/hi';

const Projects = () => {
  const { t } = useTranslation();

  const projects = t('projects.items', { returnObjects: true });

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
            <div className="mb-4">
              <div className="w-full h-48 bg-gradient-to-br from-primary-accent to-primary-dark rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-6xl text-white opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <HiCode />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-primary-text mb-3">
              {project.title}
            </h3>

            <p className="text-primary-gray mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 text-sm bg-primary-accent bg-opacity-20 text-primary-accent rounded-lg border border-primary-accent border-opacity-30"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-primary-accent hover:text-primary-text transition-colors duration-300 font-medium">
                <HiExternalLink className="text-xl" />
                {t('projects.demo')}
              </button>
              <button className="flex items-center gap-2 text-primary-accent hover:text-primary-text transition-colors duration-300 font-medium">
                <HiCode className="text-xl" />
                {t('projects.code')}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;



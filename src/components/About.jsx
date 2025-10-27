import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  SiAngular, 
  SiNodedotjs, 
  SiFirebase, 
  SiAmazonaws,
  SiReact,
  SiTypescript,
  SiDocker,
  SiPostgresql 
} from 'react-icons/si';

const About = () => {
  const { t } = useTranslation();

  const technologies = [
    { name: 'Angular', icon: SiAngular, color: '#DD0031' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'AWS', icon: SiAmazonaws, color: '#FF9900' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  ];

  return (
    <section id="about" className="section-container">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('about.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-gray text-lg mb-6 leading-relaxed">
              {t('about.paragraph1')}
            </p>
            <p className="text-primary-gray text-lg mb-8 leading-relaxed">
              {t('about.paragraph2')}
            </p>

            <div className="inline-block px-6 py-3 bg-primary-accent bg-opacity-20 rounded-xl border border-blue-400 border-opacity-50">
              <p className="text-blue-300 font-medium">
                ✨ {t('about.availability')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-text mb-8">
              {t('about.tech_title')}
            </h3>

            <div className="grid grid-cols-4 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center justify-center p-4 glass-card"
                >
                  <tech.icon 
                    className="text-5xl mb-2" 
                    style={{ color: tech.color }}
                  />
                  <span className="text-xs text-primary-gray text-center">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;



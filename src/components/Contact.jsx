import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiMail, HiUser, HiPencil } from 'react-icons/hi';
import { API_URL } from '../config/api';
import Swal from 'sweetalert2';

const LoadingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg bg-opacity-90 backdrop-blur-sm"
    >
      <div className="relative">
        <motion.div
          className="relative w-32 h-32"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-primary-accent border-opacity-20 rounded-full"></div>
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary-accent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-12 h-12 text-primary-accent"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -right-2 -top-2"
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            >
              <div className="w-2 h-2 bg-primary-accent rounded-full"></div>
            </motion.div>
            
            <motion.div
              className="absolute -right-4 top-0"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3
              }}
            >
              <div className="w-1.5 h-1.5 bg-primary-accent rounded-full"></div>
            </motion.div>
            
            <motion.div
              className="absolute -right-6 top-2"
              animate={{ 
                scale: [0, 0.8, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6
              }}
            >
              <div className="w-1 h-1 bg-primary-accent rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-primary-accent font-medium whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Sending message...
        </motion.p>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send email');
      }

      await Swal.fire({
        icon: 'success',
        title: t('contact.success'),
        text: t('contact.successMessage'),
        confirmButtonText: 'OK',
        confirmButtonColor: '#10b981',
        background: '#1a1a2e',
        color: '#ffffff',
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: t('contact.error'),
        text: t('contact.errorMessage'),
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444',
        background: '#1a1a2e',
        color: '#ffffff',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isSubmitting && <LoadingAnimation />}
      </AnimatePresence>

      <section id="contact" className="section-container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title">{t('contact.title')}</h2>
            <p className="text-primary-gray text-lg mt-4">
              {t('contact.subtitle')}
            </p>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-primary-text font-medium mb-2">
                <HiUser className="text-primary-accent" />
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-bg bg-opacity-50 border border-white border-opacity-10 rounded-xl text-primary-text placeholder-primary-gray focus:outline-none focus:border-primary-accent focus:border-opacity-50 transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-primary-text font-medium mb-2">
                <HiMail className="text-primary-accent" />
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-bg bg-opacity-50 border border-white border-opacity-10 rounded-xl text-primary-text placeholder-primary-gray focus:outline-none focus:border-primary-accent focus:border-opacity-50 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-primary-text font-medium mb-2">
                <HiPencil className="text-primary-accent" />
                {t('contact.form.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-primary-bg bg-opacity-50 border border-white border-opacity-10 rounded-xl text-primary-text placeholder-primary-gray focus:outline-none focus:border-primary-accent focus:border-opacity-50 transition-all duration-300 resize-none"
                placeholder={t('contact.form.message')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </form>
        </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;



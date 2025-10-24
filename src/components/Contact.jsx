import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { HiMail, HiUser, HiPencil } from 'react-icons/hi';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
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
    setStatus({ type: '', message: '' });

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      );

      setStatus({ type: 'success', message: t('contact.success') });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: t('contact.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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

            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${
                  status.type === 'success'
                    ? 'bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 text-green-400'
                    : 'bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 text-red-400'
                }`}
              >
                {status.message}
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;



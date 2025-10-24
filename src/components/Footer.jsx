import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaEnvelope, url: 'mailto:contact@example.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white border-opacity-10 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-gray hover:text-primary-accent transition-colors duration-300 text-2xl hover:scale-110 transform"
                aria-label={social.label}
              >
                <social.icon />
              </a>
            ))}
          </div>

          <div className="text-center">
            <p className="text-primary-gray">
              © {currentYear} <span className="text-primary-text font-medium">Robert Sty Triana</span>
            </p>
            <p className="text-primary-gray text-sm mt-2">
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



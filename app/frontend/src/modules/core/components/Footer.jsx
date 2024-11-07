import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <p className="mb-0">{t('footerText')}</p>
      </div>
    </footer>
  );
};

export default Footer;
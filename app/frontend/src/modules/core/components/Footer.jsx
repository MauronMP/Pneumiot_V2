import React from 'react';
import { useTranslation } from 'react-i18next';

const FooterComponent = () => {
  const { t } = useTranslation('footer'); // Obtener la traducción para 'footer'

  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="text-center">
        <p className="mb-3"></p>
      </div>
    </footer>
  );
};

export default FooterComponent;
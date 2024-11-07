import React from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook for translations

const NotFound = () => {
  const { t } = useTranslation('notFound'); // Using the 'notFound' namespace for translations

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{t('notFoundTitle')}</h1> {/* Translated 404 title */}
      <p>{t('notFoundMessage')}</p> {/* Translated message */}
    </div>
  );
};

export default NotFound;
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [showMessage, setShowMessage] = useState(!Cookies.get('cookieConsent'));

  const handleDismiss = () => {
    // Set a cookie to remember that the user has dismissed the message
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setShowMessage(false);
  };

  return (
    showMessage && (
    <div style={{ background: '#030622', padding: '10px', position: 'fixed', bottom: '0', left: '0', width: '100%', textAlign: 'center' }}>
      <p style={{ margin: '0', display: 'inline-block', marginRight: '10px' }}>Este site usa cookies para melhorar a sua experiência de navegação.</p>
      <button onClick={handleDismiss} style={{ background: '#4C0FC0', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>OK, fechar</button>
    </div>
    )
  );
};

export default CookieConsent;

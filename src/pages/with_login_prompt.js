// withLoginPrompt.js
import React, { useState, useEffect } from 'react';
import LoginForm from './overlay_login';
import { getUserId } from './greeting.js';

const withLoginPrompt = (WrappedComponent) => {
  return (props) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAndSetTimer = async () => {
            try {
            const userId = await getUserId();
            if (!userId) {
                const timer = setTimeout(() => {
                setShowLoginForm(true);
                }, 60000);

                return () => clearTimeout(timer); 
            }
            } finally {
            setLoading(false); 
            }
        };
        checkUserAndSetTimer();
    }, []);

    const handleCloseLoginForm = () => {
      setShowLoginForm(false);
    };

    return (
      <>
        <WrappedComponent {...props} />
        {showLoginForm && <LoginForm onClose={handleCloseLoginForm} />}
      </>
    );
  };
};

export default withLoginPrompt;

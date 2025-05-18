// src/components/EnrollButton.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { enrollUserInCourse } from '../services/user_info'; // adjust the path as needed

const EnrollButton = ({ courseId, availability, account_type, onEnroll }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      setError('Please log in to enroll in this course');
      return;
    }
    setLoading(true);
    setError(null);
    console.log(`account_type: ${account_type}, availability: ${availability}`);
    if (account_type == 'free' && availability == 'paid') {
      navigate(`/upgrade`);
    } else {
        try {
          const result = await enrollUserInCourse(user.cognitoUser.username, courseId); // using imported function
          console.log("EnrollmentResult: ");
          console.log(result);
          console.log("Enrollment error: ");
          console.log(result.error);
          if (result.error) {
            console.error('Enrollment failed:', result.error);
          } else if (onEnroll) {
            onEnroll(); // notify parent component to update state
          }
          navigate(`/coursepage/${courseId}`);
        } catch (error) {
          console.error('Enrollment failed:', error);
          setError(error.message || 'Failed to enroll in course');
        } finally {
          setLoading(false);
        }
    }
  };

  return (
    <div className="btn-enroll-button">
      {error && <div className="enroll-error">{error}</div>}
      <button 
        onClick={handleEnroll}
        disabled={loading}
        className="enroll-button"
      >
        {loading ? 'Processando...' : ((account_type == 'paid' || availability == 'free') ? 'Começar curso agora': 'Faça upgrade do seu plano para começar')}
      </button>
    </div>
  );
};

export default EnrollButton;

// src/components/EnrolledRoute.js
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import { CourseEnrollmentService } from '../services/CourseEnrollment';

const EnrolledRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { courseId } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(null);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (user) {
        const enrolled = await CourseEnrollmentService.isEnrolledInCourse(courseId);
        setIsEnrolled(enrolled);
      }
      setCheckingEnrollment(false);
    };
    checkEnrollment();
  }, [user, courseId]);

  if (loading || checkingEnrollment) return <div>Loading...</div>;
  if (!user) return <Navigate to="/logon" replace />;
  if (!isEnrolled) return <Navigate to="/courses" replace />;

  return children;
};
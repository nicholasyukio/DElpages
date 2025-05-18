import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext.js';
import { getUserData, isUserEnrolledInCourse } from '../services/user_info.js';
import EnrollButton from '../components/EnrollButton.js';

const extractURLparams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const utmTags = {};
  utmTags.utm_source = urlParams.get('utm_source') || '';
  utmTags.utm_medium = urlParams.get('utm_medium') || '';
  utmTags.utm_campaign = urlParams.get('utm_campaign') || '';
  utmTags.utm_term = urlParams.get('utm_term') || '';
  utmTags.utm_content = urlParams.get('utm_content') || '';
  utmTags.v = urlParams.get('v') || '';
  return utmTags;
};

const URLparams = extractURLparams();
const baseAPI_URL = process.env.REACT_APP_BACKEND_API_BASE_ENDPOINT;
const base_URL = process.env.REACT_APP_BASE_URL;

function Video({ videoId, isMobileDevice, videoThumbnailURL }) {
  console.log("Video props:", { videoId, isMobileDevice, videoThumbnailURL });
  const video_src = `https://iframe.mediadelivery.net/embed/236258/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
  if (isMobileDevice) {
      return (
          <div className="watch-container">
              <div style={{ position: 'auto' }}>
                  <iframe 
                      src={video_src}
                      width="360" 
                      height="202" 
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                      allowFullScreen={true}
                      title="Embedded Video"
                      poster={videoThumbnailURL}
                  ></iframe>
              </div>
          </div>
      );
  } else {
      return (
          <div className="watch-container">
              <div style={{ position: 'auto' }}>
                  <iframe 
                      src={video_src}
                      width="720" 
                      height="405" 
                      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                      allowFullScreen={true}
                      title="Embedded Video"
                      poster={videoThumbnailURL}
                  ></iframe>
              </div>
          </div>
      );
  }
}

// Custom hook to detect mobile device
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const Lesson = ({ courseId, sectionId, lessonId }) => {
  const isMobile = useIsMobile();

  const [lessonInfo, setLessonInfo] = useState({});
  const [videoId, setVideoId] = useState('');
  const [videoInfo, setVideoInfo] = useState({});
  const [videoThumbnailURL, setVideoThumbnailURL] = useState('');

  // Fetch lesson data
  const getLesson = async () => {
    try {
      const response = await fetch(`${baseAPI_URL}/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`);
      if (!response.ok) throw new Error('Failed to fetch lesson data');

      const data = await response.json();
      setLessonInfo(data.lesson);
      setVideoId(data.lesson.videoId);
    } catch (error) {
      console.error('Lesson fetch error:', error);
    }
  };

  // Fetch video info when videoId is available
  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await fetch(`${baseAPI_URL}/videoinfo/${videoId}`);
        if (!response.ok) throw new Error('Failed to fetch video info');

        const data = await response.json();
        setVideoInfo(data);
        setVideoThumbnailURL(data.thumbnail_url);
      } catch (error) {
        console.error('Video info fetch error:', error);
      }
    };

    if (videoId) {
      fetchVideoInfo();
    }
  }, [videoId]);

  // Set page title from lesson or video
  useEffect(() => {
    if (lessonInfo.title) {
      document.title = lessonInfo.title;
    } else if (videoInfo.title) {
      document.title = videoInfo.title;
    }
  }, [lessonInfo.title, videoInfo.title]);

  // Fetch lesson data when courseId, sectionId, or lessonId changes
  useEffect(() => {
    getLesson();
  }, [courseId, sectionId, lessonId]);

  return (
    <div className="course-container">
      <h1>{lessonInfo.title || 'Aula'}</h1>
      <div className="video-wrapper">
        <Video videoId={videoId} isMobileDevice={isMobile} videoThumbnailURL={videoThumbnailURL} />
      </div>
      <p className="lesson-text">{lessonInfo.description || 'This is the text under the video, aligned to the left.'}</p>
      <a href={`${base_URL}/coursepage/${courseId}`}>
        Página de conteúdo do curso
      </a>
    </div>
  );
};

const AllCoursesList = () => {
  const { login, logout, user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${baseAPI_URL}/courses`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchEnrolledCourses = async () => {
    if (!user) {
      setEnrollmentLoading(false);
      return;
    }
    try {
      const res = await fetch(`${baseAPI_URL}/get-user-data/${user.cognitoUser.username}`);
      const data = await res.json(); // assume it's a list of course IDs
      setEnrolledCourseIds(data.courses_enrolled);
    } catch (err) {
      console.error("Failed to fetch enrolled courses", err);
    } finally {
      setEnrollmentLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  if (loadingCourses) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;
  if (courses.length === 0) return <p>No courses found.</p>;

  return (
    <div className="course-container">
      <h1>Todos os cursos</h1>
      <p><b>{user ? (user.attributes?.name || user.getUsername()) : "Carregando nome..."}</b>, veja todos os cursos abaixo:</p>
      {user && (<a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          logout();
        }}
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} // optional styling
      >
        Sair da conta
      </a>)}
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.courseId} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p><strong>Professor:</strong> {course.instructor}</p>
            {course.availability === 'free' ? (
            <span className="free-course">Gratuito</span>
            ):(
            <span className="premium-course">Premium</span>
            )}            
            <div className="flex-row">
                <p>
                  {enrollmentLoading ? (
                    <span className="enrollment-status">Verificando...</span>
                  ) : enrolledCourseIds.includes(course.courseId) ? (
                    <span className="enrolled-badge">Iniciado</span>
                  ) : (
                    <span className="not-enrolled-badge">Não iniciado</span>
                  )}
                </p>
                <a href={`${base_URL}/coursepage/${course.courseId}`}>
                  {enrollmentLoading ? (
                      <span>Verificando...</span>
                    ) : enrolledCourseIds.includes(course.courseId) ? (
                      <span>Continuar</span>
                    ) : (
                      <span>Conhecer</span>
                    )}
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseList = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [accountType, setAccountType] = useState('free');
  const { user } = useAuth(); // removed isEnrolledInCourse here

  const checkEnrollment = async () => {
    if (user) {
      try {
        const enrolled = await isUserEnrolledInCourse(user.cognitoUser.username, courseId);
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error('Error checking enrollment:', err);
      } finally {
        setEnrollmentLoading(false);
      }
    } else {
      setEnrollmentLoading(false);
    }
  };

  const getUserInfo = async () => {
    if (user) {
      try {
        const res = await fetch(`${baseAPI_URL}/get-user-data/${user.cognitoUser.username}`);
        const data = await res.json();
        console.log("userData: ");
        console.log(data);
        setAccountType(data.account_type);
      } catch (err) {
        console.error('Error retrieving userData:', err);
      } finally {
        //console.error('Final error');
      }
    }
  }

  const fetchCourse = async () => {
    try {
      const res = await fetch(`${baseAPI_URL}/courses/${courseId}`);
      if (!res.ok) {
        throw new Error('Course not found');
      }
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    checkEnrollment();
    getUserInfo();
  }, [courseId, user]);

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!course) return <p>No course data available.</p>;

  return (
    <div className="course-container">
      <a href={`${base_URL}/allcourses`}>
        Voltar para a listagem de todos os cursos
      </a>
      <div className="course-header">
        <h1>{course.title}</h1>
        <div className="enrollment-status">
          {!user ? (
            <div className="login-prompt">
              <a href="/logon" className="login-link">Log in to enroll in this course</a>
            </div>
          ) : !enrollmentLoading && (
            isEnrolled ? (
              <span className="enrolled-badge">Iniciado</span>
            ) : (
              <EnrollButton 
                courseId={courseId}
                availability={course.availability}
                account_type={accountType}
                onEnroll={() => setIsEnrolled(true)}
              />
            )
          )}
        </div>
      </div>
      <p>{course.description}</p>
      <p><strong>Professor:</strong> {course.instructor}</p>
      <p><strong>Disponibilidade:</strong> {course.availability}</p>

      <h2>Conteúdo do curso</h2>
      {course.sections.map(section => (
        <div key={section.sectionId} className="course_section">
          <h3>{section.title}</h3>
          <ul className="lessons">
            {section.lessons.map(lesson => (
              <li key={lesson.lessonId} className="lesson">
                <h4 className="lesson-title">{lesson.title}</h4>
                <p className="lesson-description">{lesson.description}</p>
                {isEnrolled && (
                    <a href={`${base_URL}/courses/${courseId}/sections/${section.sectionId}/lessons/${lesson.lessonId}`}>
                    Assistir à aula
                    </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export {AllCoursesList, CourseList, Lesson};

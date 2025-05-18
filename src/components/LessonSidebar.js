import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext.js';
import { useParams, useNavigate } from 'react-router-dom';

const LessonSidebar = ({ courseId, currentLessonId, onLessonChange }) => {
  const { logout } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/courses/${courseId}`);
        if (!res.ok) throw new Error('Course not found');
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleLessonClick = (sectionId, lessonId) => {
    navigate(`/courses/${courseId}/sections/${sectionId}/lessons/${lessonId}`);
    if (onLessonChange) {
      onLessonChange(sectionId, lessonId);
    }
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  if (loading) return <div className="lesson-sidebar">Loading...</div>;
  if (!course) return <div className="lesson-sidebar">Course not found</div>;

  return (
    <>
      {isMobile && isCollapsed && (
        <button 
          className="mobile-menu-button"
          onClick={() => setIsCollapsed(false)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
      <div className={`lesson-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        {!isMobile && (
          <button 
            className="collapse-button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        )}
        
        {!isCollapsed && (
          <div className="sidebar-content">
            <div className="sidebar-header">
              <a 
                href="/allcourses" 
                className="all-courses-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/allcourses');
                }}
              >
                ← todos os cursos
              </a>
              <h3>{course.title}</h3>
              <a 
                href={`/coursepage/${courseId}`} 
                className="all-courses-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/coursepage/${courseId}`);
                }}
              >
                Acessar página de conteúdo do curso
              </a>
            </div>
            <div className="course-sections">
              {course.sections.map(section => (
                <div key={section.sectionId} className="section">
                  <h4>{section.title}</h4>
                  <ul className="lessons-list">
                    {section.lessons.map(lesson => (
                      <li 
                        key={lesson.lessonId}
                        className={`lesson-item ${lesson.lessonId === currentLessonId ? 'active' : ''}`}
                      >
                        <a
                          href={`/courses/${courseId}/sections/${section.sectionId}/lessons/${lesson.lessonId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleLessonClick(section.sectionId, lesson.lessonId);
                          }}
                        >
                          {lesson.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="course-sections">
                <div className="section">
                    <h4>Minha conta</h4>
                    <ul className="lessons-list">
                        <li>
                            <a
                            href={`#`}
                            onClick={logout}
                            >
                            Sair da conta
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LessonSidebar; 
import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AllCoursesPage, CoursePage, Home, LessonPage, Espera, Direto, Answer, AnswerList, SiteCheckout } from "./pages/index";
import PoliticaDePrivacidade from "./pages/politicadeprivacidade";
import TermosDeUso from "./pages/termosdeuso";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/login";
import {Signup} from './pages/signup';
import Logon from './pages/logon';
import VerifyAccount from './pages/verify';
import Recover from "./pages/recover.js"; 
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import CookieConsent from './pages/cookie_consent';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export default function App() {
  useEffect(() => {
    // Check if the user already has a UID stored in a cookie
    let userId = Cookies.get('uid');

    // If not, generate a new UID and set it as a cookie
    if (!userId) {
      userId = uuidv4();
      Cookies.set('uid', userId, { expires: 365 }); // Cookie expires in 1 year
    } 
  }, []);

  return (
    <Router>
      <CookieConsent />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />
        {/* Course Landing Page */}
        <Route path="/espera-dominio-eletrico" element={<Espera />} />
        <Route path="/direto-dominio-eletrico" element={<Direto />} />
        {/* Answers Page */}
        <Route path="/anslist" element={<AnswerList />} />
        <Route path="/answer/:postId" element={<Answer />} />
        {/* Course Content Page - Protected routes */}
        <Route
          path="/allcourses"
          element={
            <ProtectedRoute>
              <AllCoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coursepage/:courseId"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId/sections/:sectionId/lessons/:lessonId"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <SiteCheckout />
            </ProtectedRoute>
          }
        />
        {/* Authentication Pages */}
        <Route path="/login" element={<Login />} />
        <Route path='/logon' element={<Logon />}/>
        <Route path="/verify" element={<VerifyAccount/>}/>
        <Route path="/recover" element={<Recover/>}/>
        <Route path='/signup' element={<Signup />}/>
        {/* Legal Stuff */}
        <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termosdeuso" element={<TermosDeUso />} />
      </Routes>
    </Router>
  );
}

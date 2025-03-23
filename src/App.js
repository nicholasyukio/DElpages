import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Espera, Direto, Answer, AnswerList } from "./pages/index";
import PoliticaDePrivacidade from "./pages/politicadeprivacidade";
import TermosDeUso from "./pages/termosdeuso";
/* import Oferta from "./pages/oferta";
import Login from "./pages/login";
import WatchWithLoginPrompt from "./pages/watch";
import Signup from './pages/signup';
import Logon from './pages/logon';
import VerifyAccount from './pages/verify';
import Recover from "./pages/recover.js"; 
import { FeedWithLoginPrompt , SavedVideosPageWithLoginPrompt, PlaylistWithLoginPrompt } from "./pages/feed"; */
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
        <Route path="/" element={<Direto />} />
        <Route path="/espera-dominio-eletrico" element={<Espera />} />
        <Route path="/direto-dominio-eletrico" element={<Direto />} />
        <Route path="/anslist" element={<AnswerList />} />
        <Route path="/answer/:postId" element={<Answer />} />
        <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termosdeuso" element={<TermosDeUso />} />
        {/* <Route path="/oferta" element={<Oferta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch" element={<WatchWithLoginPrompt />} />
        <Route path="/feed" element={<FeedWithLoginPrompt />} />
        <Route path="/saved" element={<SavedVideosPageWithLoginPrompt />} />
        <Route path="/playlist" element={<PlaylistWithLoginPrompt />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/logon' element={<Logon />}/>
        <Route path="/verify" element={<VerifyAccount/>}/>
        <Route path="/recover" element={<Recover/>}/> */}
      </Routes>
    </Router>
  );
}

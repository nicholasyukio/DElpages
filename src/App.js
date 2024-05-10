import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Home , Espera, Direto } from "./pages/index";
import PoliticaDePrivacidade from "./pages/politicadeprivacidade";
import TermosDeUso from "./pages/termosdeuso";
import Oferta from "./pages/oferta";
import Login from "./pages/login";
import Watch from "./pages/watch";
import Signup from './pages/signup';
import Logon from './pages/logon';
import VerifyAccount from './pages/verify';
import Recover from "./pages/recover.js";
import { Feed , SavedVideosPage, Playlist } from "./pages/feed";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import CookieConsent from './pages/cookie_consent';

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
        <Route path="/" element={<Feed />} />
        <Route path="/espera-dominio-eletrico" element={<Espera />} />
        <Route path="/direto-dominio-eletrico" element={<Direto />} />
        <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termosdeuso" element={<TermosDeUso />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/saved" element={<SavedVideosPage />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path='/signup' element={<Signup />}/>
        <Route path='/logon' element={<Logon />}/>
        <Route path="/verify" element={<VerifyAccount/>}/>
        <Route path="/recover" element={<Recover/>}/>
        <Route path="*" element={<Espera />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

import React from "react";
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/espera-dominio-eletrico" element={<Espera />} />
        <Route path="/espera-dominio-eletrico/" element={<Espera />} />
        <Route path="/direto-dominio-eletrico" element={<Direto />} />
        <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termosdeuso" element={<TermosDeUso />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Espera />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

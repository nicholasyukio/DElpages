import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home , Direto } from "./pages/index";
import PoliticaDePrivacidade from "./pages/politicadeprivacidade";
import TermosDeUso from "./pages/termosdeuso";
import Oferta from "./pages/oferta";
import Login from "./pages/login";

export default function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/espera-dominio-eletrico" element={<Home />} />
            <Route exact path="/direto-dominio-eletrico" element={<Direto />} />
            <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
            <Route path="/termosdeuso" element={<TermosDeUso />} />
            <Route path="/oferta" element={<Oferta />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
);
}

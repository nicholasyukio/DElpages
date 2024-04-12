import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { Home , Espera, Direto } from "./pages/index";
import PoliticaDePrivacidade from "./pages/politicadeprivacidade";
import TermosDeUso from "./pages/termosdeuso";
import Oferta from "./pages/oferta";
import Login from "./pages/login";

export default function App() {
  const navigate = useNavigate();

  // Redirect routes with trailing slash to routes without trailing slash
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('/') && currentPath !== '/') {
      navigate(currentPath.slice(0, -1), { replace: true });
    }
  }, [navigate]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/espera-dominio-eletrico" element={<Espera />} />
        <Route path="/direto-dominio-eletrico" element={<Direto />} />
        <Route path="/politicadeprivacidade" element={<PoliticaDePrivacidade />} />
        <Route path="/termosdeuso" element={<TermosDeUso />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
);
}

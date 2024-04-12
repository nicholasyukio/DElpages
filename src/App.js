import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Espera, Direto } from "./pages/index";
import PoliticaDePrivacidade from "./pages/politicadeprivacidade";
import TermosDeUso from "./pages/termosdeuso";
import Oferta from "./pages/oferta";
import Login from "./pages/login";

// Custom route component to handle redirection of routes with trailing slashes
const CustomRoute = ({ path, element }) => {
  const hasTrailingSlash = path.endsWith("/");
  if (hasTrailingSlash && path !== "/") {
    const newPath = path.slice(0, -1);
    return <Route path={newPath} element={element} />;
  }
  return <Route path={path} element={element} />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Use CustomRoute instead of Route */}
        <CustomRoute path="/" element={<Home />} />
        <CustomRoute path="/espera-dominio-eletrico" element={<Espera />} />
        <CustomRoute path="/direto-dominio-eletrico" element={<Direto />} />
        <CustomRoute
          path="/politicadeprivacidade"
          element={<PoliticaDePrivacidade />}
        />
        <CustomRoute path="/termosdeuso" element={<TermosDeUso />} />
        <CustomRoute path="/oferta" element={<Oferta />} />
        <CustomRoute path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

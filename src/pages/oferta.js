// Filename - pages/oferta.js

import React from "react";
import Rodape from './rodape.js';
import OfertaBreve from "./oferta_breve.js";

const Oferta = () => {
	return (
    <>
    <section id="form" className="section">
    <img src="../dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" /> 
    <OfertaBreve />
    </section>
    <Rodape />
    </>
	);
};

export default Oferta;
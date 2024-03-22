// Filename - pages/login.js

import React from "react";
import Rodape from './rodape.js';

const Login = () => {
	return (
    <>
        <section id="form" className="section">
            <img src="dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="400" className="logo-image" />
            <h1>Aviso importante (LEIA TUDO COM ATENÇÃO):</h1>
            <div className="form-container">
                <p>Os cursos foram migrados para uma nova plataforma no sistema Moodle.</p>
                <p>Se você é aluno do curso Domínio Elétrico, faça login na nova plataforma:</p>
                <p><b>Login:</b> (o mesmo email que você já usava)</p>
                <p><b>Senha:</b> ksdafL8& (senha padrão)</p>
                <p>A senha <b>não</b> é a mesma da conta que você tinha na plataforma anterior. Caso você ainda não tenha acessado o curso na plataforma nova, tente a senha padrão acima.</p>
                <p>Você também poderá usar o link <i>"Perdeu sua senha?"</i> presente na página de login da nova plataforma para configurar uma nova senha. </p>
                <p>Os cursos não estão mais disponíveis neste endereço (dominioeletrico.com.br), mas apenas na nova plataforma.</p>
                <p><b>Se você leu com atenção todas as informações acima, clique no botão abaixo: </b></p>
                <button className="new-platform" onClick={() => window.location.href='https://curso.dominioeletrico.com.br/login/'}>
                    Acessar a nova plataforma
                </button>
                <p><b>Dica:</b> Adicione a página de login da nova plataforma <i>(https://curso.dominioeletrico.com.br/login)</i> nos favoritos do seu navegador.</p>
            </div>
    </section>
    <Rodape />
    </>
	);
};

export default Login;
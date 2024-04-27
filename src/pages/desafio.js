// Filename - pages/desafio.js

import React, { useState } from 'react';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import Rodape from './rodape.js';
import './watch.css';
import './desafio.css';
import { logEvent, sendEventsToAPI } from './tracking.js';

const extractURLparams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const utmTags = {};
    utmTags.utm_source = urlParams.get('utm_source') || '';
    utmTags.utm_medium = urlParams.get('utm_medium') || '';
    utmTags.utm_campaign = urlParams.get('utm_campaign') || '';
    utmTags.utm_term = urlParams.get('utm_term') || '';
    utmTags.utm_content = urlParams.get('utm_content') || '';
    utmTags.v = urlParams.get('v') || '';
    return utmTags;
};

const URLparams = extractURLparams();

function Form({ isMobileDevice }) {
    // Google ReCaptcha v3
    const [token, setToken] = useState("");
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

	//Email form
	const [emailForm, setEmailForm] = useState({
		name: '',
		email: '',
	});
	//Result of message
	const [result, setResult] = useState('');
	//Status of sending message
	const [status, setStatus] = useState('Fazer o meu cadastro no desafio');

	function resetEmailForm() {
		setEmailForm({ name: '', email: '', message: '' });
	}

	function handleEmailFormChange(event) {
		setEmailForm((prevEmailData) => {
			return {
				...prevEmailData,
				[event.target.name]: event.target.value,
			};
		});

		if (result.length > 0) {
			setResult('');
		}
	}

	const handleSubmit = async (e) => {
		setResult('');
		e.preventDefault();
		setStatus('Buscando...');

		const { name, email } = e.target.elements;

		let details = {
			name: name.value,
			email: email.value,
            "g-recaptcha-response": token,
            utm_source: URLparams.utm_source,
            utm_term: URLparams.v,
            utm_medium: "de_site"
		};

		try {
			let response = await fetch('https://dominioeletrico.com.br:5000/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(details),
			});
			setStatus('Fazer o meu cadastro no desafio');
			let result = await response.json();

			if (result.status === 'success') {
				setResult('Cadastro efetuado. Verifique a caixa de entrada do seu email.');
				resetEmailForm();
                window.dataLayer.push({
                    event: 'formSubmission', // Custom event name
                    buttonName: 'exampleButton', // Custom event data
                });
                logEvent('FormSubmitSuccess', details);
			} else if (result.status === 'fail') {
				alert('Ocorreu um erro. Tente novamente mais tarde.');
                logEvent('FormSubmitFail', details);
			}
		} catch (error) {
            setRefreshReCaptcha(!refreshReCaptcha);
			console.error(error);
			setStatus('Fazer o meu cadastro no desafio');
			setResult('Ocorreu um erro.');
            logEvent('FormSubmitCatchError', details);
		}
        sendEventsToAPI();
	};

    const setTokenFunc = (getToken) => {
        setToken(getToken);
    };

    if (isMobileDevice) {
        return (
            <div id="form" className="desafio-form-container-mobile">
                <img src="/desafio_eletrico_logo.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
                <h3>Como vai funcionar?</h3>
                <p>Você vai receber por email o acesso a algumas aulas online de circuitos elétricos.</p>
                <p>Então no dia 07/05/24, você receberá uma questão de circuitos bem parecida com os exemplos das aulas indicadas. Você terá 24 horas para resolver.</p>
                <h3>Mas o que você ganha com isso?</h3>
                <p>Além do conhecimento em si, você receberá uma oferta especial para fazer a sua inscrição no curso Domínio Elétrico (todas informações sobre o curso serão passadas por email também).</p>
                <p>Para participar, <b>cadastre-se preenchendo os campos abaixo:</b></p>
                <form id="frm" className="contact_form" onSubmit={handleSubmit} method="post">
                    <label for="nome">Nome:</label>
                    <input placeholder="Nome*" type="text" id="nome" name="name" required={true} value={emailForm.name} onChange={handleEmailFormChange} /><br />
                    <label for="email">Email:</label>
                    <input placeholder="Endereço de email*" type="email" id="email" name="email" required={true} value={emailForm.email} onChange={handleEmailFormChange} /><br />
                    <button type="submit">{status}</button>
                    <GoogleReCaptchaProvider reCaptchaKey="6LfaEm0pAAAAABZ2_j0qDhbGcqbPoRSQgBexc3ET">
                    <GoogleReCaptcha
                      className="google-recaptcha-custom-class"
                      onVerify={setTokenFunc}
                      refreshReCaptcha={refreshReCaptcha}
                    />
                    </GoogleReCaptchaProvider>
                    <p className="politicadeprivacidade">Seus dados estão seguros. <a href="../politicadeprivacidade">Política de privacidade</a></p>
                </form>
            </div>
          );
    } else {
        return (
            <div id="form" className="desafio-form-container">
                <img src="/desafio_eletrico_logo.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
                <h3>Como vai funcionar?</h3>
                <p>Você vai receber por email o acesso a algumas aulas online de circuitos elétricos.</p>
                <p>Então no dia 07/05/24, você receberá uma questão de circuitos bem parecida com os exemplos das aulas indicadas. Você terá 24 horas para resolver.</p>
                <h3>Mas o que você ganha com isso?</h3>
                <p>Além do conhecimento em si, você receberá uma oferta especial para fazer a sua inscrição no curso Domínio Elétrico (todas informações sobre o curso serão passadas por email também).</p>
                <p>Para participar, <b>cadastre-se preenchendo os campos abaixo:</b></p>
                <form id="frm" className="contact_form" onSubmit={handleSubmit} method="post">
                    <label for="nome">Nome:</label>
                    <input placeholder="Nome*" type="text" id="nome" name="name" required={true} value={emailForm.name} onChange={handleEmailFormChange} /><br />
                    <label for="email">Email:</label>
                    <input placeholder="Endereço de email*" type="email" id="email" name="email" required={true} value={emailForm.email} onChange={handleEmailFormChange} /><br />
                    <button type="submit">{status}</button>
                    <GoogleReCaptchaProvider reCaptchaKey="6LfaEm0pAAAAABZ2_j0qDhbGcqbPoRSQgBexc3ET">
                    <GoogleReCaptcha
                      className="google-recaptcha-custom-class"
                      onVerify={setTokenFunc}
                      refreshReCaptcha={refreshReCaptcha}
                    />
                    </GoogleReCaptchaProvider>
                    <p className="politicadeprivacidade">Seus dados estão seguros. <a href="../politicadeprivacidade">Política de privacidade</a></p>
                </form>
            </div>
          );
    }

}

const DesafioCadastro = () => {
    // State to track the device type
    const [isMobile, setIsMobile] = useState(false);
    // Function to check if the device is a mobile
    const checkIfMobile = () => {
        const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
        setIsMobile(isMobileDevice);
    };

    // Check the device type when the component mounts
    React.useEffect(() => {
        checkIfMobile();
        // Add event listener to check if the device type changes
        window.addEventListener('resize', checkIfMobile);
        // Remove event listener on component unmount
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    if (isMobile) {
        return (
            <>
            <div className="top-container-mobile">
                <div className="left-div">
                    <Form isMobileDevice={isMobile}/>
                    <Bio />
                </div>
            </div>
            <Rodape />
            </>
        );
    } else {
        return (
            <>
            <div className="top-container"> 
                <div className="left-div">
                    <Form isMobileDevice={isMobile}/>
                    <Bio />
                </div> 
            </div>
            <Rodape />
            </>
        );
    }
};

export default DesafioCadastro;

function Bio() {
    return (
    <section className="section">
    <div className="content-container-desafio">
        <figure>
        <img src="/foto_pessoal_pequena-768x765.jpg" alt="Bio" width="360" className="bio-image" />
        </figure>
        <div className="text">
        <h2>Sobre o Prof. Nicholas Yukio</h2>
        <p>Sou engenheiro eletrônico formado no ITA em 2017. </p>
        <p>Comecei a vida profissional como professor da disciplina de circuitos elétricos no ITA, onde trabalhei de 2018 até março de 2020.</p>
        <p>Em 2019, levei meu ensino de circuitos elétricos para a internet, com minhas aulas públicas no Canal do Elétron.</p>
        <p>No início de 2020, criei meu curso online de circuitos elétricos, o Domínio Elétrico, focado em alunos de engenharia.</p>
        <p>De lá para cá, já são cerca de 500 alunos do curso que aprendem comigo e que podem tirar dúvidas individualmente comigo.</p>
        <p>Muitos são alunos de diversas faculdades, públicas e privadas, mas há também alunos de cursos técnicos e profissionais já formados que querem revisar seus conhecimentos.</p>
        <p>A minha missão aqui é: ensinar da melhor forma possível quem quer estudar sério circuitos elétricos.</p>
        {/* <FormButton buttonName="Bio" /> */}
        </div>
    </div>
    </section>
    );
}
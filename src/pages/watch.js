// Filename - pages/watch.js

import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import Rodape from './rodape.js';
import './watch.css';

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

function Video({ videoId }) {
    console.log(videoId);
    const video_src = `https://iframe.mediadelivery.net/embed/188909/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
    console.log(video_src);
    return (
        <div className="watch-container">
            <div style={{ position: 'auto' }}>
                <iframe 
                    src={video_src}
                    width="480" 
                    height="270" 
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                    allowFullScreen={true}
                    title="Embedded Video"
                ></iframe>
            </div>
        </div>
    );
}

function Header() {
    return (
      <div id="headercta" className="watch-header-container">
          <h2>O curso online de circuitos em nível de engenharia</h2>
      </div>
    );
}

function HeaderComponent({ imageSrc, headerText }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="watch-header-container">
            <div style={{ flex: '1', width: '20%' }}>
                <img src={imageSrc} alt="Square Image" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ flex: '4', width: '80%' }} className="text-header">
                <h2>{headerText}</h2>
            </div>
        </div>
    );
}

function Form({ showOffer, onVariableChange }) {
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
	const [status, setStatus] = useState('Buscar oferta para o curso');

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
            utm_term: URLparams.utm_term,
            utm_medium: URLparams.utm_medium
		};

		try {
			let response = await fetch('https://dominioeletrico.com.br:5000/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(details),
			});
			setStatus('Buscar oferta para o curso');
			let result = await response.json();

			if (result.status === 'success') {
				setResult('Oferta encontrada. Encaminhando para o pagamento.');
				resetEmailForm();
                onVariableChange(true);
                window.dataLayer.push({
                    event: 'formSubmission', // Custom event name
                    buttonName: 'exampleButton', // Custom event data
                });
                // logEvent('FormSubmitSuccess', details);
			} else if (result.status === 'fail') {
				alert('Ocorreu um erro. Tente novamente mais tarde.');
                // logEvent('FormSubmitFail', details);
			}
		} catch (error) {
            setRefreshReCaptcha(!refreshReCaptcha);
			console.error(error);
			setStatus('Buscar oferta para o curso');
			setResult('Ocorreu um erro.');
            // logEvent('FormSubmitCatchError', details);
		}
        // sendEventsToAPI();
	};

    const setTokenFunc = (getToken) => {
        setToken(getToken);
    };

    return (
      <div id="form" className="form-container">
          <h2>Vamos começar no Domínio Elétrico?</h2>
          <p>Com uma assinatura anual, você aprende circuitos elétricos com aulas gravadas e tira dúvidas com o Prof. Nicholas Yukio.</p>
          <p>Para você começar a dominar os circuitos, <b>preencha os campos abaixo que vamos buscar uma oferta para você:</b></p>
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
              <h3>{result}</h3>
              <p className="politicadeprivacidade">Seus dados estão seguros. <a href="../politicadeprivacidade">Política de privacidade</a></p>
          </form>
      </div>
    );
}

const Watch = () => {
    const videoId = URLparams.v;
    const [showOffer, setGlobalVariable] = useState(false);

    const handleVariableChange = (newValue) => {
        // Update the globalVariable when needed
        setGlobalVariable(newValue);
    };
	return (
        <div>
        <HeaderComponent imageSrc="dominio_eletrico_logo_2023_square_fundo_transparente.png" headerText="Aula de circuitos elétricos: título do vídeo de circuitos" />
        <Video videoId={videoId} />
        <section id="form" class="section">
        <h1>Termos de uso</h1>
        </section>
        <Form showOffer={false} onVariableChange={handleVariableChange} />
        <Rodape />
        </div>
	);
};

export default Watch;
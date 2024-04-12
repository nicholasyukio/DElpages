// Filename - pages/index.js

import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import { toggleLessonList } from './course_content_script.js';
import Rodape from './rodape.js';
import OfertaBreve from './oferta_breve.js';
import { v4 as uuidv4 } from 'uuid';

let eventsArray = [];

const logEvent = (eventName, eventData) => {
    eventsArray.push({ eventName, eventData });
    console.log(eventsArray);
};

const uuid = uuidv4();
logEvent('uuid', uuid);

const SectionTracker = ({ sectionId }) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartTime(new Date());
          } else {
            setEndTime(new Date());
          }
        });
      });
  
      const section = document.querySelector(`#${sectionId}`);
      if (section) {
        observer.observe(section);
      }
  
      return () => {
        if (section) {
          observer.unobserve(section);
        }
      };
    }, [sectionId]);
  
    useEffect(() => {
      if (endTime) {
        const timeSpent = endTime - startTime;
        if (timeSpent < 31000000000) {
            logEvent('TimeSpent', `${timeSpent} milliseconds spent in ${sectionId}`);
        }
        // Perform any other actions with the time spent
        // setStartTime(null); 
        // setEndTime(null); 
      }
    }, [endTime, sectionId]);
  
    return (
      <section id={sectionId}>
        {/* Section content */}
      </section>
    );
};

// Function to send events to API
const sendEventsToAPI = async () => {
    // Send eventsArray to API via POST request
    let response = await fetch('https://api.dominioeletrico.com.br/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(eventsArray),
    });
    let result = await response.json();
    if (result.status === 'success') {
        console.log("Send Events to API Success");
    } else if (result.status === 'fail') {
        console.log("Send Events to API Fail");
    }
};

// Listen for page exit event
window.addEventListener('beforeunload', () => {
    // Call sendEventsToAPI just before the user exits the page
    sendEventsToAPI();
});

const Home = () => {
    const [showOffer, setGlobalVariable] = useState(false);

    const handleVariableChange = (newValue) => {
        // Update the globalVariable when needed
        setGlobalVariable(newValue);
    };
	return (
        <>
        <section className="section">
        <img src="/dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
		<div className="content-container">
            <Video />
            <HeaderCTA />
		</div>
        </section>
        <BriefDescription />
        <CourseContent />
        <StudentsProfile />
        <ElectronicsContent />
        <FromBasicsToAdvanced />
        <MatematicaDoEletron />
        <TheoryAndPractice />
        <EletronQuest />
        <Depoimentos />
        <SpecialWarnings />
        {showOffer === false ? <Form showOffer={showOffer} onVariableChange={handleVariableChange} /> : <OfertaBreve />}
        <Bio />
        <Rodape />
        </>
	);
};

const Espera = () => {
    const [showOffer, setGlobalVariable] = useState(false);

    const handleVariableChange = (newValue) => {
        // Update the globalVariable when needed
        setGlobalVariable(newValue);
    };
	return (
        <>
        <section className="section">
        <img src="/dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
		<div className="content-container">
            <Video />
            <HeaderCTA />
		</div>
        </section>
        <BriefDescription />
        <CourseContent />
        <StudentsProfile />
        <ElectronicsContent />
        <FromBasicsToAdvanced />
        <MatematicaDoEletron />
        <TheoryAndPractice />
        <EletronQuest />
        <Depoimentos />
        <SpecialWarnings />
        {showOffer === false ? <Form showOffer={showOffer} onVariableChange={handleVariableChange} /> : <OfertaBreve />}
        <Bio />
        <Rodape />
        </>
	);
};

const Direto = () => {
	return (
        <>
        <section className="section">
        <img src="/dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
		<div className="content-container">
            <Video />
            <HeaderCTA />
		</div>
        </section>
        <BriefDescription />
        <CourseContent />
        <StudentsProfile />
        <ElectronicsContent />
        <FromBasicsToAdvanced />
        <MatematicaDoEletron />
        <TheoryAndPractice />
        <EletronQuest />
        <Depoimentos />
        <SpecialWarnings />
        <OfertaBreve />
        <Bio />
        <Rodape />
        </>
	);
};

export { Home, Espera, Direto };

function Video() {
    return (
        <div className="video-container">
            <SectionTracker sectionId="Video" />
            <div style={{ position: 'auto' }}>
            <iframe 
            src="https://iframe.mediadelivery.net/embed/188909/9a1e7507-19c9-4240-ac99-aeccd21b5120?autoplay=false&loop=false&muted=false&preload=true&responsive=true" 
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

function FormButton({ buttonName }) {
    const handleClick = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForOfertaDE', // Custom event name
            buttonName: 'clickForOfertaDE', // Custom event data, you can adjust this as needed
        });
        logEvent('ButtonClick', `${buttonName} clicked`);
        // Redirect the user after pushing the data to GTM if needed
        window.location.href = '#form'; // Redirect to the form anchor
    };

    return (
        <button className="btn-inscricao" onClick={handleClick}>
            Quero ser aluno do Domínio Elétrico
        </button>
    );
}

function HeaderCTA() {
    return (
      <div id="headercta" className="header-container">
          <SectionTracker sectionId="HeaderCTA" />
          <h2>O curso online de circuitos em nível de engenharia</h2>
          <p>Para começar a aprender circuitos com as minhas aulas e tirar dúvidas direto comigo (<b>Prof. Nicholas Yukio</b>), leia mais sobre o curso nesta página ou, se quiser, clique direto no botão abaixo.</p>
          <FormButton buttonName="HeaderCTA" />
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
            "g-recaptcha-response": token
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
                logEvent('FormSubmitSucess', details);
			} else if (result.status === 'fail') {
				alert('Ocorreu um erro. Tente novamente mais tarde.');
                logEvent('FormSubmitFail', details);
			}
		} catch (error) {
            setRefreshReCaptcha(!refreshReCaptcha);
			console.error(error);
			setStatus('Buscar oferta para o curso');
			setResult('Ocorreu um erro.');
            logEvent('FormSubmitCatchError', details);
		}
        sendEventsToAPI();
	};

    const setTokenFunc = (getToken) => {
        setToken(getToken);
    };

    return (
      <div id="form" className="form-container">
        <SectionTracker sectionId="FormCont" />
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

function BriefDescription() {
    return (     
    <section className="section">
    <h2 align="center">O Domínio Elétrico é um curso online de circuitos elétricos. Como assim?</h2>
    <div className="content-container">
        <SectionTracker sectionId="BriefDescription" />
        <figure>
        <img src="/circuito2_fundo_transparente.png" alt="Imagem da Seção 1" width="800" />
        </figure>
        <div className="text">
        <p><strong>"Circuitos Elétricos"</strong> é o nome comum para matérias estudadas em cursos superiores de engenharia, principalmente elétrica e eletrônica. Essa matéria costuma ser ministrada nas disciplinas de Circuitos Elétricos I, II e III e é fundamental para a formação de profissionais dessas engenharias.</p>
        <p><strong>Porém,</strong> é comum que os alunos de faculdades brasileiras, tanto públicas quanto privadas, tenham dificuldades para aprender a matéria apenas com o material e aulas do professor da faculdade. O Domínio Elétrico vem atender melhor essa demanda com um curso de circuitos elétricos com aulas didáticas, exercícios resolvidos, suporte para tira-dúvidas e muito mais.</p>
        <p>Ao longo desta página, você verá todas as informações importantes do curso e poderá decidir se faz sentido para você. Para se inscrever no curso, clique no botão abaixo.</p>
        <FormButton buttonName="BriefDescription" />
        </div>
    </div>
    </section>
    );
}

function Bio() {
    return (
    <section className="section">
    <div className="content-container">
    <SectionTracker sectionId="Bio" />
        <figure>
        <img src="/foto_pessoal_pequena-768x765.jpg" alt="Imagem da Seção 1" width="360" className="bio-image" />
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
        <FormButton buttonName="Bio" />
        </div>
    </div>
    </section>
    );
}

function CourseContent() {
    // Seleciona todos os cabeçalhos de módulo
    document.addEventListener('DOMContentLoaded', function() {
        const moduleHeaders = document.querySelectorAll('.module-header');
        // Adiciona um ouvinte de evento de clique a cada cabeçalho de módulo
        moduleHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const lessonList = header.nextElementSibling;
                toggleLessonList(lessonList);
            });
        });
    });
     
    return (
        <section className="section">
        <div className="content-container-single-column">
        <SectionTracker sectionId="CourseContent" />
        <h2>Veja o conteúdo principal do curso:</h2>
        <p>(clique nos nomes dos módulos para ver a lista das aulas com a duração de cada uma):</p>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 1: Conceitos Básicos</h3>
            <ul className="lesson-list">
                <li>Introdução a Circuitos Elétricos 03:49</li>
                <li>Sistemas de Unidades/Múltiplos e Submúltiplos 10:12</li>
                <li>Carga Elétrica 20:38</li>
                <li>Corrente Elétrica 24:57</li>
                <li>Tensão Elétrica 22:12</li>
                <li>Circuito Elétrico Simples 05:50</li>
                <li>Potência Elétrica e Energia Elétrica 37:02</li>
                <li>Circuito Elétrico e seus elementos 15:32</li>
                <li>Lei de Ohm 20:04</li>
                <li>Curto-circuito e circuito aberto 06:29</li>
                <li>Nós, ramos e Malhas 05:11</li>
                <li>Lei de Kirchhoff das Correntes 09:15</li>
                <li>Lei de Kirchhoff das Tensões 10:30</li>
                <li>Resistores em série e divisão de tensão 13:17</li>
                <li>Resistores em paralelo e divisão de corrente 14:22</li>
                <li>Associação de Resistores 22:41</li>
                <li>Exercícios Resolvidos (#1 ao #5) 28:04</li>
                <li>Exercícios Resolvidos (#6 ao #10) 36:39</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>

        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 2: Componentes Eletrônicos</h3>
            <ul className="lesson-list">
                <li>Introdução 15:52</li>
                <li>Fontes de tensão 01:06:06</li>
                <li>Resistores 31:09</li>
                <li>Capacitores 01:01:03</li>
                <li>Indutores e Transformadores 01:48:01</li>
                <li>Componentes Passivos e Ativos 47:40</li>
                <li>Componentes não lineares: Diodos e Transistores 01:06:41</li>
                <li>Material pdf das aulas</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 3: Análise Básica de Circuitos</h3>
            <ul className="lesson-list">
                <li>Introdução à Análise de Circuitos 08:55</li>
                <li>Análise Nodal: tensão de nó 14:42</li>
                <li>Análise Nodal: tensão de nó (exemplo) 07:57</li>
                <li>Análise Nodal: sem fontes de tensão 16:23</li>
                <li>Análise Nodal: sem fontes de tensão (exemplo) 25:55</li>
                <li>Análise Nodal: com fontes de tensão 20:19</li>
                <li>Análise de Malhas: corrrente de malha 12:47</li>
                <li>Análise de Malhas: corrrente de malha (exemplo) 10:50</li>
                <li>Análise de Malhas: sem fontes de corrrente 14:31</li>
                <li>Análise de Malhas: sem fontes de corrrente (exemplo) 20:52</li>
                <li>Análise de Malhas: com fontes de corrrente 18:41</li>
                <li>Análise Nodal e de Malhas – qual escolher? 13:07</li>
                <li>Supernó e supermalha 20:05</li>
                <li>Linearidade em Circuitos Elétricos 16:57</li>
                <li>Teorema da Superposição 21:54</li>
                <li>Teorema da Superposição (exemplo) 22:45</li>
                <li>Transformação de Fontes 24:05</li>
                <li>Equivalentes Thévenin e Norton 37:00</li>
                <li>Potência em um resistor 18:45</li>
                <li>Verificação da resposta por simulação no LTSpice 32:38</li>
                <li>Exercício Resolvido #01: Análise Nodal 17:52</li>
                <li>Exercício Resolvido #02: Análise Nodal 27:11</li>
                <li>Exercício Resolvido #03: Análise de Malhas 20:06</li>
                <li>Exercício Resolvido #04: Análise de Malhas 15:34</li>
                <li>Exercício Resolvido #05: Linearidade 06:02</li>
                <li>Exercício Resolvido #06: Teorema da Superposição 37:51</li>
                <li>Exercício Resolvido #07: Transformação de Fontes 10:55</li>
                <li>Exercício Resolvido #08: Equivalente Thévenin 11:15</li>
                <li>Exercício Resolvido #09: Equivalente Norton 06:06</li>
                <li>Exercício Resolvido #10: Máxima Transferência de Potência 14:16</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de Exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 4: Circuitos de Primeira Ordem</h3>
            <ul className="lesson-list">
                <li>Circuitos de Primeira Ordem: Introdução, Simulação e Aplicações 38:28</li>
                <li>Básico de Capacitores e Indutores 45:58</li>
                <li>Circuitos de primeira ordem (RC e RL) sem fontes 39:10</li>
                <li>Circuitos de primeira ordem (RC) com fonte constante 33:11</li>
                <li>Obtenção de uma variável qualquer 26:43</li>
                <li>A constante de tempo 33:56</li>
                <li>Circuitos com comutações 49:22</li>
                <li>Exercício Resolvido #01: Associação de Capacitores 11:28</li>
                <li>Exercício Resolvido #02: Corrente em um capacitor 04:09</li>
                <li>Exercício Resolvido #03: Tensão em um capacitor 05:24</li>
                <li>Exercício Resolvido #04: Associação de Indutores 11:35</li>
                <li>Exercício Resolvido #05: Tensão em um indutor 04:16</li>
                <li>Exercício Resolvido #06: Corrente em um indutor 04:35</li>
                <li>Exercício Resolvido #07: Descarga de um capacitor 08:04</li>
                <li>Exercício Resolvido #08: Descarga de Capacitor 07:17</li>
                <li>Exercício Resolvido #09: Duas cargas em um capacitor 22:53</li>
                <li>Exercício Resolvido #10: Energia Armazenada em um Indutor 11:59</li>
                <li>Exercício Resolvido #11: Corrente e Tensão em um circuito RL 13:54</li>
                <li>Exercício Resolvido #12: Energia Armazenada em um indutor 13:21</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 5: Circuitos de Segunda Ordem</h3>
            <ul className="lesson-list">
                <li>Circuitos de Segunda Ordem: Introdução, Simulação e Aplicações 26:14</li>
                <li>Valores iniciais, finais e continuidade 27:38</li>
                <li>Escrevendo EDOs para circuitos de segunda ordem 33:21</li>
                <li>Circuitos de Segunda Ordem sem fontes – tipos de resposta 40:38</li>
                <li>Circuitos de Segunda Ordem: Resposta Super-amortecida 31:39</li>
                <li>Circuitos de Segunda Ordem: Resposta criticamente amortecida 28:43</li>
                <li>Circuitos de Segunda Ordem: Resposta sub-amortecida 40:54</li>
                <li>Circuitos de Segunda Ordem: Comparação entre as respostas 27:55</li>
                <li>Circuitos de Segunda Ordem com fontes constantes 01:09:25</li>
                <li>Exercício Resolvido #01: Continuidade da Tensão e da Corrente 24:40</li>
                <li>Exercício Resolvido #02: Resolução de EDO no caso crítico 07:50</li>
                <li>Exercício Resolvido #03: RLC super-amortecido 25:56</li>
                <li>Exercício Resolvido #04: Circuito LC 18:49</li>
                <li>Exercício Resolvido #05: RLC paralelo – sub-amortecida 08:42</li>
                <li>Exercício Resolvido #06: Circuito RLC 42:11</li>
                <li>Exercício Resolvido #07: LC, degrau 20:42</li>
                <li>Exercício Resolvido #08: Circuito RLC 36:42</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 6: Circuitos em Corrente Alternada</h3>
            <ul className="lesson-list">
                <li>Introdução a Circuitos em Corrente Alternada 28:16</li>
                <li>Amplitude, fase, período e frequência 51:42</li>
                <li>Por que regime permanente senoidal? 30:02</li>
                <li>Básico de Números Complexos 01:05:04</li>
                <li>Fasores 24:22</li>
                <li>Impedâncias e Admitâncias 38:11</li>
                <li>Associação de Impedâncias 17:37</li>
                <li>Análise Básica de Circuitos em Corrente Alternada 38:11</li>
                <li>Teorema da Superposição em Corrente Alternada 25:22</li>
                <li>Equivalentes Thévenin e Norton em Corrente Alternada 25:08</li>
                <li>Potência Instantânea e Média 29:15</li>
                <li>Máxima Transferência de Potência 27:15</li>
                <li>Valor Eficaz ou RMS 19:17</li>
                <li>Potência Complexa e Fator de Potência 34:49</li>
                <li>Exercício Resolvido #01: Básico de Corrente Alternada 09:11</li>
                <li>Exercício Resolvido #02: Impedância e Admitância Equivalente 10:18</li>
                <li>Exercício Resolvido #03: Impedância Equivalente de RLC série 09:09</li>
                <li>Exercício Resolvido #04: Análise Nodal 12:03</li>
                <li>Exercício Resolvido #05: Análise de Malhas 15:58</li>
                <li>Exercício Resolvido #06: Teorema da Superposição 20:19</li>
                <li>Exercício Resolvido #07: Equivalentes Thévenin e Norton 20:12</li>
                <li>Exercício Resolvido #08: Potência Média 15:56</li>
                <li>Exercício Resolvido #09: Máxima Transferência de Potência 16:39</li>
                <li>Exercício Resolvido #10: Potência Complexa 15:33</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 7: Circuitos Trifásicos</h3>
            <ul className="lesson-list">
                <li>Introdução a Circuitos Trifásicos 15:39</li>
                <li>Tensões Trifásicas 18:47</li>
                <li>Circuito Trifásico Equilibrado e Conexões 13:33</li>
                <li>Termos Usados 37:33</li>
                <li>Circuito Estrela-Estrela Equilibrado 33:12</li>
                <li>Circuito Monofásico Equivalente 10:46</li>
                <li>Circuito Estrela-Triângulo Equilibrado 23:07</li>
                <li>Circuito Triângulo-Estrela Equilibrado 19:39</li>
                <li>Circuito Triângulo-Triângulo Equilibrado 23:09</li>
                <li>Aplicações dos Conceitos de Circuitos Trifásicos 14:48</li>
                <li>Potência Instantânea em Circuitos Trifásicos 21:28</li>
                <li>Potência Complexa em Circuitos Trifásicos 17:41</li>
                <li>Exemplo de Potência Complexa 10:51</li>
                <li>Exercício Resolvido #01: Conceitos Iniciais 18:09</li>
                <li>Exercício Resolvido #02: Circuito Estrela-Estrela Equilibrado 12:03</li>
                <li>Exercício Resolvido #03: Circuito Estrela-Triângulo Equilibrado 16:06</li>
                <li>Exercício Resolvido #04: Circuito Triângulo-Estrela Equilibrado 14:06</li>
                <li>Exercício Resolvido #05: Circuito Triângulo-Triângulo Equilibrado 16:36</li>
                <li>Exercício Resolvido #06: Potência Complexa e Fator de Potência 18:06</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 8: Análise Avançada de Circuitos</h3>
            <ul className="lesson-list">
                <li>Introdução à Análise Avançada de Circuitos 31:52</li>
                <li>Funções de Singularidade: Degrau, Impulso e Rampa 30:07</li>
                <li>Transformada de Laplace: Definição 34:41</li>
                <li>Transformada de Laplace: Propriedades 47:56</li>
                <li>Transformada de Laplace: Uso na análise de circuitos 47:59</li>
                <li>Aplicações da Transformada de Laplace 47:15</li>
                <li>Série de Fourier: Definição 50:06</li>
                <li>Série de Fourier: Uso na análise de circuitos elétricos 28:10</li>
                <li>Série de Fourier: Teorema de Parseval 46:58</li>
                <li>Série de Fourier: Forma Exponencial 46:04</li>
                <li>Transformada de Fourier: Definição 56:28</li>
                <li>Transformada de Fourier: Propriedades 48:15</li>
                <li>Transformada de Fourier: Uso na Análise de Circuitos 32:23</li>
                <li>Transformada de Fourier: Teorema de Parseval 41:37</li>
                <li>Aplicações da Transformada de Fourier 50:43</li>
                <li>Exercício Resolvido #01: Cálculo de transformada de Laplace a partir do gráfico 29:16</li>
                <li>Exercício Resolvido #02: Cálculo de transformada inversa de Laplace usando a tabela 16:12</li>
                <li>Exercício Resolvido #03: Análise de circuitos com a transformada de Laplace 19:58</li>
                <li>Exercício Resolvido #04: Filtro passivo passa-faixas com circuito RLC (Aplicação de Laplace) 16:41</li>
                <li>Exercício Resolvido #05: Cálculo de Série de Fourier 26:57</li>
                <li>Exercício Resolvido #06: Uso da Série de Fourier na análise de circuitos 22:31</li>
                <li>Exercício Resolvido #07: Cálculo de Transformada de Fourier 11:47</li>
                <li>Exercício Resolvido #08: Uso da transformada de Fourier na análise de circuitos 16:32</li>
                <li>Exercício Resolvido #09: Teorema de Parseval 15:57</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Tabela de transformadas de Fourier</li>
                <li>Lista de Exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 9: Semicondutores</h3>
            <ul className="lesson-list">
                <li>Semicondutores – Introdução 44:46</li>
                <li>Junção PN e o diodo 50:45</li>
                <li>Diodos especiais 27:40</li>
                <li>Transistor Bipolar de Junção (BJT) 01:26:23</li>
                <li>[Documentário Legendado] The transistor 09:36</li>
                <li>Transistor MOSFET 01:16:39</li>
                <li>Outros transistores: JFET, HBT, HEMT, MESFET, IGBT 23:07</li>
                <li>Exercício Resolvido #01: Diodo e Equivalente Thévenin 14:46</li>
                <li>Exercício Resolvido #02: Circuito com dois diodos e fonte de corrente 14:51</li>
                <li>Exercício Resolvido #03: Análise iterativa de tensão e corrente em diodo 15:23</li>
                <li>Exercício Resolvido #04: Circuitos com um transistor BJT 14:22</li>
                <li>Exercício Resolvido #05: Circuito com transistor BJT 07:37</li>
                <li>Exercício Resolvido #06: Circuito com dois transistores BJT 27:44</li>
                <li>Exercício Resolvido #07: Transistor MOSFET saturado 11:15</li>
                <li>Exercício Resolvido #08: Projeto de circuito simples com MOSFET 14:19</li>
                <li>Exercício Resolvido #09: Circuito com dois MOSFETs e resistor 12:03</li>
                <li>Material pdf das aulas e exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 10: Circuitos Analógicos</h3>
            <ul className="lesson-list">
                <li>Introdução a Circuitos Analógicos 32:02</li>
                <li>Detalhes sobre implementação prática 34:48</li>
                <li>Resposta em Frequência e Diagrama de Bode 58:03</li>
                <li>Análise DC, Ponto de Operação, Análise AC e Pequenos Sinais 49:17</li>
                <li>Amplificadores Operacionais 01:19:18</li>
                <li>Circuito Analógico: Conversor Digital Analógico R/2R 41:28</li>
                <li>Circuito Analógico: Schmitt Trigger (Multivibradores biestável e astável com amp-op) 57:53</li>
                <li>Circuito Analógico: Filtros elétricos passivos e ativos 53:32</li>
                <li>Circuito Analógico: Amplificador com BJT 1:19:05</li>
                <li>Circuito Analógico: Oscilador com ponte de Wien 57:58</li>
                <li>Material pdf das aulas</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        <div className="module" onClick={(event) => toggleLessonList(event)}>
            <h3 className="module-header">Módulo 11: Circuitos Digitais</h3>
            <ul className="lesson-list">
                <li>Introdução aos circuitos digitais 22:48</li>
                <li>Implementação de Circuitos Digitais 22:27</li>
                <li>Sistemas de Numeração e Códigos 44:21</li>
                <li>Portas Lógicas 33:37</li>
                <li>Lógica Booleana 26:24</li>
                <li>Circuitos Combinacionais 49:35</li>
                <li>CMOS: Implementação de funções lógicas com transistores MOS 22:29</li>
                <li>Latch e Flip-flop 49:14</li>
                <li>Circuitos Sequenciais 25:47</li>
                <li>Exercício Resolvido #01: Conversão de número de binário para decimal e vice-versa 8:57</li>
                <li>Exercício Resolvido #02: Simplificação de expressões lógicas 9:10</li>
                <li>Exercício Resolvido #03: Implementação com portas lógicas 8:37</li>
                <li>Exercício Resolvido #04: Tabela-verdade 17:23</li>
                <li>Exercício Resolvido #05: Mapa de Karnaugh 13:02</li>
                <li>Material pdf das aulas</li>
                <li>Material pdf dos exercícios resolvidos</li>
                <li>Lista de exercícios</li>
            </ul>
        </div>
        </div>     
    </section>
    );
}

function StudentsProfile() {
    return (
    <section className="section">
    <SectionTracker sectionId="StudentsProfile" />
    <div className="content-container">
        <figure>
        <img src="/Word-Art_fundo_transparente.png" alt="Imagem da Seção 1" width="1200" />
        </figure>
        <div className="text">
        <h2>Qual o perfil de aluno do Domínio Elétrico?</h2>
        <p>Fizemos uma pesquisa entre os alunos do curso Domínio Elétrico para saber em que instituição eles estudam. Você pode ver o resultado na imagem. Os nomes com fonte maior são os mais representados.</p>
        <p>Perceba que o Domínio Elétrico tem alunos de todo tipo de faculdade ou escola técnica. Veja se você encontra a sua faculdade na lista. Se não encontrar, seja o primeiro da sua faculdade a entrar para o Domínio Elétrico.</p>
        <p>Isso significa que o Domínio Elétrico serve para qualquer pessoa com interesse em estudar circuitos elétricos, não importa quão básico ou avançado seja.</p>
        <FormButton buttonName="StudentsProfile" />
        </div>
    </div>
    </section>
    );
}

function ElectronicsContent() {
    return (
    <section className="section">
        <SectionTracker sectionId="ElectronicsContent" />
        <div className="content-container">
        <figure>
            <img src="/circuito_eletronico_fundo_transparente.png" alt="Imagem da Seção 1" width="800" />
        </figure>
        <div className="text">
        <h2>Também tem conteúdo mais específico para o pessoal de eletrônica:</h2>
        <p>Quem tem interesse mais específico em eletrônica vai gostar especialmente dos módulos finais (9 – Semicondutores, 10 – Circuitos Analógicos e 11 – Circuitos Digitais).</p><p>No entanto, preciso explicar bem que quero dizer eletrônica no contexto de engenharia e ensino superior. Não faço esta distinção para excluir quem é de fora da engenharia, mas para deixar definido o direcionamento dado no curso, que <span style={{ textDecoration: 'underline'}}>não é aquela ideia popular de eletrônica de montar receitas prontas sem entender nada e consertar aparelhos.</span></p><p><strong>Todos os interessados no assunto de circuitos e que estejam dispostos a estudar são bem vindos.</strong></p>
        <FormButton buttonName="ElectronicsContent" />
        </div>
        </div>
    </section>
    );
}

function FromBasicsToAdvanced() {
    return (
    <section className="section">
        <SectionTracker sectionId="FromBasicsToAdvanced" />
        <div className="content-container">
        <figure>
        <img src="/do_basico_ao_avancado_fundo_transparente.png" alt="Imagem da Seção 1" width="800" />
        </figure>
        <div className="text">
        <h2>Serve para quem é iniciante, mas também para quem já se considera avançado.</h2>
        <p>Se você é um completo iniciante, totalmente perdido em circuitos elétricos, fique tranquilo porque no curso você começará aprendendo dos conceitos mais básicos de tensão e corrente elétrica.</p><p>Você estudará os circuitos elétricos mais básicos, que são aqueles em corrente contínua, para então progredir para o aprendizado de circuitos RL, RC, RLC em resposta transiente e regime permanente, bem como circuitos em corrente alternada (regime permanente senoidal).</p><p>Se você já sabe alguma coisa de circuitos e se considera intermediário ou avançado, poderá partir logo para análise de circuitos usando Laplace e Fourier, bem como para o estudo dos módulos mais finais do curso, mais voltados para projeto de circuitos eletrônicos.&nbsp;</p>
        <FormButton buttonName="FromBasicsToAdvanced" />
        </div>
        </div>
    </section>
    );
}

function MatematicaDoEletron() {
    return (
    <section className="section">
        <SectionTracker sectionId="MatematicaDoEletron" />
        <div className="content-container">
        <figure>
        <img src="/logo_mat_de.png" alt="Logo do curso MdE" width="800" />
        </figure>
        <div className="text">
        <h2>Dificuldade na matemática para estudar circuitos? Aprenda no Matemática do Elétron.</h2>
        <p>Antes o Matemática do Elétron era um curso separado, mas agora ele foi anexado ao curso Domínio Elétrico para auxiliar quem tem dificuldades em matemática básica.</p><p>Se você tem dificuldade em fazer contas mais simples, resolver equações básicas, cálculos com trigonometria ou números complexos, não se preocupe mais. </p><p>Todos esses conceitos de matemática de ensino fundamental e médio são fundamentais para o estudo de circuitos, mas com o Matemática do Elétron você estará amparado. São cerca de 25 horas de aulas gravadas para revisar a matemática básica que você precisa para estudar circuitos.&nbsp;</p>
        <FormButton buttonName="MatematicaDoEletron" />
        </div>
        </div>
    </section>
    );
}

function TheoryAndPractice() {
    return (
    <section className="section">
        <SectionTracker sectionId="TheoryAndPractice" />
        <div className="content-container">
        <figure>
        <img src="/de_labs.jpg" alt="Imagem da Seção 1" width="800" />
        </figure>
        <div className="text">
        <h2>Não é só teoria, mas prática também. Conheça o Domínio Elétrico Labs.</h2>
        <p>O Domínio Elétrico Labs é a parte do curso que consiste em aulas de laboratório de eletrônica voltadas especialmente para estudantes no nível de engenharia.</p><p>Ou seja, não são aqueles vídeos quem existem aos montes na internet mostrando a montagem de um circuito com receita pronta que ninguém sabe ao certo como funciona.&nbsp;</p><p>Ao invés disso, o foco nestas aulas de laboratório é mostrar na prática os conceitos explicados nas aulas teóricas, não de fugir delas.</p><p><strong>Para isso, cada aula de laboratório vem com um pré-lab, que é um exercício prévio para você entender o circuito estudado previamente, seguido pelo vídeo do experimento em si, terminando com uma aula teórica sobre o experimento.</strong></p>
        <FormButton buttonName="TheoryAndPractice" />
        </div>
        </div>
    </section>
    );
}

function EletronQuest() {
    return (
    <section className="section">
    <SectionTracker sectionId="EletronQuest" />
    <div className="content-container">
    <figure>
    <img src="/eletron_quest_thumbnail.png" alt="Imagem da Seção 1" width="800" />
    </figure>
    <div className="text">
    <h2>Avaliação do aprendizado de verdade, com certificado só para quem levou o curso a sério. Conheça o Elétron Quest.</h2>
    <p>Tem um monte de curso online que dá certificado automático. Basta você se inscrever, ir passando de aula em aula marcando como concluído (sem nem precisar assistir nem entender) e chegando ao final você consegue um certificado para baixar, podendo até imprimir e colocar na parede.</p><p><strong>Qual o valor de um certificado desses?</strong> Sinceramente, nenhum.</p><p>Por isso resolvi fazer diferente no meu curso. Resolvi criar o Elétron Quest, que será uma jornada de desafios de circuitos elétricos que serve para avaliar o seu aprendizado de modo a parecer um jogo em que você precisa passar de fases. Depois você recebe o certificado, <strong>mas só se conseguir chegar ao final.</strong></p>
    <FormButton buttonName="EletronQuest" />
    </div>
    </div>
    </section>
    );
}

function Depoimentos() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [visibleImagesIndices, setVisibleImagesIndices] = useState([1, 2, 3, 4, 5]);

    function enlargeImage(event) {
        const clickedElement = event.currentTarget;
        const imageId = clickedElement.getAttribute('id');
        const src = 'depoimentos/'+imageId+'.png';
        const overlay = document.getElementById('image-overlay');
        const enlargedImage = document.getElementById('enlarged-image');
        enlargedImage.src = src;
        overlay.style.display = 'flex';
        logEvent('ButtonClick', 'enlargeImage clicked');
    }
    
    function closeOverlay() {
        const overlay = document.getElementById('image-overlay');
        overlay.style.display = 'none';
        logEvent('ButtonClick', 'closeOverlay clicked');
    }
    
    function moveCarousel(direction) {
        const imageCount = 10;
        const visibleImages = 5;
        if (direction === 'left') {
            setCurrentImageIndex((currentImageIndex - 1 + imageCount) % imageCount);
        } else if (direction === 'right') {
            setCurrentImageIndex((currentImageIndex + 1) % imageCount);
        }
        const updatedVisibleImagesIndices = [];
        for (let i = currentImageIndex; i < currentImageIndex + visibleImages; i++) {
            const index = i % imageCount;
            updatedVisibleImagesIndices.push(index + 1);
        }
        setVisibleImagesIndices(updatedVisibleImagesIndices);
        logEvent('ButtonClick', 'moveCarousel clicked');
    }

    function CarouselItem({ imageNumber, onClick }) {
        const imageName = `dep_${imageNumber.toString().padStart(2, '0')}`; 
        return (
            <div className="carousel-item" id={imageName} onClick={onClick}>
                <img src={`/depoimentos/${imageName}.png`} alt={`Depoimento ${imageNumber}`} />
            </div>
        );
    }

    return (
    <section className="section">
    <SectionTracker sectionId="Depoimentos" />
    <h2>O que dizem os alunos do curso?</h2>
    <p>(Clique nas imagens para ampliar)</p>
    <div className="carousel-container">
        <div className="carousel">
            {visibleImagesIndices.map((imageNumber, index) => (
                <CarouselItem 
                    key={index} 
                    imageNumber={imageNumber} 
                    onClick={(event) => enlargeImage(event)} 
                />
            ))}
        </div>
    </div>
    <table className="arrow-container">
    <tr>
        <td>
            <div className="carousel-arrow left" onClick={() => moveCarousel('left')}>&lt;&lt; Anterior</div>
        </td>
        <td>
            <div className="carousel-arrow right" onClick={() => moveCarousel('right')}>Próxima &gt;&gt;</div>
        </td>
    </tr>
    </table>
    <div className="image-overlay" id="image-overlay" style={{ display: 'none' }} onClick={() => closeOverlay()}>
    <img src="/" className="enlarged-image" id="enlarged-image" alt="Foco" />
    </div>  
    </section>
    );
}

function SpecialWarnings() {
    return (
    <section className="section">
    <SectionTracker sectionId="SpecialWarnings" />
    <div className="content-container-single-column">
    <img src="/pngwing.com_-300x269.png" alt="Imagem da Seção 1" width="100" />
    <h2>AVISO IMPORTANTE</h2>
    <h3>O curso Domínio Elétrico NÃO é para quem:</h3>
    <ul>
        <li>Está procurando uma profissão nova para começar a trabalhar já nos próximos meses ou está precisando de dinheiro rápido</li>
        <li>Espera que o curso ensine TUDO o que existe em um curso de graduação em engenharia elétrica, eletrônica ou outra</li>
        <li>Quer trabalhar com manutenção de aparelhos elétricos e eletrônicos</li>
        <li>Quer aprender a montar instalações elétricas ou trabalhar como técnico eletricista</li>
        <li>Não tem a paciência para sentar, assistir às aulas e estudar</li>
        <li>Não quer aprender circuitos em nível de engenharia</li>
    </ul>        
    </div>
    </section>
    );
}
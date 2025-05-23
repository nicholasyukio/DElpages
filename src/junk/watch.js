// Filename - pages/watch.js

import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from "react-google-recaptcha-v3";
import Rodape from '../rodape.js';
import './watch.css';
import OfertaBreve from './oferta_breve.js';
import { logEvent, sendEventsToAPI } from '../tracking.js';
import { GreetingWatch, ButtonSignUp, ButtonAccount, ButtonSave } from '../greeting.js';
import {saveDesiteEventInDB} from '../tracking.js';
import { FeedHeaderComponent } from '../feed.js';
import userpool from '../../userpool.js';
import { EmailShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, TelegramIcon, WhatsappIcon } from "react-share";
import withLoginPrompt from './with_login_prompt.js';

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



function Video({ videoId, isMobileDevice, videoThumbnailURL }) {
    const video_src = `https://iframe.mediadelivery.net/embed/236258/${videoId}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;
    if (isMobileDevice) {
        return (
            <div className="watch-container">
                <div style={{ position: 'auto' }}>
                    <iframe 
                        src={video_src}
                        width="360" 
                        height="202" 
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                        allowFullScreen={true}
                        title="Embedded Video"
                        poster={videoThumbnailURL}
                    ></iframe>
                </div>
            </div>
        );
    } else {
        return (
            <div className="watch-container">
                <div style={{ position: 'auto' }}>
                    <iframe 
                        src={video_src}
                        width="720" 
                        height="405" 
                        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" 
                        allowFullScreen={true}
                        title="Embedded Video"
                        poster={videoThumbnailURL}
                    ></iframe>
                </div>
            </div>
        );
    }
}

function HeaderComponent({ imageSrc, videoId, videoTitle, isMobileDevice }) {
    if (isMobileDevice) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="watch-header-container-mobile">
                <div style={{ flex: '2', width: '20%' }}>
                    <a href='feed'><img src={imageSrc} alt="Site logo" style={{ width: '100%', height: 'auto', display: 'block' }} /></a>
                </div>
                <div style={{ flex: '6', width: '60%' }} className="text-header">
                    <h4>{`Vídeo: ${videoTitle}`}</h4>
                </div>
                <div style={{ flex: '2', width: '20%' }} className="text-header">
                    <ButtonAccount buttonName='ButtonAccount' isMobileDevice={isMobileDevice} />
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="watch-header-container">
                <div style={{ flex: '1', width: '10%' }}>
                    <a href='feed'><img src={imageSrc} alt="Site logo" style={{ width: '100%', height: 'auto', display: 'block' }} /></a>
                </div>
                <div style={{ flex: '7', width: '70%' }} className="text-header">
                    <h2>{`Vídeo: ${videoTitle}`}</h2>
                </div>
                <div style={{ flex: '2', width: '20%' }} className="text-header">
                    <ButtonAccount buttonName='ButtonAccount' isMobileDevice={isMobileDevice} />
                </div>
            </div>
        );
    }
}

function Form({ showOffer, onVariableChange, isMobileDevice }) {
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
	const [status, setStatus] = useState('Quero conhecer o curso');

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
			setStatus('Quero conhecer o curso');
			let result = await response.json();

			if (result.status === 'success') {
				setResult('Oferta encontrada. Encaminhando para o pagamento.');
                saveDesiteEventInDB("submit_form", URLparams.v);
				resetEmailForm();
                onVariableChange(true);
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
			setStatus('Quero conhecer o curso');
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
            <div id="form" className="watch-form-container-mobile">
                <h2>Pronto para começar no Domínio Elétrico?</h2>
                <p>Estes vídeos aqui são apenas amostras gratuitas. No curso Domínio Elétrico, você tem uma sequência didática de aulas para estudar, podendo até tirar dúvidas com o Prof. Nicholas Yukio.</p>
                <p>Para conhecer, <b>preencha os campos abaixo para enviarmos todas informações:</b></p>
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
            <div id="form" className="watch-form-container">
                <h2>Pronto para começar no Domínio Elétrico?</h2>
                <p>Estes vídeos aqui são apenas amostras gratuitas. No curso Domínio Elétrico, você tem uma sequência didática de aulas para estudar, podendo até tirar dúvidas com o Prof. Nicholas Yukio.</p>
                <p>Para conhecer, <b>preencha os campos abaixo para enviarmos todas informações:</b></p>
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

const Recommendations = ({isMobileDevice}) => {
    const [recommendations, setRecommendations] = useState([]);
    let rendered = false;

    useEffect(() => {
        // Fetch recommendations when the component mounts
        if (!rendered) {
            getRecommendations();
            rendered = true;
        }
    }, []);

    const getRecommendations = async () => {
        try {
            // Make a GET request to fetch recommendations
            // const response = await fetch('https://dominioeletrico.com.br:5000/similar');
            const response = await fetch(`https://api.dominioeletrico.com.br/recom/4/totalWatchTime/${URLparams.v}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecommendations(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    function formatVideoDuration(durationInSeconds) {
        const totalSeconds = durationInSeconds -1;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        if (hours === 0) {
            return `${formattedMinutes}:${formattedSeconds}`;
        } else {
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    }
    
    if (isMobileDevice) {
        if (recommendations.length === 0) {
            return (
            <div className='feed-content-mobile'>
                <h3 className='lateral-bar'><GreetingWatch/> (carregando...)</h3>
                <img src="waiting.gif" alt="carregando..." style={{ display: 'block', margin: 'auto' }} />
            </div>
            );
        } else {
            return (
                <div className='feed-content-mobile'>
                    <h3 className='lateral-bar'><GreetingWatch/></h3>
                    {recommendations.slice(0, 4).map(recommendation => (
                        <div key={recommendation.id} style={{ marginBottom: '20px' }} className='recommendations'>
                            <a href={`watch?v=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.title} style={{ width: '360px', height: 'auto' }} />
                                <br></br>
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.title}</span>
                                    <span> ({formatVideoDuration(recommendation.length)})</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            );
        }
    } else {
        if (recommendations.length === 0) {
            return (
            <div className='feed-content'>
                <h3 className='lateral-bar'><GreetingWatch/> (carregando...)</h3>
                <img src="waiting.gif" alt="carregando..." style={{ display: 'block', margin: 'auto' }} />
            </div>
            );
        } else {
            return (
                <div className='feed-content'>
                    <h3 className='lateral-bar'><GreetingWatch/></h3>
                    {recommendations.slice(0, 4).map(recommendation => (
                        <div key={recommendation.id} style={{ marginBottom: '20px' }} className='recommendations'>
                            <a href={`watch?v=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.title} style={{ width: '360px', height: 'auto' }} />
                                <br></br>
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.title}</span>
                                    <span> ({formatVideoDuration(recommendation.length)})</span>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            );
        }
    }
};

const Watch = () => {
    // State to track the device type
    const user=userpool.getCurrentUser();
    const [isMobile, setIsMobile] = useState(false);

    const shareUrl = window.location.href;
    const title = document.title;
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

    useEffect(() => {
        const interval = setInterval(() => {
          saveDesiteEventInDB("view_video_min", URLparams.v);
        }, 60000);
        return () => clearInterval(interval); 
      }, [])

    const videoId = URLparams.v;
    const [showOffer, setGlobalVariable] = useState(true);

    const [videoInfo, setVideoInfo] = useState([]);
    let videoTitle = '';
    let videoThumbnailFilename = '';
    let videoDescription = '';
    let videoThumbnailURL = '';

    const getVideoInfo = async (videoId) => {
        try {
            // Make a GET request to fetch recommendations
            const response = await fetch(`https://dominioeletrico.com.br:5000/videoinfo/${videoId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setVideoInfo(data);
        } catch (error) {
            console.error('Fetch error:', error);
            console.log("Error");
        }
    };

    useEffect(() => {
        // Fetch recommendations when the component mounts
        getVideoInfo(videoId);
        saveDesiteEventInDB("access_video", videoId);
    }, []);
    
    videoTitle = videoInfo.title;
    videoThumbnailFilename = videoInfo.thumbnailFileName;
    videoThumbnailURL = `https://vz-6f64f7fb-752.b-cdn.net/${videoId}/${videoThumbnailFilename}`;
    document.title = videoInfo.title;
    
    if (videoInfo.metaTags && videoInfo.metaTags.length > 0) {
        videoDescription = videoInfo.metaTags[0].value;
    }

    const handleVariableChange = (newValue) => {
        // Update the globalVariable when needed
        setGlobalVariable(newValue);
    };

    if (isMobile) {
        return (
            <>
            <div className="top-container-mobile">
                <div className="left-div">
                    <FeedHeaderComponent isMobileDevice={isMobile} />
                    <h4 className='h4title-mobile'>{`Vídeo: ${videoTitle}`}</h4>
                    {/* <HeaderComponent imageSrc="/dominio_eletrico_logo_2023_square_fundo_transparente.png" videoId={videoId} videoTitle={videoTitle} isMobileDevice={isMobile}/> */}
                    <Video videoId={videoId} isMobileDevice={isMobile} videoThumbnailURL={videoThumbnailURL}/>
                    <div className="side-by-side-container">
                        {!user && <h4 className='greeting-mobile'><a href='/signup'>Crie uma conta gratuitamente para desbloquear playlists, salvar vídeos e ter recomendações personalizadas.</a></h4>}
                        {user && 
                            <>
                            <div className="demo-some-network">
                                <ButtonSave />
                            </div>
                            <div className="demo-some-network">
                                <EmailShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                                >
                                <EmailIcon size={48} borderRadius={5} round={false} />
                                </EmailShareButton>
                            </div>
                            <div className="demo-some-network">
                                <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                                >
                                <WhatsappIcon size={48} borderRadius={5} round={false} />
                                </WhatsappShareButton>
                            </div>
                            <div className="demo-some-network">
                                <TelegramShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                                >
                                <TelegramIcon size={48} borderRadius={5} round={false} />
                                </TelegramShareButton>
                            </div>
                            </>}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: videoDescription }} className='watch-video-description-mobile'></div>
                    {showOffer === false ? <Form showOffer={showOffer} onVariableChange={handleVariableChange} isMobileDevice={isMobile}/> : <OfertaBreve />}
                    <Recommendations isMobileDevice={isMobile}/>
                </div>
                <div className="right-div">
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
                    {/* <FeedHeaderComponent isMobileDevice={isMobile} />
                    <h3 className='h4title'>{`Vídeo: ${videoTitle}`}</h3> */}
                    <HeaderComponent imageSrc="/dominio_eletrico_logo_2023_square_fundo_transparente.png" videoId={videoId} videoTitle={videoTitle} isMobileDevice={isMobile}/>
                    <Video videoId={videoId} isMobileDevice={isMobile} videoThumbnailURL={videoThumbnailURL}/>
                    <div className="side-by-side-container">
                        <div dangerouslySetInnerHTML={{ __html: videoDescription }} className='watch-video-description'></div>
                        <div>
                            {!user && <h4 className='greeting-mobile'><a href='/signup'>Crie uma conta gratuitamente para desbloquear playlists, salvar vídeos e ter recomendações personalizadas.</a></h4>}
                            {user && 
                            <>
                            <div className="demo-some-network">
                                <ButtonSave />
                            </div>
                            <div className="demo-some-network">
                                <EmailShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                                >
                                <EmailIcon size={48} borderRadius={5} round={false} />
                                </EmailShareButton>
                            </div>
                            <div className="demo-some-network">
                                <WhatsappShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                                >
                                <WhatsappIcon size={48} borderRadius={5} round={false} />
                                </WhatsappShareButton>
                            </div>
                            <div className="demo-some-network">
                                <TelegramShareButton
                                url={shareUrl}
                                title={title}
                                separator=":: "
                                className="Demo__some-network__share-button"
                                >
                                <TelegramIcon size={48} borderRadius={5} round={false} />
                                </TelegramShareButton>
                            </div>
                            </>}
                        </div>
                    </div>
                    {showOffer === false ? <Form showOffer={showOffer} onVariableChange={handleVariableChange} isMobileDevice={isMobile}/> : <OfertaBreve />}
                </div>
                <div className="right-div">
                    <Recommendations />
                </div>
            </div>
            <Rodape />
            </>
        );
    }
};

const WatchWithLoginPrompt = withLoginPrompt(Watch);
export default WatchWithLoginPrompt;
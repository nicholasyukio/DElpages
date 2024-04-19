// Filename - pages/feed.js

import React, { useState, useEffect } from 'react';
import Rodape from './rodape.js';
import './watch.css';

function FeedHeaderComponent({isMobileDevice}) {
    console.log(`isMobileDevice in FeedHeaderComponent: ${isMobileDevice}`);
    if (isMobileDevice) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="feed-header-mobile">
                <div style={{ flex: '1', width: '33%' }}>
                    <img src="/dominio_eletrico_logo_2023_square_fundo_transparente.png" alt="Square Image" style={{ width: '60px', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ flex: '1', width: '34%' }} className="feed-button">
                    <ButtonConhecerCurso buttonName='ButtonConhecerCurso' isMobileDevice={isMobileDevice} />
                </div>
                <div style={{ flex: '1', width: '33%' }} className="feed-button">
                    <ButtonAcessarCurso buttonName='ButtonAcessarCurso' isMobileDevice={isMobileDevice} />
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="feed-header">
                <div style={{ flex: '1', width: '33%' }}>
                    <img src="/dominio_eletrico_logo_2023_square_fundo_transparente.png" alt="Square Image" style={{ width: '100px', height: 'auto', display: 'block' }} />
                </div>
                <div style={{ flex: '1', width: '34%' }} className="feed-button">
                    <ButtonConhecerCurso buttonName='ButtonConhecerCurso' isMobileDevice={isMobileDevice} />
                </div>
                <div style={{ flex: '1', width: '33%' }} className="feed-button">
                    <ButtonAcessarCurso buttonName='ButtonAcessarCurso' isMobileDevice={isMobileDevice} />
                </div>
            </div>
        );
    }
}

function ButtonConhecerCurso({ buttonName, isMobileDevice }) {
    const handleClick = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForConhecerCurso', // Custom event name
            buttonName: 'clickForConhecerCurso', // Custom event data, you can adjust this as needed
        });
        // logEvent('ButtonClick', `${buttonName} clicked`);
        // Redirect the user after pushing the data to GTM if needed
        window.location.href = 'espera-dominio-eletrico'; // Redirect to the form anchor
    };
    console.log(`isMobileDevice in ButtonConhecerCurso: ${isMobileDevice}`);
    if (isMobileDevice) {
        return (
            <button className="btn-conhecer-curso-mobile" onClick={handleClick}>
                <img src='pencil-16.png'></img>
            </button>
        );
    } else {
        return (
            <button className="btn-conhecer-curso" onClick={handleClick}>
                <img src='pencil-16.png'></img>
                Conhecer o curso
            </button>
        );
    }
}

function ButtonAcessarCurso({ buttonName, isMobileDevice }) {
    const handleClick = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForAcessarCurso', // Custom event name
            buttonName: 'clickForAcessarCurso', // Custom event data, you can adjust this as needed
        });
        // logEvent('ButtonClick', `${buttonName} clicked`);
        // Redirect the user after pushing the data to GTM if needed
        window.location.href = 'https://curso.dominioeletrico.com.br/login'; // Redirect to the form anchor
    };
    if (isMobileDevice) {
        return (
            <button className="btn-acessar-curso-mobile" onClick={handleClick}>
                <img src='padlock-3-16.png'></img>
            </button>
        );
    } else {
        return (
            <button className="btn-acessar-curso" onClick={handleClick}>
                <img src='padlock-3-16.png'></img>
                Acessar o curso (somente para alunos)
            </button>
        );
    }
}

const RecommendationsForFeed = ({isMobileDevice}) => {
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
            const response = await fetch('https://dominioeletrico.com.br:5000/similar');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
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

        if (hours == 0) {
            return `${formattedMinutes}:${formattedSeconds}`;
        } else {
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
    }

    if (isMobileDevice) {
        return (
            <div className='feed-content'>
                    {recommendations.slice(0, 12).map(recommendation => (
                            <div className='each-div-mobile'>
                            <a href={`watch?v=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.title} style={{ width: '360px', height: 'auto' }} />
                                <br />
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.title}</span>
                                    <span> ({formatVideoDuration(recommendation.length)})</span>
                                </div>
                            </a>
                            </div>
                    ))}
            </div>
        );
    } else {
        return (
            <div className='feed-content'>
                <div className='row-div'>
                    {recommendations.slice(0, 4).map(recommendation => (
                            <div className='each-div'>
                            <a href={`watch?v=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.title} style={{ width: '360px', height: 'auto', marginRight: '10px' }} />
                                <br />
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.title}</span>
                                    <span> ({formatVideoDuration(recommendation.length)})</span>
                                </div>
                            </a>
                            </div>
                    ))}
                </div>
                <div className='row-div'>
                    {recommendations.slice(4, 8).map(recommendation => (
                            <div className='each-div'>
                            <a href={`watch?v=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.title} style={{ width: '360px', height: 'auto', marginRight: '10px' }} />
                                <br />
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.title}</span>
                                    <span> ({formatVideoDuration(recommendation.length)})</span>
                                </div>
                            </a>
                            </div>
                    ))}
                </div>
                <div className='row-div'>
                    {recommendations.slice(8, 12).map(recommendation => (
                            <div className='each-div'>
                            <a href={`watch?v=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.title} style={{ width: '360px', height: 'auto', marginRight: '10px' }} />
                                <br />
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.title}</span>
                                    <span> ({formatVideoDuration(recommendation.length)})</span>
                                </div>
                            </a>
                            </div>
                    ))}
                </div>
            </div>
        );
    }
};

const Feed = () => {
    // State to track the device type
    const [isMobile, setIsMobile] = React.useState(false);
    // Function to check if the device is a mobile
    const checkIfMobile = () => {
        const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
        console.log(`isMobileDevice: ${isMobileDevice}`);
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

    document.title = 'Site Domínio Elétrico';
    console.log(`isMobile in Feed: ${isMobile}`);
	return (
        <div className="top-feed-div">
        <FeedHeaderComponent isMobileDevice={isMobile}/>
        <div className="top-container">
            <RecommendationsForFeed isMobileDevice={isMobile}/>
        </div>
        <Rodape />
        </div>
	);
};

export default Feed;
// Filename - pages/feed.js

import React, { useState, useEffect } from 'react';
import Rodape from './rodape.js';
import './watch.css';

function FeedHeaderComponent() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="feed-header">
            <div style={{ flex: '1', width: '10%' }}>
            </div>
            <div style={{ flex: '1', width: '10%' }}>
                <img src="/dominio_eletrico_logo_2023_square_fundo_transparente.png" alt="Square Image" style={{ width: '100px', height: 'auto', display: 'block' }} />
            </div>
            <div style={{ flex: '3', width: '30%' }} className="feed-button">
                <ButtonConhecerCurso />
            </div>
            <div style={{ flex: '4', width: '40%' }} className="feed-button">
                <ButtonAcessarCurso />
            </div>
            <div style={{ flex: '1', width: '10%' }}>
            </div>
        </div>
    );
}

function ButtonConhecerCurso({ buttonName }) {
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

    return (
        <button className="btn-conhecer-curso" onClick={handleClick}>
            <img src='pencil-16.png'></img>
            Conhecer o curso
        </button>
    );
}

function ButtonAcessarCurso({ buttonName }) {
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

    return (
        <button className="btn-acessar-curso" onClick={handleClick}>
            <img src='padlock-3-16.png'></img>
            Acessar o curso (somente para alunos)
        </button>
    );
}

const RecommendationsForFeed = () => {
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
};

const Feed = () => {
	return (
        <>
        <FeedHeaderComponent />
        <div className="top-container">
            <RecommendationsForFeed />
        </div>
        <Rodape />
        </>
	);
};

export default Feed;
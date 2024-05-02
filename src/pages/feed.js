// Filename - pages/feed.js

import React, { useState, useEffect } from 'react';
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
    utmTags.id = urlParams.get('id') || '';
    return utmTags;
};

const availablePlaylists = [
    {id: "3f128956-5e89-410b-8072-203b8d266390", name: "Multivibrador Astável", num_videos: 6, thumbnail_url: "playlist_multivibrador_astavel_thumbnail.jpg"},
    {id: "c385ae61-4635-4ef2-a76f-6762dce1ac2d", name: "Vídeos de experimentos", num_videos: 22, thumbnail_url: "playlist_experimentos_thumbnail.jpg"},
    {id: "7748272c-0827-4672-b875-d0c518d53575", name: "Exercícios Resolvidos - 2020", num_videos: 40, thumbnail_url: "playlist_exercicios_resolvidos_2020_thumbnail.jpg"},
    {id: "a63b2748-daaf-4e68-bd35-a0c6d5453b64", name: "Exercícios Resolvidos - 2022", num_videos: 43, thumbnail_url: "playlist_exercicios_resolvidos_2022_thumbnail.jpg"},
    {id: "bb29f908-2f6f-43cf-a044-6fb1c4a6c02b", name: "Exercícios Resolvidos - 2023", num_videos: 35, thumbnail_url: "playlist_exercicios_resolvidos_2023_thumbnail.jpg"},
    {id: "15d46305-b813-4b0c-89f1-f0eb5b003ce5", name: "Erros Elétricos", num_videos: 15, thumbnail_url: "playlist_erros_eletricos_thumbnail.jpg"},
    {id: "ba37a8c8-f3b6-44b2-a1bb-07cdef9085f3", name: "Aulas Longas de Circuitos Elétricos", num_videos: 13, thumbnail_url: "playlist_aulas_longas_thumbnail.jpg"}
];

const URLparams = extractURLparams();

function FeedHeaderComponent({isMobileDevice}) {
    if (isMobileDevice) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }} className="feed-header-mobile">
                <div style={{ flex: '1', width: '33%' }}>
                    <a href='feed'><img src="/dominio_eletrico_logo_2023_square_fundo_transparente.png" alt="Site logo" style={{ width: '60px', height: 'auto', display: 'block' }} /></a>
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
                <a href='feed'><img src="/dominio_eletrico_logo_2023_square_fundo_transparente.png" alt="Site logo" style={{ width: '100px', height: 'auto', display: 'block' }} /></a>
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
    if (isMobileDevice) {
        return (
            <button className="btn-conhecer-curso-mobile" onClick={handleClick}>
                <img src='pencil-16.png' alt="Pencil"></img>
            </button>
        );
    } else {
        return (
            <button className="btn-conhecer-curso" onClick={handleClick}>
                <img src='pencil-16.png' alt="Pencil"></img>
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
                <img src='padlock-3-16.png' alt="Padlock"></img>
            </button>
        );
    } else {
        return (
            <button className="btn-acessar-curso" onClick={handleClick}>
                <img src='padlock-3-16.png' alt="Padlock"></img>
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
        return (
            <div className='feed-content-mobile'>
                    <h2>Recomendações de vídeos de circuitos elétricos:</h2>
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
                <h2>Recomendações de vídeos de circuitos elétricos:</h2>
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

const ListPlaylists = ({isMobileDevice}) => {
    if (isMobileDevice) {
        return (
            <div className='feed-content'>
                    <h2>Playlists disponíveis: </h2>
                    {availablePlaylists.slice(0, 12).map(recommendation => (
                            <div className='each-div-mobile'>
                            <a href={`playlist?id=${recommendation.id}`} rel="noopener noreferrer">
                                <img src={recommendation.thumbnail_url} alt={recommendation.name} style={{ width: '360px', height: 'auto' }} />
                                <br />
                                <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                    <span>{recommendation.name}</span>
                                    <span> ({recommendation.num_videos} vídeos)</span>
                                </div>
                            </a>
                            </div>
                    ))}
            </div>
        );
    } else {

        // Define the size of each chunk
        const chunkSize = 4;

        // Initialize an array to hold chunks of recommendations
        let chunks = [];

        // Loop to create chunks of recommendations
        for (let i = 0; i < availablePlaylists.length; i += chunkSize) {
            // Get a chunk of recommendations using slice
            let chunk = availablePlaylists.slice(i, i + chunkSize);
            
            // Push the chunk into the chunks array
            chunks.push(chunk);
        }

        // Calculate the number of empty divs needed to complete the last chunk
        const emptyDivsSize = chunkSize - availablePlaylists.length % chunkSize;
        const emptyDivs = Array.from({ length: emptyDivsSize }, (_, index) => <div key={`empty-${index}`} className="each-div"></div>);

        // Render each chunk within a row-div
        return (
            <div className='feed-content'>
                <h2>Playlists disponíveis: </h2>
                {chunks.map((chunk, index) => (
                    <div className='row-div' key={index}>
                        {chunk.map(recommendation => (
                            <div className='each-div' key={recommendation.id}>
                                <a href={`playlist?id=${recommendation.id}`} rel="noopener noreferrer">
                                    <img src={recommendation.thumbnail_url} alt={recommendation.name} style={{ width: '360px', height: 'auto', marginRight: '10px' }} />
                                    <br />
                                    <div style={{ display: 'inline-block', maxWidth: '360px' }}>
                                        <span>{recommendation.name}</span>
                                        <span> ({recommendation.num_videos} vídeos)</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                        {/* Render empty divs for the last chunk to maintain alignment */}
                        {availablePlaylists.length % chunkSize !== 0 && index === chunks.length - 1 && emptyDivs}
                    </div>
                ))}
            </div>
        );
    }
};

const PlaylistVideos = ({playlistId, isMobileDevice}) => {
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
            const response = await fetch(`https://dominioeletrico.com.br:5000/playlist/${playlistId}`);
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

    function getPlaylistName(playlistId) {
        for (let i=0; i < availablePlaylists.length; i++) {
            let playlist = availablePlaylists[i];
            if (playlist.id === playlistId) {
                return playlist.name;
            }
        }
        return "Playlist sem nome";
    }

    const playlistName = getPlaylistName(playlistId);

    if (isMobileDevice) {
        return (
            <div className='feed-content-mobile'>
                    <h2>Playlist: {playlistName}</h2>
                    {recommendations.slice(0, 100).map(recommendation => (
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
        // Define the size of each chunk
        const chunkSize = 4;

        // Initialize an array to hold chunks of recommendations
        let chunks = [];

        // Loop to create chunks of recommendations
        for (let i = 0; i < recommendations.length; i += chunkSize) {
            // Get a chunk of recommendations using slice
            let chunk = recommendations.slice(i, i + chunkSize);
            
            // Push the chunk into the chunks array
            chunks.push(chunk);
        }

        // Calculate the number of empty divs needed to complete the last chunk
        const emptyDivsSize = chunkSize - recommendations.length % chunkSize;
        const emptyDivs = Array.from({ length: emptyDivsSize }, (_, index) => <div key={`empty-${index}`} className="each-div empty-div"></div>);

        // Render each chunk within a row-div
        return (
            <div className='feed-content'>
                <h2>Playlist: {playlistName}</h2>
                {chunks.map((chunk, index) => (
                    <div className='row-div' key={index}>
                        {chunk.map(recommendation => (
                            <div className='each-div' key={recommendation.id}>
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
                        {/* Render empty divs for the last chunk to maintain alignment */}
                        {recommendations.length % chunkSize !== 0 && index === chunks.length - 1 && emptyDivs}
                    </div>
                ))}
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
	return (
        <div className="top-feed-div">
        <FeedHeaderComponent isMobileDevice={isMobile}/>
        <div className="top-container">
            <RecommendationsForFeed isMobileDevice={isMobile}/>
        </div>
        <div className="top-container">
            <ListPlaylists isMobileDevice={isMobile}/>
        </div>
        <Rodape />
        </div>
	);
};

const Playlist = () => {
    // State to track the device type
    const [isMobile, setIsMobile] = React.useState(false);
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

    const playlistId = URLparams.id;
    document.title = 'Site Domínio Elétrico';
	return (
        <div className="top-feed-div">
        <FeedHeaderComponent isMobileDevice={isMobile}/>
        <div className="top-container">
            <PlaylistVideos playlistId={playlistId} isMobileDevice={isMobile}/>
        </div>
        <Rodape />
        </div>
	);
};

export {Feed, Playlist};
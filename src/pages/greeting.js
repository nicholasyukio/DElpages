import userpool from '../userpool';
import React, { useState, useEffect } from 'react';
import { logout } from '../services/authenticate';
import { saveDesiteEventInDB } from './tracking';

const extractURLparams = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const utmTags = {};
    utmTags.utm_source = urlParams.get('utm_source') || '';
    utmTags.utm_medium = urlParams.get('utm_medium') || '';
    utmTags.utm_campaign = urlParams.get('utm_campaign') || '';
    utmTags.utm_term = urlParams.get('utm_term') || '';
    utmTags.utm_content = urlParams.get('utm_content') || '';
    utmTags.id = urlParams.get('id') || '';
    utmTags.v = urlParams.get('v') || '';
    return utmTags;
};

const URLparams = extractURLparams();

const getSession = async () => {
    return await new Promise ((resolve, reject) => {
        const user=userpool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    reject();
                } else {
                    resolve(session);
                }
            }); 
        } else {
            resolve(null);
        }
    });
};

const getUserId = async () => {
    let user_id = '';
    await getSession().then((session) => {
        if (session) {
            // console.log("Save Session: ", session);
            const { accessToken } = session;
            user_id = accessToken.payload.username;
            // console.log("User id: ", user_id);
        } else {
            // console.log("User not logged in: ");
        }
    }).catch((error) => {
        console.error("Error fetching session: ", error);
    });
    // console.log("User id: ", user_id);
    return user_id;
}

function ButtonSignUp() {
    const user=userpool.getCurrentUser();
    const handleClick = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForAccount', // Custom event name
            buttonName: 'clickForAccount', // Custom event data, you can adjust this as needed
        });
        // logEvent('ButtonClick', `${buttonName} clicked`);
        // Redirect the user after pushing the data to GTM if needed
        // window.location.href = 'https://curso.dominioeletrico.com.br/login'; // Redirect to the form anchor
        window.location.href = 'signup';
    };
    if (!user) {
        return (
            <button className="btn-salvar" onClick={handleClick}>
                <img src='account-14.png' alt="Pessoa"></img>
                Criar conta
            </button>
        );
    } else {
        return (<></>);
    }
}

function ButtonAccount({ buttonName, isMobileDevice }) {
    let buttonText = "";
    const user=userpool.getCurrentUser();
    if(!user){
        buttonText = "Login";
    } else {
        buttonText = "Logout";
    }
    const handleClick = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForAccount', // Custom event name
            buttonName: 'clickForAccount', // Custom event data, you can adjust this as needed
        });
        // logEvent('ButtonClick', `${buttonName} clicked`);
        // Redirect the user after pushing the data to GTM if needed
        // window.location.href = 'https://curso.dominioeletrico.com.br/login'; // Redirect to the form anchor
        saveDesiteEventInDB("logout", URLparams.v);
        if(!user){
            window.location.href = 'logon';
        } else {
            logout();
        }
    };
    if (isMobileDevice) {
        return (
            <button className="btn-acessar-curso-mobile" onClick={handleClick}>
                <img src='account-14.png' alt="Pessoa"></img>
            </button>
        );
    } else {
        return (
            <button className="btn-acessar-curso" onClick={handleClick}>
                <img src='account-14.png' alt="Pessoa"></img>
                {buttonText}
            </button>
        );
    }
}

function ButtonSave({ isMobileDevice }) {
    const [saveState, setSaveState] = useState([]);
    // const [state, setState] = useState([]);
    let rendered = false;
    let user_id = '';
    let iconImageFile = 'paper-clip-15.png';
    const user=userpool.getCurrentUser();
   if(user) {
        if (!saveState) {
            iconImageFile = 'paper-clip-15.png';
        } else {
            iconImageFile = 'check-73.png';
        }
        // console.log(`User: ${user}`);
    }
    const handleClick = async () => {
        window.dataLayer.push({
            event: 'clickForSave',
            buttonName: 'clickForSave',
        });
        // logEvent('ButtonClick', `${buttonName} clicked`);
        // Redirect the user after pushing the data to GTM if needed
        // window.location.href = 'https://curso.dominioeletrico.com.br/login'; // Redirect to the form anchor
        if(!user){
            window.location.href = 'logon?nam=restricted';
        } else {
            if (saveState) {
                // console.log("Video unsaved");
                await unsaveVideo();
            } else {
                // console.log("Video saved");
                await saveVideo();
            }
            await updateVideoState();
        }
    };
    const getSavedVideos = async () => {
        user_id = await getUserId();
        // console.log("User id inside getSavedVideos: ", user_id);
        const response = await fetch(`https://api.dominioeletrico.com.br/savedvideos/${user_id}/only_ids`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    }
    const updateVideoState = async () => {
        let savedVideos = await getSavedVideos();
        // console.log("savedVideos inside checkVideoState: ", savedVideos);
        if (user) {
            if (savedVideos.includes(URLparams.v)) {
                // console.log("Video already saved in the list");
                setSaveState(true);
                
            } else {
                // console.log("Video not yet saved in the list");
                setSaveState(false);
                
            }
        }
    };
    useEffect( () => {
        // Fetch recommendations when the component mounts
        if (!rendered && user) {
            updateVideoState();
            rendered = true;
        }
    }, []);
    const saveVideo = async () => {        
        try {
            await getSession().then((session) => {
                if (session) {
                    // console.log("Save Session: ", session);
                    const { accessToken } = session;
                    user_id = accessToken.payload.username;
                    // console.log("User id: ", user_id);
                } else {
                    // console.log("User not logged in: ");
                }
            }).catch((error) => {
                console.error("Error fetching session: ", error);
            });
            // console.log("User id: ", user_id);
            const response = await fetch(`https://api.dominioeletrico.com.br/savevideo/${user_id}/${URLparams.v}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                saveDesiteEventInDB("save_video", URLparams.v);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    const unsaveVideo = async () => {        
        try {
            await getSession().then((session) => {
                if (session) {
                    // console.log("Save Session: ", session);
                    const { accessToken } = session;
                    user_id = accessToken.payload.username;
                    // console.log("User id: ", user_id);
                } else {
                    // console.log("User not logged in: ");
                }
            }).catch((error) => {
                console.error("Error fetching session: ", error);
            });
            // console.log("User id: ", user_id);
            const response = await fetch(`https://api.dominioeletrico.com.br/unsavevideo/${user_id}/${URLparams.v}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                saveDesiteEventInDB("unsave_video", URLparams.v);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    if (isMobileDevice) {
        return (
            <button className="btn-salvar-mobile" onClick={handleClick}>
                <img src={iconImageFile} alt="Save"></img>
            </button>
        );
    } else {
        return (
            <button className="btn-salvar" onClick={handleClick}>
                <img src={iconImageFile} alt="Save"></img>
            </button>
        );
    }
}

function Greeting() {
    const [userName, setUserName] = useState(null);
    const [status, setStatus] = useState(false); // Assuming initially not logged in

    useEffect(() => {
        getSession().then((session) => {
            // console.log("Session: ", session);
            if (session) {
                const { idToken } = session;
                const name = idToken.payload.name; // Assuming the user's name is in the idToken
                setUserName(name);
                setStatus(true);
            } else {
                setStatus(false); // User not logged in
            }
        }).catch((error) => {
            console.error("Error fetching session: ", error);
            setStatus(false); // Failed to fetch session, assume not logged in
        });
    }, []);

    return (
        <>
            {status ? (
                    <>Olá, {userName}!</>
            ) : (
                    <>Você está desconectado.&nbsp;
                    <a href="/logon">Fazer login </a>/<a href="/signup"> Criar conta</a> </>
            )}
        </>
    );
};

function GreetingWatch() {
    const [userName, setUserName] = useState(null);
    const [status, setStatus] = useState(false); // Assuming initially not logged in

    useEffect(() => {
        getSession().then((session) => {
            // console.log("Session: ", session);
            if (session) {
                const { idToken } = session;
                const name = idToken.payload.name; // Assuming the user's name is in the idToken
                setUserName(name);
                setStatus(true);
            } else {
                setStatus(false); // User not logged in
            }
        }).catch((error) => {
            console.error("Error fetching session: ", error);
            setStatus(false); // Failed to fetch session, assume not logged in
        });
    }, []);

    return (
        <>
            {status ? (
                    <>Veja também, {userName}:</>
            ) : (
                    <>Você está desconectado. Na sua conta, você tem recomendações de vídeos personalizadas.&nbsp;
                    <a href="/logon">Fazer login </a>/<a href="/signup"> Criar conta</a> </>
            )}
        </>
    );
};

export {getSession, getUserId, Greeting, GreetingWatch, ButtonSignUp, ButtonAccount, ButtonSave};
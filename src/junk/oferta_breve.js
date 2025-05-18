// Filename - pages/oferta_breve.js
//import React, { useEffect, useState } from 'react';
//import { Button, TextField} from '@mui/material'
//import { useLocation } from 'react-router-dom';
//import './price.css';
//import {saveDesiteEventInDB} from './tracking';
//import {createOrder} from '../pagarme';

/* const extractURLparams = () => {
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
}; */

//const URLparams = extractURLparams();

/* async function getCurrentTimeFromWorldTimeAPI() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        const currentTime = new Date(data.utc_datetime);
        return currentTime;
    } catch (error) {
        console.error('Error fetching current time from WorldTimeAPI:', error);
        return null;
    }
} */

/* async function isOfferActive(startTimeString, endTimeString) {
    try {
        const startDate = new Date(startTimeString);
        const endDate = new Date(endTimeString);
        const currentDate = await getCurrentTimeFromWorldTimeAPI();
        if (!currentDate) {
            return "error";
        }
        if (startDate < currentDate) {
            if (currentDate < endDate) {
                return "active";
            } else {
                return "late";
            }
        } else {
            return "early";
        }
    } catch (error) {
        console.error('Error checking offer validity:', error);
        return "error";
    }
} */

/* const DescricaoInicialOferta = () => {
    return (
        <>
        <h2 className='header-with-reduced-margin'>Receba o acesso a:</h2>
        <ul className='content-listing'>
            <li><b>Conteúdo principal: </b>11 módulos (~88 horas de aulas gravadas)</li>
            <li><b>DE Labs: </b>aulas experimentais de circuitos elétricos em laboratório</li>
            <li><b>MdE: </b>curso de revisão de matemática básica para circuitos (~25 horas)</li>
            <li><b>Suporte: </b>tutoria individual direto com o Prof. Nicholas Yukio</li>
            <li><b>Comunidade: </b>grupo exclusivo de alunos no Telegram</li>
            <li><b>Período: </b>1 ano de acesso ao curso (em <i>curso.dominioeletrico.com.br</i>)</li>
            <li><b>Certificado de conclusão: </b> (apenas para quem terminar o curso)</li>
        </ul>
        </>
    );
} */

/* const OfertaBreve = ({isMobile}) => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const offerId = queryParams.get('id');
    const offerInfo = {
        dynamic: {
            headline: "Desconto de 16%, válido até ",
            price: "R$ 426,72 / ano",
            pricePix: "R$ 405,38",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=a3db2519-109b-44bd-90b6-d40eafab76f4",
            priceParcelado12x: "12x R$ 40,35",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=bee6ca52-ff5e-44ef-aaa9-a95827c5e240"
        },
        default: {
            headline: "Preço para você assinar a plataforma do curso:",
            price: "R$ 508 / ano",
            pricePix: "R$ 482,60",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=e90b6774-e5b1-4fb2-adf2-00a1bc4ac89a",
            priceParcelado12x: "12x R$ 48,04",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=6d6a37c5-3866-4859-83c6-2f0f998c9847"
        }
    };
    
    const [offerValid, setOfferValid] = useState(false);

/*     // Função para decodificar o Base64
    const decodeBase64 = (base64) => {
        return decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    // Função para validar o código da oferta
    const validateOfferCode = (offerCode) => {
        try {
            const expirationDate = decodeBase64(offerCode);
            const now = new Date().toISOString();
    
            // Verifica se a data de expiração é válida
            const isValidDate = !isNaN(Date.parse(expirationDate));
    
            if (!isValidDate) {
                console.log(`Offer expiration date is invalid: ${expirationDate}`);
                return false; // Data inválida
            }
    
            console.log(`Offer expiration date: ${expirationDate}, validity: ${now < expirationDate}`);
            return now < expirationDate;
    
        } catch (error) {
            console.error("Error validating offer code:", error);
            return false; // Erro ao decodificar ou data inválida
        }
    }; 

    function formatExpirationDate(expirationDate) {
        // Converte a string de data em um objeto Date
        const date = new Date(expirationDate);
    
        // Extrai dia, mês e ano
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses são baseados em zero
        const year = date.getFullYear().toString().slice(-2);
    
        // Extrai horas e minutos
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
    
        // Monta a string no formato desejado
        return `${day}/${month}/${year} às ${hours}:${minutes}`;
    }
    

    useEffect(() => {
        async function checkOfferValidity() {
            const valid = await isOfferActive(offerStartTime, offerEndTime);
            setOfferValid(valid);
        }
        checkOfferValidity();
    }, [offerStartTime, offerEndTime]); 

    // useEffect para validar a oferta quando o componente for montado ou o código da oferta mudar
    useEffect(() => {
        const valid = validateOfferCode(offerId);
        setOfferValid(valid);
    }, [offerId]);

    // const expirationDate = offerValid ? decodeBase64(offerId) : "";
    // const deadline = offerValid ? formatExpirationDate(expirationDate): "";
    console.log(deadline);

    let offerHeadline = offerValid ? `${offerInfo["dynamic"].headline} ${deadline}`: offerInfo["default"].headline;
    const offerPrice = offerValid ? offerInfo["dynamic"].price: offerInfo["default"].price;
    const offerPricePix = offerValid ? offerInfo["dynamic"].pricePix: offerInfo["default"].pricePix;
    const offerLinkPix = offerValid ? offerInfo["dynamic"].linkPix: offerInfo["default"].linkPix;
    const offerPriceParcelado12x = offerValid ? offerInfo["dynamic"].priceParcelado12x: offerInfo["default"].priceParcelado12x;
    const offerLinkCartaoDeCredito = offerValid ? offerInfo["dynamic"].linkCartaoDeCredito: offerInfo["default"].linkCartaoDeCredito;
    
    const originalPrice = offerInfo["default"].price;
    const originalPricePix = offerInfo["default"].pricePix;
    const originalPriceParcelado12x = offerInfo["default"].priceParcelado12x;

    const handleClickForCreditCard = () => {
        window.dataLayer.push({
            event: 'clickForCreditCard',
            buttonName: 'clickForCreditCard',
        });
        saveDesiteEventInDB("click_for_credit_card", URLparams.v);
        window.location.href = offerLinkCartaoDeCredito;
    };

    const handleClickForPix = () => {
        window.dataLayer.push({
            event: 'clickForPix',
            buttonName: 'clickForPix',
        });
        saveDesiteEventInDB("click_for_pix", URLparams.v);
        window.location.href = offerLinkPix;
    };

    if (offerValid) {
        return (
            <section id="form" className="section">
            <div className="offer-container">
                <h2 align="center">{offerHeadline}</h2>
                <DescricaoInicialOferta />
                <h2 align='center' className="original-price">de {originalPriceParcelado12x}</h2>
                <h2 align='center' className="urgente">por {offerPriceParcelado12x}</h2>
                <h2>Agora escolha a sua forma de pagamento:</h2>
                {isMobile &&
                <>
                    <div className='payment-form'>
                        <h3 align="left">No cartão de crédito (até 12x):</h3>
                        <p>se parcelar em 12x, fica: <br />de: <span className="original-price">{originalPriceParcelado12x}</span> <br /><span className="offer-price"> por: <b>{offerPriceParcelado12x}</b></span></p>
                        <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                    </div>
                    <div className='payment-form'>
                        <h3 align="left">À vista no Pix ou boleto:</h3>
                        <p>preço base: <span className="original-price">{originalPrice}</span><br />
                        com a oferta aplicada: <span className="original-price">{offerPrice}</span><br />
                        <span className="offer-price">-5% do Pix/boleto: <b>{offerPricePix}</b></span></p>
                        <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                    </div>
                </>
                }
                {!isMobile &&
                <table>
                    <tr>
                        <td>
                            <div className='payment-form'>
                            <h3 align="left">No cartão de crédito (até 12x):</h3>
                            <p>se parcelar em 12x, fica: <br />de: <span className="original-price">{originalPriceParcelado12x}</span> <br /><span className="offer-price"> por: <b>{offerPriceParcelado12x}</b></span></p>
                            <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                            </div>
                        </td>
                        <td>
                            <div className='payment-form'>
                            <h3 align="left">À vista no Pix ou boleto:</h3>
                            <p>preço base: <span className="original-price">{originalPrice}</span><br />
                            com a oferta aplicada: <span className="original-price">{offerPrice}</span><br />
                            <span className="offer-price">-5% do Pix/boleto: <b>{offerPricePix}</b></span></p>
                            <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                            </div>
                        </td>    
                    </tr>
                </table>
                } 
                <p>Falta pouco para você começar a dominar os circuitos elétricos!</p>
                <h3 className="urgente" align="left">Aviso: Estas condições podem mudar a qualquer momento.</h3>
                <p><b>Lembre-se que você tem 7 dias de garantia de satisfação incondicional.</b></p>
                <p>Ou seja, se você estiver em dúvida se o curso é para você, fique tranquilo porque você terá 7 dias a partir da inscrição para pedir reembolso integral caso não goste do curso por qualquer motivo.</p>
            </div>
            </section>
        );
    } else {
        return (
            <>
            <section id="form" className="section">
            <div className="offer-container">
                <h2 align="center">{offerHeadline}</h2>
                <DescricaoInicialOferta />
                <h2 align='center' className="urgente">por {originalPriceParcelado12x}</h2>
                <h2>Agora escolha a sua forma de pagamento:</h2>
                {isMobile &&
                <>
                <div className='payment-form'>
                    <h3 align="left">No cartão de crédito (até 12x):</h3>
                    <p>se parcelar em 12x, fica: <br /><span className="offer-price"> por: <b>{offerPriceParcelado12x}</b></span></p>
                    <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                </div>
                <div className='payment-form'>
                    <h3 align="left">À vista no Pix ou boleto:</h3>
                    <p>preço base: <span className="original-price">{originalPrice}</span><br />
                    -5% do Pix/boleto: <span className="offer-price"><b>{originalPricePix}</b></span><br /></p>
                    <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                </div>
                </>}
                {!isMobile &&
                <table>
                    <tr>
                        <td>
                            <div className='payment-form'>
                                <h3 align="left">No cartão de crédito (até 12x):</h3>
                                <p>se parcelar em 12x, fica: <br /><span className="offer-price"> por: <b>{offerPriceParcelado12x}</b></span></p>
                                <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                            </div>
                        </td>
                        <td>
                            <div className='payment-form'>
                                <h3 align="left">À vista no Pix ou boleto:</h3>
                                <p>preço base: <span className="original-price">{originalPrice}</span><br />
                                -5% do Pix/boleto: <span className="offer-price"><b>{originalPricePix}</b></span><br /></p>
                                <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                            </div>
                       </td>    
                    </tr>
                </table>}
                <p>Falta pouco para você começar a dominar os circuitos elétricos!</p>
                <h3 className="urgente" align="left">Aviso: Estas condições podem mudar a qualquer momento.</h3>
                <p><b>Lembre-se que você tem 7 dias de garantia de satisfação incondicional.</b></p>
                <p>Ou seja, se você estiver em dúvida se o curso é para você, fique tranquilo porque você terá 7 dias a partir da inscrição para pedir reembolso integral caso não goste do curso por qualquer motivo.</p>
            </div>
            </section>
            </>
            );
    }
}; 

export default OfertaBreve; */
// Filename - pages/oferta_breve.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './price.css';
import {saveDesiteEventInDB} from './tracking';

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

async function getCurrentTimeFromWorldTimeAPI() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        const data = await response.json();
        const currentTime = new Date(data.utc_datetime);
        return currentTime;
    } catch (error) {
        console.error('Error fetching current time from WorldTimeAPI:', error);
        return null;
    }
}

async function isOfferActive(startTimeString, endTimeString) {
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
}

const DescricaoInicialOferta = () => {
    return (
        <>
        <h2>Para você ter acesso a:</h2>
        <ul className='content-listing'>
            <li><b>Conteúdo principal: </b>11 módulos (mais de 88 horas de aulas gravadas)</li>
            <li><b>DE Labs: </b>aulas experimentais de circuitos elétricos em laboratório</li>
            <li><b>Matemática do Elétron: </b>curso de revisão de matemática básica para circuitos elétricos (cerca de 25 horas de aulas gravadas)</li>
            <li><b>Suporte: </b>acompanhamento individual de tira-dúvidas pelo Telegram</li>
            <li><b>Comunidade: </b>grupo exclusivo de alunos no Telegram</li>
            <li><b>Acesso: </b>1 ano de acesso com suporte à plataforma do curso em site próprio no sistema Moodle</li>
            <li><b>Extras: </b>outros conteúdos que só quem entra fica sabendo (surpresa)</li>
        </ul>
        </>
    );
}

const OfertaBreve = ({isMobile}) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const offerId = queryParams.get('id');
    const offerInfo = {
        D15MAI24_09h_36h: {
            headline: "Oferta especial válida de 09h00 de 15/05/24 às 21h00 de 16/05/24",
            startTime: "2024-05-15T09:00:00.000-03:00",
            endTime: "2024-05-16T21:00:00.000-03:00",
            price: "R$ 426,72 / ano",
            pricePix: "R$ 405,38",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=a3db2519-109b-44bd-90b6-d40eafab76f4",
            priceParcelado12x: "12 x R$ 40,35",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=bee6ca52-ff5e-44ef-aaa9-a95827c5e240"
        },
        YTGADS284jknds84: {
            headline: "Oferta especial para campanha feita no YouTube:",
            startTime: "2024-04-25T00:00:01.000-03:00",
            endTime: "2125-04-25T23:59:59.000-03:00",
            price: "R$ 426,72 / ano",
            pricePix: "R$ 405,38",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=a3db2519-109b-44bd-90b6-d40eafab76f4",
            priceParcelado12x: "12 x R$ 40,35",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=bee6ca52-ff5e-44ef-aaa9-a95827c5e240"
        },
        default: {
            headline: "Preço para você assinar a plataforma do curso:",
            startTime: "2024-04-08T08:00:00.000-03:00",
            endTime: "2124-04-11T08:00:00.000-03:00",
            price: "R$ 508 / ano",
            pricePix: "R$ 482,60",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=e90b6774-e5b1-4fb2-adf2-00a1bc4ac89a",
            priceParcelado12x: "12 x R$ 48,04",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=6d6a37c5-3866-4859-83c6-2f0f998c9847"
        }
    };
    
    const offerStartTime = offerInfo.hasOwnProperty(offerId) ? offerInfo[offerId].startTime: offerInfo["default"].startTime;
    const offerEndTime = offerInfo.hasOwnProperty(offerId) ? offerInfo[offerId].endTime: offerInfo["default"].endTime;
    const [offerValid, setOfferValid] = useState(false);

    useEffect(() => {
        async function checkOfferValidity() {
            const valid = await isOfferActive(offerStartTime, offerEndTime);
            setOfferValid(valid);
        }
        checkOfferValidity();
    }, [offerStartTime, offerEndTime]);

    const offerActive = (offerValid === "active"); 

    let offerHeadline = offerInfo.hasOwnProperty(offerId) && offerActive ? offerInfo[offerId].headline: offerInfo["default"].headline;
    const offerPrice = offerInfo.hasOwnProperty(offerId) && offerActive ? offerInfo[offerId].price: offerInfo["default"].price;
    const offerPricePix = offerInfo.hasOwnProperty(offerId) && offerActive ? offerInfo[offerId].pricePix: offerInfo["default"].pricePix;
    const offerLinkPix = offerInfo.hasOwnProperty(offerId) && offerActive ? offerInfo[offerId].linkPix: offerInfo["default"].linkPix;
    const offerPriceParcelado12x = offerInfo.hasOwnProperty(offerId) && offerActive ? offerInfo[offerId].priceParcelado12x: offerInfo["default"].priceParcelado12x;
    const offerLinkCartaoDeCredito = offerInfo.hasOwnProperty(offerId) && offerActive ? offerInfo[offerId].linkCartaoDeCredito: offerInfo["default"].linkCartaoDeCredito;
    

    const originalPrice = offerInfo["default"].price;
    const originalPricePix = offerInfo["default"].pricePix;
    const originalPriceParcelado12x = offerInfo["default"].priceParcelado12x;

    if (offerValid === "late") {
        offerHeadline = "Oferta expirada. Veja o preço padrão do curso:";
    }

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

    if (offerInfo.hasOwnProperty(offerId) && offerActive) {
        return (
            <>
            <section id="form" className="section">
            <div className="offer-container">
                <h2 align="center">{offerHeadline}</h2>
                <DescricaoInicialOferta />
                <h2 className="urgente" align="center">De <span className="original-price">{originalPriceParcelado12x}</span>, por: <span className="offer-price">{offerPriceParcelado12x}</span></h2>
                <h3 align="center">(desconto de 16%)</h3>
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
                        com a oferta aplicada: <span className="original-price">{originalPricePix}</span><br />
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
                            com a oferta aplicada: <span className="original-price">{originalPricePix}</span><br />
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
            </>
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

export default OfertaBreve;
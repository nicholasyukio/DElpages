// Filename - pages/oferta_breve.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './price.css';

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

const OfertaBreve = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const offerId = queryParams.get('id');
    const offerInfo = {
        D10ABR24: {
            headline: "Oferta válida só até 08h00 de 11/04/2024",
            startTime: "2024-04-10T08:00:00.000-03:00",
            endTime: "2024-04-11T08:00:00.000-03:00",
            price: "R$ 415,80 / ano",
            pricePix: "R$ 395,01",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=fda2c4d6-459c-45a7-a482-b320e06b2a15",
            priceParcelado12x: "12 x R$ 39,32",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d6c703dd-0c98-49cd-906f-4d889447355d"
        },
        D18ABR24: {
            headline: "Oferta válida só até 08h00 de 19/04/2024",
            startTime: "2024-04-18T08:00:00.000-03:00",
            endTime: "2024-04-19T08:00:00.000-03:00",
            price: "R$ 415,80 / ano",
            pricePix: "R$ 395,01",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=fda2c4d6-459c-45a7-a482-b320e06b2a15",
            priceParcelado12x: "12 x R$ 39,32",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d6c703dd-0c98-49cd-906f-4d889447355d"
        },
        D25ABR24_ji2: {
            headline: "Oferta especial e exclusiva para o dia 25/04/24",
            startTime: "2024-04-25T00:00:01.000-03:00",
            endTime: "2024-04-25T23:59:59.000-03:00",
            price: "R$ 415,80 / ano",
            pricePix: "R$ 395,01",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=fda2c4d6-459c-45a7-a482-b320e06b2a15",
            priceParcelado12x: "12 x R$ 39,32",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d6c703dd-0c98-49cd-906f-4d889447355d"
        },
        D29ABR24_10h_36h: {
            headline: "Oferta especial válida de 10h00 de 29/04/24 às 22h00 de 30/04/24",
            startTime: "2024-04-29T09:00:00.000-03:00",
            endTime: "2024-04-30T22:00:00.000-03:00",
            price: "R$ 415,80 / ano",
            pricePix: "R$ 395,01",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=fda2c4d6-459c-45a7-a482-b320e06b2a15",
            priceParcelado12x: "12 x R$ 39,32",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d6c703dd-0c98-49cd-906f-4d889447355d"
        },
        YTGADS284jknds84: {
            headline: "Oferta especial para campanha feita no YouTube:",
            startTime: "2024-04-25T00:00:01.000-03:00",
            endTime: "2125-04-25T23:59:59.000-03:00",
            price: "R$ 415,80 / ano",
            pricePix: "R$ 395,01",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=fda2c4d6-459c-45a7-a482-b320e06b2a15",
            priceParcelado12x: "12 x R$ 39,32",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d6c703dd-0c98-49cd-906f-4d889447355d"
        },
        default: {
            headline: "Preço para você assinar a plataforma do curso:",
            startTime: "2024-04-08T08:00:00.000-03:00",
            endTime: "2124-04-11T08:00:00.000-03:00",
            price: "R$ 495 / ano",
            pricePix: "R$ 470,25",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d997bb7c-4e4b-4472-95ce-50ad197a5dfa",
            priceParcelado12x: "12 x R$ 46,81",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=32655ab6-c847-4db0-ab62-c49f342487e4"
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
        window.location.href = offerLinkCartaoDeCredito;
    };

    const handleClickForPix = () => {
        window.dataLayer.push({
            event: 'clickForPix',
            buttonName: 'clickForPix',
        });
        window.location.href = offerLinkPix;
    };

    if (offerInfo.hasOwnProperty(offerId) && offerActive) {
        return (
            <>
            <section id="form" className="section">
            <div className="offer-container">
                <h2 align="center">{offerHeadline}</h2>
                <h2 className="urgente" align="center">-16% na anuidade da plataforma do curso</h2>
                <table>
                    <tr>
                        <td>
                            <div className='payment-form'>
                            <h4 align="left">No cartão de crédito <br/>(até 12x, juros de 2% a.m.):</h4>
                            <p>se parcelar em 12x, fica: <br />de: <span className="original-price">{originalPriceParcelado12x}</span> <br /><span className="offer-price"> por: <b>{offerPriceParcelado12x}</b></span></p>
                            <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                            </div>
                        </td>
                        <td>
                            <div className='payment-form'>
                            <h4 align="left">À vista no Pix ou boleto <br/>(-5% sobre a oferta):</h4>
                            <p>preço base: <span className="original-price">{originalPrice}</span><br />
                            com a oferta aplicada: <span className="original-price">{originalPricePix}</span><br />
                            <span className="offer-price">-5% do Pix/boleto: <b>{offerPricePix}</b></span></p>
                            <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                            </div>
                        </td>    
                    </tr>
                </table>
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
                <h2 align='center' className="urgente">{originalPrice}</h2>
                <table>
                    <tr>
                        <td>
                            <div className='payment-form'>
                            <h4 align="left">No cartão de crédito <br/>(até 12x, juros de 2% a.m.):</h4>
                            <p>se parcelar em 12x, fica: <br /><span className="offer-price"> por: <b>{offerPriceParcelado12x}</b></span></p>
                            <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                            </div>
                        </td>
                        <td>
                            <div className='payment-form'>
                            <h4 align="left">À vista no Pix ou boleto <br/>(-5% sobre a preço base):</h4>
                            <p>preço base: <span className="original-price">{originalPrice}</span><br />
                            -5% do Pix/boleto: <span className="offer-price"><b>{originalPricePix}</b></span><br /></p>
                            <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                            </div>
                        </td>    
                    </tr>
                </table>
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
// Filename - pages/oferta_breve.js

import React from "react";
import { useLocation } from 'react-router-dom';
import './price.css';

function isOfferStillValid(deadlineString) {
    const deadlineDate = new Date(deadlineString);
    const currentDate = new Date();
    if (currentDate < deadlineDate) {
        return true;
    } else {
        return false;
    }
}

const OfertaBreve = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const offerId = queryParams.get('id');
    const offerInfo = {
        D10ABR24: {
            headline: "Oferta válida apenas para o dia 10/04/2024",
            deadline: "2024-04-11T08:00:00.000-03:00",
            price: "R$ 462 / ano",
            pricePix: "R$ 438,90",
            linkPix: "",
            priceParcelado12x: "12 x R$ 43,69",
            linkCartaoDeCredito: ""
        },
        default: {
            headline: "Preço para você assinar a plataforma do curso:",
            deadline: "2124-04-11T08:00:00.000-03:00",
            price: "R$ 495 / ano",
            pricePix: "R$ 470,25",
            linkPix: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d997bb7c-4e4b-4472-95ce-50ad197a5dfa",
            priceParcelado12x: "12 x R$ 46,81",
            linkCartaoDeCredito: "https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=32655ab6-c847-4db0-ab62-c49f342487e4"
        }
    };
    let offerHeadline = offerInfo.hasOwnProperty(offerId) ? offerInfo[offerId].headline: offerInfo["default"].headline;
    const offerDeadline = offerInfo.hasOwnProperty(offerId) ? offerInfo[offerId].deadline: offerInfo["default"].deadline;
    const offerValid = isOfferStillValid(offerDeadline);

    const offerPrice = offerInfo.hasOwnProperty(offerId) && offerValid ? offerInfo[offerId].price: offerInfo["default"].price;
    const offerPricePix = offerInfo.hasOwnProperty(offerId) && offerValid ? offerInfo[offerId].pricePix: offerInfo["default"].pricePix;
    const offerLinkPix = offerInfo.hasOwnProperty(offerId) && offerValid ? offerInfo[offerId].linkPix: offerInfo["default"].linkPix;
    const offerPriceParcelado12x = offerInfo.hasOwnProperty(offerId) && offerValid ? offerInfo[offerId].priceParcelado12x: offerInfo["default"].priceParcelado12x;
    const offerLinkCartaoDeCredito = offerInfo.hasOwnProperty(offerId) && offerValid ? offerInfo[offerId].linkCartaoDeCredito: offerInfo["default"].linkCartaoDeCredito;
    

    const originalPrice = offerInfo["default"].price;
    const originalPricePix = offerInfo["default"].pricePix;
    const originalPriceParcelado12x = offerInfo["default"].priceParcelado12x;

    if (!offerValid) {
        offerHeadline = "Oferta expirada. Veja o preço padrão do curso:"
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

	return (
    <>
    <section id="form" className="section">
    <div className="offer-container">
        <h2 align="center">{offerHeadline}</h2>
        {offerInfo.hasOwnProperty(offerId) && offerValid && (<h2 align="center"><span className="original-price">de: {originalPrice}</span></h2>)}
        <h2 align="center"><span className="offer-price">por: {offerPrice}</span></h2>
        <h2 align="left">Formas de pagamento:</h2>
        <table>
            <tr>
                <td>
                    <h4 align="left">Parcelado no cartão de crédito <br/>(juros de 2% a.m.):</h4>
                    {offerInfo.hasOwnProperty(offerId) && offerValid && (<p><span className="original-price">de: {originalPriceParcelado12x}</span></p>)}
                    <p><span className="offer-price">por: {offerPriceParcelado12x}</span></p>
                </td>
                <td>
                    <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                </td>
            </tr>
            <tr>
                <td>
                    <h4 align="left">À vista no Pix ou boleto <br/>(5% de desconto):</h4>
                    {offerInfo.hasOwnProperty(offerId) && offerValid && (<p><span className="original-price">de: {originalPricePix}</span></p>)}
                    <p><span className="offer-price">por: {offerPricePix}</span></p>
                </td>
                <td>
                    <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
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
};

export default OfertaBreve;
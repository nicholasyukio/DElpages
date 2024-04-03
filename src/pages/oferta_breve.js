// Filename - pages/oferta_breve.js

import { OriginalPriceParcelado12x, OfferPriceParcelado12x, OriginalPricePix, OfferPricePix, OriginalPrice, OfferPrice } from "./price";
import React from "react";

const OfertaBreve = () => {

    const handleClickForCreditCard = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForCreditCard', // Custom event name
            buttonName: 'clickForCreditCard', // Custom event data, you can adjust this as needed
        });

        // Redirect the user after pushing the data to GTM if needed
        window.location.href = 'https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=32655ab6-c847-4db0-ab62-c49f342487e4'; // Redirect to the form anchor
    };

    const handleClickForPix = () => {
        // Push the data to the dataLayer when the button is clicked
        window.dataLayer.push({
            event: 'clickForPix', // Custom event name
            buttonName: 'clickForPix', // Custom event data, you can adjust this as needed
        });

        // Redirect the user after pushing the data to GTM if needed
        window.location.href = 'https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=d997bb7c-4e4b-4472-95ce-50ad197a5dfa'; // Redirect to the form anchor
    };

	return (
    <>
    <section id="form" className="section">
    <div className="offer-container">
        <h2 align="center">Preço para você assinar a plataforma do curso:</h2>
        <h2 align="center"><OriginalPrice /></h2>
        <h2 align="left">Formas de pagamento:</h2>
        <table>
            <tr>
                <td>
                    <h4 align="left">Parcelado no cartão de crédito <br/>(juros de 2% a.m.):</h4>
                    <p><OriginalPriceParcelado12x/></p>
                </td>
                <td>
                    <button className="btn-pagamento" onClick={handleClickForCreditCard}>Pagar com cartão de crédito</button>
                </td>
            </tr>
            <tr>
                <td>
                    <h4 align="left">À vista no Pix ou boleto <br/>(5% de desconto):</h4>
                    <p><OriginalPricePix/></p>
                </td>
                <td>
                    <button className="btn-pagamento" onClick={handleClickForPix}>Pagar com Pix/boleto</button>
                </td>
            </tr>
        </table>
        <p>Falta pouco para você começar a dominar os circuitos elétricos!</p>
        <h3 className="urgente" align="left">Aviso: Esta oferta é válido por tempo limitado.</h3>
        <p><b>Lembre-se que você tem 7 dias de garantia de satisfação incondicional.</b></p>
        <p>Ou seja, se você estiver em dúvida se o curso é para você, fique tranquilo porque você terá 7 dias a partir da inscrição para pedir reembolso integral caso não goste do curso por qualquer motivo.</p>
    </div>
    </section>
    </>
	);
};

export default OfertaBreve;
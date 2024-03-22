// Filename - pages/oferta_breve.js

import React from "react";

const OfertaBreve = () => {
	return (
    <>
    <section id="form" className="section">
    <div className="offer-container">
        <h2 align="center">Oferta especial para você:</h2>
        <h2 align="center">R$ 462 / ano</h2>
        <h3 align="left">Formas de pagamento:</h3>
        <table>
            <tr>
                <td>
                    <h4 align="left">Parcelado no cartão de crédito:</h4>
                    <p> 12 x R$ 43,69</p>
                </td>
                <td>
                    <button className="btn-pagamento" onClick={() => window.location.href='https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=2fd10c29-92d0-40a3-b404-76cdc09d59cd'}>Pagar com cartão de crédito</button>
                </td>
            </tr>
            <tr>
                <td>
                    <h4 align="left">À vista no Pix ou boleto:</h4>
                    <p>R$ 438,90 (5% de desconto)</p>
                </td>
                <td>
                    <button className="btn-pagamento" onClick={() => window.location.href='https://pague.lia.com.br/dominio-eletrico/oferta?offer_id=e4f62bd4-4dd7-444e-9efb-c17331df763a'}>Pagar com Pix/boleto</button>
                </td>
            </tr>
        </table>
        <p>Falta pouco para você começar a dominar os circuitos elétricos!</p>
        <h3 align="left">Aviso: esta oferta pode expirar a qualquer momento.</h3>
        <p><b>Lembre-se que você tem 7 dias de garantia de satisfação incondicional.</b></p>
        <p>Ou seja, se você estiver em dúvida se o curso é para você, fique tranquilo porque você terá 7 dias a partir da inscrição para pedir reembolso integral caso não goste do curso por qualquer motivo.</p>
        <p><i>(Mas se você já estiver pensando em entrar e pedir reembolso por motivos suspeitos, peço que nem faça inscrição para evitar estresse para nós dois.)</i></p>
    </div>
    </section>
    </>
	);
};

export default OfertaBreve;
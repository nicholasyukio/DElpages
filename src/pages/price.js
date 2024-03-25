import React from 'react';
import './price.css';

// Parcelado no cartão de crédito em 12x

const OriginalPriceParcelado12x = () => {
    return (
        <span className="original-price">12 x R$ 46,81</span>
    );
};

const OfferPriceParcelado12x = () => {
    return (
        <span className="offer-price">12 x R$ 43,69</span>
    );
};

// À vista no Pix ou boleto

const OriginalPricePix = () => {
    return (
        <span className="original-price">R$ 470,25</span>
    );
};

const OfferPricePix = () => {
    return (
        <span className="offer-price">R$ 438,90</span>
    );
};

// Preço base

const OriginalPrice = () => {
    return (
        <span className="original-price">R$ 495 / ano</span>
    );
};

const OfferPrice = () => {
    return (
        <span className="offer-price">R$ 462 / ano</span>
    );
};

export { OriginalPriceParcelado12x, OfferPriceParcelado12x, OriginalPricePix, OfferPricePix, OriginalPrice, OfferPrice };
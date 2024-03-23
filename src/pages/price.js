import React from 'react';
import './price.css';

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

export { OriginalPrice, OfferPrice };
import React from 'react';

const Product = ({ product }) => {
    return (
        <div className='product'>
            <img src={product.image} alt={product.brand} />
            <div className='product__infos'>
                <p>{product.name}</p>
                <p>{product.price} €</p>
            </div>
        </div>
    );
};

export default Product;
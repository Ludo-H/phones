import React from 'react';
import { NavLink } from 'react-router-dom';

// Props récupéré de la page Home
const Product = ({ product }) => {

    return (
        <NavLink to={`/product/${product.id}`} >
            <div className='product'>
                <img src={product.image} alt={product.brand} />
                <div className='product__infos'>
                    <p>{product.name}</p>
                    <p>{product.price} €</p>
                </div>
            </div>
        </NavLink>

    );
};

export default Product;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getOneProduct } from '../../actions/products.action';
import { useDispatch} from 'react-redux';

const Product = ({ product }) => {

    const dispatch = useDispatch();

    return (
        <NavLink to='/product' onClick={()=>dispatch(getOneProduct(product.id))}>
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
import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import {useParams} from 'react-router-dom';
import { getProducts } from '../actions/products.action';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '@firebase/util';

const Product = () => {

    const [user, setUser] = useState(null);

    let {id} = useParams();
    const dispatch = useDispatch();

    let productClicked = [];
    let colorsProduct = [];
    console.log(colorsProduct)
    const products = useSelector((state) => state.productsReducer);
    !isEmpty(products[0]) && products.map((product)=>{
        if(product.id === id){
            productClicked = product;
        }
    })

    !isEmpty(productClicked) && productClicked.color.map((color)=>{
        colorsProduct.push(color);
    });

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [user])

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    

    return (
        <Fragment>
            {user ?
                <Fragment>
                    <Header user={user} />
                    <div className='container__product'>
                        <img src={productClicked.image} alt={`phone ${productClicked.name}`} />
                        <h2>{productClicked.name}</h2>
                        <p>{productClicked.price} €</p>
                        <select name="" id="">
                            <option value="">Choisissez une couleur</option>
                            {!isEmpty(colorsProduct) && colorsProduct.map((color)=>(
                                <option value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                </Fragment>
                :
                <p>Connectez vous pour accéder au site, mettre comp loading </p>
            }
        </Fragment>
    );
};

export default Product;
import { onAuthStateChanged } from 'firebase/auth';
import React, { Fragment, useEffect, useState } from 'react';
import { getProducts } from '../actions/products.action';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from '../utils/fonctions';


const Home = () => {

    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const products = useSelector((state)=> state.productsReducer);


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            console.log(currentUser);
        });
    }, [user])

    useEffect(() => {
        dispatch(getProducts())
      }, [dispatch])

    return (
        <Fragment>
            {user && <Header user={user}/>}
            <div className='banner'>
                <h2>banniere defilente</h2>
            </div>
            <div className='container__categories'>
                <div className='container__categories__categorie'>
                    <h3>Apple</h3>
                    {!isEmpty(products[0]) && products.map((product)=>{
                        return(
                            product.brand === "apple" && 
                            <Fragment>
                                <img src={product.image} alt="apple" />
                                <p>{product.name}</p>
                                <p>{product.price} €</p>
                            </Fragment>
                        )
                    })}
                </div>
                <div className='container__categories__categorie'>
                    <h3>Samsung</h3>
                    {!isEmpty(products[0]) && products.map((product)=>{
                        return(
                            product.brand === "samsung" && 
                            <Fragment>
                                <img src={product.image} alt="apple" />
                                <p>{product.name}</p>
                                <p>{product.price} €</p>
                            </Fragment>
                        )
                    })}
                </div>
                <div className='container__categories__categorie'>
                    <h3>Xiaomi</h3>
                    {!isEmpty(products[0]) && products.map((product)=>{
                        return(
                            product.brand === "xiaomi" && 
                            <Fragment>
                                <img src={product.image} alt="apple" />
                                <p>{product.name}</p>
                                <p>{product.price} €</p>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
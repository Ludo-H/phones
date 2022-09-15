import { onAuthStateChanged } from 'firebase/auth';
import React, { Fragment, useEffect, useState } from 'react';
import { getProducts } from '../actions/products.action';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils/fonctions';
import Product from '../components/Products/Product';
import Footer from '../components/Footer';


const Home = () => {

    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsReducer);
    console.log(products)


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
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
                    <div className='container__categories content'>
                        <div className='container__categories__categorie'>
                            <h3>Apple</h3>
                            <div className='container__products'>
                                {!isEmpty(products[0]) && products.map((product) => {
                                    return (
                                        product.brand === "apple" &&
                                        <Product key={product.id} product={product} />
                                    )
                                })}
                            </div>
                        </div>
                        <div className='container__categories__categorie'>
                            <h3>Samsung</h3>
                            <div className='container__products'>
                                {!isEmpty(products[0]) && products.map((product) => {
                                    return (
                                        product.brand === "samsung" &&
                                        <Product key={product.id} product={product} />
                                    )
                                })}
                            </div>
                        </div>
                        <div className='container__categories__categorie'>
                            <h3>Xiaomi</h3>
                            <div className='container__products'>
                                {!isEmpty(products[0]) && products.map((product) => {
                                    return (
                                        product.brand === "xiaomi" &&
                                        <Product key={product.id} product={product} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Fragment> 
                :
                <p>Connectez vous pour accéder au site, mettre comp loading </p>
                }
                <Footer/>
        </Fragment>
    );
};

export default Home;
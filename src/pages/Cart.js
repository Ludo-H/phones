import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getBasket } from '../actions/basket.actions';
import { isEmpty } from '@firebase/util';

const Cart = () => {

    const [user, setUser] = useState(null);

    const basketOfUser = useSelector((state)=>state.basketReducer)
    console.log(basketOfUser)
    const dispatch = useDispatch()

    useEffect(() => {
      !isEmpty(user) && dispatch(getBasket(user.uid))
    }, [user])
    

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
    }, [user])

    return (
        <Fragment>
            {user ?
                <div>
                    <Header user={user} />
                    <h2>Votre panier</h2>

                </div>
                :
                <p>Connectez vous pour accéder au site, mettre comp loading </p>
            }
            <Footer/>
        </Fragment>
    );
};

export default Cart;
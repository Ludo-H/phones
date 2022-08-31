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

    let totalPrice = 0;

    const basketOfUser = useSelector((state) => state.basketReducer)
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
                    <div className='container__basket'>
                        {!isEmpty(basketOfUser) && basketOfUser.map((article) => {
                            totalPrice += article.price * article.quantity;
                            return (
                                <div key={article.id} className='container__basket__article'>
                                    <img src={article.image} alt={`Phone ${article.name}`} />
                                    <p>{article.name}</p>
                                    <p>Quantité : {article.quantity}</p>
                                    <p>Prix : {article.price * article.quantity} €</p>
                                    <button>X</button>
                                </div>
                            )
                        })}
                    </div>
                    <h3>Prix total : {totalPrice}</h3>
                    <button>Valider et payer</button>
                </div>
                :
                <p>Connectez vous pour accéder au site, mettre comp loading </p>
            }
            <Footer />
        </Fragment>
    );
};

export default Cart;
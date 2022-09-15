import React, { Fragment, useEffect, useState } from 'react';
import Header from '../components/Header';
import { auth, db } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBasketArticle, getBasket } from '../actions/basket.actions';
import { isEmpty } from '@firebase/util';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';


const Cart = () => {

    // State pour avoir les infos user
    /***************************************************************/
    const [user, setUser] = useState(null);
    /***************************************************************/


    // Variables pour prix total, contenu du panier
    /***************************************************************/
    let totalPrice = 0;
    const basketOfUser = useSelector((state) => state.basketReducer)
    const dispatch = useDispatch()
    /***************************************************************/


    // Récupère le contenu du panier puis a chaque changement contenu user
    /***************************************************************/
    useEffect(() => {
        !isEmpty(user) && dispatch(getBasket(user.uid))
    }, [user, dispatch])
    /***************************************************************/


    // Logique pour afficher page si user connecté
    /***************************************************************/
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
    }, [user])
    /***************************************************************/


    // Logique de paiement
    /***************************************************************/
    const navigate = useNavigate();
    const handleToken = async (token)=>{
        // console.log(token)

        // On va l'envoyer au serveur
        const basket = {
            name : "All Products",
            totalprice : totalPrice
        }
        const response = await axios.post('http://localhost:8080/checkout', {
            token, 
            basket
        })
        // console.log(response)

        // On déstructuré les réponses
        let{status}= response.data

        // Conditions par rapport aux réponses
        if(status === 'success'){
            navigate('/home');
            const uid = auth.currentUser.uid;

            // On récupère le panier de l'useer dans BDD pour le supprimer
            const carts = await getDocs(collection(db, 'Basket of user ' + uid)); 
            for(let snap of carts.docs){
                deleteDoc(doc(db, 'Basket of user ' + uid, snap.id))
            }
        }else{
            alert('Something wrong in payment')
        }
    }
    /***************************************************************/

    return (
        <Fragment>
            {user && basketOfUser ?
            <Fragment>
                <Header user={user} />
                <div className='content'>
                    <h2>Votre panier</h2>
                    <div className='container__basket'>
                        {!isEmpty(basketOfUser) && basketOfUser.map((article) => {
                            totalPrice += article.price * article.quantity;
                            // console.log(article)
                            return (
                                <div key={article.id} className='container__basket__article'>
                                    <img src={article.image} alt={`Phone ${article.name}`} />
                                    <p>{article.name}</p>
                                    <p>Color : {article.color}</p>
                                    <p>Quantité : {article.quantity}</p>
                                    <p>Prix : {(new Intl.NumberFormat().format(article.price * article.quantity))} €</p>
                                    <button onClick={() => dispatch(deleteBasketArticle(user.uid, article.id))}>X</button>
                                </div>
                            )
                        })}
                    </div>
                    <h3>Prix total : {(new Intl.NumberFormat().format(totalPrice))} €</h3>
                        <StripeCheckout
                            stripeKey='pk_test_51LdCk9Eys2RcAZbdzw32c5MUtZSZxOJ3T7SBrG0tIdTYqPKXVaMhPQdiO8Jp8WNskPPdzmRIwopwXlzZX7wzF2E100q1dT1IGl'
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            name='All Products'
                            amount={totalPrice * 100}
                        >
                        </StripeCheckout>
                </div>
                </Fragment>
                :
                <p className='content connectMsg'>Connectez vous pour accéder au site</p>
            }
            <Footer />
        </Fragment>
    );
};

export default Cart;
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import { auth } from '../utils/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { getProducts } from '../actions/products.action';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '@firebase/util';
import Footer from '../components/Footer';
import { addToBasket } from '../actions/basket.actions';
import {getBasket} from '../actions/basket.actions'

const Product = () => {

    // State infos user, affichage conditionnel popup
    /***************************************************************/
    const [user, setUser] = useState(null);
    // console.log(user)
    const [popUp, setPopUp] = useState(false)
    /***************************************************************/


    // Déstructuration pour id de url
    // Selectionne les inputs avec useRef
    // Array pour récupérer infos produit cliqué
    // Array pour afficher les couleurs a choisir du produit
    // Récupère produits de la BDD
    /***************************************************************/
    let { id } = useParams();
    const dispatch = useDispatch();
    const color = useRef();
    const quantity = useRef();
    let productClicked = [];
    let colorsProduct = [];
    const products = useSelector((state) => state.productsReducer);
    /***************************************************************/


    // Logique pour récupérer les infos du produit cliqué
    /***************************************************************/
    !isEmpty(products[0]) && products.map((product) => {
        if (product.id === id) {
            productClicked = product;
        }
    })
    /***************************************************************/


    // Logique pour créer plus bas les onglets des couleurs du produit
    /***************************************************************/
    !isEmpty(productClicked) && productClicked.color.map((color) => {
        colorsProduct.push(color);
    });
    /***************************************************************/


    // Logique pour ajouter au panier
    /***************************************************************/
    const handleBasket = ()=>{
        if(color.current.value === ''){
            alert("Veuillez choisir une couleur")
        }else{
            // Création de l'item à envoyer en BDD
            const item = {
                id : productClicked.id,
                name : productClicked.name,
                quantity : quantity.current.value,
                price : productClicked.price,
                color : color.current.value,
                image : productClicked.image,
                userId : user.uid
            }
            dispatch(addToBasket(item, user.uid));
            dispatch(getBasket(user.uid));
            setPopUp(true);
        }
    }
    /***************************************************************/


    // On vérifie si user connecté
    /***************************************************************/
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [user])
    /***************************************************************/


    // On récupère les produits dans redux
    /***************************************************************/
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    /***************************************************************/

    return (
        <Fragment>
            {user ?
                <Fragment>
                    <Header user={user} />
                    <div className='container__product content'>
                        <img 
                            src={productClicked.image} 
                            alt={`phone ${productClicked.name}`}
                        />
                        <h2>{productClicked.name}</h2>
                        <p id='price'>{productClicked.price} €</p>
                        <select ref={color} name="" id="">
                            <option value="">Choisissez une couleur</option>
                            {!isEmpty(colorsProduct) && colorsProduct.map((color) => (
                                <option 
                                    key={color} 
                                    value={color}>{color}
                                </option>
                            ))}
                        </select>
                        <div className='container__product__quantity'>
                            <label htmlFor="quantity">Quantité :</label>
                            <select 
                                ref={quantity} 
                                name="quantity" 
                                id="quantity" 
                                defaultValue="1"
                            >
                                <option value="1">1</option>
                                <option value="2">2 </option>
                                <option value="3">3 </option>
                                <option value="4">4 </option>
                                <option value="5">5 </option>
                            </select>
                        </div>
                        <p id='description'>{productClicked.description}</p>
                        <button onClick={()=>handleBasket()}>Ajouter au panier</button>
                        {popUp && 
                            <div className='popUp' onClick={()=> setPopUp(false)}>
                                <h2>Article ajouté !</h2>
                            </div>
                        }
                    </div>
                </Fragment>
                :
                <p className='content connectMsg'>Connectez vous pour accéder au site</p>
            }
            <Footer />
        </Fragment>
    );
};

export default Product;
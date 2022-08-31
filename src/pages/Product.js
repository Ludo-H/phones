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

const Product = () => {

    const [user, setUser] = useState(null);
    console.log(user)

    let { id } = useParams();
    const dispatch = useDispatch();
    const color = useRef();
    const quantity = useRef();

    let productClicked = [];
    let colorsProduct = [];
    const products = useSelector((state) => state.productsReducer);
    !isEmpty(products[0]) && products.map((product) => {
        if (product.id === id) {
            productClicked = product;
        }
    })

    !isEmpty(productClicked) && productClicked.color.map((color) => {
        colorsProduct.push(color);
    });


    const handleBasket = ()=>{
        
        if(color.current.value === ''){
            alert("Veuillez choisir une couleur")
        }else{
            const item = {
                id : productClicked.id,
                name : productClicked.name,
                quantity : quantity.current.value,
                price : productClicked.price,
                color : color.current.value,
                image : productClicked.image,
                userId : user.uid
            }
            dispatch(addToBasket(item, user.uid))
        }
        
    }

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
                        <p id='price'>{productClicked.price} €</p>
                        <select ref={color} name="" id="">
                            <option value="">Choisissez une couleur</option>
                            {!isEmpty(colorsProduct) && colorsProduct.map((color) => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                        <div className='container__product__quantity'>
                            <label htmlFor="quantity">Quantité :</label>
                            <select ref={quantity} name="quantity" id="quantity" defaultValue="1">
                                <option value="1">1</option>
                                <option value="2">2 </option>
                                <option value="3">3 </option>
                                <option value="4">4 </option>
                                <option value="5">5 </option>
                            </select>
                        </div>
                        <p id='description'>{productClicked.description}</p>
                        <button onClick={()=>handleBasket()}>Ajouter au panier</button>
                    </div>
                </Fragment>
                :
                <p>Connectez vous pour accéder au site, mettre comp loading </p>
            }
            <Footer />
        </Fragment>
    );
};

export default Product;
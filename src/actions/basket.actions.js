import { addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import { db } from "../utils/firebase.config";


/***************************************************************/
export const ADD_TO_BASKET = "ADD_TO_BASKET";
export const GET_BASKET = 'GET_BASKET';
export const DELETE_BASKET_ARTICLE = 'DELETE_BASKET_ARTICLE';
/***************************************************************/


// Ajouter au panier
/***************************************************************/
export const addToBasket = (item, uid)=>{
    return async (dispatch)=>{
        return await addDoc(collection(db, 'Basket of user ' + uid), item)
        .then(()=>{
            console.log('lol');
        })
    }
}
/***************************************************************/


// Avoir le contenu du panier
/***************************************************************/
export const getBasket = (uid)=>{
    return async (dispatch)=>{
        return await getDocs(collection(db, 'Basket of user ' + uid))
        .then((res)=>{
            dispatch({
                type : GET_BASKET,
                payload : res.docs.map((doc)=>(
                    {
                        ...doc.data(),
                        id : doc.id
                    }
                ))
            })
        })
    }
}
/***************************************************************/


// Enlever un article du panier
/***************************************************************/
export const deleteBasketArticle = (userId, articleId)=>{
    return async(dispatch)=>{
        return deleteDoc(doc(db, 'Basket of user ' + userId, articleId))
        .then(()=> {
            dispatch({type : DELETE_BASKET_ARTICLE, payload : {articleId}})
        })
        .catch((error)=> console.log(error))
    }
};
/***************************************************************/
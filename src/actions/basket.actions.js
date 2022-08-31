import { addDoc, collection, getDocs} from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const ADD_TO_BASKET = "ADD_TO_BASKET";

// pour récupérer le contenu
export const GET_BASKET = 'GET_BASKET';

export const addToBasket = (item, uid)=>{
    return async (dispatch)=>{
        return await addDoc(collection(db, 'Basket of user ' + uid), item)
        .then(()=>{
            console.log('lol');
        })
    }
}

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
import { collection,getDocs } from "firebase/firestore";
import { db } from "../utils/firebase.config";

export const GET_PRODUCTS = 'GET_PRODUCTS';

export const getProducts = ()=>{
    return async (dispatch)=>{
        return await getDocs(collection(db, 'products'))
        .then((res)=>{
            console.log(res);
            dispatch({
                type : GET_PRODUCTS,
                payload : res.docs.map((doc)=>(
                    {
                        ...doc.data(),
                        id : doc.id
                    }
                ))
            })
        })
        .catch((error)=> console.log(error))
    }
}
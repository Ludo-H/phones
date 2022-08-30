import { collection,getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase.config";
import {  } from "firebase/firestore";

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT';

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

export const getOneProduct = (id)=>{
    return async (dispatch)=>{
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        try {
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                dispatch({
                    type : GET_ONE_PRODUCT,
                    payload : docSnap.data()
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
            // return await getDocs(collection(db, 'products'))
            // .then((res)=>{
            //     console.log(res);
            //     dispatch({
            //         type : GET_PRODUCTS,
            //         payload : res.docs.map((doc)=>(
            //             {
            //                 ...doc.data(),
            //                 id : doc.id
            //             }
            //         ))
            //     })
            // })
        } catch (error) {
            console.log(error)
        }
    }
}






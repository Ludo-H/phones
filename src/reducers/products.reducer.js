import { GET_ONE_PRODUCT, GET_PRODUCTS } from "../actions/products.action";


const initialState = {}

export default function productsReducer(state = initialState, action){
    switch (action.type) {
        case GET_PRODUCTS:
            return action.payload;
            
        
        case GET_ONE_PRODUCT:
            return ({
                ...state,
                productClicked : action.payload
            })
    

        default:
            return state;
    }
}
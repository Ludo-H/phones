import { GET_BASKET } from "../actions/basket.actions";

const initialState = {};

export default function basketReducer(state = initialState, action){
    switch (action.type) {
        case GET_BASKET:
            return action.payload;
        default:
            return state;
    }
}
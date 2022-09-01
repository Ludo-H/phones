import { DELETE_BASKET_ARTICLE, GET_BASKET } from "../actions/basket.actions";

const initialState = {};

export default function basketReducer(state = initialState, action){
    switch (action.type) {
        case GET_BASKET:
            return action.payload;

        case DELETE_BASKET_ARTICLE:
            return state.filter((article) => article.id !== action.payload.articleId)
        default:
            return state;
    }
}
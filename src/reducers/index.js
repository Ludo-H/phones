import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import productsReducer from "./products.reducer";
import basketReducer from "./basket.reducer";

export default combineReducers({
    userReducer,
    productsReducer,
    basketReducer,
})
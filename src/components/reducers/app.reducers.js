import { combineReducers } from 'redux';
import { STORE_USER_DATA, SHOPPING_CART } from '../actions/app.actions';

const initialState = {
    user: false,
    loggedIn: false,
    shoppingCart: [{ totalItemsInShoppingCart: 0 }]
};

function appReducer(state = initialState, action) {
    console.warn("App reducer invoked with state: " + JSON.stringify(state) + " with action " + JSON.stringify(action));

    switch (action.type) {
        case STORE_USER_DATA:
            console.log('Reducer: STORE_USER_DATA')
            return {
                ...state,
                user: action.user,
                loggedIn: !!action.user
            };
        case SHOPPING_CART:
            console.log('Reducer: SHOPPING_CART')
            return {
                ...state,
                shoppingCart: action.shoppingCart
            };
        default:
            return state;
    }
}

export default combineReducers({ appReducer });


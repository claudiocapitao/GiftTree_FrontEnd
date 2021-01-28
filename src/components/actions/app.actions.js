export const STORE_USER_DATA = "STORE_USER_DATA";
export const SHOPPING_CART = "SHOPPING_CART";
export const RESET_REDUX = "RESET_REDUX";

export function storeUserData(userData) {
    return { type: STORE_USER_DATA, user: userData, loggedIn: false }
}

export function storeShoppingCart(items) {
    return { type: SHOPPING_CART, shoppingCart: items }
}

export function storeResetRedux() {
    return { type: RESET_REDUX }
}
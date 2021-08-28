import CartItem from "../../models/cart_item"
import { ADD_TO_CART } from "../actions/cart"

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const price = addedProduct.price
            const title = addedProduct.title

            let cartItemToAdd;

            if (state.items[addedProduct.id]) {
                cartItemToAdd = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    title,
                    price,
                    state.items[addedProduct.id].sum + price
                )
            } else {
                cartItemToAdd = new CartItem(1, title, price, price);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: cartItemToAdd },
                totalAmount: state.totalAmount + price
            }
    }
    return state
}
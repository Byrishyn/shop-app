import CartItem from "../../models/cart_item"
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import { ADD_ORDER } from "../actions/orders"
import { DELETE_PRODUCT } from "../actions/product"

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
        case REMOVE_FROM_CART:
            const selectedCardItem = state.items[action.pid]
            const quantity = selectedCardItem.quantity
            let updatedCartItems
            if (quantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedCardItem.quantity - 1,
                    selectedCardItem.title,
                    selectedCardItem.price,
                    selectedCardItem.sum - selectedCardItem.price
                )
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }

            } else {
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.pid]
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCardItem.price
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]){
                return state
            }
            const updatedItems = { ...state.items }
            const itemTotal = state.items[action.pid].sum
            delete updatedItems[action.pid]

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state
}
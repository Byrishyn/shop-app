import Product from "../../models/product";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from "../actions/product";

const initialState = {
    availableProducts: [],
    userProducts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id != action.pid),
                userProducts: state.userProducts.filter(product => product.id != action.pid),
            }
        case ADD_PRODUCT:
            const newProduct = new Product(
                action.itemData.id,
                action.itemData.ownerId,
                action.itemData.pushToken,
                action.itemData.title,
                action.itemData.imageUrl,
                action.itemData.description,
                action.itemData.price,
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case EDIT_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid)
            const editedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                state.userProducts[productIndex].pushToken,
                action.itemData.title,
                action.itemData.imageUrl,
                action.itemData.description,
                state.userProducts[productIndex].price,
            )
            const updatedUserProduct = [...state.userProducts]
            updatedUserProduct[productIndex] = editedProduct
            const availableProductsIndex = state.availableProducts.findIndex(prod => prod.id === action.pid)
            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[availableProductsIndex] = editedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProduct
            }
    }
    return state;
}
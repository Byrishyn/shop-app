import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from "../actions/product";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === "u1")
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.id != action.pid),
                userProducts: state.userProducts.filter(product => product.id != action.pid),
            }
        case ADD_PRODUCT:
            const newProduct = new Product(
                action.itemData.id,
                "u1",
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
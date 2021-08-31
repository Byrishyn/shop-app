export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const EDIT_PRODUCT = "EDIT_PRODUCT"

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId }
}

export const addProduct = (title, imageUrl, price, description) => {
    return {
        type: ADD_PRODUCT,
        itemData : {
            title,
            imageUrl,
            price,
            description
        }
    }
}

export const editProduct = (id, title, imageUrl, description) => {
    return {
        type: EDIT_PRODUCT,
        pid: id,
        itemData : {
            title,
            imageUrl,
            description
        }
    }
}
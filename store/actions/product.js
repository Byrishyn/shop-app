export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const EDIT_PRODUCT = "EDIT_PRODUCT"

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId }
}

export const addProduct = (title, imageUrl, price, description) => {
    return async dispatch => {
        const response = await fetch("https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json",{
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                title,
                price,
                imageUrl,
                description
            })
        })

        const respData = await response.json()

        console.log(respData)

        dispatch({
            type: ADD_PRODUCT,
            itemData: {
                id : respData.name,
                title,
                imageUrl,
                price,
                description
            }
        });
    }
}

export const editProduct = (id, title, imageUrl, description) => {
    return {
        type: EDIT_PRODUCT,
        pid: id,
        itemData: {
            title,
            imageUrl,
            description
        }
    }
}
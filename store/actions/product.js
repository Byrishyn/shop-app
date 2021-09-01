import Product from "../../models/product"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const EDIT_PRODUCT = "EDIT_PRODUCT"
export const SET_PRODUCTS = "SET_PRODUCTS"

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch("https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")

            if (!response.ok){
                throw new Error("Something went wrong !")
            }

            const respData = await response.json()
            const loadedProducts = []
    
            for (const key in respData) {
                loadedProducts.push(new Product(
                    key,
                    "u1",
                    respData[key].title,
                    respData[key].imageUrl,
                    respData[key].description,
                    respData[key].price
                ))
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            });
        } catch ( err ) {
            throw err;
        }
        
    }
}

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId }
}

export const addProduct = (title, imageUrl, price, description) => {
    return async dispatch => {
        const response = await fetch("https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
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
                id: respData.name,
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
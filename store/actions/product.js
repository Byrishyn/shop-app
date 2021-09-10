import Product from "../../models/product"
import * as Notifications from "expo-notifications"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const EDIT_PRODUCT = "EDIT_PRODUCT"
export const SET_PRODUCTS = "SET_PRODUCTS"

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch("https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")

            if (!response.ok) {
                throw new Error("Something went wrong !")
            }

            const respData = await response.json()
            const loadedProducts = []

            for (const key in respData) {
                loadedProducts.push(new Product(
                    key,
                    respData[key].ownerId,
                    respData[key].title,
                    respData[key].imageUrl,
                    respData[key].description,
                    respData[key].price
                ))
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(product => product.ownerId === userId)
            });
        } catch (err) {
            throw err;
        }

    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`, {
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }
        dispatch({ type: DELETE_PRODUCT, pid: productId })
    }
}

export const addProduct = (title, imageUrl, price, description) => {
    return async (dispatch, getState) => {
        let pushToken;
        const statusObj = await Notifications.getPermissionsAsync()
        if (statusObj.status !== "granted"){
            statusObj = await Notifications.requestPermissionsAsync()
        }
        if (statusObj.status !== "granted"){
            pushToken = null;
        } else {
            pushToken = (await Notifications.getExpoPushTokenAsync()).data
        }
        const token = getState().auth.token;
        const userId = getState().auth.userId
        const response = await fetch(`https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title,
                price,
                imageUrl,
                description,
                ownerId: userId,
                ownerPushToken : pushToken,
            })
        })

        const respData = await response.json()

        dispatch({
            type: ADD_PRODUCT,
            itemData: {
                id: respData.name,
                title,
                imageUrl,
                price,
                description,
                ownerId: userId
            }
        });
    }
}

export const editProduct = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description
            })
        })

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        dispatch({
            type: EDIT_PRODUCT,
            pid: id,
            itemData: {
                title,
                imageUrl,
                description
            }
        })
    }
}
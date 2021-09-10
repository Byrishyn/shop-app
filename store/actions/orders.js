import Order from "../../models/order"

export const ADD_ORDER = "ADD_ORDER"
export const SET_ORDERS = "SET_ORDERS"

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId
            const response = await fetch(`https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`)

            if (!response.ok) {
                throw new Error("Something went wrong !")
            }

            const respData = await response.json()
            const loadedOrders = []

            for (const key in respData) {
                loadedOrders.push(
                    new Order(
                        key,
                        respData[key].cartItems,
                        respData[key].totalAmount,
                        new Date(respData[key].date)
                    )
                )
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            throw err;
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const date = new Date()
        const token = getState().auth.token
        const userId = getState().auth.userId
        const response = await fetch(`https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        const respData = await response.json()

        dispatch({ type: ADD_ORDER, orderData: { id: respData.name, items: cartItems, totalAmount, date: date } })

        for (const cartItem in cartItems) {
            const pushToken = cartItem.pushToken

            fetch("https://exp.host/--/api/v2/push/send", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Accept-Encoding": "gzip, deflate",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    to: pushToken,
                    data: { extraData: "Some data" },
                    title: "An order was placed",
                    body: cartItem.title
                })
            })
        }
    }
}
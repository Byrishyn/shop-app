import Order from "../../models/order"

export const ADD_ORDER = "ADD_ORDER"
export const SET_ORDERS = "SET_ORDERS"

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch("https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json")

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
    return async dispatch => {
        const date = new Date()
        const response = await fetch("https://shop-app-cc5f7-default-rtdb.asia-southeast1.firebasedatabase.app/orders/u1.json", {
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
    }
}
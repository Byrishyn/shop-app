import React, { useState } from "react"
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import CartItem from "../../components/shop/CartItem"
import Colors from "../../constants/Colors"
import Card from "../../components/UI/Card"
import * as cartActions from "../../store/actions/cart"
import * as ordersActions from "../../store/actions/orders"

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                title: state.cart.items[key].title,
                price: state.cart.items[key].price,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    })

    const onOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total : <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text></Text>
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                ) : (
                    <Button
                        title="Order now !"
                        onPress={onOrderHandler}
                        color={Colors.accent}
                        disabled={cartItems.length === 0}
                    />
                )}
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        title={itemData.item.title}
                        quantity={itemData.item.quantity}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                    />
                )}
            />
        </View>
    )
}


CartScreen.navigationOptions = {
    headerTitle: "Your Cart"
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        fontFamily: "open-sans-bold",
        fontSize: 18
    },
    amount: {
        color: Colors.accent
    }
})

export default CartScreen
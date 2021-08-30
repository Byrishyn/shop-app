import React from "react"
import { View, Text, Button, StyleSheet, FlatList } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import CartItem from "../../components/shop/CartItem"
import Colors from "../../constants/Colors"
import * as cartActions from "../../store/actions/cart"

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const dispatch = useDispatch()
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
        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
    })
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total : <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button title="Order now !" onPress={() => { }} color={Colors.accent} disabled={cartItems.length === 0} />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => (
                    <CartItem
                        title={itemData.item.title}
                        quantity={itemData.item.quantity}
                        amount={itemData.item.sum}
                        onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                    />
                )}
            />
        </View>
    )
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
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
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
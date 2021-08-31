import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text><Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                {props.deletable && (
                    <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                        <Ionicons name={Platform.OS === "android" ? "md-trash" : "ios-trash"} size={23} color="red" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center"
    },
    quantity: {
        fontFamily: "open-sans",
        color: "#888",
        fontSize: 16
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 16
    },
    amount: {
        fontFamily: "open-sans-bold",
        fontSize: 16,
        marginHorizontal: 10
    },
    deleteButton: {
    }
})

export default CartItem;
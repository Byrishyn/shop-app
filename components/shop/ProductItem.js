import React from "react"
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from "react-native"
import Colors from "../../constants/Colors"

const ProductItem = props => {
    const TouchableComponent = (Platform.OS === "android" && Platform.Version >=21) ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableComponent onPress={props.onViewDetail} useForeground>
            <View style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.actions}>
                    <Button title="Details" onPress={props.onViewDetail} color={Colors.primary} />
                    <Button title="Add to cart" onPress={props.onAddToCart} color={Colors.primary} />
                </View>
            </View>
        </TouchableComponent>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 20,
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: "open-sans",
        fontSize: 14,
        color: "#888"

    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "20%",
        paddingHorizontal: 20
    },
    details: {
        alignItems: "center",
        height: "20%",
        padding: 10,
    }
})

export default ProductItem;
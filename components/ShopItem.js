import React from "react"
import { StyleSheet, View, Text, Button, Image } from "react-native"

const ShopItem = props => {
    return (
        <View style={styles.shopItemContent}>
            <View style={styles.imageContainer}>
                <View style={{backgroundColor: "#FF0000", flex:1}}>
                <Image />
                </View>
            </View>
            <View style={styles.bottom}>
                <Button title="Details"/>
                <Text>{props.title}</Text>
                <Button title="Add to cart"/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shopItemContent:{
        height: 300,
        width: "80%"
    },
    imageContainer:{
        height: 200,
        width: "100%"
    },
    bottom: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }


})

export default ShopItem;
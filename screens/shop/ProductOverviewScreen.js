import React from "react"
import { StyleSheet, FlatList, View, Text } from "react-native"
import { useSelector } from "react-redux"

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const renderShopItem = itemData => {
        return (
            //<ShopItem title={itemData.item.title}/>
            <Text>{itemData.item.title}</Text>
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={products}
                keyExtractor={(item, index) => item.id}
                renderItem={renderShopItem}
                style={{ width: "100%"}}
            />
        </View>
    )
}

ProductOverviewScreen.navigationOptions = {
    headerTitle : "All products"
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ProductOverviewScreen;
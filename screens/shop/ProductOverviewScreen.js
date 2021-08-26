import React from "react"
import { StyleSheet, FlatList, View, Text } from "react-native"
import ShopItem from "../../components/ShopItem"
import { PRODUCTS } from "../../data/dummy-data"

const ProductOverviewScreen = props => {
    const renderShopItem = itemData => {
        return (
            <ShopItem title={itemData.item.title}/>
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={PRODUCTS}
                keyExtractor={(item, index) => item.id}
                renderItem={renderShopItem}
                style={{ width: "100%"}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ProductOverviewScreen;
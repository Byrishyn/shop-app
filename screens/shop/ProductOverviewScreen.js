import React from "react"
import { StyleSheet, FlatList, View, Text } from "react-native"
import { useSelector } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const renderShopItem = itemData => {
        return (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onAddToCart={()=>{}}
                onViewDetail={()=>{}}
            />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={products}
                keyExtractor={(item, index) => item.id}
                renderItem={renderShopItem}
                style={{ width: "100%" }}
            />
        </View>
    )
}

ProductOverviewScreen.navigationOptions = {
    headerTitle: "All products"
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ProductOverviewScreen;
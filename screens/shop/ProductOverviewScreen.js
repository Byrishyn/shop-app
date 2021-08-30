import React from "react"
import { StyleSheet, FlatList, View, Platform } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"
import * as cartActions from "../../store/actions/cart"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const renderShopItem = itemData => {
        return (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
                onViewDetail={() => {
                    props.navigation.navigate({
                        routeName: "ProductDetail",
                        params: {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        }
                    })
                }}
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

ProductOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: "All products",
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Cart"
                    iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                    onPress={
                        () => {
                            navData.navigation.navigate("Cart")
                        }}
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ProductOverviewScreen;
import React, { useEffect } from "react"
import { StyleSheet, FlatList, View, Platform, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import ProductItem from "../../components/shop/ProductItem"
import * as cartActions from "../../store/actions/cart"
import * as productsActions from "../../store/actions/product"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import Colors from "../../constants/Colors"

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productsActions.fetchProducts())
    },[dispatch])

    const onSelectHander = (id, title) => {
        props.navigation.navigate({
            routeName: "ProductDetail",
            params: {
                productId: id,
                productTitle: title
            }
        })
    }

    const renderShopItem = itemData => {
        return (
            <ProductItem
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
                onSelect={() => {
                    onSelectHander(itemData.item.id, itemData.item.title)
                }}
            >
                <Button
                    title="Details"
                    onPress={() => {
                        onSelectHander(itemData.item.id, itemData.item.title)
                    }}
                    color={Colors.primary}
                />
                <Button
                    title="Add to cart" onPress={() => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }}
                    color={Colors.primary}
                />
            </ProductItem>
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
        headerLeft:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                    onPress={
                        () => {
                            navData.navigation.toggleDrawer()
                        }}
                />
            </HeaderButtons>,
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
import React from "react"
import { FlatList, Platform, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"

import ProductItem from "../../components/shop/ProductItem"
import Colors from "../../constants/Colors"
import * as productsActions from "../../store/actions/product"

const UserProductScreen = props => {
    const products = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const editProductHandler = id => {
        return props.navigation.navigate("EditProduct", {productId: id})
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    image={itemData.item.imageUrl}
                    onSelect={() => editProductHandler(itemData.item.id)}
                >
                    <Button
                        title="Edit"
                        onPress={() => editProductHandler(itemData.item.id)}
                        color={Colors.primary}
                    />
                    <Button
                        title="Delete" onPress={() => 
                            dispatch(productsActions.deleteProduct(itemData.item.id))
                        }
                        color={Colors.primary}
                    />
                </ProductItem>
            )}
        />
    )
}


UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: "Your Products",
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
                title="Add"
                iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
                onPress={
                    () => {
                        navData.navigation.navigate("EditProduct")
                    }}
            />
        </HeaderButtons>,
    }
}

export default UserProductScreen
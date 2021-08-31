import React from "react"
import { FlatList, Platform, Button } from "react-native"
import { useSelector } from "react-redux"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"

import ProductItem from "../../components/shop/ProductItem"
import Colors from "../../constants/Colors"

const UserProductScreen = props => {
    const products = useSelector(state => state.products.userProducts)

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    image={itemData.item.imageUrl}
                    onSelect={() => { }}
                >
                    <Button
                        title="Edit"
                        onPress={() => {}}
                        color={Colors.primary}
                    />
                    <Button
                        title="Delete" onPress={() => {}}
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
            </HeaderButtons>
    }
}

export default UserProductScreen
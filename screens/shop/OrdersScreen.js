import React, { useEffect, useState } from "react"
import { FlatList, Platform, ActivityIndicator, View, StyleSheet, Text } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"
import OrderItem from "../../components/shop/OrderItem"
import { useSelector, useDispatch } from "react-redux"
import * as ordersActions from "../../store/actions/orders"
import Colors from "../../constants/Colors"

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then(() => setIsLoading(false))
    }, [dispatch])

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator color={Colors.primary} size="large"/>
            </View>
        )
    }

    if (orders.length === 0){
        return (
            <View style={{flex:1, alignItems:"center",justifyContent:"center"}}>
                <Text>No order found, start ordering some !</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: "Your Orders",
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default OrdersScreen
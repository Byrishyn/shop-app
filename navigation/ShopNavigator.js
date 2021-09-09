import React from "react";
import { Platform, Button, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { createDrawerNavigation } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"

import ProductOverviewScreen, { screenOptions } from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartingScreen from "../screens/StartingScreen";
import * as authActions from "../store/actions/auth"

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : ""
    },
    headerTitleStyle: { fontFamily: "open-sans-bold" },
    headerBackTitleStyle: { fontFamily: "open-sans" },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
}

const ProductsStackNavigator = createStackNavigator()

export const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductsStackNavigator.Screen
                name="ProductsOverview"
                component={ProductOverviewScreen}
                options={screenOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
            />
        </ProductsStackNavigator.Navigator>
    )
}


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={23}
            color={drawerConfig.tintColor}
        />
    }
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === "android" ? "md-list" : "ios-list"}
            size={23}
            color={drawerConfig.tintColor}
        />
    }
})

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProduct: EditProductScreen,
}, {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
            size={23}
            color={drawerConfig.tintColor}
        />
    }
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                    <DrawerNavigatorItems {...props} />
                    <Button title="Log out" color={Colors.primary} onPress={() => {
                        dispatch(authActions.logout())
                    }} />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Start: StartingScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator)
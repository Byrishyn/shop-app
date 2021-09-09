import React from "react";
import { Platform, Button, SafeAreaView, View } from "react-native";
import { useDispatch } from "react-redux";
import { createDrawerNavigation } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"

import ProductOverviewScreen, { screenOptions as POSOptions } from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen, { screenOptions as PDSOptions } from "../screens/shop/ProductDetailScreen";
import CartScreen, { screenOptions as CSOptions } from "../screens/shop/CartScreen";
import OrdersScreen, { screenOptions as OSOptions } from "../screens/shop/OrdersScreen";
import EditProductScreen, { screenOptions as EPSOptions } from "../screens/user/EditProductScreen";
import UserProductScreen, { screenOptions as UPSOptions } from "../screens/user/UserProductScreen";
import AuthScreen, { screenOptions as ASOptions } from "../screens/user/AuthScreen";
import StartingScreen from "../screens/StartingScreen";
import * as authActions from "../store/actions/auth"
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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
                options={POSOptions}
            />
            <ProductsStackNavigator.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={PDSOptions}
            />
            <ProductsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={CSOptions}
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

const OrdersStackNavigator = createStackNavigator()

const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrdersStackNavigator.Screen
                name="Orders"
                component={OrdersScreen}
                options={OSOptions}
            />
        </OrdersStackNavigator.Navigator>
    )
}

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

const AdminStackNavigator = createStackNavigator()

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen
                name="UserProducts"
                component={UserProductScreen}
                options={UPSOptions}
            />
            <AdminStackNavigator.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={EPSOptions}
            />
        </AdminStackNavigator.Navigator>
    )
}

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

const AuthStackNavigator = createStackNavigator()

const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={ASOptions}
            />
        </AuthStackNavigator.Navigator>
    )
}

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
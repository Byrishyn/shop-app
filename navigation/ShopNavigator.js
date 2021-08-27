import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";

const ProductsNavigator = createStackNavigator({
    productsOverview: ProductOverviewScreen,
    productDetail: ProductDetailScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTitleStyle: {fontFamily:"open-sans-bold"},
        headerBackTitleStyle: {fontFamily:"open-sans"},
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    }
})

export default createAppContainer(ProductsNavigator)
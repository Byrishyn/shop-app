import React from "react"
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native"

import { ShopNavigator, AuthNavigator } from "./ShopNavigator"
import StartingScreen from "../screens/StartingScreen";

const AppNavigator = props => {
    const isAuth = useSelector(state => !!state.auth.token)
    const didTryAutoLogin = useSelector(state => state.didTryAutoLogin)

    return (
        <NavigationContainer>
            {isAuth && <ShopNavigator />}
            {!isAuth && didTryAutoLogin && <AuthNavigator />}
            {!isAuth && !didTryAutoLogin && <StartingScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator;
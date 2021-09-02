import React from "react"
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Button } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import Input from "../../components/UI/Input"
import Card from "../../components/UI/Card"
import Colors from "../../constants/Colors"

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            style={styles.screen}
            keyboardVerticalOffset={50}
            behavior="padding"
        >
            <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            required
                            email
                            errorMessage="Please enter a valid email address"
                            onInputChange={() => { }}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            autoCapitalize="none"
                            secureTextEntry
                            required
                            minLength={5}
                            errorMessage="Please enter a valid password"
                            onInputChange={() => { }}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Log in" color={Colors.primary} onPress={() => { }} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Switch to sign up" color={Colors.accent} onPress={() => { }} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: "Please authenticate"
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: "80%",
        maxHeight: 400,
        maxWidth: 400,
        padding: 20
    },
    gradient: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        marginTop: 10
    }
})

export default AuthScreen;
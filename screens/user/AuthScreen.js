import React, { useReducer, useCallback } from "react"
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Button } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useDispatch } from "react-redux"

import Input from "../../components/UI/Input"
import Card from "../../components/UI/Card"
import Colors from "../../constants/Colors"
import * as authActions from "../../store/actions/auth"

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let formIsValid = true;
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }
        console.log(formIsValid);
        return {
            formIsValid: formIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }
    return state;
}

const AuthScreen = props => {
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email : "",
            password: ""
        },
        inputValidities: {
            email : false,
            password : false
        },
        formIsValid: false
    });

    const signUpHandler = () => {
        dispatch(authActions.signUp(formState.inputValues.email, formState.inputValues.password))
    }

    const inputChangeHandler = useCallback((inputIdentifier, value, validity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: value,
            isValid: validity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

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
                            autocorrect={false}
                            email
                            errorText="Please enter a valid email address"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            autoCapitalize="none"
                            secureTextEntry
                            required
                            minLength={5}
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Log in" color={Colors.primary} onPress={signUpHandler} />
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
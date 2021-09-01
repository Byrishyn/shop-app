import React, { useCallback, useEffect, useReducer } from "react"
import { StyleSheet, View, ScrollView, Platform, Alert, KeyboardAvoidingView } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useSelector, useDispatch } from "react-redux"

import HeaderButton from "../../components/UI/HeaderButton"
import Input from "../../components/UI/Input"
import * as productsActions from "../../store/actions/product"

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

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const productId = props.navigation.getParam("productId")
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productId))

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : "",
            imageUrl: editedProduct ? editedProduct.imageUrl : "",
            description: editedProduct ? editedProduct.description : "",
            price: "",
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("Wrong input", "Please check the error on the form", [{ text: "Ok" }])
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.editProduct(productId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description))
        } else {
            dispatch(productsActions.addProduct(formState.inputValues.title, formState.inputValues.imageUrl, +formState.inputValues.price, formState.inputValues.description))
        }
        props.navigation.goBack()
    }, [dispatch, formState, productId])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

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
            style={{flex:1}}
            behavior="padding"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id="title"
                        label="Title"
                        errorText="Please enter a valid title"
                        autoCorrect
                        returnKeyType="next"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ""}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id="imageUrl"
                        label="Image url"
                        errorText="Please enter a valid image url"
                        returnKeyType="next"
                        keyboardType="default"
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ""}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id="price"
                            label="Price"
                            errorText="Please enter a valid price"
                            returnKeyType="next"
                            keyboardType="decimal-pad"
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description"
                        autoCorrect
                        keyboardType="default"
                        autoCapitalize="sentences"
                        multiline
                        numberofLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ""}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

EditProductScreen.navigationOptions = navData => {
    const onSubmit = navData.navigation.getParam("submit");
    return {
        headerTitle: navData.navigation.getParam("productId") ? "Edit Product" : "Add Product",
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
                    onPress={onSubmit}
                />
            </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
})

export default EditProductScreen;
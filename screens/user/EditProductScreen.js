import React, { useCallback, useEffect, useReducer } from "react"
import { StyleSheet, Text, View, TextInput, ScrollView, Platform, Alert } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useSelector, useDispatch } from "react-redux"

import HeaderButton from "../../components/UI/HeaderButton"
import * as productsActions from "../../store/actions/product"

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE"

const formReducer = (state, action) =>{
    if (action.type === FORM_INPUT_UPDATE){

    }
}

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const productId = props.navigation.getParam("productId")
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productId))

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValue : {
            title : editedProduct ? editedProduct.title : "",
            imageUrl : editedProduct ? editedProduct.imageUrl : "",
            description : editedProduct ? editedProduct.description : "",
            price : "",
        },
        inputValidities: {
            title : editedProduct ? true : false,
            imageUrl : editedProduct ? true : false,
            description : editedProduct ? true : false,
            price : editedProduct ? true : false,
        },
        isFormValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if (!isTitleValid){
            Alert.alert("Wrong input", "Please check the error on the form",[{text:"Ok"}])
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.editProduct(productId, title, imageURL, description))
        } else {
            dispatch(productsActions.addProduct(title, imageURL, +price, description))
        }
        props.navigation.goBack()
    }, [dispatch, title, description, price, imageURL])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    const onTitleTextChange = text => {
        let isValid = false
        if (text.trim().lengthB > 0) {
            isValid = true
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: "title"
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formComponent}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={onTitleTextChange}
                        autoCorrect
                    />
                    {!isTitleValid && <Text>Please enter a valid title !</Text>}
                </View>
                <View style={styles.formComponent}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput
                        style={styles.input}
                        value={imageURL}
                        onChangeText={text => setImageURL(text)}
                        autoCorrect
                    />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formComponent}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)}
                            keyboardType="decimal-pad"
                            autoCorrect
                        />
                    </View>
                )}
                <View style={styles.formComponent}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                        autoCorrect
                    />
                </View>
            </View>
        </ScrollView>
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
    formComponent: {
        width: "100%"
    },
    label: {
        fontFamily: "open-sans-bold",
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 3,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
})

export default EditProductScreen;
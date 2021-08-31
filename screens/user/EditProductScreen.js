import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import { useSelector, useDispatch } from "react-redux"

import HeaderButton from "../../components/UI/HeaderButton"
import * as productsActions from "../../store/actions/product"

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const productId = props.navigation.getParam("productId")
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : "")
    const [imageURL, setImageURL] = useState(editedProduct ? editedProduct.imageUrl : "")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : "")

    const submitHandler = useCallback(() => {
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

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formComponent}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                        autoCorrect
                    />
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
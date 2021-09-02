import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"

export const authenticate = (token, userId) => {
    return { type: AUTHENTICATE, token: token, userId: userId }
}

export const signUp = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_faUJ8jpL_2bW45FRhbXXUSdJ0ALBpKg"
                , {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                })

            if (!response.ok) {
                const errorRespData = await response.json()
                const errorId = errorRespData.error.message;
                let message = "Something went wrong"
                if (errorId === "EMAIL_EXISTS") {
                    message = "This email is already registered"
                }
                throw new Error(message)
            }

            const respData = await response.json()

            dispatch(authenticate(respData.idToken, respData.localId))
            const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000)
            saveDataToStorage(respData.idToken, respData.localId, expirationDate)
        } catch (err) {
            throw err;
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_faUJ8jpL_2bW45FRhbXXUSdJ0ALBpKg"
                , {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                })

            if (!response.ok) {
                const errorRespData = await response.json()
                const errorId = errorRespData.error.message;
                let message = "Something went wrong"
                if (errorId === "EMAIL_NOT_FOUND") {
                    message = "This email could not be found"
                }
                if (errorId === "INVALID_PASSWORD") {
                    message = "Incorrect password !"
                }
                throw new Error(message)
            }

            const respData = await response.json()

            dispatch(authenticate(respData.idToken, respData.localId))
            const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000)
            saveDataToStorage(respData.idToken, respData.localId, expirationDate)
        } catch (err) {
            throw err;
        }
    }
}

export const logout = () => {
    return { type: LOGOUT }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}
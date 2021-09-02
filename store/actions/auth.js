export const SIGNUP = "SIGNUP"

export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_faUJ8jpL_2bW45FRhbXXUSdJ0ALBpKg"
        ,{
            method: "POST",
            headers:{ 
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok){
            throw new Error("Something went wrong")
        }
        
        const respData = response.json()

        dispatch({ type: SIGNUP })
    }
}
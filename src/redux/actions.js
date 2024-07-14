export const addCartItem = (data) => {
    return {
        type: "home/addCartItem",
        payload: data
    }
}

export const saveUserLogin = (data) => {
    return {
        type: "auth/saveUserLogin",
        payload: data
    }
}

export const saveUserLogout = (data) => {
    return {
        type: "auth/saveUserLogout",
        payload: data
    }
}


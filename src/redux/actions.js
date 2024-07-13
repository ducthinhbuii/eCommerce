export const addCartItem = (data) => {
    return {
        type: "home/addCartItem",
        payload: data
    }
}

export const loginAction = (data) => {
    return {
        type: "auth/login",
        payload: data
    }
}


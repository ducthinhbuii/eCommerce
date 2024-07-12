export const addCartItem = (data) => {
    return {
        type: "home/addCartItem",
        payload: data
    }
}

export const login = (data) => {
    return {
        type: "auth/login",
        payload: data
    }
}


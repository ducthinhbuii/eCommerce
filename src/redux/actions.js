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

export const filterRangePrice = (data) => {
    console.log(data)
    return {
        type: "filter/rangePrice",
        payload: data
    }
}


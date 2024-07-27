export const getCart = (data) => {
    return {
        type: "home/getCart",
        payload: data
    }
}


export const addCartItem = (data) => {
    return {
        type: "home/addCartItem",
        payload: data
    }
}

export const downQuantityCartItem = (data) => {
    return {
        type: "home/downQuantityCartItem",
        payload: data
    }
}

export const upQuantityCartItem = (data) => {
    return {
        type: "home/upQuantityCartItem",
        payload: data
    }
}

export const clearCartItem = (data) => {
    return {
        type: "home/clearCartItem",
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


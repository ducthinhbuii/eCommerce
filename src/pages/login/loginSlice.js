const initState = {
    userInfo: {}
}

/*
    name = "auth"
 */
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'auth/saveUserLogin':
            return {...initState, userInfo: action.payload}
        default:
            return state
    }
}

export default authReducer
const initState = {
    auth: false,
    userInfo: {}
}

/*
    name = "auth"
 */
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'auth/saveUserLogin':
            return {...initState, auth:true, userInfo: action.payload}
        case 'auth/saveUserLogout':
            return {...initState, auth:false, userInfo: {}}
        default:
            return state?.auth
    }
}

export default authReducer
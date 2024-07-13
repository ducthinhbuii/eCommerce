import homeReducer from "../pages/home/addSlice" 
import authReducer from "../pages/login/loginSlice"

const rootReducer = (state, action) => {
    return {
        home: homeReducer(state, action),
        auth: authReducer(state, action),
    }
}

export default rootReducer
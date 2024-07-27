import homeReducer from "../pages/home/addSlice" 
import authReducer from "../pages/login/loginSlice"
import rangePriceSlice from "../pages/categories/sideBar/rangePriceSlice"

const rootReducer = (state, action) => {
    return {
        auth: authReducer(state, action),
        home: homeReducer(state, action),
        filter: rangePriceSlice(state, action),
    }
}

export default rootReducer
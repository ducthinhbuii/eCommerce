import homeReducer from "../pages/home/addSlice" 

const rootReducer = (state, action) => {
    return {
        home: homeReducer(state, action)
    }
}

export default rootReducer
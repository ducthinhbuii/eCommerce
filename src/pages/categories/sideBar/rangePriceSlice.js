const initState = {
    minPrice: null,
    maxPrice: null
}

/*
    name = "auth"
 */
const rangePriceReducer = (state = initState, action) => {
    switch (action.type) {
        case 'filter/rangePrice':
            return {...initState, minPrice: action.payload.minPrice, maxPrice: action.payload.maxPrice}
        default:
            return state?.filter
    }
}

export default rangePriceReducer
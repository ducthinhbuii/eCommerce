const initState = {
    cartItem: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

/*
    name = "home"
 */
const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'home/addCartItem':
            console.log(state.home.cartItem.length)
            if(state.home.cartItem.length > 0){
                const itemIndex = state.home.cartItem.findIndex(
                    (item) => {
                       return (item.id) === action.payload.id
                    }
                )
                console.log('check')
                console.log(itemIndex)
                if(itemIndex >= 0){
                    const updatedCartItems = [...state.home.cartItem];
                    updatedCartItems[itemIndex].quantity += 1;
                    return {
                        ...state.home,
                        cartItem: updatedCartItems
                    } 
                }
            }
            const tempProduct = {...action.payload, quantity:1}
            return {
                ...state.home,
                cartItem: [...state.home.cartItem, {...action.payload, quantity:1}]
            }
        default:
            return state?.home
    }
}

export default homeReducer
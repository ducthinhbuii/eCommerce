const initState = {
    cartItems: [],
    totalPrice: 0,
    totalDiscountPrice: 0,
    totalItem: 0
}

const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'home/getCart':
            return {
                ...state.home,
                cartItems: action.payload.cartItems,
                totalPrice: action.payload.totalPrice,
                totalDiscountPrice: action.payload.totalDiscountPrice,
                totalItem: action.payload.totalItem
            }
        case 'home/addCartItem':
            console.log('addCartItem')
            console.log(state?.home?.cartItems)
            if(state?.home?.cartItems.length > 0){
                const itemIndex = state.home.cartItems.findIndex(
                    (item) => {
                        return (item.product.id) === action.payload.product.id
                    }
                )
                if(itemIndex >= 0){
                    const updatedCartItems = [...state.home.cartItems];
                    updatedCartItems[itemIndex].quantity += 1;
                    return {
                        ...state.home,
                        cartItems: updatedCartItems,
                        totalPrice: state.home.totalPrice + action.payload.product.price,
                        totalDiscountPrice: state.home.totalDiscountPrice + action.payload.product.discountPrice
                    } 
                }
            }
            // const tempProduct = {...action.payload, quantity:1}
            return {
                ...state.home,
                cartItems: [...state.home.cartItems, {...action.payload, quantity:1, price: action.payload.product.price, discountPrice: action.payload.product.discountPrice}],
                totalPrice: state.home.totalPrice + action.payload.product.price,
                totalDiscountPrice: state.home.totalDiscountPrice + action.payload.product.discountPrice,
                totalItem: state.home.totalItem + 1
            }
        case 'home/downQuantityCartItem':
            console.log(action.payload)
            const itemIndex = state.home.cartItems.findIndex(
                (item) => {
                   return (item.product.id) === action.payload.id
                }
            )
            console.log(itemIndex)
            if(itemIndex >= 0){
                let isLast = false;
                const updatedCartItems = [...state.home.cartItems];
                if(updatedCartItems[itemIndex].quantity > 1){
                    updatedCartItems[itemIndex].quantity -= 1;
                } else {
                    isLast = true;
                    updatedCartItems.splice(itemIndex, 1)
                }
                console.log(state.home)
                return {
                    ...state.home,
                    cartItems: updatedCartItems,
                    totalPrice: state.home.totalPrice - action.payload.price,
                    totalDiscountPrice: state.home.totalDiscountPrice - action.payload.discountPrice,
                    totalItem: isLast ? state.home.totalItem - 1 : state.home.totalItem
                } 
            }
        case 'home/clearCartItem':
            console.log(action.payload)
            const itemIndex2 = state.home.cartItems.findIndex(
                (item) => {
                   return (item.product.id) === action.payload.id
                }
            )
            if(itemIndex2 >= 0){
                const updatedCartItems = [...state.home.cartItems];
                const price = state.home.cartItems[itemIndex2].price;
                const discountPrice = state.home.cartItems[itemIndex2].discountPrice;
                console.log('ok')
                updatedCartItems.splice(itemIndex2, 1)
                return {
                    ...state.home,
                    cartItems: updatedCartItems,
                    totalPrice: state.home.totalPrice - price,
                    totalDiscountPrice: state.home.totalDiscountPrice - discountPrice,
                    totalItem: state.home.totalItem - 1
                } 
            }
        default:
            return state.home
    }
}


/*
    name = "home"
 */
// const homeReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'home/addCartItem':
//             console.log(state?.home?.cartItem)
//             if(state?.home?.cartItem.length > 0){
//                 const itemIndex = state.home.cartItem.findIndex(
//                     (item) => {
//                        return (item.product.id) === action.payload.product.id
//                     }
//                 )
//                 if(itemIndex >= 0){
//                     const updatedCartItems = [...state.home.cartItem];
//                     updatedCartItems[itemIndex].quantity += 1;
//                     return {
//                         ...state.home,
//                         cartItem: updatedCartItems,
//                         cartTotalMoney: state.home.cartTotalMoney + action.payload.product.price
//                     } 
//                 }
//             }
//             const tempProduct = {...action.payload, quantity:1}
//             return {
//                 ...state.home,
//                 cartItem: [...state.home.cartItem, {...action.payload, quantity:1}],
//                 cartTotalMoney: state.home.cartTotalMoney + action.payload.product.price
//             }
//         case 'home/downQuantityCartItem':
//             const itemIndex = state.home.cartItem.findIndex(
//                 (item) => {
//                    return (item.product.id) === action.payload.id
//                 }
//             )
//             if(itemIndex >= 0){
//                 const updatedCartItems = [...state.home.cartItem];
//                 if(updatedCartItems[itemIndex].quantity > 1){
//                     updatedCartItems[itemIndex].quantity -= 1;
//                 } else {
//                     updatedCartItems.splice(itemIndex, 1)
//                 }
//                 // if(updatedCartItems.length === 0){
//                 //     return {
//                 //         ...state.home,
//                 //         cartItem: [],
//                 //         cartTotalMoney: 0
//                 //     }
//                 // }
//                 return {
//                     ...state.home,
//                     cartItem: updatedCartItems,
//                     cartTotalMoney: state.home.cartTotalMoney - action.payload.price
//                 } 
//             }
//         case 'home/upQuantityCartItem':
//             const itemIndex2 = state.home.cartItem.findIndex(
//                 (item) => {
//                    return (item.product.id) === action.payload.id
//                 }
//             )
//             if(itemIndex2 >= 0){
//                 const updatedCartItems = [...state.home.cartItem];
//                 updatedCartItems[itemIndex2].quantity += 1;
//                 return {
//                     ...state.home,
//                     cartItem: updatedCartItems,
//                     cartTotalMoney: state.home.cartTotalMoney + action.payload.price
//                 } 
//             }
//         default:
//             return initState
//     }
// }

export default homeReducer
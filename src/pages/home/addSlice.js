import { createSlice } from '@reduxjs/toolkit';

const initState = {
    cartItems: [],
    totalPrice: 0,
    totalDiscountPrice: 0,
    totalItem: 0
}

// const homeReducer = (state = initState, action) => {
//     switch (action.type) {
//         case 'home/getCart':
//             return {
//                 ...state.home,
//                 cartItems: action.payload.cartItems,
//                 totalPrice: action.payload.totalPrice,
//                 totalDiscountPrice: action.payload.totalDiscountPrice,
//                 totalItem: action.payload.totalItem
//             }
//         case 'home/addCartItem':
//             console.log('addCartItem')
//             console.log(state?.home?.cartItems)
//             if(state?.home?.cartItems.length > 0){
//                 const itemIndex = state.home.cartItems.findIndex(
//                     (item) => {
//                         return (item.product.id) === action.payload.product.id
//                     }
//                 )
//                 if(itemIndex >= 0){
//                     const updatedCartItems = [...state.home.cartItems];
//                     updatedCartItems[itemIndex].quantity += 1;
//                     return {
//                         ...state.home,
//                         cartItems: updatedCartItems,
//                         totalPrice: state.home.totalPrice + action.payload.product.price,
//                         totalDiscountPrice: state.home.totalDiscountPrice + action.payload.product.discountPrice
//                     } 
//                 }
//             }
//             // const tempProduct = {...action.payload, quantity:1}
//             return {
//                 ...state.home,
//                 cartItems: [...state.home.cartItems, {...action.payload, quantity:1, price: action.payload.product.price, discountPrice: action.payload.product.discountPrice}],
//                 totalPrice: state.home.totalPrice + action.payload.product.price,
//                 totalDiscountPrice: state.home.totalDiscountPrice + action.payload.product.discountPrice,
//                 totalItem: state.home.totalItem + 1
//             }
//         case 'home/downQuantityCartItem':
//             console.log(action.payload)
//             const itemIndex = state.home.cartItems.findIndex(
//                 (item) => {
//                    return (item.product.id) === action.payload.id
//                 }
//             )
//             console.log(itemIndex)
//             if(itemIndex >= 0){
//                 let isLast = false;
//                 const updatedCartItems = [...state.home.cartItems];
//                 if(updatedCartItems[itemIndex].quantity > 1){
//                     updatedCartItems[itemIndex].quantity -= 1;
//                 } else {
//                     isLast = true;
//                     updatedCartItems.splice(itemIndex, 1)
//                 }
//                 console.log(state.home)
//                 return {
//                     ...state.home,
//                     cartItems: updatedCartItems,
//                     totalPrice: state.home.totalPrice - action.payload.price,
//                     totalDiscountPrice: state.home.totalDiscountPrice - action.payload.discountPrice,
//                     totalItem: isLast ? state.home.totalItem - 1 : state.home.totalItem
//                 } 
//             }
//         case 'home/clearCartItem':
//             console.log(action.payload)
//             const itemIndex2 = state.home.cartItems.findIndex(
//                 (item) => {
//                    return (item.product.id) === action.payload.id
//                 }
//             )
//             if(itemIndex2 >= 0){
//                 const updatedCartItems = [...state.home.cartItems];
//                 const price = state.home.cartItems[itemIndex2].price;
//                 const discountPrice = state.home.cartItems[itemIndex2].discountPrice;
//                 console.log('ok')
//                 updatedCartItems.splice(itemIndex2, 1)
//                 return {
//                     ...state.home,
//                     cartItems: updatedCartItems,
//                     totalPrice: state.home.totalPrice - price,
//                     totalDiscountPrice: state.home.totalDiscountPrice - discountPrice,
//                     totalItem: state.home.totalItem - 1
//                 } 
//             }
//         default:
//             return state.home
//     }
// }

export const homeSlice = createSlice({
    name: 'home',
    initialState: initState,
    reducers: {
        getCart(state, action) {
            state.cartItems = action.payload.cartItems;
            state.totalPrice = action.payload.totalPrice;
            state.totalDiscountPrice = action.payload.totalDiscountPrice;
            state.totalItem = action.payload.totalItem;
        },
        addCartItem(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product.id === action.payload.product.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1;
                state.totalPrice += action.payload.product.price;
                state.totalDiscountPrice += action.payload.product.discountPrice;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1,
                    price: action.payload.product.price,
                    discountPrice: action.payload.product.discountPrice,
                });
                state.totalPrice += action.payload.product.price;
                state.totalDiscountPrice += action.payload.product.discountPrice;
                state.totalItem += 1;
            }
        },
        downQuantityCartItem(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product.id === action.payload.id
            );
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].quantity > 1) {
                    state.cartItems[itemIndex].quantity -= 1;
                    state.totalPrice -= action.payload.price;
                    state.totalDiscountPrice -= action.payload.discountPrice;
                } else {
                    state.cartItems.splice(itemIndex, 1);
                    state.totalPrice -= action.payload.price;
                    state.totalDiscountPrice -= action.payload.discountPrice;
                    state.totalItem -= 1;
                }
            }
        },
        clearCartItem(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product.id === action.payload.id
            );
            if (itemIndex >= 0) {
                const price = state.cartItems[itemIndex].price;
                const discountPrice = state.cartItems[itemIndex].discountPrice;
                state.cartItems.splice(itemIndex, 1);
                state.totalPrice -= price;
                state.totalDiscountPrice -= discountPrice;
                state.totalItem -= 1;
            }
        },
    },
});
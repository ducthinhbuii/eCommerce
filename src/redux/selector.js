export const getAllCartItems = (state) => {
   console.log(state)
   return state?.home
};

export const getCartTotalMoney = (state) => {
   // console.log(state)
   return state?.home?.cartTotalMoney
};

export const getUserInfo = (state) => {
   // console.log(state)
   return state?.auth
};

export const getPriceRange = (state) => {
   // console.log(state)
   return state?.filter
};

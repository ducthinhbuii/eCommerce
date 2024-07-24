export const getAllCartItems = (state) => {
   console.log(state)
   return state?.home?.cartItem
};

export const getUserInfo = (state) => {
   console.log(state)
   return state?.auth
};

export const getPriceRange = (state) => {
   console.log(state)
   return state?.filter
};

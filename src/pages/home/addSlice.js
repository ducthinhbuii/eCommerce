import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDX_BE_URL } from '../../ultis/setting';
import axios from 'axios';
import { fetchDataFromAPI } from '../../ultis/api';
import { postDataToAPI } from '../../ultis/postApi';
import { logoutUser } from '../login/loginSlice';

const initState = {
    cartItems: [],
    totalPrice: 0,
    totalDiscountPrice: 0,
    totalItem: 0,
    loading: false,
    error: null,
}

// Thunk: Get cart
export const getCartByUserId = createAsyncThunk(
    'home/getCartByUserId',
    async (userId, { rejectWithValue }) => {
        try {
            const jwt = localStorage.getItem("jwt");
            const res = await fetchDataFromAPI(`/api/cart/${userId}`, jwt)
            console.log(res);
            // const res = await axios.get(IDX_BE_URL + `/api/cart/${userId}`, {
            //   withCredentials: true,
            // });
            return res;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Thêm sản phẩm vào giỏ hàng
export const addCartItemAsync = createAsyncThunk(
    'home/addCartItemAsync',
    async ({ userId, product, token }, { rejectWithValue }) => {
        try {
            const response = await postDataToAPI(`/api/cart/add/${userId}`, {
                productId: product.id,
                quantity: 1,
                price: product.price,
                discountPrice: product.discountPrice,
            }, token);
            if (response?.code === 'ERR_NETWORK') {
                throw new Error('Lỗi khi thêm sản phẩm');
            }
            return { product };
        } catch (err) {
            console.log(err);
            return rejectWithValue(err.message || 'Lỗi khi thêm sản phẩm');
        }
    }
);

// Giảm số lượng sản phẩm
export const downQuantityCartItemAsync = createAsyncThunk(
    'home/downQuantityCartItemAsync',
    async ({ userId, product, token }, { rejectWithValue }) => {
        try {
            const response = await postDataToAPI(`/api/cart/remove/${userId}`, {
            productId: product.id,
            quantity: 1,
            price: product.price,
            discountPrice: product.discountPrice,
            }, token);
            console.log(response);
            return { product };
        } catch (err) {
            return rejectWithValue(err.message || 'Lỗi khi giảm số lượng');
        }
    }
  );
  
  // Xóa sản phẩm khỏi giỏ
export const clearCartItemAsync = createAsyncThunk(
    'home/clearCartItemAsync',
    async ({ userId, product, token }, { rejectWithValue }) => {
        try {
            const response = await postDataToAPI(`/api/cart/remove-cart-item/${userId}`, {
                productId: product.id,
                price: product.price,
                discountPrice: product.discountPrice,
            }, token);
            return { product };
        } catch (err) {
            return rejectWithValue(err.message || 'Lỗi khi xóa sản phẩm');
        }
    }
);

// reset cart
export const resetCartAsync = createAsyncThunk(
    'home/resetCartAsync',
    async ({ orderId, token }, { rejectWithValue }) => {
      try {
        const response = await fetchDataFromAPI(`/api/cart/reset-cart/${orderId}`, token);
        return response; // Trả về dữ liệu từ API nếu cần
      } catch (err) {
        return rejectWithValue(err.message || 'Lỗi khi reset giỏ hàng');
      }
    }
  );

export const homeSlice = createSlice({
    name: 'home',
    initialState: initState,
    extraReducers: (builder) => {
        builder
        .addCase(getCartByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCartByUserId.fulfilled, (state, action) => {
            const { cartItems, totalPrice, totalDiscountPrice, totalItem } = action.payload;
            state.cartItems = cartItems;
            state.totalPrice = totalPrice;
            state.totalDiscountPrice = totalDiscountPrice;
            state.totalItem = totalItem;
            state.loading = false;
        })
        .addCase(getCartByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Thêm sản phẩm vào giỏ hàng
        .addCase(addCartItemAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addCartItemAsync.fulfilled, (state, action) => {
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
            state.loading = false;
        })
        .addCase(addCartItemAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "error when adding product to cart";
        })

        // Giảm số lượng sản phẩm
        .addCase(downQuantityCartItemAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(downQuantityCartItemAsync.fulfilled, (state, action) => {
            const test = JSON.parse(JSON.stringify(state.cartItems))
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product.id === action.payload.product.id
            );
            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].quantity > 1) {
                    state.cartItems[itemIndex].quantity -= 1;
                    state.totalPrice -= action.payload.product.price;
                    state.totalDiscountPrice -= action.payload.product.discountPrice;
                } else {
                    state.cartItems.splice(itemIndex, 1);
                    state.totalPrice -= action.payload.product.price;
                    state.totalDiscountPrice -= action.payload.product.discountPrice;
                    state.totalItem -= 1;
                }
            }
            state.loading = false;
        })
        .addCase(downQuantityCartItemAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "error when reducing quantity";
        })

        // Xóa sản phẩm khỏi giỏ hàng
        .addCase(clearCartItemAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(clearCartItemAsync.fulfilled, (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product.id === action.payload.product.id
            );
            if (itemIndex >= 0) {
                const price = state.cartItems[itemIndex].price;
                const discountPrice = state.cartItems[itemIndex].discountPrice;
                state.cartItems.splice(itemIndex, 1);
                state.totalPrice -= price;
                state.totalDiscountPrice -= discountPrice;
                state.totalItem -= 1;
            }
            state.loading = false;
        })
        .addCase(clearCartItemAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "error when clearing cart item";
        })

        // Logout
        .addCase(logoutUser.fulfilled, (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalDiscountPrice = 0;
            state.totalItem = 0;
            state.loading = false;
            state.error = null;
        })

        // Reset cart
        .addCase(resetCartAsync.fulfilled, (state) => {
            // Reset trạng thái giỏ hàng
            state.cartItems = [];
            state.totalPrice = 0;
            state.totalDiscountPrice = 0;
            state.totalItem = 0;
            state.loading = false;
        })
    },
});
// import { legacy_createStore as createStore} from 'redux'
// import rootReducer from './reducer'

// console.log(rootReducer)
// const store = createStore(rootReducer)
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../pages/login/loginSlice';
import { homeSlice } from '../pages/home/addSlice';
import { rangePriceSlice } from '../pages/categories/sideBar/rangePriceSlice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        home: homeSlice.reducer,
        filter: rangePriceSlice.reducer,
    }
});

export default store;
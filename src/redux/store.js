
import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice'; 
import courseSliceReducer from "./slices/CourseSlice"
import statSliceReducer from "./slices/StatSlice"
import razorpaySlice from "./slices/RazorpaySlice"
const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course: courseSliceReducer,
        stat:statSliceReducer,
        razorpay:razorpaySlice,
    },
    devTools:true
});



export default store;
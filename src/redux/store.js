
import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './slices/authSlice'; 
import courseSliceReducer from "./slices/CourseSlice"

const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        courses: courseSliceReducer
    },
    devTools:true
});



export default store;
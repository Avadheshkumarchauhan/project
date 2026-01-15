import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    courseData :[],
}
export const getAllCourses = createAsyncThunk("courses/get", async() =>{
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "Loading course data.....",
            success:(data) =>{
                return data?.data?.message;
            },
            error: "Failed to get the courses",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getAllCourses.fulfilled, (state, action) =>{
            if(action.payload){
                console.log(action.payload);
                
                state.courseData= [...action.payload.courses];
            }
        });
    }
});

export default courseSlice.reducer;
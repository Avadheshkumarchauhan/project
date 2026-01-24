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
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

//Something route
export const deleteCourses = createAsyncThunk("courses/delete", async(id) =>{
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "Deleting course data.....",
            success:(data) =>{
                return data?.data?.message;
            },
            error: "Failed to delete the courses",
        });
        return (await response)?.data?.course;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const createNewCourse = createAsyncThunk("/course/create", async(data)=>{
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);
        const response = axiosInstance.post("/courses", formData);
        toast.promise(response,{
            loading:"Creating new course",
            success:(data) =>{
                              
                return data?.data?.message
            },
            error:"Failed to create course"
        });
        return (await response)?.data?.course;
    } catch (error) {
        toast.error(error?.response?.data?.message);

    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getAllCourses.fulfilled, (state, action) =>{
            console.log("get course slice data ",action);
            
            
            if(action?.payload){
                               
                state.courseData= [...action.payload];
            }
        });
    }
});

export default courseSlice.reducer;
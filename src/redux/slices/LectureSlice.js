import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";

const initialState={
Lectures:[]

}
export const getCourseLectures= createAsyncThunk("/course/lecture/get", async(cid) =>{
    try {
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response,{
            loading:"fetching course lectures....",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to load the lectures"
        });
        return ( await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
});
export const addCourseLecture= createAsyncThunk("/course/lecture/add", async(data) =>{
    try {
        const formData = new FormData();
        formData.append("lecture",data.lecture);
        formData.append("title",data.title);
        formData.append("description",data.discription);
        const response =  axiosInstance.post(`/courses/${data.id}`,formData);
        toast.promise(response,{
            loading:"Adding course lecture....",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to add  the lecture"
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
});
export const deleteCourseLecture= createAsyncThunk("/course/lecture/delete", async(data) =>{
    try {
       
        const response =  axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response,{
            loading:"Delete course lecture....",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to delete  the lecture"
        });
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
});

const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCourseLectures.fulfilled,(state,action)=>{
             console.log("Lecture slice get data  : ",action);
            state.Lectures= action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            console.log("Lecture slice add data : ",action);
            
            state.Lectures= action?.payload?.course?.lectures;
        })
    }
});

export default lectureSlice.reducer;
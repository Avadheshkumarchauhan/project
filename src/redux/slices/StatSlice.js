import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";



const initialState ={
    allUserCount:0,
    subscribedCount:0

};
export const getStateData = createAsyncThunk("Stats/get",async() =>{
    try {
        const response = axiosInstance("admin/stats/users");
        toast.promise(response,{
            loading:"Getting the stats.....",
            success:(data) =>{
                return data?.data?.message
            },
            error:"Faild to load data stats"
        });
        return(await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})

const statSlice = createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getStateData.fulfilled,(state, action) =>{

            console.log("Get user stateSlice ",action);
            
            state.allUserCount = action?.payload?.allUserCount;
            state.subscribedCount= action?.payload?.subscribedUserCount
        })

    }
});

export default statSlice.reducer;
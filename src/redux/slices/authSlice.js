import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axiosInstance";

const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') ||{}

}
export const createAccount = createAsyncThunk("/auth/signup",async(data) =>{
    try {
        const res = axiosInstance.post("user/register", data);
            
        toast.promise(res, {
            loading:"Wait ! creating your account ",
            success: (data) =>{
                return data?.data?.message;
            },
            error: "Faild to create account "
        });
               
        return (await res).data;

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const login = createAsyncThunk("/auth/login",async(data) =>{
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading:"Wait ! authentication in progress .... ",
            success: (data) =>{                
                return data?.data?.message;
            },
            error: "Faild to login "
        });
        return (await res).data;

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const logout = createAsyncThunk("/auth/logout",async() =>{
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading:"Wait ! logout in progress .... ",
            success: (data) =>{  
                                             
                return data?.data?.message;
            },
            error: "Faild to log out "
        });
        return (await res).data;
        

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const updateProfile = createAsyncThunk("/user/update/profile",async(data) =>{
    try {
        const res = axiosInstance.patch(`user/update/${data[0]}`,data[1]);
        toast.promise(res, {
            loading:"Wait profile update in progress .... ",
            success: (data) =>{  
                                             
                return data?.data?.message;
            },
            error: "Faild to update profile "
        });
        return (await res).data;
        

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
export const getUserData = createAsyncThunk("/user/details",async() =>{
    try {
        const res = axiosInstance.get("user/me");
               return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
                      
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", action?.payload?.success);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = action?.payload?.success;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state, action) =>{           
            
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = !action?.payload?.success;
            state.role = ""
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            console.log("aa : ",action?.payload?.user);
            
            if(!action?.payload?.user) return  
                
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", action?.payload?.success);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = action?.payload?.success;           
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        });
    }
});

//export const {} = authSlice.actions;
export default authSlice.reducer;
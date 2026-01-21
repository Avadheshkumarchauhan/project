import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";


const initialState ={
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayment:{},
    finalMonth:{},
    mothlySalesRecord:[],
}
export const getRazorPayId = createAsyncThunk("/razorpay/getid",async()=>{
    try{
    const res = axiosInstance.get("payment/razorpay-key");
               
        return (await res).data;

    } catch (error) {
        toast.error(error?.res?.data?.message);
    }
})
export const purchaseCourseBundle = createAsyncThunk("/purchaseCourse",async()=>{
    try{
    const res = axiosInstance.post("payment/subscribe");
               
        return (await res).data;

    } catch (error) {
        toast.error(error?.res?.data?.message);
    }
})
export const verifyUserPayment = createAsyncThunk("/payment/verify",async(data)=>{
    try{
    const res = axiosInstance.post("payment/verify",{
        razorpay_payment_id:data.razorpay_payment_id,
        razorpay_subscription_id:data.razorpay_subscription_id,
        razorpay_signature:data.razorpay_signature,
    });
               
        return (await res).data;

    } catch (error) {
        toast.error(error?.res?.data?.message);
    }
});
export const getPaymentRecord  = createAsyncThunk("/payment/record",async()=>{
    try{
    const res = axiosInstance.get("payment?count=100");
          toast.promise(res, {
            loading:"Getting the payment records.....",
            success:(data) =>{
                return data?.data?.message;
            },
            error:"failed to get payment records "
          })     
        return (await res).data;

    } catch (error) {
        toast.error(error?.res?.data?.message);
    }
});
export const cancelCourseBundle  = createAsyncThunk("/payment/cancel",async()=>{
    try{
    const res = axiosInstance.post("payment/unsubscribe");
          toast.promise(res, {
            loading:"Unsubscribe the bundle",
            success:(data) =>{
                return data?.data?.message;
            },
            error:"failed to unsubscribe "
          })     
        return (await res).data;

    } catch (error) {
        toast.error(error?.res?.data?.message);
    }
});
const razorpaySlice = createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key= action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id= action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified= action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified= action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
           state.allPayment= action?.payload?.allPayment;
           state.finalMonth= action?.payload?.finalMonth;
           state.mothlySalesRecord= action?.payload?.mothlySalesRecord;
           
        })

    }
});

export default razorpaySlice.reducer;

import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,  } from "react-redux";
import toast from "react-hot-toast";
import {updatePassword } from "../redux/slices/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";


function ChangePassword(){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    

    const [passwordData, setPasswordData] = useState({
        oldPassword:"",
        newPassword:"",
              
    });
    function handleUserInput(e){
        const {name,value} = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    }
    

    async function changePassword(event)
    {
        event.preventDefault();
        if(!passwordData.oldPassword || !passwordData.newPassword ){
            toast.error("Please fill all the details");
            return;
        }    

                     
       const response = await dispatch(updatePassword(passwordData));
      
       
       if(response?.payload?.success){           
           setPasswordData({
               oldPassword:"",
               newPassword:"",         
            });            
            navigate("/");
       }
       
     }

    return(
        <HomeLayout>
            <div className=" h-[90vh]  flex overflow-x-auto items-center justify-center">
                <form noValidate onSubmit={changePassword} className="  flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] border-2 border-gray-600 bg-gray-600">
                    <h1 className="text-center text-2xl font-bold  ">Change password Page</h1>                
                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword" className="font-semibold ">Oldpassword</label>
                        <input 
                            type="password" 
                            required
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter old password ..."
                            className="bg-tranparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={passwordData.oldPassword}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword" className="font-semibold ">Newpassword</label>
                        <input 
                            type="password"
                            required 
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter new password ..."
                            className="bg-tranparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={passwordData.newPassword}
                        />
                    </div>
                    <button  type="submit" className="mt-2 bg-violet-600 border rounded-md font-semibold cursor-pointer py-2 text-lg hover:bg-yellow-500 transition-all ease-in-out duretion-300">
                        Change password
                    </button>
                    <Link to="/">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 font-semibold"> 
                            <AiOutlineArrowLeft/> Go back to home
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    );
}
export default ChangePassword;
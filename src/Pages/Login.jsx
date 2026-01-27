
import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../redux/slices/authSlice";

function Login(){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    

    const [loginData, setLoginData] = useState({
        email:"",
        password:""
        
    });
    function handleUserInput(e){
        const {name,value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }
    

    async function onLogin(event)
    {
        event.preventDefault();
        if(!loginData.email || !loginData.password ){
            toast.error("Please fill all the details");
            return;
        }    

       // dispatch create account action
       const response = await dispatch(login(loginData));
      
       
       if(response?.payload?.success){
            navigate("/");

            setLoginData({
                email:"",
                password:"",           
           });            
       }
       
     }

    return(
        <HomeLayout>
            <div className=" h-[90vh]  flex overflow-x-auto items-center justify-center">
                <form noValidate onSubmit={onLogin} className="  flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow(0_0_10px_black) border-2 border-gray-600 bg-gray-600">
                    <h1 className="text-center text-2xl font-bold  ">Login Page</h1>

                  
                     
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold ">Email</label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter email ..."
                            className="bg-tranparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="font-semibold ">Password</label>
                        <input 
                            type="password"
                            required 
                            name="password"
                            id="password"
                            placeholder="Enter password ..."
                            className="bg-tranparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>
                    <button  type="submit" className="mt-2 bg-violet-600 border rounded-md font-semibold cursor-pointer py-2 text-lg hover:bg-yellow-500 transition-all ease-in-out duretion-300">
                        Login
                    </button>
                    <p className="text-center">
                        Donot have an account ? <Link to='/signup' className=" link cursor-pointer text-amber-800 font-semibold ">Signup</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Login;
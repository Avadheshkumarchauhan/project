import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import {BsPersonCircle} from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../redux/slices/authSlice";
import { isEmail, isValidPassword } from "../helper/regexMatcher";

function Signup(){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [priviewImage,setpreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    });
    function handleUserInput(e){
        const {name,value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }
    function getImage(event){
        event.preventDefault();
        const uploadedImage = event.target.files[0];
        if(uploadedImage){
            setSignupData({
                ...signupData,
                avatar:uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function(){
                               
                setpreviewImage(this.result)
            })
        }
    }

    async function createNewAccount(event)
    {
        event.preventDefault();
        if(!signupData.fullName|| !signupData.email || !signupData.password || !signupData.avatar){
            toast.error("Please fill all the details");
            return;
        }
        /**
         * checking name field length
         */
        if(signupData.fullName.length<5){
            toast.error("Name should be atleast of 5 charaters ");

            return;
        }
        /**
         * checking valid email
         */
        if(!isEmail(signupData.email)){
            toast.error("Invalid email id or examle@gmail.com type ");

            return;
        }
        /**
         * checking password validation
         */
        if(!isValidPassword(signupData.password)){
            toast.error("passwordshuld be 6-16chararers long with atleast a number and special charater ");

            return;
        }

        const formData = new FormData();

        formData.append("fullName",signupData.fullName);
        formData.append("email",signupData.email);
        formData.append("password",signupData.password);
        formData.append("avatar",signupData.avatar);

       // dispatch create account action
       const response = await dispatch(createAccount(formData));
              
       if(response?.payload?.success){
            navigate("/");

            setSignupData({
                 fullName:"",
                 email:"",
                 password:"",
                 avatar:""
             });
             setpreviewImage("");
       }
    }

    return(
        <HomeLayout>
            <div className=" h-[90vh]  flex overflow-x-auto items-center justify-center">
                <form noValidate onSubmit={createNewAccount} className="  flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow(0_0_10px_black) border-2 border-gray-600 bg-gray-600">
                    <h1 className="text-center text-2xl font-bold  ">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer ">
                        {priviewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={priviewImage} />
                         ) : (
                                <BsPersonCircle className="w-24 h-24 rounded-full  m-auto"/>
                        )}
                    </label>
                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file" 
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .png, .jpeg, .svg"
                        
                    />
                     <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="font-semibold ">Name</label>
                        <input 
                            type="text" 
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter fullname ..."
                            className="bg-tranparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>
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
                            value={signupData.email}
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
                            value={signupData.password}
                        />
                    </div>
                    <button  type="submit" className="mt-2 bg-violet-600 border rounded-md font-semibold cursor-pointer py-2 text-lg hover:bg-yellow-500 transition-all ease-in-out duretion-300">
                        Create account
                    </button>
                    <p className="text-center">
                        Already have an account ? <Link to='/login' className=" link cursor-pointer text-amber-800 font-semibold ">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    );
}
export default Signup;
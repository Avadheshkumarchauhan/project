import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../redux/slices/LectureSlice";
import { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture(){
    const courseDetails = useLocation().state;
    console.log("lecture id : ",courseDetails);
    console.log("lecture id 2 uselocation: ",useLocation());
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput,setUserInput] =useState({
        id:courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });
    function handleInputChange(e){
        e.preventDefault();
        const{name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    function handleVideo(e){
        const video =e.target.files[0];
        const source =window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:source
        })
        
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.lecture ||!userInput.title||!userInput.description){
            toast.error("All fields are mandatory");
            return;
        }
        const response= await dispatch(addCourseLecture(userInput));        
        if(response?.payload?.success){
            navigate(-1);
            setUserInput({
                id:courseDetails?._id,
                lecture:undefined,
                title:"",
                description:"",
                videoSrc:""
            })
        }
    }
    useEffect(()=>{
        if(!courseDetails){
           navigate("/courses");
           return;
        }
    },[courseDetails,navigate]);

    return(
       <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16 ">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg"> 
                    <header className="flex items-center justify-center relative">
                        <button className="absolute left-2 text-xl text-green-500 font-bold"
                        onClick={()=>navigate(-1)}>
                            <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add new Lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3 ">
                        <label htmlFor="title" className="font-bold">Title </label>
                        <input type="text"
                            id="title"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            onChange={handleInputChange}
                            value={userInput.title}
                            className="bg-transparent px-3 py-1 border rounded-md"
                        />
                        <label htmlFor="description" className="font-bold">Description </label>
                        <textarea type="text"
                            id="description"
                            name="description"
                            placeholder="Enter description of the lecture"
                            onChange={handleInputChange}
                            value={userInput.description}
                            className="bg-transparent px-3 py-1 border rounded-md resize-none overflow-y-scroll"
                        />
                        {userInput.videoSrc ? (
                                <video muted
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                src={userInput.videoSrc}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"                                
                                >
                                </video>
                            ):(
                                <div className="h-48 flex border items-center justify-center cursor-pointer">
                                    <label className="font-semibold text-xl cursor-pointer" htmlFor="lecture"> chouse your video</label>
                                    <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4 video/*" />
                                </div>
                            )
                        }
                        <button type="submit" className="bg-yellow-600 hover:bg-yellow-500 text-xl font-semibold py-1 cursor-pointer font-bold rounded-lg w-full">
                            Add new lecture
                        </button>
                    </form>
                </div>
            </div>
       </HomeLayout>
    )
}

export default AddLecture;
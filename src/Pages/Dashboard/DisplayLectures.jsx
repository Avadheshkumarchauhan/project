import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCourseLecture, getCourseLectures } from "../../redux/slices/LectureSlice";

function DisplayLectures(){
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const {state} =useLocation();
       
    const {lectures}=useSelector((state)=>state.lecture);
    console.log("lecture displya page ",lectures);     
    
    const {role}=useSelector((state)=>state.auth);
    const [currentVideo,setCurrentVideo] =useState(0);

    async function onLectureDlete(courseId,lectureId){
        console.log(courseId," , ",lectureId);
        await dispatch(deleteCourseLecture({courseId:courseId,lectureId:lectureId}));
        await dispatch(getCourseLectures(state?._id))
        

    }
        useEffect(()=>{
        if(!state){
           navigate("/courses");
           return;
        }
        dispatch(getCourseLectures(state?._id));        

    },[]);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col gap-10 items-center justify-center py-10 text-white mx-[5%] ">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name :{" "} {state?.title}
                </div>
                {(lectures&& lectures.length > 0 )? 
                (<div className="flex justify-center gap-10 w-full">
                    {/*Left section for displaying course details to admin  */}
                    <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video
                            src={lectures && lectures[currentVideo]?.lecture?.secure_url }
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            muted 
                            disablePictureInPicture
                            controlsList="nodownload"
                        >
                        </video>
                        <div className="">
                            <h1>
                                <span className="text-yellow-500  font-semibold">Title :{" "} </span>
                                {lectures && lectures[currentVideo]?.title}
                            </h1>
                            <p>
                                <span className="text-yellow-500 font-semibold line-clamp-4">
                                    Description :{" "} 
                                </span>
                                {lectures && lectures[currentVideo]?.description}
                            </p>
                        </div>
                    </div>
                    {/*Right section for displaying list of lectures */}
                    <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                        <li className="font-semibold flex text-xl text-yellow-500 items-center justify-between">
                            <p>Lectures list</p>
                            {role==="ADMIN" && (
                                <button onClick={()=>navigate("/course/addlecture",{state:{...state}})} className="  bg-yellow-600 text-white hover:bg-yellow-500 rounded-md px-2 cursor-pointer py-1 font-semibold text-sm">
                                    Add new lecture
                                </button>
                            )}
                        </li>
                        {
                            lectures &&
                            lectures.map((lecture,idx)=>{
                                return(
                                    <li className ="space-y-2" key={lecture?._id}>
                                        <p className="cursor-pointer" onClick={()=>setCurrentVideo(idx)}>
                                            <span>
                                                {" "} Lecture {idx+1} : {" "}
                                            </span>
                                            {lecture?.title}
                                        </p>
                                        {role==="ADMIN" && (
                                            <button onClick={()=>{onLectureDlete(state?._id,lecture?._id)}}
                                            className="  bg-yellow-600 text-white hover:bg-yellow-500 rounded-md px-2 cursor-pointer py-1 font-semibold text-sm">
                                                Delete lecture
                                            </button>
                                        )}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>):
                    (
                     role && role==="ADMIN" && (
                            <button onClick={()=> navigate("/course/addlecture",{state:{...state}})} className="  bg-yellow-600 text-white hover:bg-yellow-500 rounded-md px-2 cursor-pointer py-1 font-semibold text-sm">
                                Add new lecture
                            </button>
                        )
                    )
                }
            </div>
        </HomeLayout>
    )
}

export default DisplayLectures;
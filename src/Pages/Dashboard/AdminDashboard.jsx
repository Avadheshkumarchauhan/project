import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import{ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip ,Chart as ChartJs} from "chart.js"
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourses, getAllCourses } from "../../redux/slices/CourseSlice";
import { getPaymentRecord } from "../../redux/slices/RazorpaySlice";
import { getStateData } from "../../redux/slices/StatSlice";
import {Bar, Pie} from "react-chartjs-2"
import{FaUsers} from "react-icons/fa"
import{FcSalesPerformance} from "react-icons/fc"
import{GiMoneyStack} from "react-icons/gi"
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";


ChartJs.register(ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip);
function AdminDashboard(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {allUserCount, subscribedCount} = useSelector((state) =>state?.stat);
        
    console.log(allUserCount , " :: ",subscribedCount);
    
    const {allPayment,monthlySalesRecord} = useSelector((state) =>state?.razorpay);
    const userData = {
        labels:["Resistered User","Enrolled User"],
        fontColor:"white",
        datasets:[
            {
                label:"User Details",
                data:[allUserCount||5,subscribedCount||3],
                backgroundColor:["yellow","green","pink","black"],
                borderWidth:1,
                borderColor:["yellow","green"],
            }
        ]
    }
    const selesData ={
        labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec"],
        fontColor:"white",
        datasets:[
            {
                label:"Seles / Month",
                data:monthlySalesRecord||10000,
                backgroundColor:["rgb(255,99,132)"],
                borderWidth:2,
                borderColor:["white"],
            }
        ]
    }
    const {courseData} = useSelector((state) =>state?.course); 

    async function onCourseDelete(id) {
        if(window.confirm("Are you sure want to delete the course ? " )){
            const res = await dispatch(deleteCourses(id));
            console.log("admin dash respons : ",res);
            
            if(res?.payload){
                const x = await dispatch(getAllCourses());

                console.log(" admin dashboard After delete getcoursedata : ",x);
                
            }
        }
    }
    
    useEffect(()=>{
        ;(
            async() =>{
                 await dispatch(getAllCourses());
                 await dispatch(getPaymentRecord());
                 await dispatch(getStateData());

            }
        )();
    },[])
    return(
       <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-center text-5xl font-semibold text-yellow-500">Admin Dashboard</h1>
                <div className=" grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg  rounded-md">
                        <div className="w-80 h-80 ">
                            <Pie data={userData}/>
                        </div>
                        <div className="grid grid-cols-2 gap-5 ">
                            <div className="flex items-center justify-center p-5 gap-5 rounded-md     shadow-md">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold">Register Users </p>
                                    <h3 className="text-4xl font-bold">{allUserCount||5}</h3>
                                </div>
                                <FaUsers className="text-yellow-500 text-5xl"/>

                            </div>
                            <div className="flex items-center justify-center p-5 gap-5 rounded-md     shadow-md">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold">Subscribed Users </p>
                                    <h3 className="text-4xl font-bold">{subscribedCount||3}</h3>
                                </div>
                                <FaUsers className="text-green-500 text-5xl"/>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar data={selesData} className="absolute bottom-0 h-80 w-full "/>
                        </div>
                        <div className="grid grid-cols-2 gap-2 ">
                            <div className="flex items-center justify-center p-5 gap-5 rounded-md     shadow-md">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold">Subscription Count </p>
                                    <h3 className="text-4xl font-bold">{allPayment?.count||10}</h3>
                                </div>
                                <FcSalesPerformance className="text-yellow-500 text-5xl"/>

                            </div>  
                            <div className="flex items-center justify-center p-5 gap-5 rounded-md     shadow-md">
                                <div className="flex flex-col items-center ">
                                    <p className="font-semibold">Total revenue </p>
                                    <h3 className="text-4xl font-bold">{subscribedCount*499||34900}</h3>
                                </div>
                                <GiMoneyStack className="text-green-500 text-5xl"/>

                            </div>                                                              
                        </div>

                    </div>
                </div>

                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10 ">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-3xl font-semibold">
                            Courses overview 
                        </h1>
                        <button className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-md px-4 font-semibold text-lg cursor-pointer " onClick={() =>{
                            navigate("/course/create");
                        }}>
                            Create new course
                        </button>
                    </div>
                    <table className="table overflow-x-scroll shadow-lg">
                        <thead className="shadow-[0_0_10px_black]">
                            <tr>
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Course Category </th>
                                <th>Instructor</th>
                                <th>Total Lectures</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                courseData?.map((course,inx) =>{
                                    return(
                                        <tr key={course?._id} className="shadow-lg">
                                            <td>{inx+1}</td>
                                            <td>
                                               <textarea readOnly value={course?.title} className="w-40 h-auto bg-transparent resize-none  "></textarea>
                                            </td>
                                            <td>
                                                {course?.category}
                                            </td>
                                            <td className="px-6">
                                                {course?.createdBy}
                                            </td>
                                            <td className="px-6">
                                                {course?.numbersOfLectures}
                                            </td>
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                                <textarea readOnly value={course?.description} className="w-80 h-auto bg-transparent resize-none"></textarea>
                                            </td>
                                            <td className="flex items-center gap-4">
                                                <button 
                                                    className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold cursor-pointer mx-4 "
                                                    onClick={()=>{
                                                        navigate("/course/displaylectures",{state:{...course}});
                                                    }}
                                                >
                                                    <BsCollectionPlayFill/>
                                                </button>
                                                <button 
                                                    className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold cursor-pointer "
                                                    onClick={()=>{
                                                        onCourseDelete(course?._id);
                                                        }
                                                    }
                                                >
                                                    <BsTrash/>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
       </HomeLayout>
     
    );
}

export default AdminDashboard;
// import {FiMenu} from 'react-icons/fi';
// import {AiFillCloseCircle} from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import Footer from '../Components/Footer';
// function HomeLayout({children}){
     
//     function changeWidth(){
//         const drawerSide = document.getElementsByClassName("drawer-side");
//         drawerSide[0].style.width = "auto";
//     }

//    function hodeDrawer(){
//      const element = document.getElementsByClassName("drawer-toggle");
//     element[0].checked =false;
    
//      const drawerSide = document.getElementsByClassName("drawer-side");
//         drawerSide[0].style.width =0;
//    }
//     return (
//         <div className="min-h-[90vh]">
//             <div className="drawer absolute left-0 z-50 w-fit">
//                 <input type="checkbox" id="my-drawer" className="drawer-toggle" />            
//                 <div className="drawer-content">
//                     <label htmlFor="my-drawer" className="cursor-pointer relative">
//                         <FiMenu
//                             onClick={changeWidth}
//                             size={"32px"}
//                             className='font-bold text-white m-4'
//                         />
//                     </label>
//                 </div>
//                 <div className="drawer-side w-0">
//                     <label htmlFor="my-drawer" className='drawer-overlay'>
//                     </label>
//                     <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
//                         <li className='w-fit absolute right-2 z-50'>
//                             <button onClick={hodeDrawer}>
//                                 <AiFillCloseCircle size={24}/>
//                             </button>
//                         </li>
//                         <li>
//                             <Link to ="/">Home</Link>
//                         </li>
//                         <li>
//                             <Link to ="/courses">All courses</Link>
//                         </li>
//                         <li>
//                             <Link to ="/contact">Contect Us</Link>
//                         </li>
//                         <li>
//                             <Link to ="/about">About Us</Link>
//                         </li>
//                     </ul>
//                 </div>    
//             </div>
//             {children}
//             <Footer/>
//         </div>
//     );

// }

// export default HomeLayout;


import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import Footer from "../Components/Footer";

function HomeLayout({ children }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for checking user is logged in
  const isLoggenIn = useSelector((state) => state?.auth?.isloggedIn);
  // for diisplaying the option acc to role
  const role = useSelector((state)=> state?.auth?.role);
  function openDrawer() {
    document.getElementById("drawer").classList.remove("-translate-x-full");
    document.getElementById("overlay").classList.remove("hidden");
  }

  function closeDrawer() {
    document.getElementById("drawer").classList.add("-translate-x-full");
    document.getElementById("overlay").classList.add("hidden");
  }

  function handleLogout(e){
    e.preventDefault();
    // const res = await dispatch(logout())
    // if(res?.payload?.sucess)
      navigate('/')
  }

  return (
    <div className="min-h-[90vh] relative bg-gray-500">

        <button onClick={openDrawer} className="p-4 bg-base-100">
        {/* MENU BUTTON */}
        <FiMenu size={32} className="text-white cursor-pointer " />
        </button>
                            
        {/* OVERLAY */}
        <div
            id="overlay"
            onClick={closeDrawer}
            className="hidden fixed inset-0 z-50">

        </div>

        {/* DRAWER PANEL */}
        <div
            id="drawer"
            className="fixed z-50 top-0 left-0 h-full w-64  bg-base-200 shadow-xl
                    -translate-x-full transition-transform duration-300">
            {/* CLOSE BUTTON */}
            <div className="absolute right-3 top-3 ">
                <button className=" text-bold cursor-pointer" onClick={closeDrawer}>
                    <AiFillCloseCircle size={26} />
                </button>

            </div>

            {/* MENU */}
            <ul className="flex flex-col gap-1 p-6 mt-12 text-lg font-medium ">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                {isLoggenIn && role == "ADMIN" && (
                  <li>
                    <Link to='/admin/dashbord' className="hover:text-white">Admin DashBord</Link>
                  </li>
                )}
                <li><Link to="/courses" className="hover:text-white">All courses</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                {!isLoggenIn && (
                  <li className="absolute bottom-4 w-[90%] ">
                    <div className="w-full flex items-center justify-center gap-2 px-2">
                      <button className=" px-4 py-1 font-semibold rounded-md w-full bg-indigo-500 text-white hover:bg-yellow-500 hover:text-black cursor-pointer">
                            <Link to='/login' >Login</Link>
                      </button>
                      <button className=" px-4 py-1 font-semibold rounded-md w-full bg-fuchsia-500 text-white hover:bg-green-300 hover:text-black cursor-pointer">
                            <Link to='/signup'>Signup</Link>
                      </button>
                    </div>
                  </li>
                )}
                {isLoggenIn && (
                  <li className="absolute bottom-4 w-[90%] ">
                    <div className="w-full flex items-center justify-center gap-2 px-2">
                      <button className=" px-4 py-1 font-semibold rounded-md w-full bg-indigo-500 text-white hover:bg-yellow-500 hover:text-black cursor-pointer">
                            <Link to='/user/profile' >Profile</Link>
                      </button>
                      <button className=" px-4 py-1 font-semibold rounded-md w-full bg-fuchsia-500 text-white hover:bg-green-300 hover:text-black cursor-pointer">
                            <Link onClick={handleLogout}>Logout</Link>
                      </button>
                    </div>
                  </li>
                )}
            </ul>
        </div>


        {/* MAIN CONTENT */}
        {children}
        <Footer />
    </div>
  );
}

export default HomeLayout;

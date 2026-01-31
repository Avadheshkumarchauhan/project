import { RxCrossCircled } from "react-icons/rx";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function CheckoutFail(){

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center text-white">
                <div className="w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded relative bottom-4">
                    <h1 className="bg-red-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Payment failed</h1>
                    <div className="px-4 flex flex-col items-center justify-center space-y-2">
                       <div className="text-center space-y-2 "> 
                        <h2 className="text-lg font-semibold">Oops ! Your payment failed </h2>
                        <p className="text-left">
                            Please try again later                            
                        </p>
                       </div>
                       <RxCrossCircled className="text-red-600 text-5xl"/>
                    </div>
                    <Link to="/checkout" className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300  bottom-0 absolute w-full text-center font-bold text-2xl rounded-lg py-2">
                        <button className="cursor-pointer">Try again</button>                    
                    </Link>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutFail;
import HomeLayout from "../Layouts/HomeLayout";

function Contact(){
    return(
      <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form  className=" flex flex-col  m-2 items-center justify-center gap-2 p-5 rounded-md text-white  shadow-[0_0_10px_black] w-[22rem]">
                    <h1 className="text-3xl font-semibold">
                        Contect Form
                    </h1>
                </form>
            </div>
      </HomeLayout>
    )
}
export default Contact;
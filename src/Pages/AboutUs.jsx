import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from '../Assets/aboutMainImage.png';

function AboutUs(){

    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col my-10 text-white min-h-[100vh] ">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and quality education 
                        </h1>
                        <p className=" text-xl text-gray-200">
                            It means giving every child the chance to learn without facing money problems. It ensures that students from rich or poor families get the same good-quality teaching, proper classrooms, books, and other learning facilities. Quality education helps students build knowledge, skills, good values, and confidence for their future. When education is affordable, fewer students drop out and everyone gets an equal chance to succeed. To achieve this, governments and schools must provide support like scholarships, free textbooks, trained teachers, and safe learning environments. When education becomes both affordable and high-quality, it improves lives, reduces inequality, and helps the whole country progress.
                        </p>
                    </section>
                    <div className=" w-1/2">
                        <img className="drop-shadow-2xl"
                        id='text1'
                        style={{
                            filter:"drop-shadow(0px 10px 10px rgb(0,0,0))"
                        }}
                        src={aboutMainImage} alt="About main image" />
                    </div>
                </div>
            </div>
        </HomeLayout>
    );

}

export default AboutUs;
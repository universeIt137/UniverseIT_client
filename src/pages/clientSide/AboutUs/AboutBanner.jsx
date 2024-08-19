import React from 'react';
import { Link } from 'react-router-dom';

const AboutBanner = () => {
    return (
        <>
            <div className='md:flex justify-between max-w-7xl mx-auto px-5 gap-4 mt-10 pb-10'>
                <div className=' md:w-1/2'>
                    <div className='text-center md:text-left'>
                        <p className='text-primary text-2xl font-bold'>Successfully 5 Year's</p>
                        <p className='md:text-5xl font-bold'>World-Renowned  IT  Expert Making Organization</p>

                        <p className='md:py-10 md:text-xl'>Universe IT Institute has been working with a vision to create IT experts for the past 5 years. In a fast pacing world, where every sector relies on technology, you need to develop IT skills to secure a better future.
                        </p>
                    </div>

                    <div className="w-max mx-auto md:mx-0 ">
                        <Link to="/courses">
                            <button className="text-sm sm:text-base bg-primary text-white hover:bg-text_color px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-medium">Browse Courses </button>
                        </Link>
                    </div>

                </div>
                <div className='md:w-1/2 mt-5'>
                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1724062702/UniverseIT/mocgjw9vdp1xrwbu0m53.jpg" className='rounded-2xl' alt="" />
                </div>
            </div>
        </>
    );
};

export default AboutBanner;
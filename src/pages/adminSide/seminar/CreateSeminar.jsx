import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';

const CreateSeminar = () => {
    const axiosPublic = useAxiosPublic();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const topic = form.topic.value;
        const date = form.date.value;
        const time = form.time.value;
        



        const data = { topic, date, time };
        console.log(data)

        axiosPublic.post('/seminar', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log('data added')                   
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Seminar has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
            .catch()
        form.reset();
    }
    return (
        <>
            <Helmet>
                <title>Dashboard | Create Seminar</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container  mx-auto">

                            <div className="lg:w-[75vw] w-full mx-auto bg-white mt-2 rounded-xl">


                                <div className="shadow-2xl  px-10 rounded-2xl">
                                    <p className='text-center text-2xl font-bold py-2'>Create Seminar</p>
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap'>

                                        {/* Topic  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Seminar Topic</label>
                                                <input type="text" name="topic" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        {/* Date  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Date</label>
                                                <input type="date" name="date" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Time  */}
                                        <div className="p-2 w-1/2 mx-auto">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Time</label>
                                                <input type="time" name="time" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        

                                        


                                        

                                        <div className="p-2 w-full">
                                            <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                                        </div>
                                    </form>


                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-indigo-500">info@UniverseIT.com</a>
                                        <p className="leading-normal my-5">House # 3/GA,
                                            <br />Shyamoli, Road # 1. Dhaka-1207.
                                        </p>
                                        <span className="inline-flex">
                                            <a className="text-gray-500">
                                                <Link to="https://x.com/"><BiLogoTwitter className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.youtube.com/"><TbBrandYoutubeFilled className="text-2xl" /></Link>
                                            </a>
                                            <a className="ml-4 text-gray-500">
                                                <Link to="https://www.facebook.com/"><FaFacebook className="text-xl" /></Link>
                                            </a>

                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default CreateSeminar;
import React, { useState } from 'react';
import { IoDocumentTextOutline } from 'react-icons/io5';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ApplicationPage = () => {
    window.scrollTo(0, 0);

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const [imageName, setImageName] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageName(file.name); // Set the image file name in state
        }
    };


    const { data: career = {}, refetch: blogDataRefetch, isLoading } = useQuery({
        queryKey: ['career', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/career/${id}`)
            return res?.data
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const mobileNo = form.mobileNo.value;
        const location = form.location.value;
        const position = form.position.value;
        const imageName = form.imageName.value;



        const data = { fullName, mobileNo, location, position, imageName };
        console.log(data);

        axiosPublic.post('/apply-job', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log('data added')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application Submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
            .catch()
        form.reset();
    };

    console.log(career);

    return (
        <div className="bg-gray-100">
            <Helmet>
                <title>Universe IT | Career Form</title>
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">

                    <div className="flex  flex-col-reverse gap-5 lg:flex-row bg-blue-950 py-5 px-3 items-center justify-between mb-6">
                        <h1 className="text-[10px] lg:text-3xl p-3 rounded-lg flex bg-secondary items-center gap-1 font-bold text-white"><IoDocumentTextOutline /><span>Job Application Form </span>( {career.position} )</h1>
                        <img src='https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723544696/UniverseIT/Logo/xvlfi7xrapeoabxyzjji.png' alt="Company Logo" className="h-12" /> {/* Adjust height as needed */}
                    </div>
                    <div className="max-w-5xl mx-auto border p-5 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column - pdf Upload */}
                            <div className="flex flex-col items-center">

                                <label className="block border-2 border-dashed border-gray-300 w-full h-64 flex flex-col justify-center items-center cursor-pointer">
                                    {/* Hidden file input field */}
                                    <input
                                        type="file"
                                        className="hidden"
                                        name="imageName"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    <span className="text-green-600 text-2xl">+ Upload Your CV</span>
                                    <span className="text-sm text-gray-500">Supported Format:pdf</span>
                                </label>
                                
                                {/* Display the uploaded image name if available */}
                                {imageName && (
                                    <span className="text-gray-700 mt-2 text-sm">
                                        Uploaded: {imageName}
                                    </span>
                                )}
                            </div>

                            {/* Right Column - Form Fields */}
                            <div className="space-y-4">
                                {/*  Full Name */}
                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter your Full Name"
                                    />
                                </div>

                                {/* Mobile No */}
                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Enter Mobile No</label>
                                    <input
                                        type="text"
                                        name="mobileNo"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter your mobile number"
                                    />
                                </div>


                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Enter Your Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter your location"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm mb-2">Job Post</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={career.position}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter your location"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className=" bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary transition duration-300"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ApplicationPage;
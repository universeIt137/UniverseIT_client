import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { BiLogoTwitter } from "react-icons/bi";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaFacebook, FaRegStar, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { uploadImg } from "../../../UploadFile/uploadImg";
import Rating from "react-rating";
import { useEffect, useState } from "react";

const UpdateTestimonials = () => {
    const { id } = useParams();
    const [ratingValue, setRatingValue] = useState(0);
    const [ratingErr, setRatingErr] = useState('')
    const axiosPublic = useAxiosPublic();
    const imgHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const { register, handleSubmit, reset } = useForm();

    const { data: testimonialData = {}, refetch: testimonialDataRefetch, isLoading } = useQuery({
        queryKey: ['testimonialData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleTestimonial/${id}`)
            return res?.data
        }
    })
    useEffect(() => {
        if (testimonialData?.rating) {
            setRatingValue(testimonialData?.rating || 0)
        }
    }, [testimonialData])
    if (isLoading) {
        return ''
    }
    const { _id, name: upcomingName, opinion: upcomingOpinion, designation: upcomingDesignation, image: upcomingImage } = testimonialData;

    const onSubmit = async (data) => {
        const { name, designation, opinion } = data;
        const imageFile = data.image[0];
        let testimonialsImage = ''
        if (!imageFile?.name) {
            testimonialsImage = upcomingImage
        } else {
            testimonialsImage = await uploadImg(imageFile);
        }

        const allData = { name, designation, opinion, image: testimonialsImage, rating: ratingValue };

        axiosPublic.put(`/updateTestimonial/${_id}`, allData)
            .then(res => {
                
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Testimonial has updated!!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    testimonialDataRefetch()
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleRatingChange = value => {
        setRatingValue(value)
    }

    const starColorMap = {
        1: 'text-red-500',        // Bright Red
        2: 'text-orange-600',     // Dark Orange
        3: 'text-orange-500',     // Bright Orange
        4: 'text-orange-300',     // Lighter Orange
        5: 'text-primary',     // Yellow
    };
    const getStarColor = (rating) => starColorMap[rating] ?? 'text-gray-400';
    return (
        <>
            <Helmet>
                <title>Dashboard | Update Testimonial</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container p-5  mx-auto">

                            <div className="lg:w-full md:w-2/3 mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Update Testimonial</p>

                                <div className="   rounded-2xl">
                                    <form action="" onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap -m-2'>

                                        <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
                                            {/* Name  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Name</label>
                                                    <input type="text" {...register("name", { required: true })} defaultValue={upcomingName} name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>

                                            {/* image url  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Image</label><br />
                                                    <input type="file" {...register("image")} className="file-input file-input-bordered file-input-md w-full" />
                                                </div>
                                            </div>


                                            {/* Designation  */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Designation</label>
                                                    <input type="text" {...register("designation", { required: true })} defaultValue={upcomingDesignation} name="designation" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                </div>
                                            </div>
                                            {/*Rating   */}
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label className="leading-7 text-sm text-gray-600 font-bold">Rating</label>
                                                    <div className={`text-xl ${getStarColor(ratingValue)}`}>
                                                        <Rating
                                                            onChange={handleRatingChange}
                                                            className="space-x-1"
                                                            emptySymbol={<FaRegStar />}
                                                            fullSymbol={<FaStar />}
                                                            initialRating={ratingValue}
                                                        />
                                                    </div>
                                                </div>
                                                <p>{ratingErr}</p>
                                            </div>
                                        </div>

                                        {/* Opinion  */}
                                        <div className="p-2 w-full mx-auto">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Your Opinion</label>
                                                <textarea name="opinion" {...register("opinion", { required: true })} defaultValue={upcomingOpinion} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
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

export default UpdateTestimonials;
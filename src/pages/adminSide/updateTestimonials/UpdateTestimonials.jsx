import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { BiLogoTwitter } from "react-icons/bi";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import { uploadImg } from "../../../UploadFile/uploadImg";

const UpdateTestimonials = () => {
    const { id } = useParams();
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

        const allData = { name, designation, opinion, image: testimonialsImage };
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

                                        {/* Name  */}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Name</label>
                                                <input type="text" {...register("name")} defaultValue={upcomingName} name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* image url  */}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Image</label><br />
                                                <input type="file"

                                                    {...register("image")} className="file-input file-input-bordered file-input-md w-full max-w-xs" />
                                            </div>
                                        </div>


                                        {/* Designation  */}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Designation</label>
                                                <input type="text" {...register("designation")}
                                                    defaultValue={upcomingDesignation} name="designation" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Opinion  */}
                                        <div className="p-2 w-full mx-auto">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Your Opinion</label>
                                                <textarea defaultValue={upcomingOpinion} name="opinion" {...register("opinion")} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
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
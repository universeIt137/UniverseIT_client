import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { uploadImg } from '../../../UploadFile/uploadImg';
import Loading from '../../../Shared/Loading/Loading';

const UpdateFacultyPage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: facultyData = {}, refetch: facultyDataRefetch, isLoading } = useQuery({
        queryKey: ['facultyData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/singleFaculty/${id}`)
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading/>
    }
    console.log(facultyData);
    const { _id, name: incomingName, email: incomingEmail, contact: incomingContact, designation: incomingDesignation, facebook: incomingFacebook, twitter: incomingTwitter, whatsapp: incomingWhatsapp, image: incomingImage, background_of_study: incomingBackground_of_study, job_experience: incomingJob_experience } = facultyData;
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const facebook = form.facebook.value;
        const twitter = form.twitter.value;
        const whatsapp = form.whatsapp.value; 
        const contact = form.contact.value;
        const designation = form.designation.value;
        const selectedImage = form.image.files[0];
        const background_of_study = form.background_of_study.value;
        const job_experience = form.job_experience.value;
        let facultyImageUrl = incomingImage
        if (!selectedImage?.name) {
            facultyImageUrl = incomingImage
        } else {
            facultyImageUrl = await uploadImg(selectedImage);
        }

        const data = { name, email, facebook, twitter, whatsapp, contact, designation, image: facultyImageUrl, background_of_study, job_experience };

        axiosPublic.put(`/updateFaculty/${_id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    console.log('data updated')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Faculty has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    facultyDataRefetch()

                }
            })
        console.log(data)
    }


    return (
        <>
            <Helmet>
                <title>Dashboard | Update Faculty</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5  mx-auto">

                            <div className="lg:w-3/4 md:w-2/3 mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Update Faculty Information</p>

                                <div className="shadow-2xl  px-10 rounded-2xl">
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap -m-2'>

                                        {/* Name  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Faculty Name</label>
                                                <input type="text" name="name"
                                                    defaultValue={incomingName}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        {/* email  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Faculty Email</label>
                                                <input type="email" name="email"
                                                    defaultValue={incomingEmail} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/*background_of_study  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Background of study</label>
                                                <input type="text" name="background_of_study"
                                                    defaultValue={incomingBackground_of_study} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        {/*job_experience  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Job Experience</label>
                                                <input type="text" name="job_experience"
                                                    defaultValue={incomingJob_experience} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Designation  */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Enter Designation</label>
                                                <input type="text" name="designation" defaultValue={incomingDesignation} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Social Link  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Social Linik</label>
                                                <input type="text"
                                                    defaultValue={incomingFacebook} name="facebook" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Facebook' />

                                                <input type="text" name="twitter"
                                                    defaultValue={incomingTwitter}
                                                    className="w-full  bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 my-2 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Twitter' />

                                                <input type="text" name="whatsapp"
                                                    defaultValue={incomingWhatsapp}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Whatsapp' />
                                            </div>
                                        </div>

                                        {/* contact  */}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Contact Number</label>
                                                <input type="text" defaultValue={incomingContact} name="contact" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* image url  */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Faculty Image</label><br />
                                                <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full max-w-xs" />
                                            </div>
                                        </div>

                                        <div className="p-2 w-full">
                                            <button className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
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

export default UpdateFacultyPage;
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ManageCountDown = () => {
    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    });
    if (isLoading) {
        return ''
    }
    console.log(homepageContent);
    const { since: incomingSince, student: incomingStudent, rating: incomingRating, instructor: incomingInstructor, guarantee: incomingGuarantee, ratio: incomingRatio } = homepageContent[0];
    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.target;
        const since = form.since.value;
        const student = form.student.value;
        const rating = form.rating.value;
        const instructor = form.instructor.value;
        const guarantee = form.guarantee.value;
        const ratio = form.ratio.value;


        const toastId = toast.loading("Home page content is updating...");
        const data = { since, student, rating, instructor, guarantee, ratio };
        axiosPublic.post(`/updateHomepageContent/${homepageContent[0]?._id || 'notAvailable'}`, data)
            .then(res => {
                toast.success("Home page Countdown Updated Successfully!!", { id: toastId });
                if (res.data?.modifiedCount || res.data?.insertedId) {
                    console.log(res.data);
                    homepageContentRefetch()
                }
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.message, { id: toastId });
            })
    }


    return (
        <>
            <Helmet>
                <title>Dashboard | CountDown</title>
            </Helmet>
            <div className='bg-gray-100 text-black w-full lg:w-[73vw] mx-auto'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container mt-2  mx-auto">

                            <div className="lg:w-full md:w-2/3 mx-auto bg-white   rounded-xl">
                                <p className='text-center text-2xl font-bold pt-3'>Manage CountDown</p>

                                <div className="shadow-2xl my-10 px-5 rounded-2xl">
                                    <form action="" onSubmit={handleSubmit} className='flex flex-wrap -m-2'>

                                        {/* Since  */}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Since when</label>
                                                <input defaultValue={incomingSince} type="number" name="since" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        {/* Students  */}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">No. of Students</label>
                                                <input defaultValue={incomingStudent} type="number" name="student" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Ratings  */}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Ratings</label>
                                                <input defaultValue={incomingRating} type="number" name="rating" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/*Instructor No.*/}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">No. of Instructor</label>
                                                <input defaultValue={incomingInstructor} type="number" name="instructor" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/*Ed. guarantee*/}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Education guarantee</label>
                                                <input defaultValue={incomingGuarantee} type="number" name="guarantee" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>


                                        {/*Success ratio*/}
                                        <div className="p-2 w-1/3">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Job success ratio</label>
                                                <input defaultValue={incomingRatio} type="number" name="ratio" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>




                                        <div className="p-2 w-full">
                                            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Update</button>
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

export default ManageCountDown;
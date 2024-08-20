import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { uploadImg } from '../../../UploadFile/uploadImg';
import { uploadVideo } from '../../../UploadFile/uploadVideo'; // Assuming you have a function to upload videos
import toast from 'react-hot-toast';

const AddSuccessStory = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading("Story is adding...");
        const imageUrl = await uploadImg(data.image[0]);
        const videoUrl = await uploadVideo(data.video[0]); // Handle video upload

        const information = {
            name: data.name,
            title: data.title,
            description: data.description,
            image: imageUrl,
            video: videoUrl
        }
        console.log(information);

        const infoRes = await axiosPublic.post('/successStory', information);
        try {
            console.log(infoRes.data);
            if (infoRes.data.insertedId) {
                // show success popup 
                reset();
                toast.success("Success Story added Successfully!!", { id: toastId });
            }
        } catch (err) {
            toast.error(err?.message, { id: toastId });
        }

    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Add Success Story</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>

                {/* form section  */}
                <div className=''>

                    <section className="text-gray-600 body-font relative">
                        <div className="container px-4 mx-auto">

                            <div className="lg:w-full md:w-2/3 mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Add Success Story</p>

                                <div className="rounded-2xl">
                                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap -m-2'>

                                        {/* Student Name */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Student Name</label>
                                                <input type="text" {...register("name", { required: true })} name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Story Title</label>
                                                <input type="text" {...register("title", { required: true })} name="title" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Story Description</label>
                                                <textarea {...register('description', { required: true })} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>
                                        </div>

                                        {/* Student Image */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Upload Student Image</label><br />
                                                <input
                                                    type="file"
                                                    {...register('image', { required: true })}
                                                    name='image'
                                                    accept="image/*" // This restricts the file selection to image files only
                                                    className="file-input file-input-bordered file-input-md w-full"
                                                />
                                            </div>
                                        </div>

                                        {/* Success Story Video */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Upload Success Story Video</label><br />
                                                <input
                                                    type="file"
                                                    {...register('video', { required: true })}
                                                    name='video'
                                                    accept="video/*" // This restricts the file selection to video files only
                                                    className="file-input file-input-bordered file-input-md w-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-2 w-full">
                                            <button className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                                        </div>
                                    </form>

                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        <a className="text-indigo-500">info@UniverstIT.com</a>
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

export default AddSuccessStory;

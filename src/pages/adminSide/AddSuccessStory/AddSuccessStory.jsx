import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { BiLogoTwitter } from 'react-icons/bi';
import { TbBrandYoutubeFilled } from 'react-icons/tb';
import { FaFacebook } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { uploadImg } from '../../../UploadFile/uploadImg';
import { uploadVideo } from '../../../UploadFile/uploadVideo'; // Assuming you have a function to upload videos
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import StoryTable from './StoryTable';
import { useState } from 'react';

const AddSuccessStory = () => {
    const { id } = useParams();
    


    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();

    // course data 
    const { data: course = {} } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${id}`);
            return res.data;
        }
    })

    // successful student's data

    const { data: stories = [], refetch } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    })

    

    // Filter success stories based on course_id
    const filteredSuccessStories = stories.filter(story => story.course_id === id);

    



    const onSubmit = async (data) => {
        const toastId = toast.loading("Story is adding...");
        const imageUrl = await uploadImg(data.image[0]);
        const videoUrl = await uploadVideo(data.video[0]); // Handle video upload

        const information = {
            name: data.name,
            title: data.title,
            youtube_link: data.youtube,
            course_id: id,
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
            refetch();
        } catch (err) {
            toast.error(err?.message, { id: toastId });
        }

    };

    const handleDelete = (story) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/successStory/${story._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Success Story deleted from the database",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
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
                                <p className='text-center text-2xl font-bold '>Add Success Story of </p> <br />

                                <p className='text-center text-2xl font-bold pb-2'>{course?.title} </p> <br />


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
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Batch Number</label>
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
                                                    {...register('video')}
                                                    name='video'
                                                    accept="video/*" // This restricts the file selection to video files only
                                                    className="file-input file-input-bordered file-input-md w-full"
                                                />
                                            </div>
                                        </div>


                                        {/* Youtube Link */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Or Paste Youtube Link</label>
                                                <input type="text" {...register('youtube', { required: true })} name="youtube" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        <div className="p-2 w-full">
                                            <button className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                                        </div>
                                    </form>

                                    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="">
                <StoryTable successStories={filteredSuccessStories} handleDelete={handleDelete}></StoryTable>
            </div>
        </>
    );
};

export default AddSuccessStory;

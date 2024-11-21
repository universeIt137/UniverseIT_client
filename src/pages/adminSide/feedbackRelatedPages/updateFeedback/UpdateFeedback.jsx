import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { uploadVideo } from '../../../../UploadFile/uploadVideo';
import { uploadImg } from '../../../../UploadFile/uploadImg';
import { Helmet } from 'react-helmet-async';

const UpdateFeedback = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: feedbackData = {}, refetch: feedbackDataRefetch, isLoading } = useQuery({
        queryKey: ['feedbackData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/feedback/${id}`)
            return res?.data;
        }
    });

    if (isLoading) {
        return <Loading/>;  // You can replace this with a loading spinner or message if needed
    }

    const { _id, title: incomingTitle, description: incomingDescription, video: incomingVideo, name: incomingStudentName, image: incomingStudentImage, banner: incomingBanner, youtube_link: incomingYoutubeLink } = feedbackData;
console.log(incomingStudentImage);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const youtube_link = form.youtube.value;
        const name = form.studentName.value;
        const selectedImage = form.studentImage.files[0];
        const selectedBanner = form.bannerImage.files[0];
        const selectedVideo = form.video.files[0];
        let videoUrl = incomingVideo;
        let imageUrl = incomingStudentImage;
        let bannerUrl = incomingBanner;

        const toastId = toast.loading("Story is updating...");
        if (selectedVideo) {
            videoUrl = await uploadVideo(selectedVideo);
        }
        if (selectedImage) {
            imageUrl = await uploadImg(selectedImage);
        }
        if (selectedBanner) {
            bannerUrl = await uploadImg(selectedBanner);
            
        }

        const data = { title, description, name, youtube_link, image: imageUrl, banner: bannerUrl, video: videoUrl };

        axiosPublic.put(`/feedback/${_id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Feedback has Updated Successfully!!", { id: toastId });
                    feedbackDataRefetch();
                }
            });
    };


    return (
        <>
            <Helmet>
                <title>Dashboard | Update Feedback</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>
                <div className=''>
                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5 mx-auto">
                            <div className="w-full mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Update Feedback</p>

                                <div className="shadow-2xl px-10 rounded-2xl">
                                    <form onSubmit={handleSubmit} className='flex flex-wrap -m-2'>
                                         {/* Student Name */}
                                         <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Student Name</label>
                                                <input type="text" name="studentName"
                                                    defaultValue={incomingStudentName}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        {/* Title */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Batch Number</label>
                                                <input type="text" name="title"
                                                    defaultValue={incomingTitle}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Description</label>
                                                <textarea name="description" 
                                                    defaultValue={incomingDescription}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>
                                        </div>

                                       

                                        {/* Student Image */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Upload Student Image</label><br />
                                                <input type="file" name='studentImage' accept="image/*" className="file-input file-input-bordered file-input-md w-full" />
                                            </div>

                                            <p className='font-bold my-2'>Already Uploaded Image</p>
                                            
                                            <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={incomingStudentImage} alt={incomingStudentName} />
                                                </div>
                                            </div>
                                        </div>
                                        </div>

                                        {/* Video */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Upload Video</label><br />
                                                <input type="file" name='video' accept="video/*" className="file-input file-input-bordered file-input-md w-full" />
                                            </div>
                                            <p className='font-bold my-2'>Already Uploaded Video</p>
                                            <video
                                            src={incomingVideo}
                                            controls
                                            className="w-32 h-20"
                                        />
                                        </div>

                                        {/* Banner Image */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Upload Banner Image</label><br />
                                                <input type="file" name='bannerImage' accept="image/*" className="file-input file-input-bordered file-input-md w-full" />
                                            </div>

                                            <p className='font-bold my-2'>Already Uploaded Image</p>

                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={incomingBanner} alt={incomingStudentName} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600 font-bold">Or Paste Youtube Link</label>
                                                <input type="text"
                                                    defaultValue={incomingYoutubeLink}
                                                    name="youtube" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        

                                        {/* Submit Button */}
                                        <div className="p-2 w-full">
                                            <button className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                                        </div>
                                    </form>

                                   
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default UpdateFeedback;
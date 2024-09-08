import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { uploadVideo } from '../../../UploadFile/uploadVideo';
import { uploadImg } from '../../../UploadFile/uploadImg';
import toast from 'react-hot-toast';

const UpdateSuccessStoryPage = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { data: successStoryData = {}, refetch: successStoryDataRefetch, isLoading } = useQuery({
        queryKey: ['successStoryData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/successStory/${id}`)
            return res?.data;
        }
    });

    if (isLoading) {
        return '';  // You can replace this with a loading spinner or message if needed
    }

    const { _id, title: incomingTitle, description: incomingDescription, video: incomingVideo, name: incomingStudentName, image: incomingStudentImage } = successStoryData;
console.log(incomingStudentImage);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const name = form.studentName.value;
        const selectedImage = form.studentImage.files[0];
        const selectedVideo = form.video.files[0];
        let videoUrl = incomingVideo;
        let imageUrl = incomingStudentImage;
        const toastId = toast.loading("Story is updating...");
        if (selectedVideo) {
            videoUrl = await uploadVideo(selectedVideo);
        }
        if (selectedImage) {
            imageUrl = await uploadImg(selectedImage);
        }

        const data = { title, description, name, image: imageUrl, video: videoUrl };

        axiosPublic.put(`/successStory/${_id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Success Story has Updated Successfully!!", { id: toastId });
                    successStoryDataRefetch();
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>Dashboard | Update Success Story</title>
            </Helmet>
            <div className='bg-gray-100 text-black'>
                <div className=''>
                    <section className="text-gray-600 body-font relative">
                        <div className="container px-5 mx-auto">
                            <div className="w-full mx-auto bg-white px-10 py-5 rounded-xl">
                                <p className='text-center text-2xl font-bold pb-2'>Update Success Story</p>

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
                                                <label className="leading-7 text-sm text-gray-600">Title</label>
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
                                        </div>

                                        {/* Video */}
                                        <div className="p-2 w-full sm:w-1/2">
                                            <div className="relative">
                                                <label className="leading-7 text-sm text-gray-600">Upload Video</label><br />
                                                <input type="file" name='video' accept="video/*" className="file-input file-input-bordered file-input-md w-full" />
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

export default UpdateSuccessStoryPage;
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { MdDelete, MdDeleteForever, MdEditSquare } from 'react-icons/md';
import Swal from 'sweetalert2';
import AddStudentGallary from '../addStudentGallary/AddStudentGallary';
import AddCategory from './AddCategory';
import { useState } from 'react';
import { Grommet, Tab, Tabs } from 'grommet';
import toast from 'react-hot-toast';
import StudentGalleryTabs from './StudentGalleryTabs';
import Loading from '../../../Shared/Loading/Loading';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { uploadImg } from '../../../UploadFile/uploadImg';

const ManageStudentGallary = () => {

    const [imageInput, setImageInput] = useState('');
    const [imageInputErr, setImageInputErr] = useState('');
    const [allImages, setAllImages] = useState([]);

    const axiosPublic = useAxiosPublic();
    const [categoryName, setCategoryName] = useState('All')


    const { data: allPhotos = [], refetch, isLoading } = useQuery({
        queryKey: ['studentGallery'],
        queryFn: async () => {
            const res = await axiosPublic.get('/studentGallery');
            return res.data;
        }
    })






    if (isLoading) {
        return <Loading />
    }









    const handleDeleteImage = (id) => {
        const toastId = toast.loading("Photo is deleting...");
        axiosPublic.delete(`/studentGallery/${id}`)
            .then(res => {
                if (res) {
                    toast.success("Photo has been deleted successfully", { id: toastId });
                    refetch();
                }
            })
    }

    const handleSubmit = async (event) => {
        const toastId = toast.loading("Photo is uploading...");
        event.preventDefault();

        const form = event.target;

        const GalleryImage = form.image1.files[0];
        console.log(GalleryImage)


        let ImageUrl = '';
        if (GalleryImage?.name) {
            ImageUrl = await uploadImg(GalleryImage);
        }

        const data = { ImageUrl };

        axiosPublic.post(`/studentGallery`, data)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Photos has been added Successfully!!", { id: toastId });
                    refetch();
                    form.reset();
                }
            })
    };


    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Student Gallery</title>
            </Helmet>
            <div className="bg-white p-5 mx-4 rounded-lg">
                <p className='text-2xl font-bold text-center'>Manage Student Gallery</p>
                <div className='grid md:grid-cols-2 gap-3  mx-auto w-11/12'>

                    <form action="" onSubmit={handleSubmit} className=''>

                        <div className='grid grid-cols-1 '>

                            {/* Banner images */}
                            <div className='w-full md:col-span-2'>
                                <label className="leading-7 text-sm text-gray-600 font-bold">Upload Photo Gallery Images</label>
                                <div className='w-full'>
                                    <div className="p-2 w-full">
                                        <div className="relative space-y-2">
                                            <label className="leading-7 text-sm text-gray-600 font-medium">Select Image</label><br />
                                            <input id='courseImageInputField' type="file" name='image1' className="file-input file-input-bordered file-input-md w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className='flex justify-center items-center'><ButtonStrong text={'Submit'} /></div>
                        </div>

                    </form>
                </div>
                <p className=' text-2xl text-center font-bold my-5'>Already Uploaded Images</p>
                <div className="grid grid-cols-3 gap-3  w-10/12 mx-auto">
                    {
                        allPhotos?.map(photo =>
                            <div key={photo?._id} className="">
                                <div onClick={() => handleDeleteImage(photo?._id)} className="text-4xl ">
                                    <MdDeleteForever className='text-red-700' />
                                </div>
                                <div className="avatar">
                                    <div className="rounded-xl">
                                        <img src={photo?.ImageUrl}  />

                                    </div>
                                </div>
                            </div>



                        )
                    }
                </div>

            </div>
        </>
    );
};

export default ManageStudentGallary;
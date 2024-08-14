import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import Swal from 'sweetalert2';
import AddStudentGallary from '../addStudentGallary/AddStudentGallary';
import AddCategory from './AddCategory';
import { useState } from 'react';
import { Grommet, Tab, Tabs } from 'grommet';
import toast from 'react-hot-toast';
import StudentGalleryTabs from './StudentGalleryTabs';
 
const ManageStudentGallary = () => {
    const axiosPublic = useAxiosPublic();
    const [categoryName, setCategoryName] = useState('All')
    const { data: studentGallery = [], refetch, isLoading } = useQuery({
        queryKey: ['studentGallery'],
        queryFn: async () => {
            const res = await axiosPublic.get('/studentGallery');
            return res.data;
        }
    })
    const { data: allCategory = [], refetch: allCategoryRefetch, isLoading: allCategoryIsLoading } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allCategory');
            return res.data;
        }
    })
    if (isLoading || allCategoryIsLoading) {
        return ''
    }
    const showingGallery = categoryName === 'All' ? studentGallery : studentGallery.filter(gallery => gallery?.category === categoryName)
    const handleDelete = (id) => {

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
                const toastId = toast.loading("Photo is deleting...");
                axiosPublic.delete(`/studentGallery/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            toast.success("Deleted Successfully!!", { id: toastId });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err?.message, { id: toastId });
                    })

            }
        });

    }

    
    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Student Gallery</title>
            </Helmet>
            <div className="bg-white p-5 mx-4 rounded-lg">
                <p className='text-2xl font-bold text-center'>Manage Student Gallery</p>
                <div className='grid md:grid-cols-2 gap-3'>
                    <AddStudentGallary refetch={refetch} studentGallery={studentGallery} handleDelete={handleDelete} allCategory={allCategory} />
                    <AddCategory allCategory={allCategory} allCategoryRefetch={allCategoryRefetch} />
                </div>
                <div className="mt-10">
                    <div className='w-full lg:w-[1000px] lg:max-w-[calc(100vw-400px)]'>
                       <div className=' pb-10'><StudentGalleryTabs tabName={categoryName} setTabName={setCategoryName} studentCategory={allCategory} /></div>
                    </div>
                    {
                        showingGallery?.length > 0 ? <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

                            {
                                showingGallery?.map(gallery => <div key={gallery?._id} className='w-full h-full relative'>

                                    <img className='w-full h-full rounded-2xl shadow-2xl' src={gallery?.image} alt="" />
                                    <button onClick={() => handleDelete(gallery?._id)} className='absolute top-4 right-4 size-7 rounded-md bg-red-500 hover:bg-red-600 flex justify-center items-center text-lg text-white active:scale-90 transition-all duration-300'><MdDelete /></button>
                                </div>)
                            }
                        </div> : <p className='p-5 text-center'>No Photo Found !!</p>
                    }
                </div>
            </div>
        </>
    );
};

export default ManageStudentGallary;
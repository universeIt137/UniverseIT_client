import React, { useState } from 'react';
import { FaRegCaretSquareRight } from 'react-icons/fa';
import { MdCategory, MdDelete } from 'react-icons/md';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import CourseTab from '../../../Shared/CourseTab/CourseTab';
import AdminCourseTab from './AdminCourseTab';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const CourseCategoryPage = () => {
    const [tabName, setTabName] = useState('All Courses')

    const axiosPublic = useAxiosPublic();

    const { data: categories = [], refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-category');
            return res.data;
        }
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const popularCategory = form.popularCategory.value;
        const data = { popularCategory };
        axiosPublic.post('/popular-category', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log('data added')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Category Added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()

                }
            })
            .catch()
        form.reset();
    }

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
                axiosPublic.delete(`/popular-category/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Category has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });

    }




    return (
        <div>
            <Helmet>
                <title>Universe IT | Add Popular Category</title>
            </Helmet>
            <div className="m-3">
                <p className="text-5xl text-primary">Add Popular Course Category</p>
                <form action="" className='my-5' onSubmit={handleSubmit}>
                    <div className="w-1/2">
                        <label className="input flex items-center gap-2">
                            <input type="text" className="grow" name='popularCategory' placeholder="Enter a popular category" />
                            <MdCategory />
                        </label>
                    </div>
                    <button className='btn bg-primary my-2 text-white'>Add Category</button>
                </form>
            </div>

            <div className="overflow-x-auto w-1/2 m-3 ">
                <table className="table  bg-white">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className='text-center'>Category Name</th>

                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((category, index) =>
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td className=' text-center'>{category.popularCategory}</td>
                                    <td className='text-2xl text-red-500'><button onClick={() => handleDelete(category._id)}><MdDelete /></button></td>
                                </tr>
                            )
                        }




                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default CourseCategoryPage;
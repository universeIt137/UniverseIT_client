import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete, MdUpdate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import TestimonialsTableRow from './TestimonialsTableRow';

const ManageTestimonialPage = () => { 
    const axiosPublic = useAxiosPublic();
    const { data: testimonials = [], refetch } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/testimonial');
            return res.data;
        }
    })

    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Testimonial</title>
            </Helmet>
            <div className="bg-white p-5 mx-4 rounded-lg">
                <p className='text-2xl font-bold text-center'>Manage Testimonial</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Image</th>
                                <th>Rating</th>
                                <th>Opinion</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                testimonials.map((testimonial, idx) => <TestimonialsTableRow key={idx} testimonial={testimonial} refetch={refetch} />)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageTestimonialPage;
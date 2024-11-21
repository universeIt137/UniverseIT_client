import React from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ManageFeedback = () => {
    const axiosPublic = useAxiosPublic();



    // Feedback student's data

    const { data: feedbacks = [], refetch } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/feedback');
            return res.data;
        }
    })

    const handleDelete = (feedback) => {
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
                axiosPublic.delete(`/feedback/${feedback._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Success feedback deleted from the database",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div className="bg-white p-5 rounded-lg w-full lg:w-[calc(100vw-300px)] mx-auto">
            <Helmet>
                <title>Dashboard | manage Feedback</title>
            </Helmet>
            <p className='text-2xl font-bold text-center'>Manage Feedbacks</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Image</th>
                            <th>Video</th>
                            <th>Youtube Video</th>
                            <th>Banner Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            feedbacks?.map((feedback, index) =>
                                <tr key={feedback._id}>
                                    <td>{index + 1}</td>
                                    <td>{feedback.name}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={feedback.image} alt={feedback.studentName} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <video
                                            src={feedback.video}
                                            controls
                                            className="w-32 h-20"
                                        />
                                    </td>
                                    <td className='text-blue-600 underline'>
                                    <Link to={`${feedback.youtube_link}`}>Youtube Link</Link>
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={feedback.banner} alt={feedback.studentName} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-2xl text-green-500'>
                                        <Link to={`/dashboard/update-feedback/${feedback._id}`}><MdEditSquare /></Link>
                                    </td>
                                    <td onClick={() => handleDelete(feedback)} className='text-2xl text-red-500 cursor-pointer'><MdDelete /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFeedback;
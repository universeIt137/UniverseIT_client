import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageSuccessStory = () => {
    const axiosPublic = useAxiosPublic();
    const { data: successStories = [], refetch } = useQuery({
        queryKey: ['successStory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    });

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
                <title>Dashboard | Manage Success Stories</title>
            </Helmet>
            <div className="bg-white p-5 rounded-lg w-full lg:w-[calc(100vw-300px)] mx-auto">
                <p className='text-2xl font-bold text-center'>Manage Success Stories</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Image</th>
                                <th>Video</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                successStories?.map((story, index) =>
                                    <tr key={story._id}>
                                        <td>{index + 1}</td>
                                        <td>{story.name}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={story.image} alt={story.studentName} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <video 
                                                src={story.video} 
                                                controls 
                                                className="w-32 h-20"
                                            />
                                        </td>
                                        <td>{story.description}</td>
                                        <td className='text-2xl text-green-500'>
                                            <Link to={`/dashboard/updateSuccessStory/${story._id}`}><MdEditSquare /></Link>
                                        </td>
                                        <td onClick={() => handleDelete(story)} className='text-2xl text-red-500 cursor-pointer'><MdDelete /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageSuccessStory;

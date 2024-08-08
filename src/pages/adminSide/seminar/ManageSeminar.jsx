import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const ManageSeminar = () => {
    const axiosPublic = useAxiosPublic();
    const { data: seminars = [], refetch } = useQuery({
        queryKey: ['seminars'],
        queryFn: async () => {
            const res = await axiosPublic.get('/seminar');
            return res.data;
        }
    })


    const handleDelete = (request) => {
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
                axiosPublic.delete(`/seminar/${request._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: " Request Deleted from database",
                                icon: "success"
                            });
                            refetch();
                    }
                })
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Seminar</title>
            </Helmet>
            <div className="bg-white p-5 mx-4 rounded-lg ">
                <p className='text-2xl font-bold text-center'>Seminar Requests</p>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Topic</th>
                                <th>Date</th>
                                <th>Time</th>
                                
                                
                              
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                seminars?.map((seminar, index) =>
                                    <tr key={seminar._id}>
                                        <td>{ index + 1 }</td>
                                        <td>{ seminar.topic }</td>
                                        <td>{ seminar.date }</td>
                                        <td>{ seminar.time }</td>
                                        
                                       
                                        
                                        <td className='text-2xl text-red-500'><button onClick={()=>handleDelete(seminar)}><MdDelete /></button></td>
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

export default ManageSeminar;
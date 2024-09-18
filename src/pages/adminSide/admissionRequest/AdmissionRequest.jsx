import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';

const AdmissionRequest = () => {
    const axiosPublic = useAxiosPublic();
    const { data: admissionRequests = [], refetch, isLoading } = useQuery({
        queryKey: ['admissionRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/admission');
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleRequest = (request) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.patch(`/admission/${request._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Admission request is accepted`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })


            }
        });


    }


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

                axiosPublic.delete(`/admission/${request._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Request Deleted from database",
                                icon: "success"
                            });
                            refetch();
                        }
                    })


            }
        });
    }


    return (
        <>
            <Helmet>
                <title>Dashboard | Admission</title>
            </Helmet>
            <div className="bg-white p-5 rounded-lg">
                <p className='text-2xl font-bold text-center'>Admission Requests</p>
                <div className="overflow-x-auto w-full lg:w-[calc(100vw-300px)]">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Gender</th>
                                <th>Contact No</th>
                                <th>Address</th>
                                <th>How you know</th>
                                <th>Confirm</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                admissionRequests?.map((request, index) =>
                                    <tr key={request._id}>
                                        <td>{index + 1}</td>
                                        <td>{request.name}</td>
                                        <td>{request.email}</td>
                                        <td>{request.course}</td>
                                        <td>{request.gender}</td>
                                        <td>{request.contact}</td>
                                        <td>{request.address}</td>
                                        <td>{request.website}</td>
                                        <td onClick={() => handleRequest(request)} className='text-xl text-green-600'>
                                            {request?.status ? <p className='text-sm text-green-600'>Confirmed</p> : <GiConfirmed />}
                                        </td>
                                        <td className='text-2xl text-red-500'>
                                            <button onClick={() => handleDelete(request)}><MdDelete /></button>
                                        </td>
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

export default AdmissionRequest;
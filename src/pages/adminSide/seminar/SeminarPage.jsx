import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';

const SeminarPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data: seminarRequests = [], refetch, isLoading } = useQuery({
        queryKey: ['seminarRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/seminarRequest');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
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
                axiosPublic.delete(`/seminarRequest/${request._id}`)
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
                console.log(request._id);
                axiosPublic.put(`/seminarRequest/${request._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Seminar request is confirmed`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })


            }
        });


    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Seminar</title>
            </Helmet>
            <div className="bg-white p-5 rounded-lg w-full lg:w-[calc(100vw-300px)] overflow-x-auto mx-auto">
                <p className='text-2xl font-bold text-center'>Seminar Requests</p>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Seminar Topic</th>

                                <th>WhatsApp No</th>
                                <th>Segment</th>
                                <th>Confirm</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                seminarRequests?.map((seminar, index) =>
                                    <tr key={seminar._id}>
                                        <td>{index + 1}</td>
                                        <td>{seminar.name}</td>
                                        <td>{seminar.email}</td>
                                        <td>{seminar.course}</td>

                                        <td>{seminar.whatsapp}</td>
                                        <td>{seminar.segment}</td>

                                        <td className='text-2xl text-green-600'><button onClick={() => handleRequest(seminar)}>
                                            {seminar?.status ? <p className='text-sm'>confirmed</p> : <GiConfirmed />}</button></td>
                                        <td className='text-2xl text-red-500'><button onClick={() => handleDelete(seminar)}><MdDelete /></button></td>
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

export default SeminarPage;
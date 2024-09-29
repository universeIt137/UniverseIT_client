import React from 'react';
import Loading from '../../../../Shared/Loading/Loading';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ManageJob = () => {

    const axiosPublic = useAxiosPublic();
    const { data: jobRequests = [], refetch, isLoading } = useQuery({
        queryKey: ['jobRequests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/apply-job');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
    }

    console.log(jobRequests);

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
                axiosPublic.delete(`/apply-job/${request._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Job Request Deleted from database",
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
                axiosPublic.put(`/apply-job/${request._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Job request is confirmed`,
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
                <title>Dashboard | Manage Application</title>
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
                                <th>Position</th>
                                <th>Phone No</th>
                                <th>Applicant CV</th>
                                <th>Confirm</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobRequests?.map((jobApply, index) =>
                                    <tr key={jobApply._id}>
                                        <td>{index + 1}</td>
                                        <td>{jobApply.fullName}</td>
                                        <td>{jobApply.position}</td>
                                        <td>{jobApply.mobileNo}</td>                                   
                                        <td>
                                            <Link target='_blank' to={jobApply.resume_link}>
                                                <button className='btn text-secondary'>CV link</button>
                                            </Link>
                                        </td>

                                        <td className='text-2xl text-green-600'><button onClick={() => handleRequest(jobApply)}>
                                            {jobApply?.status ? <p className='text-sm'>confirmed</p> : <GiConfirmed />}</button></td>
                                        <td className='text-2xl text-red-500'><button onClick={() => handleDelete(jobApply)}><MdDelete /></button></td>
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

export default ManageJob;
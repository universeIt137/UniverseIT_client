import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete, MdEditSquare, MdUpdate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading/Loading';

const ManageFacultyPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data: faculties = [], refetch, isLoading } = useQuery({
        queryKey: ['faculty'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faculty');
            return res.data;
        }
    })
if(isLoading){
    return <Loading/>
}


    const handleDelete = (faculty) => {
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

                axiosPublic.delete(`/faculty/${faculty._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Faculty Deleted from database",
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
                <title>Dashboard | Manage Faculty</title>
            </Helmet>
            <div className="bg-white p-5 rounded-lg w-full lg:w-[calc(100vw-300px)] mx-auto">
                <p className='text-2xl font-bold text-center'>Manage Faculty</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Image</th>
                                <th>Social Links</th>
                                <th>Contact No</th>
                                <th>Designation</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                faculties?.map((faculty, index) =>
                                    <tr key={faculty._id}>
                                        <td>{index + 1}</td>
                                        <td>{faculty.name}</td>
                                        <td>{faculty.email}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={faculty.image} />
                                                    </div>
                                                </div>
                                                <div>


                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{faculty.facebook}</p>
                                            <p>{faculty.whatsapp}</p>
                                            <p>{faculty.twitter}</p>
                                        </td>
                                        <td>{faculty.contact}</td>
                                        <td>{faculty.designation}</td>

                                        <td className='text-2xl text-green-500'>
                                            <Link to={`/dashboard/updateFaculty/${faculty?._id}`}><MdEditSquare /></Link>
                                        </td>
                                        <td onClick={() => handleDelete(faculty)} className='text-2xl text-red-500  cursor-pointer'><MdDelete /></td>
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

export default ManageFacultyPage;
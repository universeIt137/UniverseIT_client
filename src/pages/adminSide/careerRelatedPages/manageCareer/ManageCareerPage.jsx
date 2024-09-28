import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import CareerRow from './CareerRow';
import Swal from 'sweetalert2';
import TeamRow from '../../teamRelatedPages/manageMember/TeamRow';

const ManageCareerPage = () => {

    const axiosPublic = useAxiosPublic();
    const { data: careers = [], refetch, isLoading } = useQuery({
        queryKey: ['careers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/career');
            return res.data;
        }
    })
    if (isLoading) {
        return <Loading />
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
                axiosPublic.delete(`/career/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Career has been deleted.",
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
        <>
            <Helmet>
                <title>Dashboard | Manage Careers</title>
            </Helmet>
            <div className="pb-20">
                <div className="bg-white rounded-lg  w-full lg:w-[calc(100vw-300px)] overflow-x-auto mx-auto overflow-y-auto">
                    <p className="text-2xl font-bold text-center py-2">Manage Careers</p>
                    <table className="table table-zebra overflow-x-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Employee ID</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                careers?.map((career, index) => <CareerRow career={career} index={index} handleDelete={handleDelete} key={index} />
                                )
                            }



                        </tbody>


                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageCareerPage;
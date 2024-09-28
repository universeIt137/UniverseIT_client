import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Editor } from '@tinymce/tinymce-react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { uploadImg } from '../../../../UploadFile/uploadImg';
import Loading from '../../../../Shared/Loading/Loading';

const UpdateMember = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: memberData = {}, refetch, isLoading } = useQuery({
        queryKey: ['memberData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/team-member/${id}`)
            return res?.data
        }
    })

    const { firstName: incomingFirstName, lastName: incomingLastName, position: incomingPosition, email: incomingEmail, phone: incomingPhone, memberImageUrl: incomingMemberImageUrl } = memberData;
    console.log(memberData);


    if (isLoading) {
        return <Loading />
    }





    const handleSubmit = async (event) => {

        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const position = form.position.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const memberImage = form.memberImg.files[0];

        let memberImageUrl = incomingMemberImageUrl
        if (!memberImage?.name) {

            memberImageUrl = incomingMemberImageUrl
        } else {
            memberImageUrl = await uploadImg(memberImage);
        }

        const data = { firstName, lastName, position, email, phone, memberImageUrl };

        console.log(data);

        axiosPublic.put(`/team-member/${id}`, data)
            .then(res => {
                console.log(res.data)

                if (res.data.modifiedCount) {
                    console.log('data updated')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Member data has been Updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()

                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        form.reset();
    }

    return (
        <>
            <Helmet>
                <title>Dashboard | Update Member</title>
            </Helmet>
            <div className='m-4 lg:w-3/5'>
                <p className='text-4xl mb-4'>Update Existing Employee</p>
                <form onSubmit={handleSubmit} className="">
                    {/* first name, last name  */}
                    <div className="lg:flex gap-10">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" defaultValue={memberData.firstName} name='firstName' placeholder="Enter First Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" defaultValue={memberData.lastName} name="lastName" placeholder="Enter Last Name" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* job description  */}
                    <div className="lg:flex gap-10">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Job Position</span>
                            </label>
                            <input type="text" defaultValue={memberData.position} name='position' placeholder="Enter Job position" className="input input-bordered" required />
                        </div>

                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Employee ID</span>
                            </label>
                            <input type="text" defaultValue={memberData.employeeID} name='employeeID' placeholder="Enter Email Address" className="input input-bordered" required />
                        </div>
                    </div>

                    {/* email, phone  */}
                    <div className="lg:flex gap-10">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" defaultValue={memberData.email} name='email' placeholder="Enter Email Address" className="input input-bordered" required />
                        </div>
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" defaultValue={memberData.phone} placeholder="Enter Phone Number" name='phone' className="input input-bordered" required />
                        </div>
                    </div>

                    {/* image upload */}
                    <div className="p-2 Lg:w-1/2">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-600 font-bold">Member Image</label><br />
                            <input type="file" name='memberImg' className="file-input file-input-bordered file-input-md w-full max-w-xs" />
                        </div>
                    </div>

                    <div className="form-control mt-6 lg:w-1/4">
                        <button className="btn bg-primary text-white">Update Member</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateMember;
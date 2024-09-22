import React from 'react';
import { uploadImg } from '../../../../UploadFile/uploadImg';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AddMember = () => {

    const axiosPublic = useAxiosPublic();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const position = form.position.value;
        const employeeID = form.employeeID.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const memberImage = form.memberImg.files[0];


        let memberImageUrl = '';
        if (!memberImage?.name) {
            memberImageUrl = ''
        } else {
            memberImageUrl = await uploadImg(memberImage);
        }

        const data = { firstName, lastName, position, employeeID, email, phone, memberImageUrl };
        console.log(data);

        axiosPublic.post('/team-member', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log('data added')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New Member Added",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
            .catch()
        form.reset();
    }
    return (
        <>
             <Helmet>
                <title>Dashboard | Add Employee</title>
            </Helmet>
            <div className='m-4 lg:w-3/5'>



                <p className='text-4xl'>Add New Employee</p>
                <form onSubmit={handleSubmit} className="">
                    {/* first name, last name  */}
                    <div className="lg:flex gap-10">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" name='firstName' placeholder="Enter First Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" name="lastName" placeholder="Enter Last Name" className="input input-bordered" required />
                        </div>
                    </div>
                    {/* job description  */}
                    <div className="lg:flex gap-10">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Job Position</span>
                            </label>
                            <input type="text" name='position' placeholder="Enter Job position" className="input input-bordered" required />

                        </div>

                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Employee ID</span>
                            </label>
                            <input type="text" name='employeeID' placeholder="Enter Email Address" className="input input-bordered" required />
                        </div>
                    </div>

                    {/* email, phone  */}
                    <div className="lg:flex gap-10">
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Enter Email Address" className="input input-bordered" required />
                        </div>
                        <div className="form-control lg:w-1/2">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" placeholder="Enter Phone Number" name='phone' className="input input-bordered" required />
                        </div>
                    </div>

                    {/* image upload */}
                    <div className="p-2 w-full">
                        <div className="relative">
                            <label className="leading-7 text-sm text-gray-600 font-bold">Blog Banner Image</label><br />
                            <input type="file" name='memberImg' className="file-input file-input-bordered file-input-md w-full max-w-xs" />
                        </div>
                    </div>



                    <div className="form-control mt-6 lg:w-1/4">
                        <button className="btn bg-primary text-white">Add Member</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddMember;
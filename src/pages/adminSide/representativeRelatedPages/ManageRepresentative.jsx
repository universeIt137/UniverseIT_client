import React, { useState } from 'react';
import RepresentativeTable from './RepresentativeTable';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { uploadImg } from '../../../UploadFile/uploadImg';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ManageRepresentative = () => {

    const axiosPublic = useAxiosPublic();

    const { data: contents = [], refetch } = useQuery({
        queryKey: ['all dta'],
        queryFn: async () => {
            const res = await axiosPublic.get('/representative');
            return res.data;
        }
    })




    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const representativeID = form.representativeID.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const institute = form.institute.value;
        const division = form.division.value;
        const district = form.district.value;
        const semester = form.semester.value;
       
        const image = form.image.files[0];
       




        let ImageUrl = ''
        if (!image?.name) {
            ImageUrl = ''
        } else {
            ImageUrl = await uploadImg(image);

        }

        

        setLoading(true);

        // Simulate form submission
        try {
            const data = { name, representativeID, phone, email, institute, division, district, ImageUrl, semester }

            console.log(data);
            axiosPublic.post(`/representative`, data)
                .then(res => {
                    if (res) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Data has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })

        } catch (error) {
            console.error("Error submitting form:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="w-10/12 mx-auto p-4">
                <Helmet>
                    <title>Dashboard | Manage Representative</title>
                </Helmet>
                <h2 className="text-2xl font-semibold mb-4">Upload Representative Info</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {loading && <p className="text-blue-500">Uploading data...</p>}

                    <div className="grid lg:grid-cols-3 gap-4">
                        <div className="">
                            <label htmlFor="name">Name</label>
                            <input type="text" required name="name" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        <div className="">
                            <label htmlFor="name">Representative ID</label>
                            <input type="text" required name="representativeID" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Phone</label>
                            <input type="text" required name="phone" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Email</label>
                            <input type="email" name="email" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Instittue</label>
                            <input type="text" name="institute" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">Division</label>
                            <input type="text"  name="division" className="w-full px-4 py-2 border rounded-md" />
                        </div>

                        <div className="">
                            <label htmlFor="name">District</label>
                            <input type="text" name="district" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        
                        <div className="">
                            <label htmlFor="name">Semester</label>
                            <input type="text" name="semester" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        

                        <div className=" w-full">
                            <div className="relative">
                                <p>Upload  Picture</p>
                                <input type="file" name='image' className="file-input file-input-bordered file-input-md w-full " placeholder="Upload website logo" />
                            </div>


                        </div>

                        {/* Video */}
                        

                    </div>

                    
                    <div className="w-1/4 mx-auto">
                        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
                            {loading ? "Uploading..." : "Submit"}
                        </button>
                    </div>
                </form>


            </div>
            <RepresentativeTable contents={contents} refetch={refetch} ></RepresentativeTable>
        </div>
    );
};

export default ManageRepresentative;
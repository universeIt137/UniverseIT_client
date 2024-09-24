import React, { useState } from 'react';
import { IoDocumentTextOutline } from 'react-icons/io5';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const ApplicationPage = () => {
    window.scrollTo(0, 0);

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();


    const { data: career = {}, refetch: blogDataRefetch, isLoading } = useQuery({
        queryKey: ['career', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/career/${id}`)
            return res?.data
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const linkedInProfile = form.linkedInProfile.value;
        const portfolio = form.portfolio.value;
        const resume = form.resume.value;
        const coverLetter = form.coverLetter.value;
        const position = form.position.value;
        const technicalSkills = form.technicalSkills.value;
        const previous_job = form.previous_job.value;
        const previous_company = form.previous_company.value;
        const start_date = form.start_date.value;
        const end_date = form.end_date.value;
        const description = form.description.value;
        const degree = form.degree.value;
        const institution = form.institution.value;
        const graduation_year = form.graduation_year.value;
        const reference_name = form.reference_name.value;
        const reference_no = form.reference_name.value;
        const reference_relationship = form.reference_relationship.value;
        const availability = form.availability.value;
        const salaryExpectations = form.salaryExpectations.value;

        const data = { fullName, email, phoneNumber, address, linkedInProfile, portfolio, resume, coverLetter, position, technicalSkills, previous_job, previous_company, start_date, end_date, description, degree, institution, graduation_year, reference_name, reference_no, reference_relationship, availability, salaryExpectations };
        console.log(data);

        axiosPublic.post('/apply-job', data)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    console.log('data added')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application Submitted",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
            .catch()
        form.reset();
    };

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">

                    <div className="flex flex-col gap-5 lg:flex-row bg-blue-950 py-5 px-3 items-center justify-between mb-6">
                        <h1 className="text-[10px] lg:text-3xl p-3 rounded-lg flex bg-secondary items-center gap-1 font-bold text-white"><IoDocumentTextOutline /><span>Job Application Form </span>( {career.position} )</h1>
                        <img src='https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723544696/UniverseIT/Logo/xvlfi7xrapeoabxyzjji.png' alt="Company Logo" className="h-12" /> {/* Adjust height as needed */}
                    </div>
                    {/* Basic Info Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Full Name*</label>
                            <input
                                type="text"
                                name="fullName"

                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Email*</label>
                            <input
                                type="email"
                                name="email"

                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Phone Number*</label>
                            <input
                                type="text"
                                name="phoneNumber"

                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Address*</label>
                            <input
                                type="text"
                                name="address"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">LinkedIn Profile*</label>
                            <input
                                type="url"
                                name="linkedInProfile"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Portfolio</label>
                            <input
                                type="url"
                                name="portfolio"

                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Resume* (Drive URL)</label>
                            <input
                                type="url"
                                name="resume"

                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Cover Letter (Drive URL)</label>
                            <input
                                type="url"
                                name="coverLetter"

                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    {/* Technical Skills */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Job Position</label>
                            <input
                                type="text"
                                name="position"
                                value={career.position}
                                readOnly
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Technical Skills* (comma separated)</label>
                            <input
                                type="text"
                                name="technicalSkills"

                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>


                    {/* Work Experience Section */}
                    <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
                    <div className="mb-6 border rounded p-4 border-gray-300 bg-gray-50">
                        <h3 className="font-bold mb-2">Experience </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    name="previous_job"
                                    className="w-full p-2 border border-gray-300 rounded-md"

                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="previous_company"
                                    className="w-full p-2 border border-gray-300 rounded-md"

                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                                <label className="block text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    name="start_date"
                                    className="w-full p-2 border border-gray-300 rounded-md"

                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">End Date</label>
                                <input
                                    type="date"
                                    name="end_date"
                                    className="w-full p-2 border border-gray-300 rounded-md"

                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label className="block text-gray-700 mb-1">Description</label>
                            <textarea
                                name='description'
                                className="w-full p-2 border border-gray-300 rounded-md"

                            />
                        </div>
                    </div>

                    {/* Education Section */}
                    <h2 className="text-xl font-semibold mb-4">Education</h2>
                    <div className="mb-6 border rounded p-4 border-gray-300 bg-gray-50">
                        <h3 className="font-bold mb-2">Last Educational Qualification*</h3>
                        <div>
                            <label className="block text-gray-700 mb-1">Degree*</label>
                            <input
                                type="text"
                                name="degree"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Institution*</label>
                            <input
                                type="text"
                                name="institution"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Graduation Year*</label>
                            <input
                                type="number"
                                name="graduation_year"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    {/* References Section */}
                    <h2 className="text-xl font-semibold mb-4">References</h2>
                    <div className="mb-6 border rounded p-4 border-gray-300 bg-gray-50">
                        <h3 className="font-bold mb-2">Reference </h3>
                        <div>
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="reference_name"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Contact Info</label>
                            <input
                                type="text"
                                name='reference_no'
                                className="w-full p-2 border border-gray-300 rounded-md"
                                
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Relationship</label>
                            <input
                                type="text"
                                name='reference_relationship'
                                className="w-full p-2 border border-gray-300 rounded-md"
                                
                            />
                        </div>
                    </div>



                    {/* Availability & Salary Expectations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Availability*</label>
                            <input
                                type="text"
                                name="availability"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Salary Expectations*</label>
                            <input
                                type="number"
                                name="salaryExpectations"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-4 bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary transition duration-300"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ApplicationPage;
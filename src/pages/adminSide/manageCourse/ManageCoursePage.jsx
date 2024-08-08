import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GiConfirmed } from 'react-icons/gi';
import { MdDelete, MdEditSquare, MdUpdate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CourseRow from './CourseRow';
 
const ManageCoursePage = () => {

    const axiosPublic = useAxiosPublic();
    const { data: courses = [], refetch: coursesRefetch } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })
    console.log(courses);
    const objectives = "6000tk";

    return (
        <>
            <Helmet>
                <title>Dashboard | Manage Testimonial</title>
            </Helmet>
            <div className="bg-white p-5 mx-4 rounded-lg lg:w-[calc(100vw-300px)] overflow-x-auto">
                <p className='text-2xl font-bold text-center'>Manage Courses</p>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                           
                            <tr>
                                <th className='sticky left-0 bg-white z-10'>#</th>
                                <th className='sticky left-7 bg-white z-10'>Course Name</th>
                                <th>Course Image</th>
                                <th>Course Fee</th>
                                <th>Category</th>
                                <th>Notice</th>
                                <th>Admission Notice</th>
                                <th>Bangla</th>
                                <th>Main Video</th>
                                <th>Sub Videos</th>
                                <th>Manage Durations</th>
                                <th>Manage Semester</th>
                                <th>Manage Objective</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                courses?.map((course, idx) => <CourseRow key={idx} course={course} idx={idx} coursesRefetch={coursesRefetch} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageCoursePage;
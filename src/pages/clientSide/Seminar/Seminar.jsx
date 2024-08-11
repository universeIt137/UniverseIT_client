import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Seminar = () => {
    const axiosPublic = useAxiosPublic();
    const { data: seminars = [] } = useQuery({
        queryKey: ['seminars'],
        queryFn: async () => {
            const res = await axiosPublic.get('/seminar');
            return res.data;
        }
    })


    return (
        <div className='flex flex-col justify-center max-w-[100vw] overflow-hidden'>
            <Helmet>
                <title>Universe IT | Seminar</title>
            </Helmet>
            <div className='w-full'>
                <p className='text-xl lg:text-4xl text-center p-5 font-bold shadow-xl'>Free Seminar/counselling</p>

            </div>

            <div className='lg:mx-auto pb-20 '>
                <div className="max-w-[100vw] overflow-x-auto">
                    <table className="table-auto ml-4 lg:ml-0 mr-12 lg:mr-0  border-collapse border border-gray-400">
                        <thead className='bg-primary text-white text-[12px] lg:text-xl lg:font-bold'>
                            <tr>
                                <th className="px-2 sm:px-4 py-2  border border-gray-400">
                                    Topics
                                </th>
                                <th className="px-2 sm:px-4 py-2  border border-gray-400">
                                    Date
                                </th>
                                <th className="px-2 sm:px-4 py-2  border border-gray-400">
                                    Time
                                </th>
                                <th className="px-2 sm:px-4 py-2  border border-gray-400">
                                    Link
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                seminars?.map(seminar =>
                                    <tr key={seminar._id}>
                                        <td className="px-2 sm:px-4 py-2 border border-gray-400 text-[9px] lg:text-sm sm:text-base">
                                            {seminar.topic}

                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border border-gray-400 text-[9px] lg:text-sm sm:text-base">
                                            {seminar.date}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border border-gray-400 text-[9px] lg:text-sm sm:text-base">
                                            {seminar.time}
                                        </td>

                                        <td className="px-2 sm:px-4 py-2 border-b text-blue-500 border-gray-400">
                                            <Link to={`/seminarForm/${seminar._id}`}><button className='bg-primary text-white lg:px-5 lg:py-1.5 rounded-md active:scale-90 transition-all duration-300 font-medium mx-auto hover:bg-gray-500 text-[10px] lg:text-xl'>Apply Now</button></Link>
                                        </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Seminar;
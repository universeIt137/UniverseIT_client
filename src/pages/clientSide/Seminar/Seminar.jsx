import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { useState } from "react";
import ButtonStrong from "../../../Shared/Button/ButtonStrong";
import seminarBanner from '../../../assets/banner/seminarBanner.jpg'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from '../../../Shared/Loading/Loading';

const Seminar = () => {
    const [seeMore, setSeeMore] = useState(false)
    const axiosPublic = useAxiosPublic()

    const { data: allSeminar = [], isLoading } = useQuery({
        queryKey: ['seminar'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/seminar`)
            return res?.data
        }
    })
    if (isLoading) {
        return <Loading />
    }
    const weekDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const returnDate = (date) => {
        const months = ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', ' July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const newDate = new Date(date).getDate()
        const month = new Date(date).getMonth()
        const year = new Date(date).getFullYear().toString()
        return <>
            <span className="text-xl sm:text-2xl font-bold">{newDate}</span>
            <span className="text-sm lg:text-base font-bold text-primary">
                {months[month]}, {year[2]}{year[3]}
            </span>
        </>
    }
    const returnTime = (time) => {
        const [hour, minutes] = time.split(':');
        const useableTime = hour % 12 || 12;
        const theAbbreviation = hour < 12 || hour === 24 ? 'AM' : 'PM';
        return `${useableTime}:${minutes} ${theAbbreviation}`;
    }


    return (

        <>

            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto py-10 px-1 sm:px-5 gap-5">
                    <div className="space-y-10 border p-1 sm:p-8 bg-white rounded-xl w-full mx-auto">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-5xl font-bold text-text_color">Free Seminar Schedule</h2>

                        </div>
                        <div className="py-5 spa;ce-y-5 border p-1 sm:p-8 rounded-xl mdw-2/3 mx-auto">
                            <div className={`space-y-4 ${seeMore ? 'max-h-[5000px]' : 'max-h-[300px]'} overflow-hidden transition-all duration-500`}>
                                {
                                    allSeminar?.map((seminar, idx) => <div className="w-full hover:duration-700 hover:shadow-lg bg-primary/35 rounded-xl flex overflow-hidden gap-3" key={idx}>
                                        <p className="flex flex-col min-w-max max-w-max justify-center items-center pl-5 pr-2 sm:pr-4">
                                            {returnDate(seminar?.date)}
                                        </p>
                                        <div className="w-full h-full border bg-white py-5 rounded-xl flex justify-between items-center flex-wrap gap-3 pl-3 sm:pl-5 pr-5 sm:pr-10">
                                            <div>
                                                <h2 className="text-sm sm:text-base font-bold">{seminar?.topic}</h2>
                                                <p className="text-xs sm:text-sm font-medium">{weekDays[new Date(seminar?.date).getDay()] || 0} | Time: {returnTime(seminar?.time)}</p>
                                            </div>
                                            <Link to={`/seminarForm/${seminar?._id}`}><ButtonStrong text={'Register Now'} /></Link>
                                        </div>

                                    </div>)
                                }
                            </div>
                            <div className="flex">
                                <div className="w-max" onClick={() => setSeeMore(!seeMore)}>
                                    <ButtonStrong text={seeMore ? 'View Less' : 'View All'} /></div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Seminar;
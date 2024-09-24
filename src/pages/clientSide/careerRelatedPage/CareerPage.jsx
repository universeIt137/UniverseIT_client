import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import BlogCard from '../blog/BlogCard';
import { Helmet } from 'react-helmet-async';
import CareerCard from './CareerCard';

const CareerPage = () => {
    window.scrollTo(0, 0);
   
    const axiosPublic = useAxiosPublic();
    const { data: careers = [], refetch, isLoading } = useQuery({
        queryKey: ['careers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/career');
            return res.data;
        }
    });
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='sm:px-20 px-5 my-10 min-h-screen'>
            <Helmet>
                <title>Universe IT | Career</title>
            </Helmet>
            <p className="text-4xl m-10"><span className='text-primary border-b-2'>Job</span> Opportunity</p>

            <div className='flex gap-10 flex-col'>
                {
                    careers.map((career, idx) => <CareerCard key={idx} career={career}></CareerCard>)
                }
            </div>

        </div>
    );
};

export default CareerPage;
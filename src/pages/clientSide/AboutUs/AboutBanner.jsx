import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AboutBanner = () => {

    const axiosPublic = useAxiosPublic()
    const { data: homepageContent = [], refetch: homepageContentRefetch, isLoading } = useQuery({
        queryKey: ['homepageContent'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homepageContent')
            return res?.data
        }
    })

    console.log(homepageContent);
    const {
        title: incomingTitle,
        imageUrl: incomingImageUrl,
        subtitle: incomingSubtitle,
        aboutTitle: incomingAboutTitle,
        aboutSubTitle: incomingAboutSubTitle,
        aboutdesc: incomingAboutDesc,
        video_url: incomingVideo_url,
        milestoneImage: incomingMilestoneImg,
        seminarImage: incomingFreeSeminarImg,
        servicesImage: incomingServicesImg, // Added
        aboutImage: incomingAboutImg // Added
    } = homepageContent[0] || [];


    return (
        <>
            <div className='md:flex justify-between max-w-7xl mx-auto px-5 gap-4 mt-10 pb-10'>
                <div className=' md:w-1/2'>
                    <div className='text-center md:text-left'>
                        <p className='text-primary text-2xl font-bold'>{ incomingAboutSubTitle }</p>
                        <p className='md:text-5xl font-bold'>{ incomingAboutTitle }</p>

                        <p className='md:py-10 md:text-xl'>
                            {incomingAboutDesc}
                        </p>
                    </div>

                    <div className="w-max mx-auto md:mx-0 ">
                        <Link to="/courses">
                            <button className="text-sm sm:text-base bg-primary text-white hover:bg-text_color px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-medium">Browse Courses </button>
                        </Link>
                    </div>

                </div>
                <div className='md:w-1/2 mt-5'>
                    <img src={incomingAboutImg} className='rounded-2xl' alt="" />
                </div>
            </div>
        </>
    );
};

export default AboutBanner;
import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import Marquee from "react-fast-marquee";
import Share from './Share';
import { useParams } from 'react-router-dom';
import CourseDetailsTab from './CourseDetailsTab';
import SuccessStories from '../../../components/clientSide/SuccessStories/SuccessStories';
import BannerSection from './BannerSection';
import SubVideos from './SubVideos';
import SuccessStory from './SuccessStory';
import RelatedCourse from './RelatedCourse';

const CourseDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams()

    const { data: courseData = {}, isLoading } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/${id}`);
            return res?.data;
        }
    })

    const { title, subtitle, videoUrl, bannerImages, subVideos, notice, bangla, admissionNotice, courseFee,  } = courseData;


    return (
        <section className='w-11/12 mx-auto'>
            {/* banner */}
            <BannerSection courseData={courseData} />

            {/* sub video and success story  */}
            <section className='flex flex-col lg:flex-row gap-6 my-5'>
                <div className='lg:w-4/6'>

                    <div className="p-5 bg-white rounded-2xl z-10 relative">
                        <div className="flex justify-between flex-col sm:flex-row">
                            <p className="lg:text-4xl font-bold py-5">Course Details</p>
                            <div className="w-full md:w-max flex justify-end items-end"><Share /></div>
                        </div>
                        <CourseDetailsTab></CourseDetailsTab>

                    </div>
                </div>
                <div className='lg:w-1/3 rounded-xl'>
                    <SuccessStory />
                    <RelatedCourse />
                </div>
            </section>
        </section>


    );
};

export default CourseDetails;
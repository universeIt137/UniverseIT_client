import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import Marquee from 'react-fast-marquee';
import BannerSection from './BannerSection';
import SubVideoSection from './SubVideoSection';
import RelatedCourseSection from './RelatedCourseSection';


const CourseDetails = () => {
    const axiosPublic = useAxiosPublic();

    const { data: courseData = {}, isLoading } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/course/66939bd52f063a96b809d3b0`);
            return res?.data;
        }
    })

    const { title, subtitle, videoUrl, bannerImages, subVideos, notice, bangla, admissionNotice, courseFee } = courseData;

    const videoDivStyle = 'rounded-md overflow-hidden k w-[230px] h-[130px]';
    const titleStyle = 'text-black font-medium py-1 max-w-[230px]';

    return (
        <section className='w-11/12 mx-auto'>
            {/* banner */}
            <BannerSection></BannerSection>

            {/* sub video and success story  */}
            <SubVideoSection subVideos={subVideos} videoDivStyle={videoDivStyle} titleStyle={titleStyle}></SubVideoSection>

            {/* Related course Section  */}
            <RelatedCourseSection></RelatedCourseSection>

        </section>
    );
};

export default CourseDetails;
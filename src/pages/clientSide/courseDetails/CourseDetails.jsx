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
import CourseDetailsPageSubVideos from './CourseDetailsPageSubVideos';
import SuccessStory from './SuccessStory';
import RelatedCourse from './RelatedCourse';
import Loading from '../../../Shared/Loading/Loading';

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

    // successful student's data

    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/successStory');
            return res.data;
        }
    })

    

    // Filter success stories based on course_id
    const filteredSuccessStories = stories.filter(story => story.course_id === id);


    if (isLoading) {
        return <Loading />
    }

    // console.log(filteredSuccessStories);

    return (
        <section className='px-3 mx-auto'>
            {/* banner */}
            <BannerSection filteredSuccessStories={filteredSuccessStories} courseData={courseData} />

            {/* sub video and success story  */}
            <section className='flex flex-col lg:flex-row gap-6 my-5'>
                <div className='lg:w-4/6'>


                </div>
                <div className='lg:w-1/3 rounded-xl'>

                </div>
            </section>
        </section>


    );
};

export default CourseDetails;
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import BannerSection from './BannerSection';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const CourseDetails = () => {
    const axiosPublic = useAxiosPublic();
    const { id } = useParams()

    const { data: courseData = {}, isLoading } = useQuery({
        queryKey: ['course', id],
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
            <Helmet>
                <title>Universe IT | Course Details</title>
            </Helmet>
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
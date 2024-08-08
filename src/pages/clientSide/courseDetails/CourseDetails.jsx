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
            const res = await axiosPublic.get(`/course/66b34a0dac872b90572f77aa`);
            return res?.data;
        }
    })

    const { title, subtitle, videoUrl, bannerImages, subVideos, notice, bangla, admissionNotice, courseFee } = courseData;
    console.log(subVideos);

    const videoDivStyle = 'rounded-md overflow-hidden k w-[230px] h-[130px]';
    const titleStyle = 'text-black font-medium py-1 max-w-[230px]';

    return (
        <section className='w-11/12 mx-auto'>
            {/* banner */}
            <BannerSection></BannerSection>

            {/* sub video and success story  */}
            <section>
            <section className='flex flex-col lg:flex-row my-5 gap-1 md:gap-5'>
                    <div className='lg:w-3/4 bg-white rounded-xl'>
                        
                    {/* four related video  */}

                    <div className="relative hidden  mr-3 lg:flex pt-10 z-10">
                        <Marquee pauseOnHover={true}>
                            <div className="flex gap-10 pr-10">
                                {
                                    subVideos?.map((video, idx) => <div key={idx}>
                                        <div className={`${videoDivStyle}`}>
                                            <ReactPlayer
                                                controls="true"

                                                url={video?.url}
                                                width="100%"
                                                height='100%'
                                            />
                                        </div>

                                        <p className={`${titleStyle}`}>{video?.title}</p>
                                    </div>)
                                }
                            </div>
                        </Marquee>

                    </div>
                </div>

                {/* card */}
                <div className='w-auto lg:w-1/4 rounded-xl'>

                    <div className="card bg-white pt-5 pb-12 px-5">
                        <div className='flex justify-between items-center mb-4 font-bold'>
                            <p className='text-xl'>Success Story</p>
                            <p className='text-yellow-500'>See more</p>
                        </div>
                        <div className="relative z-10 lg:mx-auto w-full shadow-xl border rounded-2xl p-1 bg-black">
                            <ReactPlayer
                                controls="true"
                                playing={false}
                                url='https://www.youtube.com/watch?v=hqCcnboWN60'
                                width="100%"
                                height="100%"
                            />
                        </div>
                        
                    </div>
                </div>
            </section>
            </section>

            {/* Related course Section  */}
            <RelatedCourseSection></RelatedCourseSection>

        </section>
    );
};

export default CourseDetails;
import React, { useState } from 'react';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { Link } from 'react-router-dom';
import CourseCard from '../../../components/clientSide/Courses/CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import CourseTab from '../../../Shared/CourseTab/CourseTab';
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import MemberCard from './MemberCard';

const TeamMember = () => {

    const axiosPublic = useAxiosPublic()
    const [tabName, setTabName] = useState('All Courses')




    const { data: members = [], isLoading } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosPublic.get('/team-member');
            return res.data;
        }
    })

    console.log(members);




    return (
        <div className="bg-gray-100">
            <div className=" py-10 pb-20 sm:pb-10 space-y-5 max-w-7xl mx-auto">
                <ComponentsTitle title={'Our Passionate Team Members'} description={'Meet our dedicated team of experts who are passionate about delivering exceptional results.'} />
                <div className="px-5 space-y-10">
                   
                    <div className="sm:px-16">
                        <div className="relative">
                            <div className="absolute w-full flex sm:justify-between h-full items-end justify-center sm:items-center top-14 gap-7 sm:top-0">
                                <div className="courses-prev-btn text-xl p-2 sm:p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90 "><GrFormPrevious /></div>
                                <div className="courses-next-btn text-xl p-2 sm:p-3 rounded-full  cursor-pointer bg-primary/40 shadow-2xl hover:bg-primary/50 transition-all duration-100 active:scale-90"><GrFormNext /></div>
                            </div>
                            <div className="sm:px-16">
                                <Swiper
                                    navigation={{
                                        nextEl: '.courses-next-btn',
                                        prevEl: '.courses-prev-btn',
                                    }}
                                    modules={[Navigation]}
                                    spaceBetween={0}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 1,
                                        },
                                        890: {
                                            slidesPerView: 2,
                                        },
                                        1280: {
                                            slidesPerView: 3,
                                        },
                                    }}


                                    speed={300}
                                    className=""
                                >
                                    {
                                        members?.map((member, idx) => <SwiperSlide key={idx} className="">
                                            <MemberCard member={ member } />
                                        </SwiperSlide>)
                                    }

                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center -mt-5">
                <Link to={'/team-members'}>
                    <div className="w-max">
                        <ButtonStrong text={'View All'} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default TeamMember;
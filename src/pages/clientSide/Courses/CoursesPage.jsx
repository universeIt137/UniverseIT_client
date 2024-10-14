
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle'
import CourseCard from '../../../components/clientSide/Courses/CourseCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react'
import { IoFilter, IoFilterOutline } from "react-icons/io5";
import Rating from 'react-rating'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { FaChevronDown } from "react-icons/fa";
import { Helmet } from 'react-helmet-async'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import CourseTab from '../../../Shared/CourseTab/CourseTab';
import CoursesRadioStyle from './CoursesRadioStyle';
import Share from '../courseDetails/Share';
import Loading from '../../../Shared/Loading/Loading';
import FilterDrawer from './FilterDrawer';
const CoursesPage = () => {
    const axiosPublic = useAxiosPublic();
    const [tabName, setTabName] = useState('All Courses')

    const { data: popularCategories = [], refetch, isLoading: isLoadingPopular } = useQuery({
        queryKey: ['popularCategories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-category');
            return res.data;
        }
    })

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })



    if (isLoading || isLoadingPopular) {
        return <Loading />
    }



    const filteredCourse = tabName === 'All Courses'
        ? courses
        : courses?.filter(course =>
            course?.category === tabName || course?.popularCategory === tabName
        );
    return (
        <>
            <Helmet>
                <title>Universe IT | Courses</title>
            </Helmet>
            <div className="bg-gray-100 ">
                <div className=" py-2 max-w-7xl mx-auto">

                    <div className='flex gap-5'>
                        <div className='min-w-[240px] bg-white hidden md:block rounded-sm overflow-hidden '>

                            <div className='px-2'><Share isCoursePage={true} /></div>
                            <div className='p-5 space-y-2'>
                                <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'All Courses'} />
                                <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'Online'} />
                                <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'Offline'} />
                                <CoursesRadioStyle tabName={tabName} setTabName={setTabName} name={'Corporate'} />

                            </div>

                            <div className='p-5 space-y-2'>
                                <p className='font-semibold'>Search By Popular Courses</p>
                                {
                                    isLoading ? <Loading /> :
                                        popularCategories.map((category, idx) =>

                                            <CoursesRadioStyle key={idx} tabName={tabName} setTabName={setTabName} name={`${category.popularCategory}`} />

                                        )

                                }

                            </div>
                        </div>
                        <div>
                            <ComponentsTitle title={'Our Demanding Courses'} description={'Elevate your skills with our demanding courses designed to push your boundaries and unlock your full potential.'} />
                            <div className='flex items-center gap-2'>
                                <CourseTab setTabName={setTabName} tabName={tabName} isCoursePage={true} />
                                <div className='w-full block md:hidden'><FilterDrawer tabName={tabName} setTabName={setTabName} isLoading={isLoading} popularCategories={popularCategories} /></div>
                            </div>
                            <div className=' grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-10  gap-5 md:gap-x-10 pt-10 px-5'>
                                {
                                    filteredCourse?.map((course, idx) => <CourseCard key={idx} course={course} isCoursePage={true} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoursesPage;

import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle'
import CourseCard from '../../../components/clientSide/Courses/CourseCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react'
import { IoFilter } from "react-icons/io5";
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
const CoursesPage = () => {
    const axiosPublic = useAxiosPublic();
    const [tabName, setTabName] = useState('All Courses')

    const { data: popularCategories = [], refetch } = useQuery({
        queryKey: ['popularCategories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular-category');
            return res.data;
        }
    })

    console.log(popularCategories);
    
    const popularCategory = [{ "name": 'Digital Marketing' }, { "name": 'Web Development' }, { "name": 'App Development' }, { "name": 'Online' }];

    const { data: courses = [], isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })



    if (isLoading) {
        return <Loading />
    }



    const filteredCourse = tabName === 'All Courses' 
    ? courses 
    : courses?.filter(course => 
        course?.category === tabName || course?.popularCategory === tabName
      );
  

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);

        setTabName(e.target.value)

    }
    return (
        <>
            <Helmet>
                <title>Universe IT | Courses</title>
            </Helmet>
            <div className="bg-gray-100 ">
                <div className=" py-2 max-w-7xl mx-auto">

                    <div className='flex gap-5'>
                        <div className='min-w-[240px] bg-white hidden md:block rounded-sm overflow-hidden '>
                            {/* <div className='bg-primary text-white  flex gap-1 items-center'>
                                <select className='bg-primary py-2 max-w-[95px]' name="" id="">
                                    <option value="">Country</option>
                                    <option>Bangladesh</option>
                                    <option>India</option>
                                    <option>America</option>
                                    <option>Pakistan</option>
                                    <option>England</option>
                                </select>
                                <select className='bg-primary py-2 max-w-[95px]' name="" id="">
                                    <option value="">Work Type</option>
                                    <option >Front-End Developer</option>
                                    <option >Back-End Developer</option>
                                    <option>Full Stack Developer</option>
                                    <option>UI/UX Designer</option>
                                    <option>QA Engineer</option>
                                </select>
                                <p>Filter</p>
                            </div> */}
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
                            <CourseTab setTabName={setTabName} tabName={tabName} isCoursePage={true} />
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-20 gap-5 md:gap-x-10 pt-10 px-5'>
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
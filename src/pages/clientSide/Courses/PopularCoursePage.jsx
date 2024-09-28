import React from 'react';
import ComponentsTitle from '../../../Shared/ComponentsTitle/ComponentsTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import CourseCard from '../../../components/clientSide/Courses/CourseCard';

const PopularCoursePage = () => {
    window.scrollTo(0, 0);
    const data = useParams();
    const category = data.category;
    const axiosPublic = useAxiosPublic();

    const { data: courses = [], refetch } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/course');
            return res.data;
        }
    })

    const filteredCourse = courses?.filter(course => course?.popularCategory === category);

    console.log(courses);
    return (
        <div className=' bg-gray-100'>
            <div className='py-20'>
                <ComponentsTitle title={`Our Demanding Courses on ${category}`} description={'Elevate your skills with our demanding courses designed to push your boundaries and unlock your full potential.'} />
                
                <div className=' w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-y-20 gap-5 md:gap-x-10 pt-10 px-5'>
                    {
                        filteredCourse?.map((course, idx) => <CourseCard key={idx} course={course} isCoursePage={true} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularCoursePage;
import React from 'react';
import CourseDetailsTab from '../../../components/clientSide/Courses/CourseDetailsTab';
import RelatedCourseCard from '../../../components/clientSide/Courses/RelatedCourseCard';

const RelatedCourseSection = () => {
    return (
        <>
            <section className='flex flex-col md:flex-row gap-5'>
                <div className='w-3/4 border border-black rounded-lg'>
                    <CourseDetailsTab></CourseDetailsTab>
                </div>

                <div className='w-1/4 border border-black rounded-lg space-y-5'>
                <RelatedCourseCard></RelatedCourseCard>
                <RelatedCourseCard></RelatedCourseCard>
                <RelatedCourseCard></RelatedCourseCard>
                <RelatedCourseCard></RelatedCourseCard>
                    
                </div>

            </section>
        </>
    );
};

export default RelatedCourseSection;
import React from 'react';
import CourseDetailsTab from '../../../components/clientSide/Courses/CourseDetailsTab';
import RelatedCourseCard from '../../../components/clientSide/Courses/RelatedCourseCard';

const RelatedCourseSection = () => {
    return (
        <>
            <section className='flex flex-col md:flex-row gap-5 py-5'>
                <div className='w-auto md:w-3/4 bg-white rounded-lg'>
                    <CourseDetailsTab></CourseDetailsTab>
                </div>

                <div className='w-auto md:w-1/4   rounded-lg space-y-5'>
                    <p className='font-bold'>Related Courses</p>
                    <RelatedCourseCard imageLink={`https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723110940/UniverseIT/Related%20course/kyrzss2c9wmxkjujwhon.jpg`}></RelatedCourseCard>
                    <RelatedCourseCard imageLink={`https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723110940/UniverseIT/Related%20course/ueh09tjnztu7gcgtzdut.jpg`}></RelatedCourseCard>

                    <RelatedCourseCard imageLink={`https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723110940/UniverseIT/Related%20course/ynbr1m9te7sghuyvqndu.jpg`}></RelatedCourseCard>

                    <RelatedCourseCard imageLink={`https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723110940/UniverseIT/Related%20course/ueh09tjnztu7gcgtzdut.jpg`}></RelatedCourseCard>

                    <RelatedCourseCard imageLink={`https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723110940/UniverseIT/Related%20course/kyrzss2c9wmxkjujwhon.jpg`}></RelatedCourseCard>



                </div>

            </section>
        </>
    );
};

export default RelatedCourseSection;
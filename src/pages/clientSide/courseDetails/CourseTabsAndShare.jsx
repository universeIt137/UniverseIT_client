import React from 'react';
import Share from './Share';
import CourseDetailsTab from './CourseDetailsTab';

const CourseTabsAndShare = () => {
    return (
        <div className="p-5 bg-white rounded-2xl z-10 relative">
        <div className="flex justify-between flex-col sm:flex-row">
            <p className="lg:text-4xl font-bold py-5">Course Details</p>
            <div className="w-full md:w-max flex justify-end items-end"><Share /></div>
        </div>
        <CourseDetailsTab></CourseDetailsTab>

    </div>
    );
};

export default CourseTabsAndShare;
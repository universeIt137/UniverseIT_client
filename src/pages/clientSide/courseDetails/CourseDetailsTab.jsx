import React, { useEffect, useState } from 'react';

// import 'react-tabs/style/react-tabs.css';
import Faq from 'react-faq-component';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import CourseCategory from '../../../Shared/CourseCategory';
import SemesterTable from '../../../Shared/SemesterTable';
import Tabs from './Tabs';


const CourseDetailsTab = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [TabName, setTabName] = useState('Course Details')
    const [rows, setRowsOption] = useState(null)
    const { data: courseSemesters = [], isLoading: courseSemestersIsLoading } = useQuery({
        queryKey: ['singleCourseIdForSemester', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/semesterByCourse/course/${id}`)
            return res?.data
        }
    })
    const { data: courseCategories = [], isLoading: courseCategoriesIsLoading } = useQuery({
        queryKey: ['courseCategories', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/courseCategory/course/${id}`)
            return res?.data
        }
    })
    const { data: courseObjectives = [], isLoading: courseObjectivesIsLoading } = useQuery({
        queryKey: ['courseObjective', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/objectives/course/${id}`);
            return res?.data;
        }
    });

    useEffect(() => {
        if (courseObjectives.length > 0) {
            rows && rows[0].expand()
        }
    }, [courseObjectives, rows])

    if (courseSemestersIsLoading || courseCategoriesIsLoading || courseObjectivesIsLoading) {
        return ''
    }
    const allSubjects = courseSemesters?.reduce((a, b) => {
        return a.concat(b.subjects)
    }, []);
    console.log(allSubjects);
    const totalCredits = allSubjects.reduce((a, b) => {
        return a + parseInt(b.credit)
    }, 0);
    const showingCategory = courseCategories?.find(category => category?._id === TabName) || {}
    const courseObjective = courseObjectives[0] || {};
    const { objectiveFAQ = [] } = courseObjective;
    let convertedArray = objectiveFAQ.map(item => {
        return {
            title: <div className='flex gap-5 justify-between'>
                <p className='font-bold'>{item.question}</p>
            </div>,
            content: item.answer,

        };
    });
    const showingDataAtFAQ = {
        title: '',
        rows: convertedArray
    }
    const config = {
        animate: true,
        arrowIcon: "V",
        openOnload: 1,
        expandIcon: "+",
        collapseIcon: "-",
    };




    console.log(TabName);


    return (
        <div className='overflow-x-hidden bg-white rounded-lg'>
            <Tabs tabName={TabName} setTabName={setTabName} courseCategories={courseCategories} />
            {TabName === 'Career Objective' && <div className='pl-2  '>
                {
                    objectiveFAQ.length < 1 ? <p className="pb-10 pt-5 text-center">No FAQ Found</p> : <Faq config={config} getRowOptions={setRowsOption} data={showingDataAtFAQ} />
                }
            </div>}
            {
                showingCategory?.name && <CourseCategory category={showingCategory} />
            }
            {TabName === 'Course Details' && <div>
                <div >
                    {
                        courseSemesters.map((semester, idx) => <SemesterTable classNum={idx + 1} key={semester._id} semesterTitle={semester?.semesterTitle} subjects={semester?.subjects} />)
                    }
                    {
                        courseSemesters?.length < 1 && <p className='py-5 text-center'>No Class Available!!</p>
                    }
                </div>
            </div>}
        </div>
    );
};

export default CourseDetailsTab;
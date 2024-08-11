import React, { useEffect, useState } from 'react';

// import 'react-tabs/style/react-tabs.css';
import Faq from 'react-faq-component';
import { Grommet, Tab, Tabs } from 'grommet';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import CourseCategory from '../../../Shared/CourseCategory';
import SemesterTable from '../../../Shared/SemesterTable';


const CourseDetailsTab = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [TabName, setTabName] = useState('2nd')
    const [rows, setRowsOption] = useState(null)
    const customTheme = {
        tab: {
            active: {
                color: 'black',
            },
            border: {
                side: 'bottom',
                size: 'small',
                color: 'border',
                active: {
                    color: '#FF4e00',
                },
                hover: {
                    color: '#FF4e00',
                },
            },
            color: 'text',
            margin: {
                vertical: 'xsmall',
                horizontal: 'small',
            },
            pad: {
                bottom: 'xsmall',
            },
            extend: ({ theme }) => `
            color: ${theme.global.colors['accent-1']};
            &:hover {
              background-color: ${theme.global.colors['']};
            }
          `,
        },
    };
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
    useEffect(() => {
        if (courseCategories?.length > 0) {
            setTabName(courseCategories[0]?._id)
        } else {
            setTabName('4th')
        }
    }, [courseCategories])
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

    const btnStyle = 'border-primary hover:bg-primary btn text-white border  md:px-5 px-3 rounded-md  py-1 transition-all duration-300 hover:font-bold  md:h-16 md:w-[190px] flex justify-center items-center tabBtn active:border-2 active:border-gray-500 text-xs sm:text-sm md:text-base'
    return (
        <div className='overflow-x-hidden'>
            <Grommet Grommet theme={customTheme}>
                <Tabs justify="start">
                    {
                        courseCategories?.map(category => <Tab key={category?._id} className='text-red-500' title={<div className={`${btnStyle} ${TabName === category?._id ? 'font-bold bg-primary' : 'bg-primary/80'}`}>
                            <p className='transition-all duration-300 '>{category.duration} <br /> <span className="text-xs sm:text-sm">({category?.type || 'Type not available'})</span></p>
                        </div>} onClick={() => setTabName(category?._id)}>
                        </Tab>)
                    }

                    <Tab className='text-red-500' title={<div className={`${btnStyle} ${TabName === '4th' ? 'font-bold bg-primary' : 'bg-primary/80'}`}><p className='tabBtnText transition-all duration-300'>Semester Details</p></div>} onClick={() => setTabName('4th')}></Tab>
                    <Tab className='text-red-500' title={<div className={`${btnStyle} ${TabName === '1st' ? 'font-bold bg-primary' : 'bg-primary/80'}`}><p className='tabBtnText transition-all duration-300'>Career objective</p></div>} onClick={() => setTabName('1st')}></Tab>

                </Tabs>
            </Grommet>
            {TabName === '1st' && <div className='pl-2  '>
                {
                    objectiveFAQ.length < 1 ? <p className="pb-10 pt-5 text-center">No FAQ Found</p> : <Faq config={config} getRowOptions={setRowsOption} data={showingDataAtFAQ} />
                }
            </div>}
            {
                showingCategory?.name && <CourseCategory category={showingCategory} />
            }
            {TabName === '4th' && <div>
                <div >
                    {
                        courseSemesters.map(semester => <SemesterTable key={semester._id} semesterTitle={semester?.semesterTitle} subjects={semester?.subjects} />)
                    }
                    <table className=" border-collapse border border-gray-200 bg-primary/20 text-xs xs:text-sm sm:text-base w-full max-w-[800px] mx-auto">
                        <thead>
                            <tr className="">
                                <th colSpan="2" className="border border-gray-200 px-2 sm:px-4 py-2 text-left"></th>
                                <th className="border border-gray-200 px-2 sm:px-4 py-2 text-left"></th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className='bg-primary/20 '>
                                <td className="px-2 sm:px-4 py-2 border-r-2 border-0 border-black border-b-[1.5px] border-b-primary border-l-[2px]">Total</td>
                                <td className="border-0 border-r-2 border-black px-2 sm:px-4 py-2 border-b-[1.5px] border-b-primary "></td>
                                <td className="border border-gray-200 px-2 sm:px-4 py-2 font-medium border-b-[1.5px border-b-primary border-r-[2px] border-r-black">{totalCredits} Credits</td>

                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>}
        </div>
    );
};

export default CourseDetailsTab;
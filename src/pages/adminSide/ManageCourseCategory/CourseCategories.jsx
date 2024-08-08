/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Grommet, Tab, Tabs } from "grommet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import CourseCategory from "../../../Shared/CourseCategory";

const CourseCategories = ({ id, courseCategories, courseCategoriesIsLoading, courseCategoriesRefetch }) => {
    const axiosPublic = useAxiosPublic()
    const [TabName, setTabName] = useState('')


    useEffect(() => {
        if (courseCategories[0]?._id) {
            setTabName(courseCategories[0]?._id)
        }
    }, [courseCategories, courseCategoriesIsLoading])
    if (courseCategoriesIsLoading) {
        return ''
    }
    console.log(TabName);
    const showingCategory = courseCategories?.find(category => category?._id === TabName) || {}
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
    const btnStyle = 'border-primary hover:bg-primary btn text-white border  md:px-5 px-3 rounded-md  py-1 transition-all duration-300 hover:font-bold  md:h-16 md:w-[190px] flex justify-center items-center tabBtn active:border-2 active:border-gray-500 text-xs sm:text-sm md:text-base'
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/courseCategory/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            courseCategoriesRefetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });

    }
    return (
        <div className="pb-10">
            {courseCategories?.length > 0 ? <>
                <Grommet Grommet theme={customTheme}>
                    <Tabs justify="start">

                        {
                            courseCategories?.map(category => <Tab key={category?._id} className='text-red-500' title={<div className={`${btnStyle} ${TabName === category?._id ? 'font-bold bg-primary' : 'bg-primary/80'}`}>
                                <p className='transition-all duration-300 '>{category.duration} <br /> <span className="text-xs sm:text-sm">({category?.type || 'Type not available'})</span></p>
                            </div>} onClick={() => setTabName(category?._id)}>
                            </Tab>)
                        }


                    </Tabs>
                </Grommet>
                <div className=" p-1 border-2 border-primary w-max ml-auto my-2 mr-5 px-5 flex gap-5 rounded-lg">
                    <td className='text-2xl text-green-500'>
                        <Link to={`/dashboard/updateCourseCategory/${id}/${showingCategory?._id}`}><MdEditSquare /></Link>
                    </td>

                    <td>
                        <button onClick={() => handleDelete(showingCategory?._id)}><MdDelete className="text-2xl text-red-600" /></button>
                    </td>
                </div>
                <CourseCategory category={showingCategory} />
            </> : <p className="pb-10 pt-5 text-center">Don't have any categories!!</p>}
        </div>
    );
};

export default CourseCategories;
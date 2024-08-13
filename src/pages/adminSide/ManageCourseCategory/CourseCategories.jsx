/* eslint-disable react/prop-types */
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import CourseCategory from "../../../Shared/CourseCategory";
import ManageCourseCategoryTabs from "./ManageCourseCategoryTabs";

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
    const showingCategory = courseCategories?.find(category => category?._id === TabName) || {}
  
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
                <ManageCourseCategoryTabs tabName={TabName} setTabName={setTabName} courseCategories={courseCategories} />
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
/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import SemesterTable from "../../../Shared/SemesterTable";

const CourseSemesters = ({ courseSemesters, courseSemestersRefetch }) => {
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    console.log(id);
    const handleDelete = (incomingId) => {
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
                axiosPublic.delete(`semesterByCourse/${incomingId}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            courseSemestersRefetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });
    }
    return (
        <div className="py-10">
            <h2 className="text-xl pb-5 font-bold">Already added Semester</h2>
            {
                courseSemesters.length > 0 ? courseSemesters?.map(semester => <div key={semester?._id}>
                    <div className=" p-1 border-2 border-primary w-max ml-auto my-2 mr-5 px-5 flex gap-5 rounded-lg">
                        <td className='text-2xl text-green-500'>
                            <Link to={`/dashboard/updateCourseSemester/${id}/${semester?._id}`}><MdEditSquare /></Link>
                        </td>

                        <td>
                            <button onClick={() => handleDelete(semester?._id)}><MdDelete className="text-2xl text-red-600" /></button>
                        </td>
                    </div>
                    <SemesterTable semesterTitle={semester?.semesterTitle} subjects={semester?.subjects} /></div>) : <p className="pb-10 pt-5 text-center">No Semester Found</p>
            }
        </div>
    );
};

export default CourseSemesters;
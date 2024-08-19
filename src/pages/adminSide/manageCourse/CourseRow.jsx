/* eslint-disable react/prop-types */
import { MdAddBox, MdDelete, MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ReactPlayer from "react-player";
import Marquee from "react-fast-marquee";
import { TbCategoryPlus, TbInfoHexagonFilled } from "react-icons/tb";
import semesterImg from '../../../assets/icons/semister.png'
import { PiTargetBold } from "react-icons/pi";
const CourseRow = ({ course, idx, coursesRefetch }) => {
    const axiosPublic = useAxiosPublic()
    const videoDivStyle = 'rounded-md overflow-hidden'
    const titleStyle = 'text-black font-medium py-1 max-w-[230px] max-h-[50px] overflow-hidden'
    const {
        admissionNotice,
        bangla,
        bannerImages = [],
        courseFee,
        notice,
        subVideos,
        category,
        title,
        videoUrl,
        _id
    } = course;
    console.log(subVideos);
    //                             <th>subtitle</th>
    //                             <th>Notice</th>
    //                             <th>admissionNotice</th>
    //                             <th>bangla</th>
    //                             <th>Main Video</th>
    //                             <th>Sub Videos</th>
    const handleDelete = () => {
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
                axiosPublic.delete(`/course/${_id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            coursesRefetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });
    }
    return (
        <tr>
            <td className={`sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-base-300'}`}>{idx + 1}</td>

            <td className={` sm:min-w-[190px] sticky left-6  z-10 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-base-300'}`}>{title}</td>

            <td >
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-10 ">
                            <img className="" src={bannerImages[0] || ''} />
                        </div>
                    </div>
                    <div>


                    </div>
                </div>
            </td>

            <td>
                <p>
                    {courseFee ? `${courseFee} BDT` : 'Not Given'}
                </p>
            </td>

            <td className="">
                <p className="  overflow-hidden">
                    {category}
                </p>
            </td>



            <td className='text-2xl text-yellow-600 text-center'>
                <Link to={`/dashboard/manageCourseSemester/${_id}`}>
                    <div className="text-green-600 flex justify-center">
                        <MdAddBox />
                    </div>
                </Link>
            </td>
            <td className='text-2xl '>
                <Link to={`/dashboard/manageCourseObjective/${_id}`}>
                    <div className="text-green-600 flex justify-center">
                    <TbInfoHexagonFilled />
                    </div>
                </Link>
            </td>
            <td className='text-2xl text-green-500'>
                <Link to={`/dashboard/updateCourse/${_id}`}><MdEditSquare /></Link>
            </td>



            <td className='text-2xl text-red-500 '><span className="cursor-pointer" onClick={handleDelete} ><MdDelete /></span></td>
        </tr>
    );
};

export default CourseRow;
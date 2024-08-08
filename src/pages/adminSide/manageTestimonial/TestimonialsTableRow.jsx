/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const TestimonialsTableRow = ({ idx, testimonial, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const { name, designation, opinion, image, _id } = testimonial;

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
                axiosPublic.delete(`/testimonial/${_id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
        });

    }
    return (
        <tr >
            <td>1</td>
            <td>{name || 'Not Given'}</td>
            <td>{designation || 'Not Given'}</td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image || "https://bifdt-4b534.web.app/assets/teacher2-CqON6YkW.jpg"} />
                        </div>
                    </div>
                </div>
            </td>
            <td>{opinion || 'Not Given'}</td>

            <td className='text-2xl text-green-500'>
                <Link to={`/dashboard/updateTestimonial/${_id}`}><MdEditSquare /></Link>
            </td>
            <td className='text-2xl text-red-500'><button onClick={handleDelete}><MdDelete /></button></td>
        </tr>
    );
};

export default TestimonialsTableRow;
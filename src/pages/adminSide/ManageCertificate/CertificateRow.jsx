/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdDelete, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const CertificateRow = ({ idx, certificate, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const { studentName, email, certificateNumber, studentID,courseName,batch,courseDuration, _id} = certificate;

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
            <td>{studentName || 'Not Given'}</td>
            <td>{email || 'Not Given'}</td>
            <td>
               {certificateNumber || 'Not Given'}
            </td>
            <td>{studentID || ''}</td>
            <td>{courseName || 'Not Given'}</td>
            <td>{batch || 'Not Given'}</td>
            <td>{courseDuration || 'Not Given'}</td>

            <td className='text-2xl text-green-500'>
                <Link to={`/dashboard/updateTestimonial/${_id}`}><MdEditSquare /></Link>
            </td>
            <td className='text-2xl text-red-500'><button onClick={handleDelete}><MdDelete /></button></td>
        </tr>
    );
};

export default CertificateRow;
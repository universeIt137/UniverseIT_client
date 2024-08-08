/* eslint-disable react/prop-types */
import React from 'react';
import { makeVisibleTime } from '../../../makeVisibleTime';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GiConfirmed } from 'react-icons/gi';
import { RxCross1 } from "react-icons/rx";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
const CommentRow = ({ comment, index, handleDelete, blogs, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const blogTitle = blogs.find(blog => blog._id === comment?.blogId)?.title;

    const updateStatus = () => {
        const toastId = toast.loading("Comment status is Updating...");
        axiosPublic.put(`/comments/${comment?._id}`, { isShow: true })
            .then(res => {

                if (res.data?.modifiedCount) {
                    console.log(res.data);
                    toast.success("Comment is now Showable!!", { id: toastId });
                    refetch()
                }
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    const downStatus = () => {
        const toastId = toast.loading("Comment status is downgrading...");
        axiosPublic.put(`/comments/${comment?._id}`, { isShow: false })
            .then(res => {

                if (res.data?.modifiedCount) {
                    console.log(res.data);
                    toast.success("Comment is now hidden!!", { id: toastId });
                    refetch()
                }
            })
            .catch(err => {
                toast.error(err?.message, { id: toastId });
            })
    }
    return (
        <tr >
            <td>
                {index + 1}
            </td>
            <td>
                <p className="">{comment?.name}</p>
            </td>
            <td>
                <p className="w-[250px]">{comment?.comment}</p>

            </td>
            <td>
                <p>{blogTitle}</p>

            </td>
            <td>
                <p>{comment?.isShow ? 'Shown' : 'Hidden'}</p>

            </td>
            <td className="">
                <p className="">{comment?.contactNumber}</p>
            </td>
            <td className="">
                <p className="">{makeVisibleTime(comment?.time)}</p>

            </td>

            <td>
                {
                    comment?.isShow ? <button onClick={downStatus}><RxCross1 className="text-2xl text-yellow-600 border-2 rounded-full p-0.5 border-yellow-600" /></button> : <button onClick={updateStatus}><GiConfirmed className="text-2xl text-green-600" /></button>
                }


            </td>
            <td>
                <button onClick={() => handleDelete(comment?._id)}><MdDelete className="text-2xl text-red-600" /></button>
            </td>
        </tr>
    );
};

export default CommentRow;
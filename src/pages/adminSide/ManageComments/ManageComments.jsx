import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CommentRow from "./CommentRow";
import { useState } from "react";

const ManageComments = () => {
    const [selectFieldValue, setSelectFieldValue] = useState('')
    const axiosPublic = useAxiosPublic();
    const { data: comments = [], refetch, isLoading: commentIsLoading } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/comments');
            return res.data;
        }
    })
    const { data: blogs = [], isLoading: blogIsLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blog');
            return res.data;
        }
    })
    if (commentIsLoading || blogIsLoading) {
        return ''
    }
    console.log(selectFieldValue);

    const showingComment = selectFieldValue === '' ? comments : comments?.filter(comment => comment?.blogId === selectFieldValue)
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
                axiosPublic.delete(`/comments/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The comment has been deleted.",
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
    console.log(comments);
    return (
        <div>
            <>
                <Helmet>
                    <title>Dashboard | Manage Comments</title>
                </Helmet>
                <div className="pb-20">
                    <div className="relative max-w-[400px] pt-5 pb-5 px-5 space-y-2">
                        <label className="leading-7 text-sm text-gray-600 font-bold">Filter Comment By Blog</label>
                        <select onChange={(e) => setSelectFieldValue(e.target.value)} value={selectFieldValue} type="text" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out">
                            <option value="">All</option>
                            {
                                blogs?.map(blog => <option key={blog?._id} value={blog?._id}>{blog?.title}</option>)
                            }
                        </select>
                    </div>
                    <div className="bg-white rounded-lg  w-full lg:w-[calc(100vw-300px)] overflow-x-auto mx-auto max-h-[80vh] overflow-y-auto">
                        <p className="text-2xl font-bold text-center py-2">Manage Comments</p>
                        <table className="table table-zebra overflow-x-auto">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Name</th>
                                    <th>Comments</th>
                                    <th>Blog Title</th>
                                    <th>Status</th>
                                    <th>Contact Number</th>
                                    <th>Time</th>
                                    <th>Edit Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}

                                {
                                    showingComment?.map((comment, index) => <CommentRow refetch={refetch} comment={comment} index={index} handleDelete={handleDelete} blogs={blogs} key={index} />
                                    )
                                }



                            </tbody>


                        </table>
                        {
                            showingComment?.length < 1 && <p className="text-center py-4">No Comments Found!!</p>
                        }

                    </div>
                </div>
            </>
        </div>
    );
};

export default ManageComments;
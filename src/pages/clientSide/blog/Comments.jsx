import React, { useState } from 'react';
import user from '../../../assets/user.png'
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const Comments = ({ blogId }) => {
    const axiosPublic = useAxiosPublic()
    // comments/668bcc19bee6da3058c06601
    const { data: blogComments = [], refetch: blogCommentsRefetch, isLoading } = useQuery({
        queryKey: ['blogComments', blogId],
        queryFn: async () => {
            const res = await axiosPublic.get(`comments/blog/${blogId}`)
            return res?.data
        }
    })
    if (isLoading) {
        return ''
    }
    console.log(blogComments);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const contactNumber = form.number.value;
        const comment = form.comment.value;
        const data = { name, contactNumber, comment, blogId: blogId, time: new Date().toISOString().split('T')[0] };
        console.log(data);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Publish Comment!"
        }).then((result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Comment is publishing...");
                axiosPublic.post('/comments', data)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success("Comment has published!!", { id: toastId });
                            blogCommentsRefetch()
                            form.reset()
                            document.getElementById('downloadMobileApp').showModal()
                        }
                    })
                    .catch(err => {
                        toast.error(err?.message, { id: toastId });
                    })

            }
        });

    }
    return (
        <div className='px-4'>
            <div className='w-full space-y-5 pb-5'>
                <div className='flex gap-3 items-center'>
                    <h2 className='text-xl font-medium'>All Comments</h2>
                    <hr className='border-[1.5px] w-[30px] border-black' />
                </div>
                <div className='grid grid-cols 1 md:grid-cols-2 gap-5'>

                    {
                        blogComments?.map(commentData => <div key={commentData?._id} className='w-full  max-w-[400px] mx-auto flex gap-3 border border-gray-500 rounded-lg p-2'>
                            <img src={user} className='w-12 h-12 object-cover rounded-full p-1 bg-white/80' alt="" />
                            <div className='text-sm'>
                                <h4 className='font-semibold'>{commentData?.name}</h4>

                                <p className='text-gray-500 '>{commentData?.time || '2020-01-10'}</p>
                                <hr className='border-gray-500 w-full' />
                                <p className='text-black mt-2'>{commentData?.comment}</p>
                            </div>
                        </div>)
                    }
                    {
                        blogComments?.length < 1 && <p className='text-lg'>No Comments Available</p>
                    }
                </div>
                <hr className=' border-gray-700' />
            </div>
            <form onSubmit={handleSubmit} className=" pb-10 max-w-[400px]">
                <p>Leave a comment</p>
                <input required name='name' type="text" placeholder="Your Name" className="input mb-5 input-bordered w-full" /> <br />
                <input required name='number' type="number" placeholder="Your Contact Number" className="input mb-5 input-bordered w-full" /> <br />
                <textarea required name='comment' type="text" placeholder="Leave a Comment" className="input input-bordered w-full p-2 h-[100px]" ></textarea> <br />
                <button className='p-2 mt-2 rounded-lg text-white px-10 bg-primary'>Submit</button>
            </form>
            <dialog id="downloadMobileApp" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Your Comment has Published!!</h3>
                    <p className="py-4">We Have mobile app to use. You can get it from <strong>Play store or App Store</strong></p>

                    <div className="modal-action">
                        <form method="dialog">
                            <div className='flex gap-5'>
                                <Link to={'https://play.google.com/store/games?device=windows'}><p className='btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-primary  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'>Get App</p></Link>
                                <button className="btn btn-error">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Comments;
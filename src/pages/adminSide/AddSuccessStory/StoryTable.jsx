import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';

const StoryTable = ({ handleDelete, successStories }) => {



    return (
        <div className="bg-white p-5 rounded-lg w-full lg:w-[calc(100vw-300px)] mx-auto">
            <p className='text-2xl font-bold text-center'>Manage Success Stories</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student Name</th>
                            <th>Image</th>
                            <th>Video</th>
                            <th>Youtube Video</th>
                            <th>Description</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            successStories?.map((story, index) =>
                                <tr key={story._id}>
                                    <td>{index + 1}</td>
                                    <td>{story.name}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={story.image} alt={story.studentName} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <video
                                            src={story.video}
                                            controls
                                            className="w-32 h-20"
                                        />
                                    </td>
                                    <td className='text-blue-600 underline'>
                                    <Link to={`${story.youtube_link}`}>Youtube Link</Link>
                                    </td>

                                    <td>{story.description.slice(0, 59)}</td>
                                    <td className='text-2xl text-green-500'>
                                        <Link to={`/dashboard/updateSuccessStory/${story._id}`}><MdEditSquare /></Link>
                                    </td>
                                    <td onClick={() => handleDelete(story)} className='text-2xl text-red-500 cursor-pointer'><MdDelete /></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoryTable;
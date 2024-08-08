/* eslint-disable react/prop-types */

import { MdDelete, MdEditSquare } from "react-icons/md";
import { makeVisibleTime } from "../../../makeVisibleTime";
import { Link } from "react-router-dom";
import { useState } from "react";

const BlogRow = ({ index, blog, handleDelete }) => {
    const [seeMore, setSeeMore] = useState(false)
    return (
        <tr key={blog._id}>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={blog?.blogImageUrl || "https://static-cse.canva.com/blob/567558/50stunninglybeautifulgeometricpatternsingraphicdesign.jpg"} />
                        </div>
                    </div>
                    <div>

                        <div className="text-sm opacity-50 min-w-max">{makeVisibleTime(blog?.date)}</div>
                    </div>
                </div>
            </td>
            <td className="min-w-[200px]">
                <p className="font-bold">{blog.title}</p>
            </td>
            <td className="min-w-[300px]">
                <div className="">
                    {/* {subtext.substring(0, 50)}... */}
                    {/* <HTMLContent content={blog.description} /> */}
                    <div
                        className={`blog-content  overflow-hidden ${seeMore ? 'h-full' : 'max-h-[22px]'}`}
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                    ></div>
                    <p onClick={()=> setSeeMore(!seeMore)} className="font-medium hover:underline cursor-pointer">{seeMore ? 'See less' : 'See more'}</p>
                </div>
                
            </td>
            <td>{blog.author}</td>
            <td>
                {blog.meta_word}
            </td>
            <td className='text-2xl text-green-500'>
                <Link to={`/dashboard/updateBlog/${blog._id}`}><MdEditSquare /></Link>
            </td>

            <td>
                <button onClick={() => handleDelete(blog?._id)}><MdDelete className="text-2xl text-red-600" /></button>
            </td>
        </tr>
    );
};

export default BlogRow;
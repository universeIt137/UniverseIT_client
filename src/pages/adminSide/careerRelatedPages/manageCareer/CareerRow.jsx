import React from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CareerRow = ({ index, career, handleDelete }) => {
    return (
        <tr key={career._id}>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={career?.careerImageUrl || "https://static-cse.canva.com/blob/567558/50stunninglybeautifulgeometricpatternsingraphicdesign.jpg"} />
                        </div>
                    </div>

                </div>
            </td>
            <td className="">
                <p className="font-bold">{career.salary}</p>
            </td>
            <td className="">
                <div className="">
                    {/* {subtext.substring(0, 50)}... */}
                    {/* <HTMLContent content={blog.description} /> */}
                    <div
                        className={`blog-content  overflow-hidden`}
                    >
                        {career.position}
                    </div>

                </div>

            </td><td>{career.experience}</td>
            <td>{career.employment_status}</td>
            <td>
                {career.education}
            </td>
            <td className='text-2xl text-green-500'>
                <Link to={`/dashboard/update-career/${career._id}`}><MdEditSquare /></Link>
            </td>

            <td>
                <button onClick={() => handleDelete(career?._id)}><MdDelete className="text-2xl text-red-600" /></button>
            </td>
        </tr>
    );
};

export default CareerRow;
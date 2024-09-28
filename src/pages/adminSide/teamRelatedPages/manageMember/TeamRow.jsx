import React, { useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { makeVisibleTime } from '../../../../makeVisibleTime';

const TeamRow = ({ index, member, handleDelete }) => {
   
    return (
        <tr key={member._id}>
            <td>
                {index + 1}
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={member?.memberImageUrl || "https://static-cse.canva.com/blob/567558/50stunninglybeautifulgeometricpatternsingraphicdesign.jpg"} />
                        </div>
                    </div>
                    
                </div>
            </td>
            <td className="">
                <p className="font-bold">{member.firstName} { member.lastName }</p>
            </td>
            <td className="">
                <div className="">
                    {/* {subtext.substring(0, 50)}... */}
                    {/* <HTMLContent content={blog.description} /> */}
                    <div
                        className={`blog-content  overflow-hidden`}
                    >
                         {member.position}
                    </div>
                    
                </div>

            </td><td>{member.employeeID}</td>
            <td>{member.email}</td>
            <td>
                {member.phone}
            </td>
            <td className='text-2xl text-green-500'>
                <Link to={`/dashboard/update-member/${member._id}`}><MdEditSquare /></Link>
            </td>

            <td>
                <button onClick={() => handleDelete(member?._id)}><MdDelete className="text-2xl text-red-600" /></button>
            </td>
        </tr>
    );
};

export default TeamRow;
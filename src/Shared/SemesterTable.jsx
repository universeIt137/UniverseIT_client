/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ButtonStrong from './Button/ButtonStrong';
import { FaAngleDown } from 'react-icons/fa';

const SemesterTable = ({ semesterTitle, subjects = [], editable = false, handleDeleteSubject, classNum, idx = 0 }) => {
    const [showFull, setShowFull] = useState(idx === 0 ? true : false)

    return (
        <div className="overflow-x-auto max-w-[800px] mx-auto relative">
            <div className="absolute top-0 left-0  bg-white w-full h-full"></div>
            <table className="min-w-full border-collapse border border-gray-200 bg-primary/20 text-xs xs:text-sm sm:text-base z-10 relative">
                <thead>
                    <tr className="bg-primary/90 text-white">
                        <th colSpan="1" className="border border-gray-200 px-2 sm:px-4 py-2 text-left w-[100px]">Class {classNum}</th>
                        <th colSpan="1" className="border border-gray-200 px-2 sm:px-4 py-2 text-left">{semesterTitle}</th>
                        {
                            editable && <>
                                <th className="border border-gray-200 px-2 sm:px-4 py-2 text-left w-11">Delete</th>
                            </>
                        }
                        <th className='px-2 w-11 bg-white relative'>
                            <div className='absolute top-0 left-0 w-full h-full bg-primary/20'></div>
                            <button onClick={() => setShowFull(!showFull)} className='w-9 bg-primary text-white text-center rounded-full h-6 flex justify-center items-center cursor-pointer '>
                                <FaAngleDown className={`${showFull ? 'rotate-180' : 'rotate-0'} transition-all duration-300`} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className={`${showFull ? 'h-auto' : 'h-1 overflow-hidden'} transition-all duration-300`}>
                    {!showFull ? '' :
                        subjects.map((subject, idx) => (
                            <tr key={subject?.id}>
                                <td className="px-2 sm:px-4 py-2 border-r-2 border-0 border-black border-b-[1.5px] border-b-primary border-l-[2px]"> Topic-{idx + 1}</td>
                                <td className="border-0 border-r-2 border-black px-2 sm:px-4 py-2 border-b-[1.5px] border-b-primary">{subject.name}</td>

                                {
                                    editable && (
                                        <td className="border border-gray-200 px-2 sm:px-4 py-2 font-medium border-b-[1.5px border-b-primary border-r-[2px] border-r-black">
                                            <p onClick={() => handleDeleteSubject(subject.id)} className='w-7 h-7 bg-red-600 active:scale-90 hover:bg-red-700 rounded-md text-white text-center transition-all duration-300 cursor-pointer'>
                                                X
                                            </p>
                                        </td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SemesterTable;
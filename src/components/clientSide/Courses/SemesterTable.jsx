import React from 'react';

const SemesterTable = ({ semesterTitle, subjects = [], editable = false, handleDeleteSubject }) => {
    return (
        <div className="overflow-x-auto max-w-[800px] mx-auto relative">
            <div className="absolute top-0 left-0  bg-white w-full h-full"></div>
            <table className="min-w-full border-collapse border border-gray-200 bg-primary/20 text-xs xs:text-sm sm:text-base z-10 relative">
                <thead>
                    <tr className="bg-primary/90 text-white">
                        <th colSpan="2" className="border border-gray-200 px-2 sm:px-4 py-2 text-left">{semesterTitle}</th>
                        <th className="border border-gray-200 px-2 sm:px-4 py-2 text-left">Credits</th>
                        {
                            editable && <>
                                <th className="border border-gray-200 px-2 sm:px-4 py-2 text-left">Delete</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        subjects.map((subject, idx) => <tr key={subject?.id} className=''>
                            <td className="px-2 sm:px-4 py-2 border-r-2 border-0 border-black border-b-[1.5px] border-b-primary border-l-[2px]">{idx + 1}</td>
                            <td className="border-0 border-r-2 border-black px-2 sm:px-4 py-2 border-b-[1.5px] border-b-primary ">{subject.name}</td>
                            <td className="border border-gray-200 px-2 sm:px-4 py-2 font-medium border-b-[1.5px border-b-primary border-r-[2px] border-r-black">{subject.credit} Credits</td>
                            {
                                editable && <td className="border border-gray-200 px-2 sm:px-4 py-2 font-medium border-b-[1.5px border-b-primary border-r-[2px] border-r-black"><p onClick={() => handleDeleteSubject(subject.id)} className='w-7 h-7 bg-red-600 active:scale-90 hover:bg-red-700 rounded-md text-white text-center transition-all duration-300 cursor-pointer'>X</p></td>
                            }
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default SemesterTable;
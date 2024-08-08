import React from 'react';

const CourseCategory = ({ category }) => {
    const { name, qualification, courseFee, durationDetails, executiveBatch, regularBatch, totalClass, duration, courseId } = category;
    return (
        <div className="overflow-x-auto w-full ">
            <table className="table overflow-hidden lg:w-[800px] mx-auto text-base bg-primary/30">
            <div className="absolute top-0 left-0  bg-white w-full h-full  -z-10"></div>
                {/* head */}
                <thead className='bg-primary/90 text-white  '>
                    <tr className="text-xs xs:text-sm sm:text-base">
                        <th className="px-0.5 sm:px-2">Course Title</th>
                        <th className="p-0 sm:p-2">:</th>
                        <th className="lg:w-[570px] whitespace-normal pl-1 sm:pl-2 px-0.5 sm:px-2">{name}</th>
                    </tr>
                </thead>
                <tbody className="text-xs xs:text-sm sm:text-base">
                    {/* row 1 */} 
                    <tr className="">
                        <th  className="px-0.5 sm:px-2">Course Duration</th>
                        <td className="p-0 sm:p-2">:</td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2">{durationDetails}</td>
                    </tr>
                    {/* row 2 */}
                    <tr className='bg-gray-300'>
                        <th  className="px-0.5 sm:px-2"> Regular Batch</th>
                        <td className="p-0 sm:p-2">:</td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2">{regularBatch}</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th  className="px-0.5 sm:px-2">Executive Batch </th>
                        <td className="p-0 sm:p-2">:</td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2">{executiveBatch}</td>
                    </tr>
                    <tr className='bg-gray-300'>
                        <th  className="px-0.5 sm:px-2"></th>
                        <td className="p-0 sm:p-2"></td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2"></td>
                    </tr>
                    <tr>
                        <th  className="px-0.5 sm:px-2">Total Classes</th>
                        <td className="p-0 sm:p-2">:</td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2">{totalClass}</td>
                    </tr>
                    <tr className='bg-gray-300'>
                        <th  className="px-0.5 sm:px-2">Qualification</th>
                        <td className="p-0 sm:p-2">:</td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2">{qualification}</td>
                    </tr>
                    <tr>
                        <th  className="px-0.5 sm:px-2">Course Fee</th>
                        <td className="p-0 sm:p-2">:</td>
                        <td className="pl-1 sm:pl-2 px-0.5 sm:px-2">{courseFee}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CourseCategory;
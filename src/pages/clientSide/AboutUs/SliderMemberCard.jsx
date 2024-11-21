/* eslint-disable react/prop-types */
import React from 'react';

const SliderMemberCard = ({ member }) => {
    // console.log(member);
    return (
        <div className={`bg-primary/70 sm:p-1.5 w-full max-w-[290px] rounded-lg text-black overflow-hidden mx-auto`}>
            <div className={` relative bg-gray-100 min-h-full h-[240px] sm:h-[360px] border-2 sm:border-none rounded-lg border-primary`}>
                <div className='flex gap-1 justify-end px-5 pb-3 md:pb-9 items-center'>

                    {/* <h2 className='font-bold text-[10px]'>Universe IT <br /> Institute</h2> */}


                </div>
                <div className='py-4 sm:py-0  sm:h-[120px] relative  flex flex-col justify-center items-center gap-5 '>
                    <div className='w-full h-1 xs:h-2 sm:h-3.5 bg-primary/70'></div>
                    <div className='w-full h-1 xs:h-2 sm:h-3.5 bg-primary/70'></div>
                    <div className='w-full h-full absolute top-0 flex justify-center items-center '>
                        <div className=' bg-primary/70 size-16 xs:size-20 sm:size-28 rounded-full relative overflow-hidden'>
                            <div className='absolute top-0 w-full h-full bg-white'></div>
                            <img className='w-full h-full rounded-full object-cover relative p-1 bg-primary/70' src={member.memberImageUrl} alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col px-1 xs:px-3'>
                    <div className="pt-2 md:pt-10 text-[10px] sm:text-sm">
                        <h2 className=' font-bold capitalize'>Name: {member.firstName} {member.lastName}</h2>
                        <h2 className=''><span className='font-bold'>Employee ID:</span>{member.employeeID}</h2>
                        <h2 className=''><span className="font-bold">Position:</span> {member.position}</h2>
                        <h2 className=''><span className="font-bold">Phone:</span> {member.phone}</h2>
                        <h2 className='break-words'><span className="font-bold">Email:</span> {member.email}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderMemberCard;
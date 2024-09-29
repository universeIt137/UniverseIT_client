/* eslint-disable react/prop-types */
import React from 'react';

const MemberCard = ({ member, isSlider = false }) => {
    console.log(member);
    return (
        <div className={`bg-primary/70 p-1.5 w-[290px] rounded-lg text-black overflow-hidden ${isSlider && 'mx-auto'}`}>
            <div className={` relative bg-gray-100 min-h-full ${isSlider ? 'h-[360px]' : ''}`}>
                <div className='flex gap-1 justify-end p-5 pb-3 items-center'>
                    <img className='h-6 object-cover' src="" alt="" />
                    {/* <h2 className='font-bold text-xs'>Universe IT <br /> Institute</h2> */}


                </div>
                <div className=' h-[120px] relative  flex flex-col justify-center items-center gap-5'>
                    <div className='w-full h-3.5 bg-primary/70'></div>
                    <div className='w-full h-3.5 bg-primary/70'></div>
                    <div className='w-full h-full absolute top-0 flex justify-center items-center '>
                        <div className=' bg-primary/70 size-28 rounded-full relative overflow-hidden'>
                            <div className='absolute top-0 w-full h-full bg-white'></div>
                            <img className='w-full h-full rounded-full object-cover relative p-1 bg-primary/70' src={member.memberImageUrl} alt="" /></div>
                    </div>
                </div>
                <div className='flex flex-col px-3'>
                    <div className="py-10">
                        <h2 className='text-base font-bold capitalize'>Name: {member.firstName} {member.lastName}</h2>
                        <h2 className='text-sm'><span className='font-bold'>Employee ID:</span>{member.employeeID}</h2>
                        <h2 className='text-sm'><span className="font-bold">Position:</span> {member.position}</h2>
                        <h2 className='text-sm pt-1'><span className="font-bold">Phone:</span> {member.phone}</h2>
                        <h2 className='text-sm break-words'><span className="font-bold">Email:</span> {member.email}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
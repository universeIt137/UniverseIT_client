import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import MemberCard from '../AboutUs/MemberCard';

const TeamMemberPage = () => {

    const axiosPublic = useAxiosPublic();
    const { data: members = [], refetch, isLoading } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosPublic.get('/team-member');
            return res.data;

        }
    })

    if (isLoading) {
        return <Loading />
    }

    const CEO = members.find(emp => emp.employeeID === "UST-01");

    const otherEmployees = members.filter(emp => emp.employeeID !== "UST-01");


    return (
        <div className='sm:px-20 my-10 min-h-screen'>
            <Helmet>
                <title>Universe IT | Team Members</title>
            </Helmet>
            <p className="text-4xl m-10"><span className='font-bold border-b-2'>Team Members</span></p>

            <div className=" my-10 flex justify-center">
                <div className="bg-primary/70 p-1.5 w-[290px] rounded-lg text-black">
                    <div className=" relative bg-gray-100">
                        {/* <div className='w-full h-full bg-white absolute'></div>
            <div className='w-full h-full bg-text_color/50 absolute'></div> */}
                        <div className=''>
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
                                        <img className='w-full h-full rounded-full object-cover relative p-1 bg-primary/70' src={CEO.memberImageUrl} alt="" /></div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className="py-10">
                                    <h2 className='text-base font-bold capitalize'>Name: {CEO.firstName} {CEO.lastName}</h2>
                                    <h2 className='text-sm'><span className='font-bold'>Employee ID:</span>{CEO.employeeID}</h2>
                                    <h2 className='text-sm'><span className="font-bold">Position:</span> {CEO.position}</h2>
                                    <h2 className='text-sm pt-1'><span className="font-bold">Phone:</span> {CEO.phone}</h2>
                                    <h2 className='text-sm break-words'><span className="font-bold">Email:</span> {CEO.email}</h2>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-wrap gap-10 justify-center'>
                {/* {
                    members.map((member, idx) => <MemberCard member={member} />
                } */}

                {
                    otherEmployees.map((member, idx) => <MemberCard key={member._id} member={member}></MemberCard>)
                }
            </div>
            {/* <div className="mt-4 flex justify-center items-center gap-6">
                <button
                    onClick={handlePrev}
                    disabled={firstCardId === 0}
                    className={`px-7 btn bg-primary text-white hover:text-black  active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:text-white w-max ${firstCardId === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Prev
                </button>
                <div>
                    {firstCardId / cardPerSlice + 1} /{Math.ceil(totalCard / cardPerSlice)}
                </div>
                <button
                    onClick={handleNext}
                    disabled={firstCardId + cardPerSlice >= totalCard}
                    className={`px-7 btn bg-primary text-white hover:text-black  active:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 focus:text-white w-max ${firstCardId + cardPerSlice >= totalCard ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div> */}
        </div>
    );
};

export default TeamMemberPage;
import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import FacultyCard from './FacultyCard';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet-async';
import log21 from '../../../assets/logo/mainLogo.png'


const Faculties = () => {
    window.scrollTo(0, 0);
    const [firstCardId, setFirstCardId] = useState(0);
    const [cardPerSlice, setCardPerSlice] = useState(6);
    const axiosPublic = useAxiosPublic();
    const { data: faculties = [], isLoading } = useQuery({
        queryKey: ['faculties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faculty');
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading />
    }


    
    const CEO = faculties.find(faculty => faculty.contact === "01821779282");
    const otherMembers = faculties.filter(faculty => faculty.contact != "01821779282")

    const { image, name, background_of_study, job_experience, designation, contact, email
    } = CEO;



    let showingFaculties = otherMembers.map((data, idx) => {
        const newData = {
            ...data,
            id: idx + 1
        };
        return newData;
    });

    const totalCard = showingFaculties.length;

    const handleNext = () => {
        const newFirstCardId = firstCardId + cardPerSlice;
        if (newFirstCardId < totalCard) {
            setFirstCardId(newFirstCardId);
        }
    };

    const handlePrev = () => {
        const newFirstCardId = firstCardId - cardPerSlice;
        if (newFirstCardId >= 0) {
            setFirstCardId(newFirstCardId);
        }
    };

    return (
        <div className='sm:px-20 my-10 min-h-screen'>
            <Helmet>
                <title>Universe IT | Faculty</title>
            </Helmet>
            <p className="text-4xl m-10"><span className='font-bold border-b-2'>Faculties</span></p>

            <div className=" my-10 flex justify-center">
                {
                    CEO && <div className="bg-primary/70 p-1.5 w-[290px] rounded-lg text-black">
                    <div className=" relative bg-gray-100">
                    {/* <div className='w-full h-full bg-white absolute'></div>
                    <div className='w-full h-full bg-text_color/50 absolute'></div> */}
                        <div className='relative'>
                            <div className='flex gap-1 justify-end p-5 pb-3 items-center'>
                                <img className='h-6 object-cover' src={log21} alt="" />
                                {/* <h2 className='font-bold text-xs'>Universe IT <br /> Institute</h2> */}
            
            
                            </div>
                            <div className=' h-[120px] relative  flex flex-col justify-center items-center gap-5'>
                                <div className='w-full h-3.5 bg-primary/70'></div>
                                <div className='w-full h-3.5 bg-primary/70'></div>
                                <div className='w-full h-full absolute top-0 flex justify-center items-center '>
                                   <div className=' bg-primary/70 size-28 rounded-full relative overflow-hidden'>
                                   <div className='absolute top-0 w-full h-full bg-white'></div>
                                    <img className='w-full h-full rounded-full object-cover relative p-1 bg-primary/70' src={image} alt="" /></div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h2 className='text-base font-bold capitalize'>{name}</h2>
                                <h2 className='text-sm'>{designation}</h2>
                                <h2 className='text-sm pt-1'>{contact}</h2>
                                <h2 className='text-sm break-words'>{email}</h2>
                            </div>
            
                            <div className='pb-7'>
                                <div className='bg-gradient-to-r from-primary to-primary/70 w-[50%] text-white font-semibold mt-5 ml-auto py-1 text-sm pl-5'>
                                    <p>Experience:</p>
                                    <p>{job_experience} Years +</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div> 

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5  justify-center px-2'>
                {
                    otherMembers.map(
                        (faculty, idx) => <FacultyCard key={idx} faculty={faculty} />
                    )
                    // (showingFaculties.slice(firstCardId, firstCardId + cardPerSlice)).map((faculty, idx) => <FacultyCard key={idx} faculty={faculty} />)
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

export default Faculties;

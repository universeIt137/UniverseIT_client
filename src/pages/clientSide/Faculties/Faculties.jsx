import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import FacultyCard from './FacultyCard';

const Faculties = () => {
    const [firstCardId, setFirstCardId] = useState(0);
    const [cardPerSlice, setCardPerSlice] = useState(6);
    const axiosPublic = useAxiosPublic();
    const { data: faculties = [] } = useQuery({
        queryKey: ['facuties'],
        queryFn: async () => {
            const res = await axiosPublic.get('/faculty');
            return res.data;
        }
    })


    let showingFaculties = faculties.map((data, idx) => {
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
            <p className="text-4xl m-10"><span className='text-primary border-b-2'>Faculties</span></p>

            <div className='flex gap-10 flex-wrap justify-center'>
                {
                    (showingFaculties.slice(firstCardId, firstCardId + cardPerSlice)).map((faculty, idx) => <FacultyCard key={idx} faculty={faculty} />)
                }
            </div>
            <div className="mt-4 flex justify-center items-center gap-6">
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
            </div>
        </div>
    );
};

export default Faculties;

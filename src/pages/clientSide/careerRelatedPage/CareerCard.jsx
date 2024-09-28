import React from 'react';
import { Link } from 'react-router-dom';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';
import { MdAccessTimeFilled } from 'react-icons/md';

const CareerCard = ({ career }) => {
    console.log(career);
    const { careerImageUrl, position, responsibilities, _id, salary, job_location, employment_status } = career;
    return (
        <>
            <Link to={`/career/${_id}`}>
            <div className="w-full max-w-[340px] sm:max-w-[400px]  md:max-w-[800px] flex flex-col md:flex-row gap-10 bg-white shadow-lg py-5  md:py-10 px-3 md:px-5 rounded-3xl mx-auto md:items-center">
            <img className="w-full md:size-44 object-cover rounded-lg shadow-lg shadow-primary/50" src={careerImageUrl} alt="" />
            <div className="space-y-3">

                <p className="font-bold text-2xl ">Position: {position}</p>
                <p className="font-bold text-sm md:text-base flex items-center gap-3"><AiFillDollarCircle />Salary: {salary}</p>
                <p className="font-bold text-sm md:text-base flex items-center gap-3"><FaLocationDot />Location: {job_location}</p>
                <p className="font-bold text-sm md:text-base flex items-center gap-3"><MdAccessTimeFilled />{ employment_status }</p>
                <div className=" max-h-[100px] md:h-[100px] overflow-hidden text-gray-600">
                    {responsibilities}
                </div>
                <Link to={`/career/${_id}`}><ButtonStrong text={'Read More'} /></Link>
            </div>
        </div>
            </Link>
        </>
    );
};

export default CareerCard;
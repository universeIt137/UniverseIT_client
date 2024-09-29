import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { MdCall, MdOutlineMail } from 'react-icons/md';
import { BiError } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight, FaFacebook, FaLinkedin, FaPrint, FaWhatsappSquare } from 'react-icons/fa';
import { IoIosStar, IoMdShare } from 'react-icons/io';
import { Helmet } from 'react-helmet-async';





const CareerDetailsPage = () => {
    const [show, setShow] = useState(false);
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const company_logo = `https://res.cloudinary.com/dnvmj9pvk/image/upload/v1723544696/UniverseIT/Logo/xvlfi7xrapeoabxyzjji.png`
    
    const { data: careerData = {}, refetch: blogDataRefetch, isLoading } = useQuery({
        queryKey: ['careerData', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/career/${id}`)
            return res?.data
        }
    })

    const { position, salary, experience, education, skills, responsibilities, employment_status, job_location, workplace, _id } = careerData;
    if (isLoading) {
        return <Loading />
    }

    console.log(careerData);
    return (
        <div className='bg-[#EEEEEE] w-10/12 mx-auto'>
            <Helmet>
                <title>Universe IT | Career</title>
            </Helmet>
            <div id='all' className='container mx-auto bg-white p-5 rounded'>
                <img className='w-32' src={company_logo} alt="" />
                <p>Universe IT Group</p>
                <h1 className='text-3xl text-secondary font-bold'>{position}</h1>
                <div className='flex justify-between flex-col lg:flex-row gap-5 my-5'>
                    <div className='flex gap-5 flex-wrap-reverse'>
                        <Link to={`/apply-job/${_id}`}>
                            <button className='bg-secondary hover:scale-105 hover:duration-300  text-white font-bold rounded-md px-5 py-2.5'>Apply Now</button>
                        </Link>
                    </div>
                </div>



                {/* summary */}
                <div className='bg-[#F4F4F4] rounded-md p-4 border-2 border-[#DDD]'>
                    <div className=''>
                        <h2 className='text-secondary font-bold text-2xl text-center lg:text-start'>Summary</h2>

                        <div className='flex flex-col md:flex-row lg:flex-row justify-center opacity-90 py-5 lg:space-y-4 lg:gap-8'>
                            <div className='lg:w-1/3 lg:pl-5 space-y-2 text-center lg:text-start md:text-start'>

                                <h2 className=''>Salary : <span className='font-bold'> {salary} BDT</span></h2>
                                <h2 className=''>Experience :  <span className='font-bold'> At least {experience} </span></h2>
                            </div>
                            <div className='lg:w-1/3 space-y-2 text-center lg:text-start md:text-start'>
                                <h2 className=''>Education : <span className='font-bold'> {education}</span></h2>
                                <h2 className=''>Skills :  <span className='font-bold'>  {skills} </span></h2>
                            </div>
                            <div className='lg:w-1/3 space-y-2 text-center lg:text-start md:text-start'>
                                <h2 className=''>Job Location : <span className='font-bold'> {job_location}</span></h2>
                                <h2 className=''>Workplace :  <span className='font-bold'>  {workplace} </span></h2>
                            </div>

                        </div>

                    </div>

                </div>

                

                <div id='req' className='mt-5 p-2 lg:p-5  rounded-md border border-black '>
                    <h2 className='font-bold text-xl text-secondary'>Requirments</h2>
                    <p className='text-xl font-bold py-5 text-secondary'>Education</p>
                    <ul className='pl-8 font-medium' >
                        <li className='list-disc'>{education}</li>
                    </ul>
                    <p className='text-xl font-bold text-secondary'>Skills</p>
                    <ul className='pl-8 font-medium  list-none'>
                        {
                            skills
                        }

                    </ul>

                    <p className='text-xl font-bold text-secondary'>Experience</p>
                    <ul className='pl-8 font-medium'>
                        <li className='list-disc'>{experience}</li>
                    </ul>

                    <hr />
                    <h2 id='res' className='text-secondary font-bold text-xl py-3'>Responsibilities & Context</h2>
                    <ul className='lg:pl-8 font-medium'>
                        {
                            responsibilities
                        }
                    </ul>

                    <hr />
                    <p className='text-secondary font-bold text-xl py-3'>Workplace</p>
                    <p>Work at Office</p>

                    <h2 className='text-secondary font-bold text-xl py-3'>Employment Status</h2>
                    <p>{employment_status}</p>
                    <h2 className='text-secondary font-bold text-xl py-3'>Job Location</h2>
                    <p>{job_location}</p>
                </div>

                

                

                


                



            </div>

        </div>
    );
};

export default CareerDetailsPage;
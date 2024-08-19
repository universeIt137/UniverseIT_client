import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const scrollAnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const CertificateVerification = () => {
    const axiosPublic = useAxiosPublic();
    const [student, setStudent] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const serial = form.certificate_number.value;
        console.log(serial);
        const data = { serial };
        axiosPublic.post(`/certificateSerial`, data)
            .then(res => {
                if (res.data) {
                    setStudent(res.data);
            }
        })
        form.reset();
        
    }

    console.log(student);
    
    return (
        <div className=' mx-auto '>
            <div className=' bg-white shadow-lg p-6 flex gap-6 border rounded-md '>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={scrollAnimationVariants}
                    viewport={{ once: true, amount: 0.2 }}
                    className="border w-1/2 gap-6 mb-3 p-8  rounded-2xl shadow-xl"
                >
                    {/* Logo Section */}
                    <div className="flex items-center justify-center">
                        <img src='https://res.cloudinary.com/dmpsrcunj/image/upload/v1723546597/greenLogo_b59gxw.png' alt="logo" className="w-1/2 h-auto max-w-lg" />
                    </div>

                    {/* Input Fields Section */}
                    <div className="flex flex-col space-y-4 border w-10/12 p-8 rounded-2xl mx-auto ">
                        <form action="" onSubmit={handleSubmit}>
                            <label htmlFor="certificate_name" className='text-text_color font-bold text-2xl text-center'>Certificate Serial No</label>
                            <input
                                type="text"
                                placeholder="Enter your Certificate Number"
                                className="w-full p-3 border bg-gray-300 rounded-2xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-text_color"
                                name='certificate_number'
                            />

                            <div className='flex justify-center mt-1'>
                            <button className='bg-primary w-1/2 mx-auto btn rounded-3xl border-none text-white text-lg hover:bg-text_color'>Check Now</button>
                            </div>
                        </form>

                    </div>

                </motion.div>

                <motion.div
                    initial='hidden'
                    whileInView='visible'
                    variants={scrollAnimationVariants}
                    viewport={{ once: true, amount: 0.2 }}
                    className='border w-1/2 p-8 rounded-2xl mb-3 '
                >


                    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-2xl text-gray-900">
                        <div className="rounded-t-lg h-32 overflow-hidden bg-primary">

                        </div>
                        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                            <img
                                className="object-cover  object-center h-32"
                                src={student?.studentProfile || 'https://placehold.co/600x400' }
                                alt="Woman looking front"
                            />
                        </div>
                        <div className="text-center mt-2  p-4 pb-20 justify-center items-center">
                            <h2 className="font-bold text-2xl">{ student?.studentName }</h2>
                            <p className=""><span className='font-bold'>Batch No:</span> { student?.batch }</p>
                            <p className=""><span className='font-bold'>Course:</span> <span>{ student?.courseName }</span></p>
                            <p className=""><span className='font-bold'>Certificate No:</span> <span>{ student?.certificateNumber }</span></p>
                            <p className="text-gray-500 font-bold">
                                Universe IT Institute
                            </p>
                        </div>


                    </div>



                </motion.div>
            </div>
        </div>
    );
};

export default CertificateVerification;

import React from 'react';
import { motion } from 'framer-motion';

const scrollAnimationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const CertificateVerification = () => {
  return (
    <div className='container mx-auto p-8'>
        <div className=' bg-white shadow-lg p-6 rounded-md'>
            <motion.div
                initial="hidden"
                whileInView="visible"
                variants={scrollAnimationVariants}
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 items-center md:grid-cols-2 gap-6 mb-3"
            >
                {/* Logo Section */}
                <div className="flex items-center justify-center">
                <img src='https://res.cloudinary.com/dmpsrcunj/image/upload/v1723546597/greenLogo_b59gxw.png' alt="logo" className="w-full h-auto max-w-lg" />
                </div>
                
                {/* Input Fields Section */}
                <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 border bg-gray-300 rounded-2xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                    <input
                    type="number"
                    placeholder="Roll no"
                    className="w-full p-3 border bg-gray-300 rounded-2xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                <input
                    type="text"
                    placeholder="Batch No"
                    className="w-full p-3 border bg-gray-300 rounded-2xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
            
                <button className='bg-primary btn rounded-3xl border-none text-white text-lg '>Send</button>
                </div>
                
            </motion.div>
            <hr className="my-6" />          
                <motion.div 
                    initial='hidden'
                    whileInView='visible'
                    variants={scrollAnimationVariants}
                    viewport={{once: true, amount: 0.2}}
                    className='mt-6'
                >
                      <div>
                            <h1 className='font-bold text-4xl'>Student Details</h1>
                            <div className="ml-1">
                                <h2 className='font-semibold pb-1 lg:text-2xl'>Name:</h2>
                                <h2 className='font-semibold pb-1 lg:text-2xl'>Batch No:</h2>
                                <h2 className='font-semibold pb-1 lg:text-2xl'>Course Name:</h2>
                                <h2 className='font-semibold pb-1 lg:text-2xl'>Course Duration:</h2>
                                <h2 className='font-semibold pb-1 lg:text-2xl'>Certificate Link:</h2>
                            </div>
                        </div>
                </motion.div>
        </div>
    </div>
  );
};

export default CertificateVerification;

import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import ReactPlayer from 'react-player';
import Marquee from 'react-fast-marquee';

const BannerSection = () => {
    return (
        <>
            <div className='flex flex-col lg:flex-row  my-5 gap-1 md:gap-5'>
                {/* video and technology section  */}
                <div className="lg:w-3/4 bg-yellow-100 p-5 rounded-2xl">
                    {/* main video  */}
                    <div className="relative w-[80vw] h-[45.9vw] z-10 sm:w-full sm:h-[37vw] lg:h-[470px]  lg:mx-auto rounded-2xl p-2
                bg-black">
                        <ReactPlayer
                            controls="true"
                            playing={false}
                            url='https://www.youtube.com/watch?v=hqCcnboWN60'
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <section className=' my-4 bg-gray-200 rounded-xl p-5'>
                        <p className='font-bold text-xl mb-2' >Technologies you will learn</p>
                        <div className='grid lg:grid-cols-3 gap-3'>
                            <div className="flex lg:justify-center  gap-2 ">
                                <div className="avatar">
                                    <div className="w-12 rounded-full ">
                                        <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/tnwe31nhteiwsie2vvfz.png" />
                                    </div>
                                </div>
                                <p className='font-bold  mb-2 text-center'>PowerPoint</p>
                            </div>
                            <div className="flex lg:justify-center  gap-2">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/mvwtcz9phzjcunlqwasd.png" />
                                    </div>
                                </div>
                                <p className='font-bold  mb-2 text-center'>Adobe InDesign</p>
                            </div>

                            <div className="flex lg:justify-center  gap-2">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/q3nexwmhmp5o9hugongh.png" />
                                    </div>
                                </div>
                                <p className='font-bold  mb-2 text-center'>Adobe Photoshop</p>
                            </div>

                            <div className="flex lg:justify-center  gap-2">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/mwjlofwuru4lh9wyj7uk.png" />
                                    </div>
                                </div>
                                <p className='font-bold  mb-2 text-center'>Adobe XD</p>
                            </div>

                            <div className="flex lg:justify-center  gap-2">
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/hffdvkkiy3maq6k6t9ce.png" />
                                    </div>
                                </div>
                                <p className='font-bold  mb-2 text-center'>Adobe Illustrator</p>
                            </div>




                        </div>
                    </section>
                </div>

                {/* sidebar */}
                <div className="lg:w-1/4 lg:py-14 bg-yellow-100 rounded-2xl">
                    <div className='p-4 md:p-8'>
                        <p className='text-primary'>
                            <Rating
                                className="space-x-1"
                                emptySymbol={<FaRegStar />}
                                fullSymbol={<FaStar />}
                                initialRating={4}
                                readonly
                            />
                        </p>
                        <p className='lg:my-5 font-bold text-2xl md:hidden lg:text-start'>ফি ৩০০০ টাকা</p>
                        <ul className='lg:list-disc text-sm md:text-xl  lg:text-start'>
                            <li className='my-2 lg:my-5'>৪+ ঘন্টা প্রোজেক্ট বেসড টিউটোরিয়াল</li>
                            <li className='my-2 lg:my-5'>৩০+ ভিডিও</li>
                            <li className='my-2 lg:my-5'>৫০+ কুইজ</li>
                            <li className='my-2 lg:my-5'>৪ সেট কুইজ</li>
                            <li className='my-2 lg:my-5'>ফ্রিল্যান্সিং গাইডলাইন</li>
                            <li className='my-2 lg:my-5'>লাইফ টাইম এক্সেস</li>
                            <li className=''>কোর্স শেষে সার্টিফিকেট</li>
                        </ul>
                        <p className='lg:mt-5 font-bold text-2xl hidden md:block lg:text-start'>ফি ৩০০০ টাকা</p>
                    </div>
                    <div className="flex justify-center">
                        <button className='btn hover:rounded-xl hover:bg-primary  bg-primary text-white px-6'>ENROLL NOW</button>
                        <button className='btn hover:rounded-xl hover:bg-primary  bg-primary text-white px-6'>CALL NOW</button>
                    </div>
                    <div className='flex items-center justify-center w-full mx-auto mb-4 lg:mb-0'>
                        <button className='btn hover:rounded-xl hover:bg-primary  bg-primary text-white px-8'>JOIN FREE SEMINAR</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BannerSection;
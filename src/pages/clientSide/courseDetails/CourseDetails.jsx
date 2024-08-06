import React from 'react';


const CourseDetails = () => {
    return (
        <section className='w-11/12 mx-auto'>
            <div className='flex flex-col lg:flex-row  mt-5 gap-1 md:gap-5'>
                <div className="lg:w-4/6 bg-yellow-100 p-5 rounded-2xl">
                    <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722937499/UniverseIT/kbutig6llqdd7fyaobpy.jpg" className='rounded-2xl' alt="" />
                </div>
                {/* sidebar */}
                <div className="w-auto bg-yellow-100 rounded-2xl">
                    <div className='p-4 md:p-8'>
                        <p className='lg:my-5 font-bold text-2xl md:hidden lg:text-start'>ফি ৩০০০ টাকা</p>
                        <ul className='lg:list-disc text-sm md:text-[16px]  lg:text-start'>
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
                    <div className='flex flex-wrap lg:gap-2 w-full lg:mx-auto lg:w-10/12 mb-4 ml-2'>
                        <button className='btn hover:rounded-xl hover:bg-primary bg-primary text-white'>enroll</button>
                        <button className='btn hover:rounded-xl hover:bg-primary bg-primary text-white'>join free seminar</button>
                        <button className='btn hover:rounded-xl hover:bg-primary bg-primary text-white'>Call now</button>
                    </div>
                </div>
            </div>

            <section className='mt-4'>
                <p className='font-bold text-xl mb-2' >Technologies you will learn</p>
                <div className='flex gap-16'>
                    <div className="">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Tailwind</p>
                    </div>

                    <div className="">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Tailwind</p>
                    </div>

                    <div className="">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Tailwind</p>
                    </div>
                </div>
            </section>


        </section>
    );
};

export default CourseDetails;
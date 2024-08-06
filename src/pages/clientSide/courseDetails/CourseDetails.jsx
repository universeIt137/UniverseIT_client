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
                <div className='grid grid-cols-3 gap-3'>
                    <div className="flex justify-center items-center gap-2">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/mvwtcz9phzjcunlqwasd.png" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Adobe InDesign</p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/q3nexwmhmp5o9hugongh.png" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Adobe Photoshop</p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/mwjlofwuru4lh9wyj7uk.png" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Adobe XD</p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/hffdvkkiy3maq6k6t9ce.png" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Adobe Illustrator</p>
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1722946907/UniverseIT/technologies/tnwe31nhteiwsie2vvfz.png" />
                            </div>
                        </div>
                        <p className='font-bold  mb-2 text-center'>Microsoft Office PowerPoint</p>
                    </div>


                </div>
            </section>


        </section>
    );
};

export default CourseDetails;